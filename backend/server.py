import asyncio
import json
import cv2
import base64
from aiohttp import web, WSMsgType
from aiortc import RTCPeerConnection, RTCSessionDescription
from aiortc.contrib.media import MediaRelay

pcs = set()  # Set to store peer connections
relay = MediaRelay()
ws_clients = set()  # Set to store WebSocket clients


async def index(request):
    return web.Response(content_type='text/html', text=open('index.html').read())


async def offer(request):
    params = await request.json()
    offer = RTCSessionDescription(sdp=params['sdp'], type=params['type'])

    pc = RTCPeerConnection()
    pcs.add(pc)

    @pc.on("track")
    async def on_track(track):
        if track.kind == "video":
            print("Receiving video track...")
            counter = 0
            while True:
                frame = await track.recv()
                counter += 1
                # if counter % 10 == 0:
                # Convert YUV to RGB using OpenCV
                img = frame.to_ndarray(format="bgr24")
                rgb_img = cv2.cvtColor(img, cv2.COLOR_YUV2BGR_I420)  # Convert from YUV420 to BGR
                processed_frame = process_frame(rgb_img)
                # Send the processed frame via WebSocket
                for ws in ws_clients:
                    await ws.send_json({'frame': processed_frame})

    await pc.setRemoteDescription(offer)
    answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)

    return web.Response(content_type="application/json", text=json.dumps(
        {"sdp": pc.localDescription.sdp, "type": pc.localDescription.type}
    ))


def process_frame(frame):
    """
    Process the frame (every 10th frame).
    Convert it to a format suitable for sending over WebSocket (Base64-encoded JPEG).
    """
    _, jpeg_frame = cv2.imencode('.jpg', frame)
    return base64.b64encode(jpeg_frame).decode('utf-8')


# WebSocket route for streaming processed frames
async def websocket_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)

    ws_clients.add(ws)
    try:
        async for msg in ws:
            if msg.type == WSMsgType.text:
                print(f"Received WebSocket message: {msg.data}")
    finally:
        ws_clients.remove(ws)

    return ws


async def on_shutdown(app):
    coros = [pc.close() for pc in pcs]
    await asyncio.gather(*coros)
    pcs.clear()


app = web.Application()
app.router.add_get("/", index)
app.router.add_post("/offer", offer)
app.router.add_get("/ws", websocket_handler)  # WebSocket endpoint

app.on_shutdown.append(on_shutdown)

web.run_app(app, port=8080)

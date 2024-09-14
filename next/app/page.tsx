import { Button } from "flowbite-react";
import VideoCapture from "@/app/components/video-capture";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Button>Click me</Button>
      <VideoCapture />
    </div>
  );
}

"use client";
import VideoCapture from "@/src/components/video-capture";
import {Button, Label, Textarea} from "flowbite-react";
import {BsMagic} from "react-icons/bs";
import { api } from "@/convex/_generated/api";
import {useQuery} from "convex/react";


export default function Page() {
    const sketches = useQuery(api.sketches.getSketches);

    const sortedSketches = (sketches ?? []).sort((a, b) => {
        return b._creationTime - a._creationTime;
    });

    return (
        <div className="p-4">
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <h2>Recent Sketches</h2>
                <div className="grid grid-cols-4 gap-4">
                    {sortedSketches.map((sketch) => (
                        <img key={sketch._id} width="256" height="256" src={sketch.result}/>
                    ))}
                </div>
            </main>
            <h1 className="text-gray-500 text-xl font-bold text-center p-6">Start with your <span
                className="font-semibold text-gray-900 underline dark:text-white decoration-amber-800">dreams</span> here
            </h1>

            <div className="flex gap-6 justify-center">

                <div className="max-w-md flex flex-col gap-2">
                    <div className="mb-2 block">
                        <Label htmlFor="comment" value="Your style"/>
                    </div>
                    <Textarea id="comment" placeholder="describe yout style" required rows={4}/>

                    <Button gradientDuoTone="redToYellow">
                        <BsMagic className="mr-2 h-5 w-5"/>Imagine</Button>
                </div>
                <VideoCapture/>
            </div>
        </div>
    );
}
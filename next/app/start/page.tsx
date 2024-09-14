import VideoCapture from "@/app/components/video-capture";
import {Button, Label, Textarea} from "flowbite-react";
import Image from 'next/image'
import {BsMagic} from "react-icons/bs";
import {ImageRotation} from "@/app/components/image-rotation";
//             <VideoCapture />


export default function Page() {



    return (

        <div className="p-4">
            <h1 className="text-gray-500 text-xl font-bold text-center p-6">Start with your <span className="font-semibold text-gray-900 underline dark:text-white decoration-amber-800">dreams</span> here</h1>

            <div className="flex gap-6 justify-center">

                <div className="max-w-md flex flex-col gap-2">
                    <div className="mb-2 block">
                        <Label htmlFor="comment" value="Your style"/>
                    </div>
                    <Textarea id="comment" placeholder="describe yout style" required rows={4}/>

                    <Button gradientDuoTone="redToYellow">
                        <BsMagic className="mr-2 h-5 w-5"/>

                        Imagine</Button>

                </div>

                <ImageRotation />


            </div>


        </div>

    );
}
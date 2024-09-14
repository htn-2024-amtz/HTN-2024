import {Button, Label, Textarea} from "flowbite-react";
import {BsMagic} from "react-icons/bs";
import {ImageRotation} from "@/app/components/image-rotation";
import {InputTabs} from "@/app/components/input-tabs";


export default function Page() {
    return (

        <div className="p-4">
            <h1 className="text-gray-500 text-xl font-bold text-center p-6">Start with your <span className="font-semibold text-gray-900 underline dark:text-white decoration-amber-800">dreams</span> here</h1>

            <div className="flex gap-6 justify-center">

                <div className="max-w-96 min-w-96 flex flex-col gap-2">
                    <div className="mb-2 block">
                        <Label htmlFor="comment" value="Your style"/>
                    </div>
                    <Textarea id="comment" placeholder="describe your own vibe" required rows={4}/>

                    <Button gradientDuoTone="redToYellow">
                        <BsMagic className="mr-2 h-5 w-5"/>
                        Imagine</Button>
                    <InputTabs />
                </div>
                <ImageRotation />
            </div>
        </div>
    );
}
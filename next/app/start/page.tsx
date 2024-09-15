import {Button, Label, Textarea} from "flowbite-react";
import {BsMagic} from "react-icons/bs";
import {ImageRotation} from "@/app/components/image-rotation";
import {InputTabs} from "@/app/components/input-tabs";


export default function Page() {
    return (

        <div className="p-4">
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
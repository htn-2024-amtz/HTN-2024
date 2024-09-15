"use client"
import {FileInput, Label, Tabs} from "flowbite-react";
import {BiPhone, BiUpload} from "react-icons/bi";


export function InputTabs() {

    return (
    <Tabs aria-label="Tabs with icons" variant="underline">
        <Tabs.Item active title="Phone streaming" icon={BiPhone}>
            Smartphone streaming
        </Tabs.Item>
        <Tabs.Item title="Upload" icon={BiUpload}>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="file-upload" value="Upload file"/>
                </div>
                <FileInput id="file-upload"/>
            </div>

        </Tabs.Item>
    </Tabs>
    );


}
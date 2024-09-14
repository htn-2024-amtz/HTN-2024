"use client"
import {FileInput, Label, Tabs} from "flowbite-react";
import {BiPhone, BiUpload} from "react-icons/bi";


export function InputTabs() {

    return (
    <Tabs aria-label="Tabs with icons" variant="underline">
        <Tabs.Item active title="Phone streaming" icon={BiPhone}>
            This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
            Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes
            to
            control the content visibility and styling.
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
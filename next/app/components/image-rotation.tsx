"use client";

import {useState, useEffect} from "react";
import {api} from "@/convex/_generated/api";
import {useQuery, useMutation} from "convex/react";
import {Button, Label, TextInput} from "flowbite-react";
import {BsMagic} from "react-icons/bs";
import {InputTabs} from "@/app/components/input-tabs";

import {useForm} from "react-hook-form";


export function ImageRotation() {
    const [image, setImage] = useState("");
    const sketchesQuery = useQuery(api.sketches.getSketches);
    const saveSketchMutation = useMutation(api.sketches.saveSketch);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<{
        prompt: string;
    }>();

    const sortedSketches = (sketchesQuery ?? []).sort((a, b) => {
        return b._creationTime - a._creationTime;
    });

    useEffect(() => {
        const ws = new WebSocket("ws://192.168.110.85:8080/ws");

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.frame) {
                setImage(`data:image/jpeg;base64,${data.frame}`);
            }
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => ws.close();
    }, []);

    return (
        <div className="flex gap-6 justify-center">
            <div className="max-w-96 min-w-96 flex flex-col gap-2">
                <div className="mb-2 block">
                    <Label htmlFor="comment" value="Your style"/>
                </div>

                <form
                    onSubmit={handleSubmit(async (formData) => {
                        await saveSketchMutation({...formData, image});
                    })}
                >
                    <TextInput id="prompt" {...register("prompt", {required: false})}/>
                    <p>Presets:</p>
                    <div className="grid grid-cols-2 gap-2">
                        <Button>realistic</Button>
                        <Button>animated</Button>
                        <Button>cartoon</Button>
                        <Button>art</Button>
                        <Button>black and white</Button>
                        <Button>bright</Button>
                        <Button>dark</Button>
                    </div>
                    <Button type="submit" gradientDuoTone="redToYellow">
                        <BsMagic className="mr-2 h-5 w-5"/>
                        Imagine</Button>
                </form>
                <InputTabs/>
            </div>
            <>
                {
                    sortedSketches.length > 0 ? (
                        <img
                            src={sortedSketches[0].result}
                            width="512"
                            height="512"
                            alt="Image"
                        />
                    ) : (
                        <div/>
                    )
                }
            </>
        </div>
    );
}
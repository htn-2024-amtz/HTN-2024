"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import {Button, Label, Textarea, TextInput} from "flowbite-react";
import {BsMagic} from "react-icons/bs";
import {InputTabs} from "@/app/components/input-tabs";

import {useForm} from "react-hook-form";


export function ImageRotation() {
    const images = [
        "/IMG_2247.jpeg",
        "/IMG_2248.jpeg",
        "/IMG_2249.jpeg",
        "/IMG_2250.jpeg",
        "/IMG_2251.jpeg",
        "/IMG_2252.jpeg",
        "/IMG_2253.jpeg",
        "/IMG_2254.jpeg",
        "/IMG_2255.jpeg",
    ];


    const [image, setImage] = useState("");

    const [state, setState] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setState((prevState) => (prevState + 1) % images.length);
        }, 1000);

        return () => clearInterval(interval);
    }, [images.length]);

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
                {sortedSketches.length > 0 ? (

                    <Image
                        src={sortedSketches[0].result}
                        width={256}
                        height={256}
                        alt="Rotating Image"
                        className="rounded-lg shadow-md"
                        objectFit="contain"
                        layout="intrinsic"
                    />
                ) : (
                    <div/>
                )}
            </>
        </div>


    )
        ;
}
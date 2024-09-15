"use client";

import {useState, useEffect, useRef} from "react";
import {api} from "@/convex/_generated/api";
import {useQuery, useMutation} from "convex/react";
import {Button, Label, TextInput} from "flowbite-react";
import {BsMagic} from "react-icons/bs";
import {InputTabs} from "@/app/components/input-tabs";

import {useForm} from "react-hook-form";


export function ImageRotation() {
    const [autoSubmit, setAutoSubmit] = useState(false);
    const [image, setImage] = useState("");
    const [currentSketch, setCurrentSketch] = useState(null); // Holds the current sketch to be displayed
    const [opacity, setOpacity] = useState(0); // Tracks opacity
    const opacityRef = useRef(0); // A ref to track opacity across renders
    const previousSketchRef = useRef(null); // A ref to store the previous sketch

    const sketchesQuery = useQuery(api.sketches.getSketches);
    const saveSketchMutation = useMutation(api.sketches.saveSketch);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<{
        prompt: string;
    }>();

    useEffect(() => {
        if (autoSubmit) {
            const interval = setInterval(() => {
                document.querySelector("form")?.dispatchEvent(new Event("submit", {cancelable: true, bubbles: true}));
            }, 2000); // 2 seconds interval

            return () => clearInterval(interval); // Clean up on unmount
        }
    }, [autoSubmit]);

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

    // Handle sketch display logic
    useEffect(() => {
        const latestSketch = sortedSketches[0];

        if (latestSketch && latestSketch.result) {
            // If there's a valid sketch, set it as the current sketch
            setCurrentSketch(latestSketch);
        } else if (previousSketchRef.current) {
            // If no valid new sketch, use the previous sketch
            setCurrentSketch(previousSketchRef.current);
        }

        // Store the current sketch in the ref for future comparisons
        if (latestSketch) {
            previousSketchRef.current = latestSketch;
        }
    }, [sortedSketches]);

    // Handle opacity increment
    useEffect(() => {
        let interval;
        if (currentSketch) {
            opacityRef.current = 0; // Reset opacity when a new sketch is shown
            setOpacity(0);

            interval = setInterval(() => {
                opacityRef.current = Math.min(opacityRef.current + 0.1, 1); // Increment opacity by 10%
                setOpacity(opacityRef.current);
            }, 1000); // Increase opacity every second
        }

        return () => {
            clearInterval(interval); // Clean up interval on component unmount
        };
    }, [currentSketch]);

    return (
        <div className="flex gap-6 justify-center">
            <div className="max-w-96 min-w-96 flex flex-col gap-2">
                <div className="mb-2 block">
                    <Label htmlFor="comment" value="Your style"/>
                </div>

                <form
                    onSubmit={handleSubmit(async (formData) => {
                        await saveSketchMutation({...formData, image});
                        setAutoSubmit(true);
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
                    currentSketch ? (
                        <div className="relative" style={{width: "512px", height: "512px"}}>
                            {/* AI-generated image */}
                            <img
                                key={currentSketch._id}
                                width="400"
                                height="400"
                                src={currentSketch.result}
                                alt="AI-generated"
                                className="absolute top-0 left-0"
                            />
                            {/* WebSocket image overlay with dynamic opacity */}
                            {image && (
                                <img
                                    width="400"
                                    height="400"
                                    src={image}
                                    alt="WebSocket Image"
                                    className="absolute top-0 left-0"
                                    style={{opacity: opacity}}
                                />
                            )}
                        </div>
                    ) : (
                        <></>
                    )
                }
            </>
        </div>
    );
}

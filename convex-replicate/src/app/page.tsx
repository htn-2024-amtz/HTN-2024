"use client";
import {api} from "../../convex/_generated/api";
import {useMutation, useQuery} from "convex/react";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";

export default function Home() {
    const [image, setImage] = useState("");
    const saveSketchMutation = useMutation(api.sketches.saveSketch);
    const sketchesQuery = useQuery(api.sketches.getSketches);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<{
        prompt: string;
    }>();


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

    const sortedSketches = (sketchesQuery ?? []).sort((a, b) => {
        return b._creationTime - a._creationTime;
    });

    const getGeneratedImage = () => {
        return sortedSketches[0] ?
            <>
                <div>
                    <img src={image} width="256" height="256"/>
                </div>
                <div>
                    <img key={sortedSketches[0]._id} width="256" height="256"
                         src={sortedSketches[0].result}/>
                </div>
            </> : <></>
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between pt-8">
            <div className="container mx-auto flex gap-4">
                <form
                    className="flex flex-col gap-2 w-1/4"
                    onSubmit={handleSubmit(async (formData) => {
                        await saveSketchMutation({...formData, image});
                    })}
                >
                    <Label htmlFor="prompt">Prompt</Label>
                    <Input id="prompt" {...register("prompt", {required: true})} />
                    {errors.prompt && <span>This field is required</span>}

                    <Button type="submit">Submit</Button>
                </form>

                <section>
                    {
                        getGeneratedImage()
                    }
                </section>
            </div>
        </main>
    );
}

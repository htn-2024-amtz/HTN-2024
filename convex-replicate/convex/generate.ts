"use node";

import {v} from "convex/values";
import {internal} from "./_generated/api";
import {internalAction} from "./_generated/server";
import Replicate from "replicate";

export const generate = internalAction({
    args: {sketchId: v.id("sketches"), prompt: v.string(), image: v.string()},
    handler: async (ctx, {prompt, image, sketchId}) => {
        if (!process.env.REPLICATE_API_TOKEN) {
            throw new Error(
                "Add REPLICATE_API_TOKEN to your environment variables: " +
                "https://docs.convex.dev/production/environment-variables"
            );
        }
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        const output = (await replicate.run(
            "lucataco/dreamshaper7-img2img-lcm:f3c3db6975c27f46c54912752779e236fdaed8adde36b4b257637845b46046a7",
            {
                input: {
                    image: image,
                    prompt: prompt,
                    strength: 0.6,
                    guidance_scale: 1,
                }
            }
        )) as [string, string];

        await ctx.runMutation(internal.sketches.updateSketchResult, {
            sketchId,
            result: output.toString(),
        });
    },
});

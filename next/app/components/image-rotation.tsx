"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

    const [state, setState] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setState((prevState) => (prevState + 1) % images.length);
        }, 100);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <Image
            src={images[state]}
            width={300}
            height={500}
            alt="Rotating Image"
            className="auto max-w-lg rounded-lg shadow-md dark:shadow-gray-800"
        />
    );
}
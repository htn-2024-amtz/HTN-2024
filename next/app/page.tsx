import Link from "next/link";
import {Button} from "flowbite-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-l from-gray-200 via-fuchsia-100 to-stone-100">
            <div className="flex-grow p-4 flex flex-col justify-center items-center gap-2 pb-[50vh]">
                <h1 className="text-5xl font-bold">AIagine</h1>
                <h2 className="mb-6 text-zinc-600 text-lg">Experience the world through the eyes of AI, enhancing perspectives and uncovering new possibilities.</h2>
                <Link href="/start" className="">
                    <Button gradientDuoTone="redToYellow" size="md">Let's start</Button>
                </Link>
            </div>
            <footer className="bg-slate-900 text-zinc-100 p-2 text-center">
                <p>Made with ❤️ @ Hack the North 2024</p>
            </footer>
        </div>
    );
}
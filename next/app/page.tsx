import Link from "next/link";
import {Button} from "flowbite-react";
import {HiOutlineArrowRight} from "react-icons/hi";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col">
            <div className="flex-grow p-4 flex flex-col justify-center items-center gap-3 pt-[10vh]">
                <h1 className="text-4xl font-bold">🌻 fleurish</h1>
                <h2 className="tracking-normal text-gray-500 md:text-lg dark:text-gray-400 max-w-xl text-center">
                    Experience the world through the eyes of AI, enhance perspectives,
                    and uncover new possibilities.
                </h2>

                <Link href="/start" className="mt-4">
                    <Button gradientDuoTone="redToYellow" size="md">Let&apos;s start
                        <HiOutlineArrowRight className="ml-2 h-5 w-5"/>
                    </Button>
                </Link>
            </div>

            <div className="flex justify-center">
            <Image src="/finalGIF1.gif" alt="example as gif" width={400} height={400} />
            </div>


        </div>
    );
}
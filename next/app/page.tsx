import Link from "next/link";
import {Button} from "flowbite-react";
import {HiOutlineArrowRight} from "react-icons/hi";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col">
            <div className="flex-grow p-4 flex flex-col justify-center items-center gap-3 pt-[10vh]">
                <h1 className="text-4xl font-bold">🌻 fleurish</h1>
                <h2 className="tracking-normal text-gray-500 md:text-lg dark:text-gray-400">Experience the world through
                    the eyes of
                    AI, enhancing perspectives and uncovering new possibilities.</h2>

                <Link href="/start" className="">
                    <Button gradientDuoTone="redToYellow" size="md">Let&apos;s start
                        <HiOutlineArrowRight className="ml-2 h-5 w-5"/>
                    </Button>
                </Link>


            </div>



        </div>
    );
}
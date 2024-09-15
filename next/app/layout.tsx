import "./globals.css";
import {Roboto_Mono} from 'next/font/google'
import Link from "next/link";
import ConvexClientProvider from "./ConvexClientProvider";
import Image from "next/image";

const roboto = Roboto_Mono({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={roboto.className}>
        <body className="min-h-screen flex flex-col bg-gradient-to-l from-gray-200 via-fuchsia-100 to-stone-100">
        <ConvexClientProvider>
            <nav className="p-4 flex items-center justify-start gap-3">
                <Link href="/">🌻 fleurish</Link>
                <h1 className="text-gray-500 text-md font-bold text-center"> – start your <span
                    className="font-semibold text-gray-900 underline dark:text-white decoration-amber-800">dreams</span> here
                </h1>

            </nav>
            <div className="flex-grow">
                {children}
            </div>
            <footer className="bg-slate-900 text-zinc-100 p-2 text-center flex justify-between items-center px-4">
                <p>Made with ❤️ @ Hack the North 2024 🇨🇦</p>
                <div className="flex justify-start items-center">
                    <Image src="/logo-white.png" alt="Convex logo" width={140} height={20}/>
                    <Image src="/cohere.svg" alt="Cohere logo" width={140} height={20}/>
                </div>
            </footer>
        </ConvexClientProvider>
        </body>
        </html>
    )
}
import "./globals.css";
import {Roboto_Mono} from 'next/font/google'

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
        <div className="flex-grow">
            {children}
        </div>
        <footer className="bg-slate-900 text-zinc-100 p-2 text-center">
            <p>Made with ❤️ @ Hack the North 2024 🇨🇦</p>
        </footer>
    </body>
</html>
    )
}
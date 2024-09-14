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
        <body>
        {children}
        </body>
        </html>
    )
}
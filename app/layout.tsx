import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700', '800'],
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "B2B | Premium Travel Platform for Partners",
    description: "Access exclusive B2B travel rates and build your business with our comprehensive trip catalog",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={poppins.className} suppressHydrationWarning>{children}</body>
        </html>
    );
}

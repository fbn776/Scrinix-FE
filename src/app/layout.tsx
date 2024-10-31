import type {Metadata} from "next";
import "./globals.css";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {Roboto} from 'next/font/google';
import {ThemeProvider} from '@mui/material/styles';
import theme from "@/lib/theme";

export const metadata: Metadata = {
    title: "Scrinix",
    description: "TODO: Add description",
};


const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});


export default function RootLayout(props: Readonly<{ children: React.ReactNode; }>) {
    const {children} = props;

    return (
        <html lang="en">
        <body className={roboto.variable}>
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                    {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    )
}

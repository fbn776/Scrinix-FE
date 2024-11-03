"use client";

import MainLayout from "@/components/main-layout";
import {NotificationsProvider} from "@toolpad/core";

export default function RootLayout(props: Readonly<{ children: React.ReactNode; }>) {
    const {children} = props;

    return (
        <NotificationsProvider>
            <MainLayout>
                {children}
            </MainLayout>
        </NotificationsProvider>
    );
}

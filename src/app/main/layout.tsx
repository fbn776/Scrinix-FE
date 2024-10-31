import MainLayout from "@/components/main-layout";

export default function RootLayout(props: Readonly<{ children: React.ReactNode; }>) {
    const {children} = props;

    return (
        <MainLayout>
            {children}
        </MainLayout>
    );
}

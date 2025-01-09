import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Admin | Scrinix",
    description: "Admin page for scrinix",
};

export default function RootLayout(props: Readonly<{ children: React.ReactNode; }>) {
    const {children} = props;

    return <>{children}</>
}

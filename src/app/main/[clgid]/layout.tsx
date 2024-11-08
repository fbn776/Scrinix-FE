import apiInstance from "@/lib/api";
import {redirect} from "next/navigation";

export default async function RootLayout(props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ clgid: string }>
}>) {
    const {children} = props;

    const clgid = (await props.params).clgid;

    try {
        const hasExam = await apiInstance.get(`/college/has-clg/${clgid}`);
        if (!hasExam.data.success)
            redirect('/main/error');

        return <main className="relative w-full h-full">
            {children}
        </main>

    } catch (e) {
        console.error(e);
        return redirect('/main/error');
    }
}


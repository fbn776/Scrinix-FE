import apiInstance from "@/lib/api";
import {redirect} from "next/navigation";


export default async function Page({params}: {
    params: Promise<{ e_id: string }>
}) {
    const e_id = (await params).e_id;

    try {
        const hasExam = await apiInstance.get(`/has-exam/${e_id}`);
        if (!hasExam.data.hasExam)
            redirect('/main/exam/error');
    } catch (e) {
        console.error(e);
        redirect('/main/exam/error');
    }


    return <div>My Post: {e_id}</div>
}
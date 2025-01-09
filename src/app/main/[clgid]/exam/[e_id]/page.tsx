import apiInstance from "@/lib/api";
import {redirect} from "next/navigation";
import ExamTabs from "@/components/exams/ExamTabs";


export default async function Page({params}: {
    params: Promise<{ e_id: string, clgid: string }>
}) {
    const e_id = (await params).e_id;
    const clgid = (await params).clgid;

    try {
        const hasExam = await apiInstance.post(`exams/has-exam`, {
            e_id,
            clg_id: clgid
        });
        if (!hasExam.data.hasExam)
            redirect(`/main/${clgid}/exam/error`);

        const exam = await apiInstance.get(`exams/exam?e_id=${e_id}&clg_id=${clgid}`);
        return <main className="relative w-full h-full">
            <ExamTabs paramData={exam.data.data[0]}/>
        </main>

    } catch (e) {
        console.error(e);
        return redirect(`/main/${clgid}/exam/error`);
    }
}
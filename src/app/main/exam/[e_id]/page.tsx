import apiInstance from "@/lib/api";
import {redirect} from "next/navigation";
import {ExamView} from "@/app/main/exam/[e_id]/ExamView";


export default async function Page({params}: {
    params: Promise<{ e_id: string }>
}) {
    const e_id = (await params).e_id;

    try {
        const hasExam = await apiInstance.post(`exams/has-exam`, {
            e_id,
            clg_id: 'KTE' // TODO Get from cookie or something
        });
        if (!hasExam.data.hasExam)
            redirect('/main/exam/error');

        const exam = await apiInstance.get(`exams/exam?e_id=${e_id}&clg_id=${'KTE'}`);
        return <ExamView data={exam.data.data[0]}/>

    } catch (e) {
        console.error(e);
        return redirect('/main/exam/error');
    }

}
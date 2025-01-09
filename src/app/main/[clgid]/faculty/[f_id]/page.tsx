import apiInstance from "@/lib/api";
import {redirect} from "next/navigation";
import FacultyTabs from "@/components/faculty/FacultyTabs";

export interface TFacultyQueryOut {
    f_id: string,
    clgid: string,
    name: string,
    email: string,
    phone: string
}

export default async function Page({params}: {
    params: Promise<{ f_id: string }>
}) {
    const f_id = (await params).f_id;
    const clgid = 'KTE';

    try {
        const hasFaculty = await apiInstance.get(`/staff/has-faculty/${clgid}/${f_id}`);
        console.log(hasFaculty.data);

        if (!hasFaculty.data.hasFaculty)
            redirect('/main/faculty/error');

        const faculty = (await apiInstance.get(`/staff/faculty/${clgid}/${f_id}`)).data.data as TFacultyQueryOut;
        return <main className="relative w-full h-full">
            <FacultyTabs paramData={faculty}/>
        </main>

    } catch (e) {
        console.error(e);
        return redirect('/main/faculty/error');
    }
}
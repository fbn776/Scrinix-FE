import CreateForm from "@/components/admin-tabs/create-course/CreateForm";
import ViewCourses from "@/components/admin-tabs/create-course/ViewCourses";
import {useState} from "react";

export interface ICourse {
    semester: string
    scheme: string,
    name: string,
    course_id: string,
    created_at: string,
}

export default function CreateCourseTab() {
    const [course, setCourse] = useState<ICourse[]>([]);
    return <>
        <CreateForm setCourse={setCourse}/>
        <ViewCourses courses={course} setCourses={setCourse}/>
    </>
}
import {SubjectView} from "@/components/exams/SubjectView";
import React from "react";
import {ISubject} from "@/components/exams/ExamTabs";


export default function AvailableSubjectsTab({subject_arr}: { subject_arr: ISubject[]}) {
    return <div className="space-y-3 mx-4 my-4"> {
        subject_arr.map((item: {
            semester: number,
            scheme: number,
            name: string,
            course_id: string
        }, i: number) => {
            return <SubjectView key={i} item={item}/>
        })
    } </div>
}
import {SubjectView} from "@/components/exams/SubjectView";
import React from "react";
import {ISubject} from "@/components/exams/ExamTabs";
import {TExamQueryOut} from "@/app/main/coordinator/page";
import {StateSetter} from "@/lib/types";


export default function AvailableSubjectsTab({data, subject, setSubjects}: {
    data: TExamQueryOut,
    subject: ISubject[],
    setSubjects: StateSetter<ISubject[]>
}) {
    return <div className="space-y-3 mx-4 my-4"> {
        subject.length === 0 ? <h1 className="text-2xl text-center opacity-50 pt-5">No subjects found :(</h1> :
        subject.map((item: ISubject, i: number) => {
            return <SubjectView
                key={i}
                data={data}
                setSubjects={setSubjects}
                item={item}
            />
        })
    } </div>
}
"use client";

import {Chip} from "@mui/material";
import Button from "@mui/material/Button";
import AssignFacultyDialog from "@/components/AssignFacultyDialog";
import {useState} from "react";
import {IFaculty} from "@/components/FacultySearch";
import {ISubject} from "@/components/exams/ExamTabs";
import {TExamQueryOut} from "@/app/main/coordinator/page";
import {StateSetter} from "@/lib/types";

export function SubjectView(props: {
    data: TExamQueryOut,
    item: ISubject,
    setSubjects: StateSetter<ISubject[]>
}) {
    const [open, setOpen] = useState(false);
    const [selectFaculty, setSelectFaculty] = useState<IFaculty | null>(null);

    return <div className="bg-white p-4 rounded-md flex justify-between items-center">
        <div>
            <h1 className="text-lg flex items-center gap-2">{props.item.name}</h1>
            <p className="text-gray-500 mb-3">{props.item.course_id}</p>
            <Chip label={`S${props.item.semester} - ${props.item.scheme}`}/>
        </div>
        <Button variant="text" onClick={() => setOpen(true)}>Assign Faculty</Button>
        <AssignFacultyDialog
            data={props.data}
            subject={props.item}
            open={open}
            setOpen={setOpen}
            selectedFaculty={selectFaculty}
            setSelectedFaculty={setSelectFaculty}
            setSubjects={props.setSubjects}
        />
    </div>;
}
"use client";

import {Chip} from "@mui/material";
import Button from "@mui/material/Button";
import AssignFacultyDialog from "@/components/AssignFacultyDialog";
import {useState} from "react";
import {IFaculty} from "@/components/FacultySearch";
import {ISubject} from "@/components/exams/ExamTabs";
import {TExamQueryOut} from "@/app/main/[clgid]/coordinator/page";
import {StateSetter, TUseNotifications} from "@/lib/types";
import apiInstance from "@/lib/api";
import {useNotifications} from "@toolpad/core";

function handleSubmission(selectedFaculty: IFaculty | null, notify: TUseNotifications, e: React.FormEvent<HTMLFormElement>, data: TExamQueryOut, subject: ISubject, setSubjects: (value: (((prevState: ISubject[]) => ISubject[]) | ISubject[])) => void, setOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void) {
    if (!window.confirm('Are you sure you want to assign this faculty?'))
        return;

    if (!selectedFaculty) {
        notify.show('Please select a faculty', {severity: 'error', autoHideDuration: 1000});
        return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const dueDate = formData.get('due_date') as string;

    apiInstance.post('/coordinator/assign-faculty', {
        f_id: selectedFaculty?.f_id,
        e_id: data.e_id,
        clgID: data.clgid,
        course_id: subject.course_id,
        scheme: subject.scheme,
        due_date: new Date(dueDate).toISOString(),
    }).then((res) => {
        // Remove the  selected subject from the list
        setSubjects((prev) => prev.filter((e) => {
            return e.course_id !== subject.course_id;
        }));

        notify.show('Faculty assigned successfully', {severity: 'success', autoHideDuration: 1000});
        console.log(res.data);
    }).catch(e => {
        console.error(e);
    }).finally(() => {
        setOpen(false);
    });
}


export function SubjectView(props: {
    data: TExamQueryOut,
    item: ISubject,
    setSubjects: StateSetter<ISubject[]>
}) {
    const [open, setOpen] = useState(false);
    const [selectFaculty, setSelectFaculty] = useState<IFaculty | null>(null);
    const notify = useNotifications();

    return <div className="bg-white p-4 rounded-md flex justify-between items-center">
        <div>
            <h1 className="text-lg flex items-center gap-2">{props.item.name}</h1>
            <p className="text-gray-500 mb-3">{props.item.course_id}</p>
            <Chip label={`S${props.item.semester} - ${props.item.scheme}`}/>
        </div>
        <Button variant="text" onClick={() => setOpen(true)}>Assign Faculty</Button>
        <AssignFacultyDialog
            data={props.data}
            open={open}
            setOpen={setOpen}
            setSelectedFaculty={setSelectFaculty}

            onSubmit={(e) => {
                handleSubmission(selectFaculty, notify, e, props.data, props.item, props.setSubjects, setOpen);
            }}
        />
    </div>;
}
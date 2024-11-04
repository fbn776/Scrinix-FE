"use client";

import {Chip} from "@mui/material";
import Button from "@mui/material/Button";
import FacultySearchPopup from "@/components/FacultySearchPopup";
import {useState} from "react";
import {IFaculty} from "@/components/FacultySearch";

export function SubjectView(props: { item: { semester: number; scheme: number; name: string; course_id: string } }) {
    const [open, setOpen] = useState(false);
    const [selectFaculty, setSelectFaculty] = useState<IFaculty | null>(null);

    return <div className="bg-gray-100 p-2 rounded-md mt-2 flex justify-between items-center">
        <div>
            <h1 className="text-lg flex items-center gap-2">{props.item.name}</h1>
            <p className="text-gray-500 mb-3">{props.item.course_id}</p>
            <Chip label={`S${props.item.semester} - ${props.item.scheme}`}/>
        </div>
        <div>
            {selectFaculty ? <Chip label={selectFaculty.name} onDelete={() => setSelectFaculty(null)}/> :
                <Button variant="text" onClick={() => setOpen(true)}>Assign Faculty</Button>
            }
        </div>

        <FacultySearchPopup open={open} setOpen={setOpen} setSelectedFaculty={setSelectFaculty}/>
    </div>;
}
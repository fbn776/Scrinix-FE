"use client";

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import HistoryIcon from '@mui/icons-material/History';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateExamModal from "@/components/CreateExamModal";
import {useEffect, useState} from "react";
import {NotificationsProvider} from "@toolpad/core";
import DateRangeIcon from '@mui/icons-material/DateRange';
import LaunchIcon from '@mui/icons-material/Launch';
import Link from "next/link";
import apiInstance from "@/lib/api";

function BasicSpeedDial({openCreateExamModal}: { openCreateExamModal: () => void }) {
    return (
        <SpeedDial
            ariaLabel="Quick actions"
            sx={{position: 'absolute', bottom: 16, right: 16}}
            icon={<SpeedDialIcon/>}
        >
            <SpeedDialAction icon={<NoteAddIcon/>} tooltipTitle="Create exams" onClick={openCreateExamModal}/>
            <SpeedDialAction icon={<HistoryIcon/>} tooltipTitle="History"/>

        </SpeedDial>
    );
}

export type TExam = {
    E_id: string;
    ClgID: string;
    title: string;
    startDate: string;
    endDate: string;
    semesters: string[];
}

export default function CoordinatorPage() {
    const [open, setOpen] = useState(false);
    const [exams, setExams] = useState<TExam[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiInstance.get('/exams/all').then((res) => {
            setExams(res.data.data);
            setIsLoading(false);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    console.log(exams);

    return (
        <NotificationsProvider>
            <div>
                {isLoading ?
                    <h1 className="text-center text-4xl opacity-30 mt-10">Loading...</h1>
                    : exams.length === 0 ?
                        <h1 className="text-center text-4xl opacity-30 mt-10">You have no exams :)</h1>
                        :
                        exams.map((exam, i) => <Link href={`/main/exams/${exam.e_id}`} key={i}>
                            <h1>{exam.title}</h1>
                            <DateRangeIcon/> {exam.start_date} - {exam.end_date}
                            <LaunchIcon/>
                        </Link>)
                }

                <BasicSpeedDial openCreateExamModal={() => setOpen(true)}/>
                <CreateExamModal open={open} setOpen={setOpen} setExam={setExams}/>
            </div>
        </NotificationsProvider>
    );
}
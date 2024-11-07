"use client";

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import HistoryIcon from '@mui/icons-material/History';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateExamModal from "@/components/CreateExamModal";
import {useEffect, useState} from "react";
import apiInstance from "@/lib/api";
import axios from "axios";
import ExamQuickView from "@/components/ExamQuickView";

function BasicSpeedDial({openCreateExamModal}: { openCreateExamModal: () => void }) {
    return (
        <SpeedDial

            ariaLabel="Quick actions"
            sx={{position: 'fixed', bottom: 24, right: 24}}
            icon={<SpeedDialIcon/>}
        >
            <SpeedDialAction icon={<NoteAddIcon/>} tooltipTitle="Create exams" onClick={openCreateExamModal}/>
            <SpeedDialAction icon={<HistoryIcon/>} tooltipTitle="History"/>

        </SpeedDial>
    );
}

export type TExamQueryOut = {
    e_id: string;
    clgid: string;
    title: string;
    start_date: string;
    end_date: string;
    sem_scheme: string;
    created_time: string
}

export default function CoordinatorPage() {
    const [open, setOpen] = useState(false);
    const [exams, setExams] = useState<TExamQueryOut[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const source = axios.CancelToken.source();
        apiInstance.get('/exams/all', {
            cancelToken: source.token
        }).then((res) => {
            setExams(res.data.data);
            setIsLoading(false);
        }).catch((err) => {
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data);
            }
            if (axios.isCancel(err)) {
                console.log('Request cancelled, error: ', err.message);
            }
        }).finally(() => {
            setIsLoading(false);
        });

        return () => {
            source.cancel('Cancelled by rerender');
        }
    }, []);

    return (
        <div className="bg-gray-200 relative p-0">
            <div className="w-full h-full pb-[100px]">
                {isLoading ?
                    <h1 className="text-center text-4xl opacity-30 mt-10">Loading...</h1>
                    : exams.length === 0 ?
                        <h1 className="text-center text-4xl opacity-30 mt-10">You have no exams :)</h1>
                        :
                        <div className="space-y-4 pt-4">
                            {exams.map((exam, i) => <ExamQuickView exam={exam} key={i}/>)}
                        </div>
                }
            </div>

            <BasicSpeedDial openCreateExamModal={() => setOpen(true)}/>
            <CreateExamModal open={open} setOpen={setOpen} setExam={setExams}/>
        </div>
    );
}
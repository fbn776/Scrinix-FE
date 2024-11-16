"use client";

import Box from '@mui/material/Box';
import React, {useEffect, useState} from "react";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditIcon from "@mui/icons-material/Edit";
import {formatDateToDDMMYYYYHHMM, timeAgo} from "@/lib/utils";
import {Chip, Typography} from "@mui/material";
import {Event} from "@mui/icons-material";
import apiInstance from "@/lib/api";
import {useRouter} from "next/navigation";
import AvailableSubjectsTab from "@/components/exams/tabs/AvailableSubjectsTab";
import {TExamQueryOut} from "@/app/main/[clgid]/coordinator/page";
import QuestionPaperTab from "@/components/exams/tabs/qp/QuestionPaperTab";
import ExamUploadTab from "@/components/exams/tabs/ExamUploadTab";
import TabTemplate from "@/components/TabTemplate";

export interface ISubject {
    course_id: string;
    created_at: string;
    name: string;
    scheme: number;
    semester: number;
    seating_arrangement: number | null;
    time_table: number | null;
}


export default function ExamTabs({paramData}: { paramData: TExamQueryOut }) {
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [data, setData] = useState<TExamQueryOut>(paramData);
    const [qpCount, setQpCount] = useState(0);

    const router = useRouter();

    useEffect(() => {
        apiInstance.post('/exams/get-available-subjects', {
            e_id: data.e_id,
            clg_id: data.clgid
        }).then((res) => {
            setSubjects(res.data.data);
        }).catch((e) => {
            console.error(e);
            return router.push('/main/exam/error');
        })
    }, [data, router]);

    if (!data)
        return null;

    return <TabTemplate tabData={[
        {
            tab: <AvailableSubjectsTab data={data} subject={subjects} setSubjects={setSubjects}/>,
            title: `Available Subjects (${subjects.length})`
        },
        {
            tab: <QuestionPaperTab data={data} setCount={setQpCount}/>,
            title: `Question Papers (${qpCount})`
        },
        {
            tab: <Box/>,
            title: `Scrutinize`
        },
        {
            tab: <ExamUploadTab data={data} setData={setData}/>,
            title: `Upload`
        }
    ]}>
        <div className="bg-white mt-3 ml-3 rounded-md">
            <h1 className='text-2xl flex items-center'>
                <Link href={`/main/${data.clgid}/coordinator`}>
                    <IconButton className=''>
                        <ArrowBackIosIcon sx={{
                            fontSize: '20px'
                        }}/>
                    </IconButton>
                </Link>

                {data.title} ({timeAgo(data.created_time)})
                <IconButton sx={{marginLeft: '10px'}}>
                    <EditIcon/>
                </IconButton>
            </h1>

            <h2 className="ml-2 mt-2 opacity-80">Created
                at: {formatDateToDDMMYYYYHHMM(data.created_time)} </h2>

            <Typography variant="body2" color="text.secondary"
                        sx={{display: 'flex', alignItems: 'center', mt: 1, ml: 1}}>
                <Event sx={{mr: 1}} fontSize="small"/>
                {new Date(data.start_date).toLocaleDateString()} - {new Date(data.end_date).toLocaleDateString()}
            </Typography>

            <div className='flex gap-2 flex-wrap mt-4 ml-1'>
                {data.sem_scheme.split(' ').map((item, i) => {
                    const label = item.split('-');
                    return <Chip key={i} label={`${label[1]} - S${label[0]}`}/>
                })}
            </div>
        </div>
    </TabTemplate>
}

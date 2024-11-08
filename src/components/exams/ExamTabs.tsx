"use client";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React, {useEffect, useState} from "react";
import {NotificationsProvider} from "@toolpad/core";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditIcon from "@mui/icons-material/Edit";
import a11yProps, {formatDateToDDMMYYYYHHMM, timeAgo} from "@/lib/utils";
import {Chip, Typography} from "@mui/material";
import {Event} from "@mui/icons-material";
import apiInstance from "@/lib/api";
import {useRouter} from "next/navigation";
import CustomTabPanel from "@/components/CustomTabPanel";
import AvailableSubjectsTab from "@/components/exams/tabs/AvailableSubjectsTab";
import {TExamQueryOut} from "@/app/main/[clgid]/coordinator/page";
import QuestionPaperTab from "@/components/exams/tabs/qp/QuestionPaperTab";
import ExamUploadTab from "@/components/exams/tabs/ExamUploadTab";

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
    const [tabIndex, setTabIndex] = useState(0);
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [data, setData] = useState<TExamQueryOut>(paramData);

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

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    if (!data)
        return null;

    return (
        <NotificationsProvider>
            <Box className="w-full h-full flex flex-col">
                <Box sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    backgroundColor: 'white',
                    boxShadow: '0px 0.1px 4px rgba(0, 0, 0, 0.4)',
                }} className='flex-none w-full z-30'>
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

                    <Tabs className="mt-1" value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={`Available Subjects (${subjects.length})`} {...a11yProps(0)} />
                        <Tab label={`Question Papers`} {...a11yProps(1)} />
                        <Tab label={`Scrutinize`} {...a11yProps(2)} />
                        <Tab label='Upload' {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <Box className="flex-1 overflow-auto w-full">
                    <CustomTabPanel value={tabIndex} index={0} padding="0px">
                        <AvailableSubjectsTab data={data} subject={subjects} setSubjects={setSubjects}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={1} padding='0px'>
                        <QuestionPaperTab data={data}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={2} padding='0px'>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={3} padding='0px'>
                        <ExamUploadTab data={data} setData={setData}/>
                    </CustomTabPanel>
                </Box>
            </Box>
        </NotificationsProvider>
    );
}
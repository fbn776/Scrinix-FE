import React from 'react';
import Link from 'next/link';
import {Chip, Typography} from '@mui/material';
import {Event} from '@mui/icons-material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {TExamQueryOut} from "@/app/main/[clgid]/coordinator/page";
import {timeAgo} from "@/lib/utils";
import Button from "@mui/material/Button";
import downloadFile from "@/lib/downloadFile";

interface ExamCardProps {
    exam: TExamQueryOut;
}

export default function ExamQuickView({exam}: ExamCardProps) {
    return (
        <Link href={`/main/${exam.clgid}/exam/${exam.e_id}`} style={{textDecoration: 'none'}}
              className="bg-white shadow rounded-md flex mx-4 p-4 items-center justify-between">
            <div>
                <h1 className="text-2xl">{exam.title}</h1>
                <Typography variant="body2" color="text.secondary" sx={{display: 'flex', alignItems: 'center', mt: 1}}>
                    <Event sx={{mr: 1}} fontSize="small"/>
                    {new Date(exam.start_date).toLocaleDateString()} - {new Date(exam.end_date).toLocaleDateString()}
                </Typography>
                <Typography variant="caption" color="text.secondary" className="">
                    Created {timeAgo(exam.created_time)}
                </Typography><br/>
                {exam.sem_scheme.split(' ').map((item, i) => {
                    const [semester, scheme] = item.split('-');
                    return <Chip
                        key={i}
                        label={`S${semester} - ${scheme}`}
                        size="small"
                        sx={{mr: 1, mt: 1}}
                    />
                })} <br/>
                <div className="mt-5 flex gap-4">
                    {exam.seating_arrangement &&
                        <Button variant="outlined" onClick={(e) => {
                            e.preventDefault();
                            downloadFile(exam.seating_arrangement!)
                        }}
                        >
                            Download Seating
                        </Button>}
                    {exam.time_table &&
                        <Button variant="outlined"
                                onClick={(e) => {
                                    e.preventDefault();

                                    downloadFile(exam.time_table!)
                                }}
                        >
                            Download Time Table
                        </Button>}
                </div>
            </div>
            <OpenInNewIcon/>
        </Link>
    );
}
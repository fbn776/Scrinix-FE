import {TExamQueryOut} from "@/app/main/coordinator/page";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import {formatDateToDDMMYYYYHHMM, timeAgo} from "@/lib/utils";
import {Event} from "@mui/icons-material";
import {Chip, Typography} from "@mui/material";
import React from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from "next/link";
import apiInstance from "@/lib/api";
import {redirect} from "next/navigation";
import {SubjectView} from "@/app/main/exam/[e_id]/SubjectView";

export async function ExamView({data}: { data: TExamQueryOut }) {
    let subject_arr = [];
    try {
        const subjects = await apiInstance.post('/exams/get-subjects', {
            e_id: data.e_id,
            clg_id: 'KTE'
        });

        subject_arr = subjects.data.data;
    } catch (e) {
        console.error(e);
        return redirect('/main/exam/error');
    }


    return <div className="px-4 py-3 bg-white m-3 rounded-md">
        <span className='text-gray-700 flex items-center opacity-90 mb-3 w-full'>
            <Link href='/main/coordinator'>
                <IconButton className=''>
                    <ArrowBackIosIcon sx={{
                        fontSize: '18px'
                    }}/>
                </IconButton>
            </Link>
            Back
        </span>
        <h1 className='text-2xl flex items-center gap-3'>
            {data.title}
            <IconButton className='ml-2'>
                <EditIcon/>
            </IconButton>
        </h1>

        <h2 className="mt-2 opacity-80">Created
            at: {formatDateToDDMMYYYYHHMM(data.created_time)} ({timeAgo(data.created_time)})</h2>

        <Typography variant="body2" color="text.secondary" sx={{display: 'flex', alignItems: 'center', mt: 1}}>
            <Event sx={{mr: 1}} fontSize="small"/>
            {new Date(data.start_date).toLocaleDateString()} - {new Date(data.end_date).toLocaleDateString()}
        </Typography>

        <div className='flex gap-2 flex-wrap mt-4'>
            {data.sem_scheme.split(' ').map((item, i) => {
                const label = item.split('-');
                return <Chip key={i} label={`${label[1]} - S${label[0]}`}/>
            })}
        </div>

        <h3 className='mt-4 text-xl'>Subjects</h3>
        {
            subject_arr.map((item: {
                semester: number,
                scheme: number,
                name: string,
                course_id: string
            }, i: number) => {
                return <SubjectView key={i} item={item}/>
            })
        }
    </div>
}

/*
semester: 1,
scheme: 2019,
name: 'Linear Algebra And Calculus',
course_id: 'MAT101'
 */
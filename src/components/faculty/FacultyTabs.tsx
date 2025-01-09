"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {TFacultyQueryOut} from "@/app/main/[clgid]/faculty/[f_id]/page";
import {Chip} from "@mui/material";
import QpTab from "@/components/faculty/tabs/qp/QpTab";
import TabTemplate from "@/components/TabTemplate";


export default function FacultyTabs({paramData}: { paramData: TFacultyQueryOut }) {
    console.log(paramData);
    const [data] = useState<TFacultyQueryOut>(paramData);

    const router = useRouter();

    useEffect(() => {
        if (!data)
            router.push('/main/faculty/error');
    }, [data, router]);

    return <TabTemplate tabData={[
        {
            title: 'Question Papers',
            tab: <QpTab data={data}/>
        },
        {
            title: 'Scrutinize',
            tab: <div>Scrutinize</div>
        },
        {
            title: 'History',
            tab: <div>History</div>
        }
    ]}>
        <div className="bg-white mt-3 ml-3 rounded-md">
            <h1 className='text-2xl mx-4 ml-1'>
                Welcome, {data.name}
            </h1>
            <div className="space-x-3 mb-2">
                <Chip label={data.clgid} className='mt-4'/>
                <Chip label={`#${data.f_id}`} className='mt-4'/>
            </div>
        </div>
    </TabTemplate>
}
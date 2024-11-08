"use client";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React, {useEffect, useState} from "react";
import {NotificationsProvider} from "@toolpad/core";
import a11yProps from "@/lib/utils";
import {useRouter} from "next/navigation";
import CustomTabPanel from "@/components/CustomTabPanel";
import {TFacultyQueryOut} from "@/app/main/[clgid]/faculty/[f_id]/page";
import {Chip} from "@mui/material";
import QpTab from "@/components/faculty/tabs/qp/QpTab";


export default function FacultyTabs({paramData}: { paramData: TFacultyQueryOut }) {
    console.log(paramData);
    const [tabIndex, setTabIndex] = useState(0);
    const [data, setData] = useState<TFacultyQueryOut>(paramData);

    const router = useRouter();

    useEffect(() => {

    }, [data, router]);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    if (!data)
        router.push('/main/faculty/error');

    console.log(data);

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
                        <h1 className='text-2xl mx-4 ml-1'>
                            Welcome, {data.name}
                        </h1>
                        <div className="space-x-3 mb-2">
                            <Chip label={data.clgid} className='mt-4'/>
                            <Chip label={`#${data.f_id}`} className='mt-4'/>
                        </div>
                    </div>

                    <Tabs className="mt-1" value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={`Question Papers`} {...a11yProps(0)} />
                        <Tab label={`Scrutinize`} {...a11yProps(1)} />
                        <Tab label={`History`} {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <Box className="flex-1 overflow-auto w-full">
                    <CustomTabPanel value={tabIndex} index={0} padding="0px">
                        <QpTab data={data}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={1} padding='0px'>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={2} padding='0px'>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={3} padding='0px'>
                    </CustomTabPanel>
                </Box>
            </Box>
        </NotificationsProvider>
    );
}
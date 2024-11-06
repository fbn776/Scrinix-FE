"use client";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {useState} from "react";
import CreateCollegeTab from "@/components/admin-tabs/CreateCollegeTab";
import {NotificationsProvider} from "@toolpad/core";
import EditCollegeTab from "@/components/admin-tabs/EditCollegeTab";
import CreateCollegeAdminTab from "@/components/admin-tabs/create-admin/CreateCollegeAdminTab";
import CreateCourseTab from "@/components/admin-tabs/create-course/CreateCourseTab";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function MainAdminPage() {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };


    return (
        <NotificationsProvider>
            <Box className="w-full flex flex-col overflow-hidden">
                <Box sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    backgroundColor: 'white',
                    boxShadow: '0px 0.1px 4px rgba(0, 0, 0, 0.4)',
                }} className='fixed w-full z-30'>
                    <h1 className="p-4 text-2xl bg-white">Admin Panel</h1>
                    <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Create College" {...a11yProps(0)} />
                        <Tab label="Edit College" {...a11yProps(1)} />
                        <Tab label="College Admin" {...a11yProps(2)} />
                        <Tab label="Create Course" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <Box className="overflow-y-auto fixed h-[calc(100%-100px)] w-full top-[100px]">
                    <CustomTabPanel value={tabIndex} index={0}>
                        <CreateCollegeTab/>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={1}>
                        <EditCollegeTab/>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={2}>
                        <CreateCollegeAdminTab/>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={3}>
                        <CreateCourseTab/>

                    </CustomTabPanel>
                </Box>
            </Box>
        </NotificationsProvider>
    );
}
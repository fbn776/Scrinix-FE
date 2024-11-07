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
import a11yProps from "@/lib/utils";
import CustomTabPanel from "@/components/CustomTabPanel";
import CreateFacultyTab from "@/components/admin-tabs/CreateFacultyTab";
import CreateCoordinatorTab from "@/components/admin-tabs/Create CoordinatorTab";

export default function ClgAdminPage() {
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
                    <h1 className="p-4 text-2xl bg-white">College Admin Panel</h1>
                    <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Create Faculty" {...a11yProps(0)} />
                        <Tab label="Edit Faculty" {...a11yProps(1)} />
                        <Tab label="Assign Coordinator" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <Box className="overflow-y-auto fixed h-[calc(100%-100px)] w-full top-[100px]">
                    <CustomTabPanel value={tabIndex} index={0}>
                        <CreateFacultyTab/>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={1}>
                        <EditCollegeTab/>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={2}>
                        <CreateCoordinatorTab/>
                    </CustomTabPanel>
                </Box>
            </Box>
        </NotificationsProvider>
    );
}
"use client"

import CustomTabPanel from "@/components/CustomTabPanel";
import CreateCollegeTab from "@/components/admin-tabs/CreateCollegeTab";
import EditCollegeTab from "@/components/admin-tabs/EditCollegeTab";
import CreateCollegeAdminTab from "@/components/admin-tabs/create-admin/CreateCollegeAdminTab";
import CreateCourseTab from "@/components/admin-tabs/create-course/CreateCourseTab";
import Box from "@mui/material/Box";
import {useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import a11yProps from "@/lib/utils";
import {NotificationsProvider} from "@toolpad/core";
import CreateFacultyTab from "@/components/faculty/CreateFacultyTab";

export default async function ClgAdminPage({params}: { params: Promise<{ clgid: string }> }) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tabIndex, setTabIndex] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (<>
            <NotificationsProvider>
                <Box className="w-full flex flex-col overflow-hidden">
                    <Box sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        backgroundColor: 'white',
                        boxShadow: '0px 0.1px 4px rgba(0, 0, 0, 0.4)',
                    }} className='fixed w-full z-30'>
                        <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Create Faculty" {...a11yProps(0)} />
                            <Tab label="Assign Coordinator" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <Box className="overflow-y-auto fixed h-[calc(100%-150px)] w-full top-[150px]"sx={{
                        width: '80%',
                        margin: '0 auto',
                    }}>
                        <CustomTabPanel value={tabIndex} index={0}>
                            <CreateFacultyTab/>
                        </CustomTabPanel>
                        <CustomTabPanel value={tabIndex} index={2}>
                            <CreateCollegeAdminTab/>
                        </CustomTabPanel>
                    </Box>
                </Box>
            </NotificationsProvider>
        </>
    );
}
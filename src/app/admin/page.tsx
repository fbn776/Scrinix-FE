"use client";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {useState} from "react";
import CreateCollegeTab from "@/components/admins/CreateCollegeTab";
import {NotificationsProvider} from "@toolpad/core";
import EditCollegeTab from "@/components/admins/EditCollegeTab";

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
            <div className="">
                <h1 className="p-4 text-2xl">Admin Panel</h1>

                <Box sx={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Create College" {...a11yProps(0)} />
                            <Tab label="Edit College" {...a11yProps(1)} />
                            <Tab label="Assign College Admin" {...a11yProps(2)} />
                            <Tab label="Create Course" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tabIndex} index={0}>
                        <CreateCollegeTab/>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={1}>
                        <EditCollegeTab/>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={2}>
                        Item Three
                    </CustomTabPanel>
                </Box>
            </div>

        </NotificationsProvider>
    );
}
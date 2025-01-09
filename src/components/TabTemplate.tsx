"use client";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {useState} from "react";
import a11yProps from "@/lib/utils";
import CustomTabPanel from "@/components/CustomTabPanel";

export interface ITabTemplate {
    tab: React.ReactElement,
    title: string | number
}

export default function TabTemplate({tabData, children, loading}: {
    loading: boolean,
    tabData: ITabTemplate[],
    children?: React.ReactNode
}) {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Box className="w-full h-full flex flex-col">
            <Box sx={{
                borderBottom: 1,
                borderColor: 'divider',
                backgroundColor: 'white',
                boxShadow: '0px 0.1px 4px rgba(0, 0, 0, 0.4)',
            }} className='flex-none w-full z-30'>
                {children}
                <Tabs className="mt-1" value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
                    {tabData.map((tab, i) => {
                        return <Tab key={i} label={tab.title} {...a11yProps(i)} />
                    })}
                </Tabs>
            </Box>
            <Box className="flex-1 overflow-auto w-full">
                {loading ? <div>
                        Loading...
                    </div> :
                    tabData.map((tab, i) => {
                        return <CustomTabPanel key={i} value={tabIndex} index={i} padding='0px'>
                            {tab.tab}
                        </CustomTabPanel>
                    })
                }
            </Box>
        </Box>
    );
}
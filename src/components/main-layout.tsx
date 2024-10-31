"use client";

import {SimpleTreeView} from '@mui/x-tree-view/SimpleTreeView';
import {TreeItem} from '@mui/x-tree-view/TreeItem';
import {Badge, Button} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import {usePathname} from "next/navigation";
import AccountMenu from "@/components/AccountMenu";
import Tooltip from "@mui/material/Tooltip";

function BasicSimpleTreeView() {
    return (
        <SimpleTreeView>
            <TreeItem itemId="home" label="Home"/>
            <TreeItem itemId="announcement" label="Announcement"/>
            <TreeItem itemId="exam" label="Exam">
                <TreeItem itemId="exam-details" label="Details"/>
                <TreeItem itemId="exam-time-table" label="Time table"/>
                <TreeItem itemId="exam-seating" label="Seating"/>
                <TreeItem itemId="exam-create" label="Create">
                    <TreeItem itemId="exam-create-quick" label="Quick"/>
                    <TreeItem itemId="exam-create-manual" label="Manual"/>
                </TreeItem>
            </TreeItem>
        </SimpleTreeView>
    );
}

export default function MainLayout(props: Readonly<{ children: React.ReactNode; }>) {
    const currentPageName = usePathname().split('/').pop();
    const {children} = props;
    return (
        <main className="flex w-full h-full">
            <nav className="w-[20%] bg-secondary h-full shadow text-white">
                <h1 className="text-3xl text-center my-5">SCRUTINIX</h1>
                <BasicSimpleTreeView/>
            </nav>
            <main className="flex flex-col flex-1 h-full">
                <nav className="w-full h-[100px] bg-primary shadow flex items-center justify-between px-5 gap-10">
                    <h1 className='font-semibold text-3xl text-white capitalize'>{currentPageName ? currentPageName : "Home"}</h1>
                    <div className="flex gap-10">
                        <Tooltip title="Notifications" placement="bottom">
                            <Button>
                                <Badge badgeContent={5} max={9} color="primary">
                                    <NotificationsIcon sx={{fontSize: "32px"}} className="text-white"/>
                                </Badge>
                            </Button>
                        </Tooltip>
                        <AccountMenu/>
                    </div>
                </nav>
                <main className="size-full outline-red-400">
                    {children}
                </main>
            </main>
        </main>
    );

}
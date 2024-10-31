"use client";

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import HistoryIcon from '@mui/icons-material/History';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateExamModal from "@/components/CreateExamModal";
import {useState} from "react";
import {NotificationsProvider} from "@toolpad/core";

function BasicSpeedDial({openCreateExamModal}: { openCreateExamModal: () => void }) {
    return (
        <SpeedDial
            ariaLabel="Quick actions"
            sx={{position: 'absolute', bottom: 16, right: 16}}
            icon={<SpeedDialIcon/>}
        >
            <SpeedDialAction icon={<NoteAddIcon/>} tooltipTitle="Create exams" onClick={openCreateExamModal}/>
            <SpeedDialAction icon={<HistoryIcon/>} tooltipTitle="History"/>

        </SpeedDial>
    );
}

export default function CoordinatorPage() {
    const [open, setOpen] = useState(false);
    return (
        <NotificationsProvider>
            <div>
                <h1 className="text-center text-4xl opacity-30 mt-10">You have no exams :)</h1>
                <BasicSpeedDial openCreateExamModal={() => setOpen(true)}/>
                <CreateExamModal open={open} setOpen={setOpen}/>
            </div>
        </NotificationsProvider>
    );
}
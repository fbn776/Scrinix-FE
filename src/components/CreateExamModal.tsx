import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Autocomplete, FormControl, FormLabel, TextField} from "@mui/material";
import {StateSetter} from "@/lib/types";
import {FileUploadButton} from "@/components/FileUploadButton";
import {useNotifications} from "@toolpad/core";
import apiInstance from "@/lib/api";

const SEMS_LIST: { label: string }[] = [
    {label: "1st Semester"}, {label: "2nd Semester"}, {label: "3rd Semester"},
    {label: "4th Semester"}, {label: "5th Semester"}, {label: "6th Semester"},
    {label: "7th Semester"}, {label: "8th Semester"}
];

function CreateExamForm({setOpen}: { setOpen: StateSetter<boolean> }) {
    const [title, setTitle] = useState('');
    const [scheme, setScheme] = useState<number | null>(null);
    const [semester, setSemester] = useState<string[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState({title: false, scheme: false, startDate: false, endDate: false});
    const [timeTable, setTimeTable] = useState<File | null>(null);
    const [seatingArrangement, setSeatingArrangement] = useState<File | null>(null);
    const notifications = useNotifications();

    const handleClose = () => {
        const confirm = window.confirm("Closing this dialog will discard all changes. Are you sure?");
        if (confirm) setOpen(false);
    };

    const handleCreate = async () => {
        const newErrors = {
            title: title.trim() === '',
            scheme: scheme === null,
            startDate: startDate === '',
            endDate: endDate === '',
        };
        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error)) {
            notifications.show('Fill in the necessary fields', {
                severity: "error",
                autoHideDuration: 3000,
            });
            return;
        }

        console.log("Send")
        await apiInstance.post("/hello");
        console.log("Sent");

        console.log("Create exam with data:", {title, scheme, semester, startDate, endDate, timeTable, seatingArrangement});
    };

    return <form onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
    }}>
        <FormControl className="space-y-4 w-full">
            <TextField
                label="Title"
                placeholder="Title"
                className="w-full"
                required
                error={errors.title}
                helperText={errors.title ? "Title is required" : ""}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <Autocomplete
                options={[{label: 2014}, {label: 2019}, {label: 2024}]}
                getOptionLabel={(option) => option.label.toString()}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Scheme"
                        error={errors.scheme}
                        helperText={errors.scheme ? "Scheme is required" : ""}
                        required
                    />
                )}
                value={scheme ? {label: scheme} : null}
                onChange={(event, newValue) => setScheme(newValue?.label ?? null)}
            />

            <Autocomplete
                multiple
                options={SEMS_LIST}
                renderInput={(params) => <TextField {...params} label="Semester" required/>}
                value={semester.map(item => {
                    return {label: item}
                })}

                onChange={(event, newValue) => setSemester(newValue.map(item => item.label))}
            />

            <div className="flex items-center justify-between">
                <FormLabel>Start Date*</FormLabel>
                <TextField
                    type="date"
                    error={errors.startDate}
                    helperText={errors.startDate ? "Start date is required" : ""}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <div className="flex items-center justify-between">
                <FormLabel>End Date*</FormLabel>
                <TextField
                    type="date"
                    error={errors.endDate}
                    helperText={errors.endDate ? "End date is required" : ""}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            <div className="flex items-center justify-between">
                <FormLabel>Time Table</FormLabel>
                <FileUploadButton file={timeTable} setFile={setTimeTable}/>
            </div>

            <div className="flex items-center justify-between">
                <FormLabel>Seating Arrangement</FormLabel>
                <FileUploadButton file={seatingArrangement} setFile={setSeatingArrangement}/>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleCreate} autoFocus variant="contained">
                    Create
                </Button>
            </div>
        </FormControl>
    </form>
}


export default function AlertDialog({open, setOpen}: {
    open: boolean,
    setOpen: StateSetter<boolean>
}) {
    const handleClose = () => {
        const confirm = window.confirm("Closing this dialog will discard all changes. Are you sure?");
        if (confirm) setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Create Exam</DialogTitle>
            <DialogContent className="w-[400px] text-center">
                <CreateExamForm setOpen={setOpen}/>
            </DialogContent>
        </Dialog>
    );
}

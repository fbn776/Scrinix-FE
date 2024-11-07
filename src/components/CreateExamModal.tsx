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
import {SEMS_LIST} from "@/data/SEMS_LIST";
import {TExamQueryOut} from "@/app/main/coordinator/page";

function CreateExamForm({setOpen, setExam}: { setOpen: StateSetter<boolean>, setExam: StateSetter<TExamQueryOut[]> }) {
    const [title, setTitle] = useState('');
    const [semesters, setSemesters] = useState<string[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState({title: false, startDate: false, endDate: false, semesters: false});
    const [timeTable, setTimeTable] = useState<File | null>(null);
    const [seatingArrangement, setSeatingArrangement] = useState<File | null>(null);
    const notifications = useNotifications();

    const handleClose = () => {
        const confirm = window.confirm("Closing this dialog will discard all changes. Are you sure?");
        if (confirm) setOpen(false);
    };

    const handleCreate = () => {
        const newErrors = {
            title: title.trim() === '',
            startDate: startDate === '',
            endDate: endDate === '',
            semesters: semesters.length === 0 || !semesters.some((val) => (/^S[0-8] - \d{4}$/.test(val)))
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error)) {
            notifications.show('Fill in the necessary fields', {
                severity: "error",
                autoHideDuration: 3000,
            });
            return;
        }

        const formData = new FormData();
        formData.append('clgID', 'KTE');
        formData.append('title', title);
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);
        /**
         * Since we are sending the data to backend as a FormData, we can't send it directly as an array.
         * So joining it using # and then the backend splits it back to an array
         */
        formData.append('sem_scheme', semesters.join('#'));
        if (timeTable) formData.append('timetable', timeTable);
        if (seatingArrangement) formData.append('seating', seatingArrangement);

        console.log(formData.get('clgID'));

        apiInstance.post("/coordinator/exam", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res) => {

            notifications.show('Exam created successfully', {
                severity: "success",
                autoHideDuration: 3000,
            });

            const sem_scheme = res.data.data.sem_scheme
                .map(
                    (item: string) => {
                        const split = item.split('-');
                        return `${split[0].trim().substring(1)}-${split[1].trim()}`;
                    }
                ).join(' ');

            const resultObj = {
                ...res.data.data,
                sem_scheme
            };

            console.log("Result object: ", resultObj);

            setExam(prev => [resultObj, ...prev]);
            setOpen(false);
        }).catch((err: unknown) => {
            console.error(err);
            // TODO Better error handling
            notifications.show('Cannot create exam, an error happened', {
                severity: "error",
                autoHideDuration: 3000,
            });
        });
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
                multiple
                options={SEMS_LIST.filter((val) => !semesters.includes(val.label))}
                renderInput={(params) =>
                    <TextField {...params}
                               label="Semester"
                               error={errors.semesters}
                               helperText={errors.semesters ? "Semesters is required" : ""}
                               required
                    />
                }
                value={semesters.map(item => {
                    return {label: item}
                })}

                onChange={(event, newValue) => {
                    setSemesters(newValue.map(item => item.label))
                }}
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


export default function CreateExamModal({open, setOpen, setExam}: {
    open: boolean,
    setOpen: StateSetter<boolean>,
    setExam: StateSetter<TExamQueryOut[]>
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
            <DialogContent className="w-[500px] text-center">
                <CreateExamForm setOpen={setOpen} setExam={setExam}/>
            </DialogContent>
        </Dialog>
    );
}

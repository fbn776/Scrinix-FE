import Button from '@mui/material/Button';
import {StateSetter} from "@/lib/types";
import FacultyNameAutocomplete, {IFaculty} from "@/components/FacultySearch";
import {TextField} from "@mui/material";
import {TExamQueryOut} from "@/app/main/[clgid]/coordinator/page";
import DialogBox from "@/components/DialogBox";
import {FormEvent} from "react";


export default function AssignFacultyDialog(
    {open, setOpen, setSelectedFaculty, data, onSubmit}: {
        open: boolean,
        setOpen: StateSetter<boolean>,
        setSelectedFaculty: StateSetter<IFaculty | null>,
        data: { clgid: string },
        onSubmit: (e: FormEvent<HTMLFormElement>) => void
    }) {

    const handleClose = () => {
        const confirm = window.confirm("Closing this dialog will discard all changes. Are you sure?");
        if (confirm) {
            setOpen(false);
            setSelectedFaculty(null);
        }
    };

    return (
        <DialogBox open={open} title="Assign Faculty" howToClose={handleClose}>
            <form className="text-left" onSubmit={(e) => {
                e.preventDefault();
                onSubmit(e);
            }}>
                <FacultyNameAutocomplete clgid={data.clgid} setSelectedFaculty={setSelectedFaculty}/>
                <div className="flex items-center justify-between mt-5">
                    <label htmlFor="due_date">Due Date <span className="text-red-400">*</span></label>
                    <TextField type="datetime-local" name="due_date" required/>
                </div>

                <div className='mt-8 flex justify-end gap-2'>
                    <Button onClick={handleClose}>Close</Button>
                    <Button type="submit" autoFocus variant="contained">
                        Assign
                    </Button>
                </div>
            </form>
        </DialogBox>
    )
}
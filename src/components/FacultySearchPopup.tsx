import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {StateSetter} from "@/lib/types";
import Dialog from "@mui/material/Dialog";
import FacultyNameAutocomplete, {IFaculty} from "@/components/FacultySearch";

function CreateExamForm({setOpen}: { setOpen: StateSetter<boolean> }) {


}


export default function FacultySearchPopup({open, setOpen, setSelectedFaculty}: {
    open: boolean,
    setOpen: StateSetter<boolean>,
    setSelectedFaculty: StateSetter<IFaculty | null>
}) {
    const handleClose = () => {
        const confirm = window.confirm("Closing this dialog will discard all changes. Are you sure?");
        if (confirm) {
            setOpen(false);
            setSelectedFaculty(null);
        }
    };

    const handleCreate = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Assign Faculty</DialogTitle>
            <DialogContent className="w-[500px] text-center">
                <div className="flex flex-col pt-4">
                    <FacultyNameAutocomplete setSelectedFaculty={setSelectedFaculty}/>
                    <div className='mt-4 flex justify-end gap-2'>
                        <Button onClick={handleClose}>Close</Button>
                        <Button onClick={handleCreate} autoFocus variant="contained">
                            Assign
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

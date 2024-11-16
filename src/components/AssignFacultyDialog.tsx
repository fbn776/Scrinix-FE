import Button from '@mui/material/Button';
import {StateSetter, TUseNotifications} from "@/lib/types";
import FacultyNameAutocomplete, {IFaculty} from "@/components/FacultySearch";
import {TextField} from "@mui/material";
import apiInstance from "@/lib/api";
import {useNotifications} from "@toolpad/core";
import {TExamQueryOut} from "@/app/main/[clgid]/coordinator/page";
import {ISubject} from "@/components/exams/ExamTabs";
import DialogBox from "@/components/DialogBox";

function handleSubmission(selectedFaculty: IFaculty | null, notify: TUseNotifications, e: React.FormEvent<HTMLFormElement>, data: TExamQueryOut, subject: ISubject, setSubjects: (value: (((prevState: ISubject[]) => ISubject[]) | ISubject[])) => void, setOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void) {
    if (!window.confirm('Are you sure you want to assign this faculty?'))
        return;

    if (!selectedFaculty) {
        notify.show('Please select a faculty', {severity: 'error', autoHideDuration: 1000});
        return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const dueDate = formData.get('due_date') as string;

    apiInstance.post('/coordinator/assign-faculty', {
        f_id: selectedFaculty?.f_id,
        e_id: data.e_id,
        clgID: data.clgid,
        course_id: subject.course_id,
        scheme: subject.scheme,
        due_date: new Date(dueDate).toISOString(),
    }).then((res) => {
        // Remove the  selected subject from the list
        setSubjects((prev) => prev.filter((e) => {
            return e.course_id !== subject.course_id;
        }));

        notify.show('Faculty assigned successfully', {severity: 'success', autoHideDuration: 1000});
        console.log(res.data);
    }).catch(e => {
        console.error(e);
    }).finally(() => {
        setOpen(false);
    });
}

export default function AssignFacultyDialog(
    {open, setOpen, setSelectedFaculty, selectedFaculty, data, subject, setSubjects}: {
        open: boolean,
        setOpen: StateSetter<boolean>,
        setSelectedFaculty: StateSetter<IFaculty | null>,
        selectedFaculty: IFaculty | null,
        data: TExamQueryOut,
        subject: ISubject,
        setSubjects: StateSetter<ISubject[]>
    }) {

    const notify = useNotifications();

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

                handleSubmission(selectedFaculty, notify, e, data, subject, setSubjects, setOpen);
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
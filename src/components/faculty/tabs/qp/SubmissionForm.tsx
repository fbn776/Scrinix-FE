import {useState} from "react";
import {CircularProgress} from "@mui/material";
import apiInstance from "@/lib/api";
import {useNotifications} from "@toolpad/core";
import {StateSetter} from "@/lib/types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {FileUploadButton} from "@/components/FileUploadButton";
import Button from "@mui/material/Button";
import {IFacultyQPQueryOut} from "@/components/faculty/tabs/qp/QpTab";
import downloadFile from "@/lib/downloadFile";
import {useRouter} from "next/navigation";


function FileUploadForm({open, setOpen, data, setLoading}: {
    open: boolean,
    setOpen: StateSetter<boolean>,
    data: IFacultyQPQueryOut,
    setLoading: StateSetter<boolean>
}) {
    const [file, setFile] = useState<File | null>(null);
    const notify = useNotifications();
    const router = useRouter();
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
            <DialogTitle>Upload Question Paper</DialogTitle>
            <DialogContent className="w-[500px] text-center">
                <form className="text-left" onSubmit={(e) => {
                    e.preventDefault();
                    if (!file) return;

                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('clgid', data.clgid);
                    formData.append('e_id', `${data.e_id}`);
                    formData.append('scheme', `${data.scheme}`);
                    formData.append('course_id', data.course_id);

                    apiInstance.post(`/exams/qp/upload`, formData).then(() => {
                        notify.show('Upload successful', {
                            severity: "success", autoHideDuration: 1000
                        });
                        setOpen(false);

                        router.refresh();
                    }).catch(e => {
                        console.error(e);
                        notify.show('Upload failed', {
                            severity: "error", autoHideDuration: 1000
                        });
                    }).finally(() => {
                        setLoading(false);
                    });
                }}>
                    <div className="flex justify-between items-center mt-5 mb-10">
                        <label>
                            Upload Question Paper
                        </label>
                        <FileUploadButton file={file} setFile={setFile}/>
                    </div>
                    <div className="text-center"><Button type="submit" variant="contained">Upload</Button></div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function SubmissionForm({data}: {
    data: IFacultyQPQueryOut,
}) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <>
            {loading && <div className="absolute bg-black bg-opacity-40 z-30 inset-0 flex items-center justify-center">
                <CircularProgress/></div>}

            {data.file_id ? <Button variant="contained" onClick={() => downloadFile(data.file_id!)}>Download</Button> :
                <Button variant='contained' onClick={() => setOpen(true)}>Upload</Button>
            }

            <FileUploadForm data={data} open={open} setOpen={setOpen} setLoading={setLoading}/>
        </>
    );
}
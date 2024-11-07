import {TExamQueryOut} from "@/app/main/coordinator/page";
import downloadFile from "@/lib/downloadFile";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import {CircularProgress} from "@mui/material";
import apiInstance from "@/lib/api";
import {useNotifications} from "@toolpad/core";
import {StateSetter} from "@/lib/types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {FileUploadButton} from "@/components/FileUploadButton";
import Button from "@mui/material/Button";
import FileUploadIcon from '@mui/icons-material/FileUpload';

type TOpen = "seating" | "time" | null;

function FileUploadForm({open, setOpen, data, setLoading}: {
    open: TOpen,
    setOpen: StateSetter<TOpen>,
    data: TExamQueryOut,
    setLoading: StateSetter<boolean>
}) {
    const [file, setFile] = useState<File | null>(null);
    const notify = useNotifications();

    const handleClose = () => {
        const confirm = window.confirm("Closing this dialog will discard all changes. Are you sure?");
        if (confirm) setOpen(null);
    };

    return (
        <Dialog
            open={open !== null}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Upload {open === 'seating' ? 'Seating Arrangement' : 'Time Table'}</DialogTitle>
            <DialogContent className="w-[500px] text-center">
                <form className="text-left" onSubmit={(e) => {
                    e.preventDefault();
                    if (!file) return;

                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('e_id', data.e_id);
                    formData.append('clgid', data.clgid);

                    apiInstance.post(`/exams/upload/${open === 'time' ? 'timetable' : 'seating'}`, formData).then(() => {
                        notify.show('Upload successful', {
                            severity: "success", autoHideDuration: 1000
                        });
                        setOpen(null);
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
                            Upload {open === 'seating' ? 'Seating Arrangement' : 'Time Table'}
                        </label>
                        <FileUploadButton file={file} setFile={setFile}/>
                    </div>
                    <div className="text-center"><Button type="submit" variant="contained">Upload</Button></div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function ExamUploadTab({data, setData}: { data: TExamQueryOut , setData: StateSetter<TExamQueryOut>}) {
    const [loading, setLoading] = useState(false);
    const notify = useNotifications();
    const [open, setOpen] = useState<"seating" | "time" | null>(null);

    return (
        <div className="bg-white m-4 p-4 rounded-md relative overflow-hidden">
            {loading && <div className="absolute bg-black bg-opacity-40 z-30 inset-0 flex items-center justify-center">
                <CircularProgress/></div>}
            <h1 className="text-2xl mb-5">Timetable and Seating</h1>

            <div className="w-full flex justify-between items-center mt-5">
                <div>
                    <h2 className="text-xl">Seating Arrangement</h2>
                    <p className='text-gray-600'>View or upload seating arrangement</p>
                </div>
                {data.seating_arrangement ?
                    <div className="space-x-4">
                        <IconButton onClick={(e) => {
                            e.preventDefault();
                            downloadFile(data.seating_arrangement!)
                        }}
                        >
                            <DownloadIcon className="text-blue-500"/>
                        </IconButton>
                        <IconButton onClick={() => {
                            if (!window.confirm('Are you sure you want to delete seating arrangement?'))
                                return;
                            setLoading(true);

                            apiInstance.delete(`/exams/delete/seating/${data.clgid}/${data.e_id}`).then(() => {
                                notify.show('Seating Arrangement deleted successfully', {
                                    severity: "success", autoHideDuration: 1000
                                });
                                setData(prev => {
                                    return {
                                        ...prev,
                                        seating_arrangement: null
                                    }
                                });
                            }).catch(e => {
                                console.error(e);
                                notify.show('Deletion failed', {
                                    severity: "error", autoHideDuration: 1000
                                });
                            }).finally(() => {
                                setLoading(false);
                            });
                        }}>
                            <DeleteIcon className="text-red-500"/>
                        </IconButton>
                    </div> :
                    <IconButton onClick={() => setOpen('seating')}><FileUploadIcon/></IconButton>}
            </div>
            <div className="w-full flex justify-between items-center mt-5">
                <div>
                    <h2 className="text-xl">Time table</h2>
                    <p className='text-gray-600'>View or upload time table</p>
                </div>
                {data.time_table ?
                    <div className="space-x-4">
                        <IconButton onClick={(e) => {
                            e.preventDefault();
                            downloadFile(data.time_table!)
                        }}
                        >
                            <DownloadIcon className="text-blue-500"/>
                        </IconButton>
                        <IconButton onClick={() => {
                            if (!window.confirm('Are you sure you want to delete time table?'))
                                return;

                            setLoading(true);

                            apiInstance.delete(`/exams/delete/timetable/${data.clgid}/${data.e_id}`).then(() => {
                                notify.show('Timetable deleted successfully', {
                                    severity: "success", autoHideDuration: 1000
                                });

                                setData(prev => {
                                    return {
                                        ...prev,
                                        time_table: null
                                    }
                                });
                            }).catch(e => {
                                console.error(e);
                                notify.show('Deletion failed', {
                                    severity: "error", autoHideDuration: 1000
                                });
                            }).finally(() => {
                                setLoading(false);
                            });
                        }}>
                            <DeleteIcon className="text-red-500"/>
                        </IconButton>
                    </div> :
                    <IconButton onClick={() => setOpen('time')}><FileUploadIcon/></IconButton>}
            </div>

            <FileUploadForm data={data} open={open} setOpen={setOpen} setLoading={setLoading}/>
        </div>
    )
        ;
}

/*
 <div className="flex items-center flex-col">
                            {data.seating_arrangement &&
                                <Button variant="outlined" onClick={(e) => {
                                    e.preventDefault();
                                    downloadFile(data.seating_arrangement!)
                                }}
                                >
                                    Download Seating
                                </Button>}
                            {data.time_table &&
                                <Button variant="outlined"
                                        onClick={(e) => {
                                            e.preventDefault();

                                            downloadFile(data.time_table!)
                                        }}
                                >
                                    Download Time Table
                                </Button>}
                        </div>
 */
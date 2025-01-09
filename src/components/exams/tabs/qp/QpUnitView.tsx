import {IQuestionPaper} from "@/components/exams/tabs/qp/QuestionPaperTab";
import {Chip, CircularProgress} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PhoneIcon from '@mui/icons-material/Phone'
import PersonIcon from '@mui/icons-material/Person'
import "./style.css"
import {formatDateToDDMMYYYYHHMM, timeAgo} from "@/lib/utils";
import Button from "@mui/material/Button";
import downloadFile from "@/lib/downloadFile";
import AssignFacultyDialog from "@/components/AssignFacultyDialog";
import {useState} from "react";
import {IFaculty} from "@/components/FacultySearch";
import apiInstance from "@/lib/api";
import {useNotifications} from "@toolpad/core";
import {StateSetter} from "@/lib/types";

const getStatusColor = (status: IQuestionPaper["status"]) => {
    switch (status) {
        case "pending":
            return "bg-red-500 text-white"
        case "success":
            return "bg-green-500"
        case "under scrutiny":
            return "bg-yellow-500"
        case "scrutinized":
            return "bg-purple-500"
        case "submitted":
            return "bg-blue-500"
        default:
            return "bg-gray-500"
    }
}

export default function QpUnitView({data, setQpArr}: { data: IQuestionPaper, setQpArr: StateSetter<IQuestionPaper[]> }) {
    const [open, setOpen] = useState(false);
    const [selectFaculty, setSelectFaculty] = useState<IFaculty | null>(null);
    const notify = useNotifications();
    const [loading, setLoading] = useState(false);

    return <div className="w-full bg-white rounded-md p-4 flex justify-between relative overflow-hidden">
        {loading &&
            <div className="absolute inset-0 size-full flex items-center justify-center bg-black bg-opacity-80 z-50">
                <CircularProgress/>
            </div>
        }

        <div>
            <h1 className='text-2xl'>{data.course_name}</h1>
            <span>
                {formatDateToDDMMYYYYHHMM(data.qp_created_at)} ({timeAgo(data.qp_created_at)})
            </span>
            <div className="mt-3 space-x-2">
                <Chip label={data.course_id}/>
                <Chip label={`S${data.semester} - ${data.scheme}`}/>
                <Chip label={data.clgid}/>
            </div>
            <div className="mt-5 space-y-2 px-2 ">
                <div className="flex items-center space-x-3">
                    <PersonIcon className="qp-icon"/>
                    <span>{data.faculty_name} (<span className="text-gray-400">#</span>{data.f_id})</span>
                </div>
                <div className="flex divide-x-2 text-blue-800">
                    <div className="flex items-center gap-3 mr-3">
                        <EmailIcon className="qp-icon"/>
                        <a href={`mailto:${data.faculty_email}`}>{data.faculty_email}</a>
                    </div>
                    <div className="flex items-center gap-3 pl-3">
                        <PhoneIcon className="qp-icon"/>
                        <a href={`tel:${data.faculty_phone}`}>{data.faculty_phone}</a>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <CalendarTodayIcon className="qp-icon"/>
                    <span>Due: {formatDateToDDMMYYYYHHMM(data.qp_due_date)}</span>
                </div>
                {data.qp_submitted_date && (
                    <div className="flex items-center space-x-3">
                        <CalendarTodayIcon className="qp-icon"/>
                        <span>Submitted: {new Date(data.qp_submitted_date).toLocaleDateString()}</span>
                    </div>
                )}
            </div>
        </div>
        <div className="flex flex-col justify-between items-end">
            <span
                className={`${getStatusColor(data.status)} w-fit rounded-full px-3 py-1 h-fit flex items-center`}>{data.status}</span>

            <div>
                <div className="space-x-4">
                    {data.status === 'submitted' &&
                        <Button variant='contained' onClick={() => {
                            setOpen(true)
                        }} disabled={loading}>
                            Scrutinize
                        </Button>
                    }
                    {data.file_id &&
                        <Button onClick={() => downloadFile(data.file_id!)} variant="contained" color="primary"
                                className="mt-3"
                        >
                            Download
                        </Button>
                    }
                </div>
            </div>
        </div>

        <AssignFacultyDialog
            data={data}
            open={open}
            setOpen={setOpen}
            setSelectedFaculty={setSelectFaculty}

            onSubmit={(e) => {
                setLoading(true);

                const formData = new FormData(e.target as HTMLFormElement);
                const dueDate = formData.get('due_date') as string;

                console.log(data);

                apiInstance.post('/coordinator/scrutiny/assign-faculty', {
                    f_id: selectFaculty?.f_id,
                    clg_id: data.clgid,
                    course_id: data.course_id,
                    scheme: data.scheme,
                    exam_id: data.e_id,
                    due_date: new Date(dueDate).toISOString(),
                }).then((res) => {
                    console.log(res.data);
                    notify.show('Faculty assigned successfully', {severity: 'success', autoHideDuration: 1000});
                    setOpen(false);
                    setQpArr((prev) => prev.filter((e) => e.course_id !== data.course_id));
                }).catch(e => {
                    console.error(e);
                    notify.show('Error assigning faculty', {severity: 'error', autoHideDuration: 1000});
                }).finally(() => {
                    setLoading(false);
                });
            }}
        />
    </div>
}
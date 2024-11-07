import {IQuestionPaper} from "@/components/exams/tabs/qp/QuestionPaperTab";
import {Chip} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PhoneIcon from '@mui/icons-material/Phone'
import PersonIcon from '@mui/icons-material/Person'
import "./style.css"
import {formatDateToDDMMYYYYHHMM, timeAgo} from "@/lib/utils";

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

export default function QpUnitView({data}: { data: IQuestionPaper }) {
    return <div className="w-full bg-white rounded-md p-4 flex justify-between">
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
        <span
            className={`${getStatusColor(data.status)} rounded-full px-3 py-1 h-fit flex items-center`}>{data.status}</span>
    </div>
}
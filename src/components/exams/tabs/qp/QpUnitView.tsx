import {IQuestionPaper} from "@/components/exams/tabs/qp/QuestionPaperTab";
import {Chip} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import DescriptionIcon from '@mui/icons-material/Description'
import PhoneIcon from '@mui/icons-material/Phone'
import SchoolIcon from '@mui/icons-material/School'
import PersonIcon from '@mui/icons-material/Person'
import "./style.css"

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
            <div className="mt-3 space-x-2">
                <Chip label={data.course_id}/>
                <Chip label={`S${data.semester} - ${data.scheme}`}/>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 px-2">
                <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                        <SchoolIcon className="qp-icon"/>
                        <span>College ID: {data.clgid}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <PersonIcon className="qp-icon"/>
                        <span>Faculty: <b>{data.faculty_name}</b></span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <EmailIcon className="qp-icon"/>
                        <a href={`mailto:${data.faculty_email}`}>Email: {data.faculty_email}</a>
                    </div>
                    <div className="flex items-center space-x-3">
                        <PhoneIcon className="qp-icon"/>
                        <a href={`tel:${data.faculty_phone}`}>Phone: {data.faculty_phone}</a>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                        <CalendarTodayIcon className="qp-icon"/>
                        <span>Created: {new Date(data.qp_created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <CalendarTodayIcon className="qp-icon"/>
                        <span>Due: {new Date(data.qp_due_date).toLocaleDateString()}</span>
                    </div>
                    {data.qp_submitted_date && (
                        <div className="flex items-center space-x-3">
                            <CalendarTodayIcon className="qp-icon"/>
                            <span>Submitted: {new Date(data.qp_submitted_date).toLocaleDateString()}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
        <span
            className={`${getStatusColor(data.status)} rounded-full px-3 py-1 h-fit flex items-center`}>{data.status}</span>
    </div>
}
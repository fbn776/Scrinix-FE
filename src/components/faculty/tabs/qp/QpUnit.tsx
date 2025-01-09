import {IQuestionPaper} from "@/components/exams/tabs/qp/QuestionPaperTab";
import {Chip} from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import {formatDateToDDMMYYYY, formatDateToDDMMYYYYHHMM, getLargestTimeDifference, timeAgo} from "@/lib/utils";
import {IFacultyQPQueryOut} from "@/components/faculty/tabs/qp/QpTab";
import SubmissionForm from "@/components/faculty/tabs/qp/SubmissionForm";

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

export default function QpUnit({data}: {
    data: IFacultyQPQueryOut
}) {
    return <div className="w-full bg-white rounded-md p-4  flex flex-col">
        <div className="flex justify-between">
            <div>
                <h1 className='text-2xl'>{data.course_name} ({timeAgo(data.qp_created_at)})</h1>
                <h2 className=" mt-1">{data.exam_title} ({formatDateToDDMMYYYY(data.exam_start_date)} to {formatDateToDDMMYYYY(data.exam_end_date)})</h2>
                <div className="mt-3 space-x-2">
                    <Chip label={data.course_id}/>
                    <Chip label={`S${data.semester} - ${data.scheme}`}/>
                    <Chip label={data.clgid}/>
                </div>
                <div className="mt-5 space-y-2 px-2 ">
                    <div className="flex items-center space-x-3">
                        <CalendarTodayIcon className="qp-icon"/>
                        <span>Due Date: {formatDateToDDMMYYYYHHMM(data.qp_due_date)} ({getLargestTimeDifference(new Date(data.qp_due_date), new Date())} to submission)</span>
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
        <div className="text-right mt-5">
            <SubmissionForm data={data}/>
        </div>
    </div>
}
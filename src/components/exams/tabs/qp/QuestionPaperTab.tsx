import {TExamQueryOut} from "@/app/main/[clgid]/coordinator/page";
import QpUnitView from "@/components/exams/tabs/qp/QpUnitView";
import {StateSetter} from "@/lib/types";

/** Interface for Question Paper returned from POST `/exams/get-qp`*/
export interface IQuestionPaper {
    clgid: string;
    course_id: string;
    course_name: string;
    /** Exam ID */
    e_id: number;
    /** Faculty ID */
    f_id: string;
    faculty_email: string;
    faculty_name: string;
    faculty_phone: string;
    /** Question Paper file ID (lookup in File table) */
    file_id: number | null;
    qp_created_at: string;
    qp_due_date: string;
    qp_submitted_date: string | null;
    scheme: number;
    semester: number;
    status: 'pending' | 'success' | 'under scrutiny' | 'scrutinized' | 'submitted'
}

export default function QuestionPaperTab({data, qpArr, setQpArr}: {
    data: TExamQueryOut,
    qpArr: IQuestionPaper[],
    setQpArr: StateSetter<IQuestionPaper[]>
}) {
    console.log(qpArr);

    return <>
        {qpArr.length === 0 ?
            <h1 className="text-2xl pt-20 text-center opacity-50">No question paper assigned :(</h1> :
            <div className="space-y-3 mx-4 my-4">
                {qpArr.map((item: IQuestionPaper, i: number) => {
                    return <QpUnitView key={i} data={item} setQpArr={setQpArr}/>
                })}
            </div>
        }
    </>


}
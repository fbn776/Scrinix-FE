import {TExamQueryOut} from "@/app/main/[clgid]/coordinator/page";
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import apiInstance from "@/lib/api";
import QpUnitView from "@/components/exams/tabs/qp/QpUnitView";

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

export default function QuestionPaperTab({data}: {
    data: TExamQueryOut
}) {
    const [qpArr, setQpArr] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        apiInstance.post('/exams/get-qp', {
            e_id: data.e_id,
            clgid: data.clgid
        }).then((res) => {
            console.log(res.data.data);
            setQpArr(res.data.data);
        }).catch((e) => {
            console.error(e);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [data.clgid, data.e_id]);


    return <>
        {isLoading ?
            <h1 className="text-center p-5"><CircularProgress/></h1> :
            qpArr.length === 0 ?
                <h1 className="text-2xl pt-20 text-center opacity-50">No question paper assigned :(</h1> :
                <div className="space-y-3 mx-4 my-4">
                    {qpArr.map((item: IQuestionPaper, i: number) => {
                        return <QpUnitView key={i} data={item}/>
                    })}
                </div>
        }
    </>


}
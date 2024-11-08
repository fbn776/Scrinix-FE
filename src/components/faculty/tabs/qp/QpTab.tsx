import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import apiInstance from "@/lib/api";
import {TFacultyQueryOut} from "@/app/main/[clgid]/faculty/[f_id]/page";
import {IQuestionPaper} from "@/components/exams/tabs/qp/QuestionPaperTab";
import QpUnit from "@/components/faculty/tabs/qp/QpUnit";

export interface IFacultyQPQueryOut extends IQuestionPaper {
    exam_created_at: string;
    exam_end_date: string;
    exam_start_date: string
    exam_title: string
    seating_arrangement: number | null;
    time_table: number | null;
}

export default function QpTab({data}: {
    data: TFacultyQueryOut
}) {
    const [qpArr, setQpArr] = useState<IFacultyQPQueryOut[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        apiInstance.post('/staff/available-qp', {
            clgid: data.clgid,
            f_id: data.f_id
        }).then((res) => {
            console.log(res.data.data);
            setQpArr(res.data.data);
        }).catch((e) => {
            console.error(e);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [data.clgid, data.f_id]);


    return <>
        {isLoading ?
            <h1 className="text-center p-5"><CircularProgress/></h1> :
            qpArr.length === 0 ?
                <h1 className="text-2xl pt-20 text-center opacity-50">No question paper assigned :(</h1> :
                <div className="space-y-3 mx-4 my-4">
                    {qpArr.map((item, i: number) => {
                        return <QpUnit key={i} data={item}/>
                    })}
                </div>
        }
    </>


}
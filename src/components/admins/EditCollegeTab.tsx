import {useEffect, useState} from "react";
import apiInstance from "@/lib/api";
import {CircularProgress} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditCollegeDialog from "@/components/admins/InputPopUp";
import {useNotifications} from "@toolpad/core";

interface ICollege {
    id: string;
    name: string;
}

export type TEditOpen = {status: boolean, id: string | null}

export default function EditCollegeTab() {
    const [colleges, setColleges] = useState<ICollege[]>([]);
    const [loading, setLoading] = useState(false);
    const [editOpen, setEditOpen] = useState<TEditOpen>({status: false, id: null});
    const notify = useNotifications();

    useEffect(() => {
        setLoading(true);
        apiInstance.get('/admin/root/colleges').then((res) => {
            setColleges(res.data);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className="flex flex-col gap-4">
            {loading ? <CircularProgress/> : colleges.map((college, i) => {
                console.log(college);
                return <div className='bg-white p-3 rounded-md shadow flex items-center justify-between' key={i}>
                    <div>
                        <h2 className='text-xl flex items-center gap-2'>
                            {college.name}
                            <IconButton onClick={() => {
                                setEditOpen({status: true, id: college.id});
                            }}><EditIcon sx={{fontSize: '20px'}}/></IconButton>
                        </h2>
                        <h3><span className="opacity-50 font-bold">#</span>{college.id}</h3>
                    </div>
                    <IconButton onClick={() => {
                        apiInstance.delete(`/admin/root/delete-college/${college.id}`).then(() => {
                            const updated = colleges.filter((c) => c.id !== college.id);
                            setColleges(updated);
                            notify.show('College deleted successfully', {
                                severity: 'success'
                            });
                        }).catch((err) => {
                            console.error(err);
                            notify.show('Cannot delete college', {
                                severity: 'error'
                            });
                        });
                    }}><DeleteIcon sx={{color: "rgb(240, 0, 0)"}}/></IconButton>
                </div>
            })}

            <EditCollegeDialog onUpdate={(id: string, name: string) => {
                const newColleges = colleges.map((college) => {
                    if (college.id === id) {
                        return {...college, name: name};
                    }
                    return college;
                });
                setColleges(newColleges);
            }} editOpen={editOpen} handleClose={() => setEditOpen({status: false, id: null})}/>
        </div>
    )
}
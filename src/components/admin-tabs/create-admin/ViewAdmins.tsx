import {useEffect, useState} from "react";
import apiInstance from "@/lib/api";
import {timeAgo} from "@/lib/utils";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {useNotifications} from "@toolpad/core";
import {StateSetter} from "@/lib/types";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import {CircularProgress} from "@mui/material";

export interface ICollegeAdmin {
    clgid: string;
    created_at: string;
    username: string
}

function AdminUnit(props: {
    admin: ICollegeAdmin,
    notify: ReturnType<typeof useNotifications>,
    setAdmins: StateSetter<ICollegeAdmin[]>
}) {
    const [loading, setLoading] = useState(false);

    return <div className="border-2 border-gray-500 border-opacity-50 p-3 rounded-md flex items-center justify-between">
        <div>
            <h2 className="text-[24px]">{props.admin.username}</h2>
            <span className="text-sm mt-2">College ID: {props.admin.clgid}</span><br/>
            <span className="text-sm opacity-70">{timeAgo(props.admin.created_at)}</span>
        </div>

        <IconButton onClick={() => {
            const confirm = window.confirm('Are you sure you want to delete this admin?');
            if (!confirm) return;

            apiInstance.delete(`/admin/root/delete-admin/${props.admin.clgid}/${props.admin.username}`).then(() => {
                props.notify.show('Admin deleted successfully', {
                    severity: 'success', autoHideDuration: 1000
                });
                props.setAdmins((prev) => {
                    return prev.filter((admin) => {
                        return !((admin.username === props.admin.username) && (admin.clgid === props.admin.clgid));
                    });
                });
            }).catch(e => {
                console.error(e);
                props.notify.show('Cannot delete admin', {
                    severity: 'error', autoHideDuration: 1000
                });
            }).finally(() => {
                setLoading(false);
            });
        }}
                    disabled={loading}
        >
            {loading ? <HourglassBottomIcon/> :
                <DeleteIcon className="text-red-500"/>
            }
        </IconButton>
    </div>;
}

export default function ViewAdmins({admins, setAdmins}: { admins: ICollegeAdmin[], setAdmins: StateSetter<ICollegeAdmin[]> }) {
    const [loading, setLoading] = useState(false);
    const notify = useNotifications();

    useEffect(() => {
        setLoading(true);
        apiInstance.get('/admin/root/get-college-admins').then((res) => {
            console.log(res.data.data);
            setAdmins(res.data.data);
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            setLoading(false);
        });
    }, []);


    return <div className="mt-4 p-4 bg-white rounded-md">
        <h1 className='text-2xl'>College Admins</h1>

        {loading ? <CircularProgress/> :
            admins.length === 0 ? <h2 className="text-center my-5 text-xl opacity-50">No admins found</h2> :
                <div className="mt-4 space-y-4">
                    {admins.map((admin, i) => {
                        return <AdminUnit key={i} admin={admin} notify={notify} setAdmins={setAdmins}/>
                    })}
                </div>
        }
    </div>
}
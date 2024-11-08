import apiInstance from "@/lib/api";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useNotifications} from "@toolpad/core";
import {TextField} from "@mui/material";

export default function CreateFacultyTab() {
    const [loading, setLoading] = useState(false);
    const notifications = useNotifications();

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);

            const clgID = formData.get('clgID') as string;
            const clgName = formData.get('clgName') as string;
            setLoading(true);
            apiInstance.post('/admin/root/create-college', {
                name: clgName,
                clgID
            }).then((res) => {
                console.log(res.data);
                notifications.show('College created successfully', {
                    severity: "success",
                    autoHideDuration: 1000,
                });
            }).catch((err) => {
                console.error(err)
                notifications.show('Cannot create college, already exists', {
                    autoHideDuration: 1000,
                    severity: "error"
                });
            }).finally(() => {
                setLoading(false);
            });
        }} className='bg-white p-4 rounded-md'>
            <div className="mb-4 flex flex-col gap-2 ">
                <label htmlFor="clgID">College ID<span className="text-red-500">*</span></label>
                <TextField type="text" name="clgID" placeholder="Enter college ID" required/>
            </div>
            <div className="mb-4 flex flex-col gap-2 ">
                <label htmlFor="facultyID">Faculty ID<span className="text-red-500">*</span></label>
                <TextField type="text" name="facultyID" placeholder="Enter faculty ID" required/>
            </div>
            <div className="mb-4 flex flex-col gap-2 ">
                <label htmlFor="facultyName">Faculty Name<span className="text-red-500">*</span></label>
                <TextField type="text" name="facultyName" placeholder="Enter faculty name" required/>
            </div>
            <div className="mb-4 flex flex-col gap-2 ">
                <label htmlFor="email">Email ID<span className="text-red-500">*</span></label>
                <TextField type="text" name="email" placeholder="Enter email id" required/>
            </div>
            <div className="mb-4 flex flex-col gap-2 ">
                <label htmlFor="mobile">Mobile No<span className="text-red-500">*</span></label>
                <TextField type="text" name="mobile" placeholder="Enter mobile no" required/>
            </div>
            <Button variant="contained" type="submit" disabled={loading}>
                Create Faculty
            </Button>
        </form>
    )
}
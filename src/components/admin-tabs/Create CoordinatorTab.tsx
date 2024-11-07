import apiInstance from "@/lib/api";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useNotifications} from "@toolpad/core";
import {TextField} from "@mui/material";

export default function CreateCoordinatorTab() {
    const [loading, setLoading] = useState(false);
    const notifications = useNotifications();

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);

            const facultyID = formData.get('facultyID') as string;
            const facultyName = formData.get('facultyName') as string;
            setLoading(true);
            apiInstance.post('/admin/root/create-college', {
                name: facultyName,
                facultyID
            }).then((res) => {
                console.log(res.data);
                notifications.show('Assigned Coordinator successfully', {
                    severity: "success",
                    autoHideDuration: 3000,
                });
            }).catch((err) => {
                console.error(err)
                notifications.show('Cannot Assigned Coordinator, faculty doesnot exists', {
                    autoHideDuration: 3000,
                    severity: "error"
                });
            }).finally(() => {
                setLoading(false);
            });
        }} className='bg-white p-4 rounded-md'>
            <div className="mb-4 flex flex-col gap-2 ">
                <label htmlFor="facultyID">Faculty ID<span className="text-red-500">*</span></label>
                <TextField type="text" name="facultyID" placeholder="Enter Faculty ID" required/>
            </div>
            <div className="mb-4 flex flex-col gap-2 ">
                <label htmlFor="collegeID">College ID<span className="text-red-500">*</span></label>
                <TextField type="text" name="collegeID" placeholder="Enter College ID" required/>
            </div>
            <div className="mb-4 flex flex-col gap-2 ">
                <label htmlFor="examID">Exam ID<span className="text-red-500">*</span></label>
                <TextField type="text" name="examID" placeholder="Enter Exam ID" required/>
            </div>

            <Button variant="contained" type="submit" disabled={loading}>
                Assign Coordinator
            </Button>
        </form>
    )
}
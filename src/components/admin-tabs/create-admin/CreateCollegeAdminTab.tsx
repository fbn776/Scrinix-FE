import CreatForm from "@/components/admin-tabs/create-admin/CreatForm";
import ViewAdmins, {ICollegeAdmin} from "@/components/admin-tabs/create-admin/ViewAdmins";
import {useState} from "react";


export default function CreateCollegeAdminTab() {
    const [admins, setAdmins] = useState<ICollegeAdmin[]>([]);

    return <>
        <CreatForm setAdmins={setAdmins}/>
        <ViewAdmins admins={admins} setAdmins={setAdmins}/>
    </>
}
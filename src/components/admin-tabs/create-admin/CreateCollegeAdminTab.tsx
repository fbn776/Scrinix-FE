import CreateForm from "@/components/admin-tabs/create-admin/CreateForm";
import ViewAdmins, {ICollegeAdmin} from "@/components/admin-tabs/create-admin/ViewAdmins";
import {useState} from "react";


export default function CreateCollegeAdminTab() {
    const [admins, setAdmins] = useState<ICollegeAdmin[]>([]);

    return <>
        <CreateForm setAdmins={setAdmins}/>
        <ViewAdmins admins={admins} setAdmins={setAdmins}/>
    </>
}
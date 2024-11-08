"use client";

import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import apiInstance from "@/lib/api";
import {useParams} from "next/navigation";


export default function Page() {
    const params = useParams();
    const clgid = params.clgid;

    return <div className="flex items-center justify-center h-full w-full">
        <form className="bg-white m-4 rounded-md p-7 flex flex-col w-[400px]" onSubmit={(e) => {
            e.preventDefault();

            const formData = new FormData(e.target as HTMLFormElement);

            const f_id = formData.get('f_id');
            const password = formData.get('password');

            apiInstance.post(`/staff/login`, {
                clgid: clgid,
                f_id: f_id,
                password: password
            })

        }}>
            <h1 className="text-2xl mb-7">Faculty Login ({clgid})</h1>
            <label htmlFor="email" className="mb-2">Email <span className="text-red-500">*</span> </label>
            <TextField type="text" name="username" placeholder="Enter username"/>
            <label htmlFor="password" className="mt-5 mb-2">Password <span className="text-red-500">*</span></label>
            <TextField type="password" name="password" placeholder="Enter password"/>
            <div className="text-center mt-10">
                <Button variant="contained" className="w-[150px] h-[40px]" type="submit">Login</Button>
            </div>
        </form>
    </div>
}
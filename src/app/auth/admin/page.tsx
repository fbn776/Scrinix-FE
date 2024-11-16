"use client";

import apiInstance from "@/lib/api";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";


export default function Page() {
    const router = useRouter();

    return (
        <div className="size-full flex items-center justify-center">
            <form className="p-5 bg-white m-5 rounded-md flex flex-col gap-4 w-[500px]" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);

                const username = formData.get('username') as string;
                const password = formData.get('password') as string;

                apiInstance.post('/admin/root/login', {
                    username,
                    password
                }).then(() => {
                    router.push(`/admin`);
                }).catch((err) => {
                    console.log(err);
                    alert('Invalid username or password');
                })
            }}>
                <h1 className="text-2xl mb-5">Admin Login</h1>
                <div>
                    <label htmlFor="username">Username</label><br/>
                    <TextField name='username' type="text" className="w-full" placeholder="username"/>
                </div>
                <div className="mb-7">
                    <label htmlFor="password">Password</label><br/>
                    <TextField type="password" name="password" className="w-full" placeholder="Enter password"/>
                </div>
                <Button type="submit" variant="contained">Submit</Button>
            </form>
        </div>
    )
}
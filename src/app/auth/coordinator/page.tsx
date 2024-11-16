"use client";

import {useEffect, useState} from "react";
import apiInstance from "@/lib/api";
import {ICollege} from "@/components/admin-tabs/EditCollegeTab";
import {Autocomplete, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";


export default function Page() {
    const [colleges, setColleges] = useState<ICollege[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        apiInstance.get('/admin/root/colleges').then((res) => {
            setColleges(res.data);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className="size-full flex items-center justify-center">
            <form className="p-5 bg-white m-5 rounded-md flex flex-col gap-4 w-[500px]" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);

                const clgid = formData.get('clgid') as string;
                const f_id = formData.get('f_id') as string;
                const password = formData.get('password') as string;

                apiInstance.post('/staff/login', {
                    clgid,
                    f_id,
                    password
                }).then((res) => {
                    const data = res.data.data;
                    if(data.is_coordinator) {
                        router.push(`/main/${clgid}/coordinator`);
                    } else {
                        alert('You are not a coordinator');
                        return;
                    }
                }).catch((err) => {
                    console.log(err);
                })

            }}>
                <h1 className="text-2xl mb-5">Coordinator Login</h1>
                <div>
                    <label htmlFor='clgid'>College ID</label>
                    <Autocomplete className="college-select"
                                  options={colleges.map((option) => {
                                      return {label: option.id}
                                  })}
                                  renderInput={(params) => (
                                      <TextField name='clgid' {...params} placeholder="Enter College ID" required/>
                                  )}
                    />
                </div>
                <div>
                    <label htmlFor="f_id">Username</label><br/>
                    <TextField name='f_id' type="text" className="w-full" placeholder="Enter faculty ID"/>
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
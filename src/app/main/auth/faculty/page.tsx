"use client";

import {Autocomplete, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import apiInstance from "@/lib/api";
import {useRouter} from "next/navigation";
import {useNotifications} from "@toolpad/core";
import {useEffect, useState} from "react";
import {ICollege} from "@/components/admin-tabs/EditCollegeTab";


export default function Page() {
    const [loading, setLoading] = useState(false);
    const notify = useNotifications();
    const [error, setError] = useState(false);
    const router = useRouter();
    const [colleges, setColleges] = useState<ICollege[]>([]);

    useEffect(() => {
        setLoading(true);
        apiInstance.get('/admin/root/colleges').then((res) => {
            setColleges(res.data);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return <div className="flex items-center justify-center h-full w-full">
        <form className="bg-white m-4 rounded-md p-7 flex flex-col w-[400px]" onSubmit={(e) => {
            e.preventDefault();

            const formData = new FormData(e.target as HTMLFormElement);
            const f_id = formData.get('f_id');
            const password = formData.get('password');
            const clgid = formData.get('clgid');
            setError(false);
            setLoading(true);
            apiInstance.post(`/staff/login`, {
                clgid: clgid,
                f_id: f_id,
                password: password
            }).then(() => {
                notify.show('Logged in successfully', {
                    severity: 'success',
                    autoHideDuration: 1000
                });

                router.push(`/main/${clgid}/faculty/${f_id}/`);

            }).catch(e => {
                console.error(e);
                notify.show('Invalid credentials', {
                    severity: 'error',
                    autoHideDuration: 1000
                });
            }).finally(() => {
                setLoading(false);
            });

        }}>
            <h1 className="text-2xl mb-7">Faculty Loginx</h1>

            <label htmlFor='clgid' className="mb-2">College ID</label>
            <Autocomplete className="college-select"
                          options={colleges.map((option) => {
                              return {label: option.id}
                          })}
                          renderInput={(params) => (
                              <TextField name='clgid' {...params} placeholder="Enter College ID" required/>
                          )}
            />

            <label htmlFor="f_id" className="mt-2 mb-2">Faculty ID <span className="text-red-500">*</span> </label>
            <TextField type="text" name="f_id"
                       placeholder="Enter username"
                       required
                       error={error}
                       helperText={error ? 'Invalid username or password' : ''}
            />
            <label htmlFor="password" className="mt-5 mb-2">Password <span className="text-red-500">*</span></label>
            <TextField type="password" name="password" placeholder="Enter password" required
                       error={error}
                       helperText={error ? 'Invalid username or password' : ''}
            />
            <div className="text-center mt-10">
                <Button variant="contained" className="w-[150px] h-[40px]" type="submit">Login</Button>
            </div>
        </form>
    </div>
}
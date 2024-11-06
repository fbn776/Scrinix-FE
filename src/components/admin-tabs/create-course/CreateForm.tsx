import apiInstance from "@/lib/api";
import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import axios from "axios";
import {useNotifications} from "@toolpad/core";
import {StateSetter} from "@/lib/types";
import {ICourse} from "@/components/admin-tabs/create-course/CreateCourseTab";

const SEM_LIST = [
    {label: '1'}, {label: '2'}, {label: '3'}, {label: '4'}, {label: '5'}, {label: '6'}, {label: '7'}, {label: '8'}
];

const SCHEME_LIST = [
    {label: '2015'}, {label: '2019'}, {label: '2024'}
];

export default function CreateForm({setCourse}:  {setCourse: StateSetter<ICourse[]>}) {
    const [loading, setLoading] = useState(false);
    const notify = useNotifications();
    const [dupeError, setDupeError] = useState(false);
    const [lenError, setLenError] = useState(false);

    return <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const semester = formData.get('semester') as string;
        const scheme = formData.get('scheme') as string;
        const course_id = formData.get('course_id') as string;
        const name = formData.get('course_name') as string;

        setDupeError(false);
        setLoading(true);
        setLenError(false);

        if (course_id.length > 10) {
            notify.show('Course ID should be less than 10 characters', {severity: 'error'});
            setLenError(true);
            setLoading(false);
            return;
        }

        // semester, scheme, name, course_id
        apiInstance.post('/admin/root/creat-course', {
            semester, scheme, name, course_id
        }).then(() => {
            setCourse((prev) => {
                return [{semester, scheme, name, course_id, created_at: new Date().toISOString()}, ...prev];
            });
            notify.show('Course created successfully', {severity: 'success'});
        }).catch((e) => {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 409) {
                    notify.show('Course already exists', {severity: 'error'});
                    setDupeError(true);
                    return;
                }
            }
            notify.show('Unable to add course', {severity: 'error'});
        }).finally(() => {
            setLoading(false);
        })

    }} className='bg-white p-4 rounded-md overflow-hidden relative'>
        {loading && <div
            className='flex items-center justify-center w-full h-full inset-0 text-center p-10 absolute z-10 bg-black bg-opacity-30'>
            <CircularProgress/></div>}

        <div className="mb-4 flex flex-col gap-2 ">
            <label htmlFor="semester">Semester<span className="text-red-500">*</span></label>
            <Autocomplete
                options={SEM_LIST}
                renderInput={(params) =>
                    <TextField {...params}
                               placeholder='Select semester'
                               name="semester"
                               className="px-4 py-3 rounded-md border-2 border-gray-300 bg-white"
                               required

                               error={dupeError}
                               helperText={dupeError && 'Course already exists'}
                    />
                }
            />
        </div>

        <div className="mb-4 flex flex-col gap-2 ">
            <label htmlFor="scheme">Scheme<span className="text-red-500">*</span></label>
            <Autocomplete
                options={SCHEME_LIST}
                renderInput={(params) =>
                    <TextField {...params}
                               placeholder='Select scheme'
                               name="scheme"
                               className="px-4 py-3 rounded-md border-2 border-gray-300 bg-white"
                               required

                               error={dupeError}
                               helperText={dupeError && 'Course already exists'}
                    />
                }
            />
        </div>

        <div className="mb-4 flex flex-col gap-2 ">
            <label htmlFor="course_id">Course ID<span className="text-red-500">*</span></label>
            <TextField type="text" name="course_id" placeholder="Enter Course ID" required
                       error={dupeError || lenError}
                       helperText={lenError ? 'Course ID too long' : (dupeError && 'Course already exists')}
            />
        </div>
        <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="course_name">Course Name<span className="text-red-500">*</span></label>
            <TextField type="text" name="course_name"
                       placeholder="Enter Course Name"
                       required
                       error={dupeError}
                       helperText={dupeError && 'Course already exists'}
            />
        </div>

        <Button variant="contained" type="submit" disabled={loading}>
            Create Course
        </Button>
    </form>
}
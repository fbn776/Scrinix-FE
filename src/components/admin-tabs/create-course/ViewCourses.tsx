import {useEffect, useState} from "react";
import apiInstance from "@/lib/api";
import {timeAgo} from "@/lib/utils";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {useNotifications} from "@toolpad/core";
import {StateSetter} from "@/lib/types";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import {Chip, CircularProgress} from "@mui/material";
import {ICourse} from "@/components/admin-tabs/create-course/CreateCourseTab";


function CourseUnit(props: {
    courses: ICourse,
    notify: ReturnType<typeof useNotifications>,
    setCourses: StateSetter<ICourse[]>
}) {
    const [loading, setLoading] = useState(false);

    return <div className="border-2 border-gray-500 border-opacity-50 p-3 rounded-md flex items-center justify-between">
        <div>
            <h2 className="text-[24px]">{props.courses.course_id}</h2>
            <span className="text-sm mt-2">{props.courses.name}</span><br/>
            <span className="text-sm opacity-70">{timeAgo(props.courses.created_at)}</span><br/>
            <Chip className="mt-2" label={`S${props.courses.semester} - ${props.courses.scheme}`}/>
        </div>

        <IconButton onClick={() => {
            const confirm = window.confirm('Are you sure you want to delete this course?');
            if (!confirm) return;

            apiInstance.delete(`/course/delete-course/${props.courses.course_id}/${props.courses.scheme}`).then(() => {
                props.notify.show('Course deleted successfully', {
                    severity: 'success', autoHideDuration: 1000
                });
                props.setCourses((prev) => {
                    return prev.filter((course) => {
                        return !((course.course_id === props.courses.course_id) && (course.scheme === props.courses.scheme));
                    });
                });
            }).catch(e => {
                console.error(e);
                props.notify.show('Cannot delete course', {
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

export default function ViewCourses({courses, setCourses}: { courses: ICourse[], setCourses: StateSetter<ICourse[]> }) {
    const [loading, setLoading] = useState(false);
    const notify = useNotifications();

    useEffect(() => {
        setLoading(true);
        apiInstance.get('/course/all').then((res) => {
            console.log(res.data.data);
            setCourses(res.data.data);
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            setLoading(false);
        });
    }, []);


    return <div className="mt-4 p-4 bg-white rounded-md">
        <h1 className='text-2xl'>Courses</h1>

        {loading ? <CircularProgress/> :
            courses.length === 0 ? <h2 className="text-center my-5 text-xl opacity-50">No courses found</h2> :
                <div className="mt-4 space-y-4">
                    {courses.map((course, i) => {
                        return <CourseUnit key={i} courses={course} notify={notify} setCourses={setCourses}/>
                    })}
                </div>
        }
    </div>
}
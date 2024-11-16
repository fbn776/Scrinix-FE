import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import apiInstance from "@/lib/api";
import {useEffect, useState} from "react";
import {StateSetter} from "@/lib/types";

export interface IFaculty {
    name: string;
    f_id: string;
    clg_id: string;
}

export default function FacultyNameAutocomplete({setSelectedFaculty, clgid}: {
    setSelectedFaculty: StateSetter<IFaculty | null>,
    clgid: string
}) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<readonly IFaculty[]>([]);
    const [loading, setLoading] = useState(false);

    console.log(options);

    useEffect(() => {
        setLoading(true);
        apiInstance.post('/staff/by-clg', {
            clg_id: clgid
        }).then((res) => {
            setLoading(false);
            setOptions(res.data.data);
        }).catch((e) => {
            console.error(e);
        });
    }, [clgid]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <label htmlFor="faculty" className="w-full inline-block text-left mb-3">
                Faculty <span className="text-red-400">*</span>
            </label>
            <Autocomplete
                onChange={(_, value) => {
                    setSelectedFaculty(value);
                }}
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
                isOptionEqualToValue={(option, value) => (option.f_id === value.f_id) && (option.clg_id === value.clg_id)}
                getOptionLabel={(option) => option.name}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        required
                        placeholder="Search Faculty"
                        name="faculty"
                        {...params}
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            },
                        }}
                    />
                )}
            />
        </div>
    );
}

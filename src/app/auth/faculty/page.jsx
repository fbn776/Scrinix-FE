'use client'

import './page.css'
import {Autocomplete, Button, TextField} from "@mui/material";
import {useState} from "react";


export default function facultyAdmin() {
    let [facultyIds, setfacultyIds] = useState([
        'KTE',
        'CET',
        'GEC'
    ]);

    const [noFIDError, setNoFIDError] = useState(false);

    return <div className={'faculty-admin-body'}>
        <div className="faculty-admin">
            <h1>Faculty Login</h1>
            <form className="faculty-admin-sec" onSubmit={(e) => {
                e.preventDefault();

                const formData = new FormData(e.target);
                setNoFIDError(true);
                console.log(formData.get('clgID'), formData.get('facutyID'), formData.get('password'));
            }}>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor='clgID'>College ID</label>
                    <Autocomplete className="faculty-select"
                                  options={facultyIds}
                                  renderInput={(params) => (
                                      <TextField name='clgID' {...params} placeholder="Enter College ID" required
                                                 error={noFIDError}
                                                 helperText={noFIDError && "Invalid FacultyId"}/>
                                  )}
                    />
                </div>

                <div className="w-full flex flex-col gap-2">
                    <label htmlFor='facutyID'>Faculty ID</label>
                    <TextField name='facutyID' className="faculty-select" placeholder="Enter Faculty ID" required
                               variant="outlined"
                               error={noFIDError}
                               helperText={noFIDError && "Invalid FacultyId"}
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor='password'>Password</label>
                    <TextField className="faculty-select" name='password' type='password' placeholder='password'
                               error={noFIDError}
                               helperText={noFIDError && "Invalid FacultyId"}/>
                </div>
                <Button type="submit" variant="contained">LOGIN</Button>
            </form>
        </div>
    </div>
}
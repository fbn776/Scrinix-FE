'use client'

import './page.css'
import {Autocomplete, Button, TextField} from "@mui/material";
import {useState} from "react";


export default function collegeAdmin() {
    let [collegeIds, setcollegeIds] = useState([
        'KTE',
        'CET',
        'GEC'
    ]);

    const [noFIDError, setNoFIDError] = useState(false);

    return <div className={'college-admin-body'}>
        <div className="college-admin">
            <h1>College Login</h1>
            <form className="college-admin-sec" onSubmit={(e) => {
                e.preventDefault();

                const formData = new FormData(e.target);
                setNoFIDError(true);
                console.log(formData.get('clgID'), formData.get('facutyID'), formData.get('password'));
            }}>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor='clgID'>College ID</label>
                    <Autocomplete className="college-select"
                                  options={collegeIds}
                                  renderInput={(params) => (
                                      <TextField name='clgID' {...params} placeholder="Enter College ID" required
                                                 error={noFIDError}
                                                 helperText={noFIDError && "Invalid collegeId"}/>
                                  )}
                    />
                </div>

                <div className="w-full flex flex-col gap-2">
                    <label htmlFor='facutyID'>college ID</label>
                    <TextField name='facutyID' className="college-select" placeholder="Enter college ID" required
                               variant="outlined"
                               error={noFIDError}
                               helperText={noFIDError && "Invalid collegeId"}
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor='password'>Password</label>
                    <TextField className="college-select" name='password' type='password' placeholder='password'
                               error={noFIDError}
                               helperText={noFIDError && "Invalid collegeId"}/>
                </div>
                <Button type="submit" variant="contained">LOGIN</Button>
            </form>
        </div>
    </div>
}
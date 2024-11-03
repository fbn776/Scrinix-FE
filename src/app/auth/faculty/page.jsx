'use client'

import './page.css'
import {Autocomplete, Button, TextField} from "@mui/material";
import {useState} from "react";


export default function facultyAdmin() {
    let [facultyIds, setfacultyIds] = useState([
        'Rajiv Gandhi Institute of Technology',
        'faculty of Engineering, Trivandrum',
        'Govt Engineering faculty, Thrissur'
    ]);

    return <div className={'faculty-admin-body'}>
        <div className="faculty-admin">
            <h1>Faculty Login</h1>
            <div  className="faculty-admin-sec">
                <Autocomplete className="faculty-select"
                              options={facultyIds}
                              renderInput={(params) => (
                                  <TextField {...params} label="College Name :"/>
                              )}
                />
                <TextField className="faculty-select" label="Faculty Id :" variant="outlined"/>
                <TextField className="faculty-select" type={'password'} label={'password'}/>
                <Button variant={"contained"}>LOGIN</Button>
            </div>
        </div>
    </div>
}
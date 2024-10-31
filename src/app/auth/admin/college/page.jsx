'use client'

import './page.css'
import {Autocomplete, Button, TextField} from "@mui/material";
import {useState} from "react";


export default function CollegeAdmin() {
    let [colleges, setColleges] = useState([
        'Rajiv Gandhi Institute of Technology',
        'College of Engineering, Trivandrum',
        'Govt Engineering College, Thrissur'
    ]);
    return <div className={'college-admin-body'}>
    <div className="college-admin">
        <h1>College Login</h1>
        <div  className="college-admin-sec">
            <Autocomplete className="college-select"
                options={colleges}
                renderInput={(params) => (
                    <TextField {...params} label="College Name :"/>
                )}
            />
            <TextField className="college-select" label="Admin username :" variant="outlined"/>
            <TextField className="college-select" type={'password'} label={'password'}/>
            <Button variant={"contained"}>LOGIN</Button>
        </div>
    </div>
    </div>
}
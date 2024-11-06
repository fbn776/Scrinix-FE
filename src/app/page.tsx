import * as React from 'react';
import Link from "next/link";
import {Button} from "@mui/material";

export default function Home() {
    return <main className="p-5 w-100 h-100">
        <h1 className="text-2xl flex 100% flex-grow justify-center align-middle">Welcome to the home page</h1><br/>

        <h2 className="text-2xl border flex 100% flex-grow justify-center align-middle p-10">Login as</h2>
        <div className="pl-5">
            <div className='flex gap-7 items-center flex-col'>
                <div className='flex gap-2 items-center flex-col'>
                    Coordinator
                    <Button variant="contained" component={Link} href="/main/coordinator">
                        Exam Coordinator
                    </Button>
                </div>
                <div className='flex gap-2 items-center flex-col'>
                    Faculty
                    <Button variant="contained" component={Link} href="/auth/faculty">
                        Faculty
                    </Button>
                </div>
            </div>
        </div>
    </main>
}
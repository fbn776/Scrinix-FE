import * as React from 'react';
import Link from "next/link";
import {Button} from "@mui/material";

export default function Home() {
    return <main className="p-5">
        <p>Welcome to the home page</p><br/>

        <h2 className="text-2xl">Links</h2>
        <ul className="pl-5">
            <li className='flex gap-2 items-center'>
                Coordinator
                <Button variant="contained" component={Link} href="/coordinator">
                    Go to coordinator
                </Button>

            </li>
        </ul>
    </main>
}
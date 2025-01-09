import Link from "next/link";
import {Button} from "@mui/material";
import * as React from "react";

export default async function Home({params}: { params: Promise<{ clgid: string }> }) {
    const clgid = (await params).clgid;

    return <main className="p-5">

        <h1 className="text-2xl mb-4">College Home Page</h1>
        <p>Welcome to the college home page</p>


        <h2 className="text-xl mt-5">Links</h2>
        <div className="space-y-4 mt-5">
            <div className="flex items-center justify-between bg-white p-4 rounded-md">
                <h3 className="text-xl">Coordinator</h3>
                <Button variant="contained" component={Link} href={`/main/${clgid}/coordinator`}>
                    Go
                </Button>
            </div>

            <div className="flex items-center justify-between bg-white p-4 rounded-md">
                <h3 className="text-xl">Faculty</h3>
                <Button variant="contained" component={Link} href={`/main/${clgid}/faculty`}>Go</Button>
            </div>

            <div className="flex items-center justify-between bg-white p-4 rounded-md">
                <h3 className="text-xl">College Admin</h3>
                <Button variant="contained" component={Link} href={`/main/${clgid}/college-admin`}>Go</Button>
            </div>
        </div>
    </main>
}
import Button from "@mui/material/Button";
import Link from "next/link";


export default function NoExamFoundPage() {
    return (
        <div className="p-4">
            <h1 className="text-2xl">Faculty Not Found</h1>
            <Link href='/'>
                <Button variant="contained">
                    Go Home
                </Button>
            </Link>
        </div>
    )
}
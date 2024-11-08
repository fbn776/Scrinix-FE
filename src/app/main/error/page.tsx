import Link from "next/link";

export default function NoClgFound() {
    return (
        <div className="p-4 flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl mb-5">College not found</h1>
            <Link href='/' className="px-4 py-2 bg-blue-500 rounded-md text-white">Go Home</Link>
        </div>
    )
}
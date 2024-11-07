import apiInstance from "@/lib/api";

export default function downloadFile(id: number) {
    const url = new URL(`/file/download/${id}`, apiInstance.getUri()).toString();
    window.open(url, '_blank');
}
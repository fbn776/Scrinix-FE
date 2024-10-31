import * as React from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {styled} from "@mui/material/styles";
import DoneIcon from '@mui/icons-material/Done';
import {StateSetter} from "@/lib/types";


const VisuallyHiddenInput = styled('input')({
    display: 'none',
});

export function FileUploadButton({file, setFile}: { file: File | null, setFile: StateSetter<File | null> }) {

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log(file);
        if (file) {
            setFile(file);
        }
    };

    return (
        <div>
            <label>
                <VisuallyHiddenInput
                    id="file-upload-button"
                    type="file"
                    onChange={handleFileChange}
                />
                <Button
                    component="span"
                    variant="contained"
                    startIcon={file?.name ? <DoneIcon/> : <CloudUploadIcon/>}
                >
                    {file ? "File Uploaded" : "Upload File"}
                </Button>
            </label>
            {file &&
                <span className="block text-sm opacity-50 truncate w-[150px] text-center">{file.name}</span>}
        </div>
    );
}
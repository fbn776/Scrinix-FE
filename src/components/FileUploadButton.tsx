import * as React from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {styled} from "@mui/material/styles";
import DoneIcon from '@mui/icons-material/Done';
import {StateSetter} from "@/lib/types";
import {useNotifications} from "@toolpad/core";


const VisuallyHiddenInput = styled('input')({
    display: 'none',
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export function FileUploadButton({file, setFile}: { file: File | null, setFile: StateSetter<File | null> }) {
    const notfiy = useNotifications();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
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
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            if (file.size > MAX_FILE_SIZE) {
                                notfiy.show("File too large ( < 5MB )", {
                                    severity: "error", autoHideDuration: 1000
                                })
                                return;
                            }
                            setFile(file);
                        }
                        handleFileChange(e);
                    }}
                    accept=".pdf"
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
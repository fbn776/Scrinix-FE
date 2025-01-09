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


/**
 * File upload button, that stores the uploaded file to a React state
 * @param file - The file state
 * @param setFile - The file state setter
 * @param maxFileSize - The maximum file size in bytes (optional: By default 5MB)
 * @param fileType - The file type to accept (optional: By default .pdf)
 * @constructor
 */
export function FileUploadButton({file, setFile, maxFileSize = MAX_FILE_SIZE, fileType = '.pdf'}: {
    file: File | null,
    setFile: StateSetter<File | null>,
    maxFileSize?: number,
    fileType: ".pdf" | ".docx" | string
}) {
    const notify = useNotifications();
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
                            if (file.size > maxFileSize) {
                                notify.show("File too large", {
                                    severity: "error", autoHideDuration: 1000
                                })
                                return;
                            }
                            setFile(file);
                        }
                        handleFileChange(e);
                    }}
                    accept={fileType}
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
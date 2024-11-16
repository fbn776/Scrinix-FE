import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from "@mui/material/Dialog";

/**
 * Dialog component (A component that opens a dialog box)
 *
 * To open a dialog box, set the open prop to true
 *
 * @param open A boolean value that determines if the dialog box is open or not
 * @param children The content of the dialog box
 * @param title The title of the dialog box
 * @param howToClose A function that determines how to close the dialog box
 * @constructor
 */
export default function DialogBox({open, children, title, howToClose}: {
    open: boolean,
    title: string,
    children: React.ReactNode,
    howToClose: () => void,
}) {
    return (
        <Dialog
            open={open}
            onClose={howToClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent className="w-[500px] text-center">
                {children}
            </DialogContent>
        </Dialog>
    )
}
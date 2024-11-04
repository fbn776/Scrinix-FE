import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TEditOpen} from "@/components/admins/EditCollegeTab";
import apiInstance from "@/lib/api";
import {useNotifications} from "@toolpad/core";

export default function EditCollegeDialog({editOpen, handleClose, onUpdate}: {
    editOpen: TEditOpen,
    handleClose: () => void,
    onUpdate: (id: string, name: string) => void
}) {
    const notify = useNotifications();

    return (
        <Dialog
            open={editOpen.status}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData).entries());
                    const name = formJson.name;

                    apiInstance.patch('/admin/root/update-college', {
                        ID: editOpen.id,
                        name
                    }).then((res) => {
                        console.log(res.data);
                        notify.show('College name updated successfully', {
                            severity: "success",
                            autoHideDuration: 3000,
                        });
                        onUpdate(editOpen.id!, name as string);
                    }).catch((err) => {
                        console.error(err);
                        notify.show('Cannot update college name', {
                            severity: "error",
                            autoHideDuration: 3000,
                        });
                    }).finally(() => {
                        handleClose();
                    });
                },
            }}
        >
            <DialogTitle>Edit College Name</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Change the name of the college (<b>{editOpen.id}</b>)
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="College Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Change</Button>
            </DialogActions>
        </Dialog>
    );
}

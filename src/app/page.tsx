"use client";

import {LoginPage} from "@/app/components/LoginPage";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {Box, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// @ts-ignore
function BasicModal({open, handleClose}) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            BackdropProps={{onClick: (e) => e.stopPropagation()}}
        >
            <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2">
                    Modal Title
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                    Some content for the modal.
                </Typography>
                <Button onClick={handleClose}>Close</Button>
            </Box>
        </Modal>
    );
}

export default function Home() {
    const [open, setOpen] = useState(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div className="page-container">
            <div className="content-wrap">
                <div className="background-color">
                    <LoginPage/>
                </div>
            </div>
            <footer className="footer">
                <Button onClick={() => handleOpen()}>QA</Button>
                <BasicModal open={open} handleClose={() => handleClose()}/>
            </footer>
        </div>
    );
}

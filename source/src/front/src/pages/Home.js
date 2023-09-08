import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";
import SingUp from "../components/SingUp";

const Home = () => {
    return (
        <div>
        <AppBar position={"static"}>
            <Toolbar>
                <Typography variant={'h6'}>
                    <p>홈</p>
                </Typography>
            </Toolbar>
        </AppBar>
        <SingUp />
        </div>
    );
};

export default Home;
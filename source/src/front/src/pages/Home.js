import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";
import Memlist from "../components/Memlist";

const Home = () => {
    return (

        <AppBar position={"static"} >
            <Toolbar>
                <Typography variant={'h6'}>
                    <p>홈</p>
                </Typography>
            </Toolbar>
        </AppBar>
);
};

export default Home;
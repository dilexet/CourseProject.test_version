import React from 'react';
import {Typography} from '@mui/material';
import {HomeProps} from "../types/HomeProps";

const Home: React.FC<HomeProps> = ({user}) => {
    return (
        <div>
            <Typography>
                Home
            </Typography>
            <Typography>
                {JSON.stringify(user, null, 2)}
            </Typography>
        </div>
    );
}

export default Home;

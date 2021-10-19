import React from 'react';
import {Typography} from '@mui/material';
import {useTypeSelector} from "./Shared/hooks/useTypeSelector";

const Home: React.FC = () => {
    const state = useTypeSelector(x => x.login);

    return (
        <div>
            <Typography>
                Home
            </Typography>
            <Typography>
                {state.data ? state.data.message : ""}
            </Typography>
        </div>
    );
}

export default Home;

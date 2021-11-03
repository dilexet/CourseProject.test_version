import React from 'react';
import {Typography} from '@mui/material';
import {useTypeSelector} from "./Shared/hooks/useTypeSelector";

const Home: React.FC = () => {
    const state = useTypeSelector(x => x.token_verify);

    return (
        <div>
            <Typography>
                Home
            </Typography>
            <Typography>
                {JSON.stringify(state.data?.data, null, 2)}
            </Typography>
        </div>
    );
}

export default Home;

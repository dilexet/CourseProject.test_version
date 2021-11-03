import React from 'react';
import {useTypeSelector} from "../../Shared/hooks/useTypeSelector";
import Home from "../component/Home";

const HomeContainer: React.FC = () => {
    const {data} = useTypeSelector(x => x.token_verify);

    return (
        <Home user={data?.data}/>
    );
}

export default HomeContainer;

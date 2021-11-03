import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './i18n';
import {Provider} from "react-redux";
import {store} from "./Shared/store";
import AppContainer from "./App/container/AppContainer";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <AppContainer/>
            </Suspense>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
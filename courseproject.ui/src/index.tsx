import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from "./App";
import './i18n';
import {Provider} from "react-redux";
import {store} from "./Shared/store";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <App/>
            </Suspense>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
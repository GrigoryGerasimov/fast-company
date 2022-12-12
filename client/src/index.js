import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App.jsx";
import { logger } from "./app/services/loggingService.js";
import { store } from "./app/store/store.js";
import { Provider } from "react-redux";
import withAppLoader from "./app/components/ui/hoc/withAppLoader.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import reportWebVitals from "./reportWebVitals";

logger.init();

const AppWithPreload = withAppLoader(App);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <AppWithPreload />
        </Provider>
    </BrowserRouter>
);

reportWebVitals();

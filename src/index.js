import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { App } from "./app/App.jsx";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { logger } from "./app/services/loggingService.js";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./app/store/store.js";
import { Provider } from "react-redux";
import history from "./app/utils/history/history.js";
import withAppLoader from "./app/components/ui/hoc/withAppLoader.jsx";

logger.init();

const AppWithPreload = withAppLoader(App);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router history={history}>
        <Provider store={store}>
            <React.StrictMode>
                <AppWithPreload />
            </React.StrictMode>
        </Provider>
    </Router>
);

reportWebVitals();

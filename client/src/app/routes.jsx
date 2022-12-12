import React from "react";
import { Navigate } from "react-router-dom";
import Main from "./layouts/Main.jsx";
import Users from "./layouts/Users.jsx";
import NotFound from "./components/NotFound.jsx";
import Logout from "./layouts/Logout.jsx";
import withUsersLoader from "./components/ui/hoc/withUsersLoader.jsx";
import { EditorPage, UserPage } from "./components/common/page/userPage";
import { UserInfoPage } from "./components/common/page/userPage/userInfo";
import { UsersListPage } from "./components/common/page/userListPage";
import LoginPage from "./layouts/login/LoginPage.jsx";
import SignIn from "./layouts/login/SingIn";
import SignUp from "./layouts/login/SignUp";

export const routes = (isLoggedIn, location) => {
    const UsersWithUsersLoader = withUsersLoader(Users);
    return [
        { path: "", element: <Main/> },
        {
            path: "users",
            element: !isLoggedIn ? <Navigate to="/login" state={{ from: location }}/> : <UsersWithUsersLoader/>,
            children: [
                { path: "", element: <UsersListPage/> },
                {
                    path: ":userId",
                    element: <UserInfoPage/>,
                    children: [
                        { path: "", element: <UserPage/> },
                        { path: "edit", element: <EditorPage/> },
                        { path: "*", element: <Navigate to={!isLoggedIn ? "/login" : ""}/> }
                    ]
                },
                { path: "*", element: <Navigate to={!isLoggedIn ? "/login" : ""}/> }
            ]
        },
        {
            path: "login",
            element: <LoginPage/>,
            children: [
                { path: "", element: <Navigate to="signin"/> },
                { path: "signin", element: <SignIn/> },
                { path: "signup", element: <SignUp/> },
                { path: "*", element: <Navigate to={!isLoggedIn ? "" : "/"}/> }
            ]
        },
        { path: "logout", element: <Logout/> },
        { path: "*", element: <NotFound/> }
    ];
};

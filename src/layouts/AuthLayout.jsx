import { Outlet } from "react-router-dom";


const AuthLayout = () => {
    return (
        <div>
            Auth Laoyout
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../axios";

function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        http.post('/logout');
        navigate('/');
    }, []);
    return ( 
        <div>
            <h1>Logout Page</h1>
        </div>
     );
}

export default Logout;
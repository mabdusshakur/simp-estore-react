import { useEffect } from "react";
import http from "../axios";

function Logout() {
    useEffect(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        http.post('/logout');
        window.location.href = '/';
    }, []);
    return ( 
        <div>
            <h1>Logout Page</h1>
        </div>
     );
}

export default Logout;
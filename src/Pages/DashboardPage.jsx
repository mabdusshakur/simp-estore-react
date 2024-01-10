import {getUser} from '../authManager';
function Dashboard() {
    const user = getUser();
    return (
        <>
            
            <h1>Dashboard</h1>
            <h2>{user.name}</h2>
        </>
    );
}

export default Dashboard;
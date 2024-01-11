import { Route, Routes } from 'react-router-dom';
import Sidebar from '../Components/SideBar';
import { getUser } from '../authManager';
import Category from './CategoryPage';
import SubCategory from './SubCategoryPage';

function Dashboard() {
    return (
        <>
             <div className="container mx-auto px-4">
                <h1>Dashboard</h1>
            </div>
        </>
    );
}

export default Dashboard;
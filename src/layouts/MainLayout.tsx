import { Outlet } from 'react-router-dom';
import Sidebar from '@/layouts/Sidebar';
import Navbar from '@/layouts/Navbar';

const MainLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden lg:ml-64">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;

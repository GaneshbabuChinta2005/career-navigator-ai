import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { AIChatButton } from '@/features/ai-coach/components/AIChatButton';

const DashboardLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden lg:ml-64">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
            <AIChatButton />
        </div>
    );
};

export default DashboardLayout;

import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { AIChatButton } from '@/features/ai-coach/components/AIChatButton';

const DashboardLayout = () => {
    const location = useLocation();

    return (
        <div className="flex h-screen overflow-hidden"
            style={{ background: 'linear-gradient(180deg, hsl(230 28% 5%), hsl(230 25% 4%))' }}>
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden lg:ml-64">
                <Navbar />
                <main
                    key={location.pathname}
                    className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 page-enter"
                >
                    <Outlet />
                </main>
            </div>
            <AIChatButton />
        </div>
    );
};

export default DashboardLayout;

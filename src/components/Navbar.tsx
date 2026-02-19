import { Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Navbar = () => {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
            {/* Search Bar */}
            <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-lg w-96 focus-within:ring-2 ring-blue-100 transition-all">
                <Search className="text-gray-400 w-4 h-4" />
                <Input
                    type="text"
                    placeholder="Search skills, jobs, or courses..."
                    className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </Button>
            </div>
        </header>
    );
};

export default Navbar;

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { AIChatPanel } from './AIChatPanel';

export const AIChatButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    size="lg"
                    className="fixed bottom-4 right-4 z-40 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-purple-600"
                >
                    <Sparkles className="w-6 h-6" />
                </Button>
            )}

            {isOpen && <AIChatPanel onClose={() => setIsOpen(false)} />}
        </>
    );
};

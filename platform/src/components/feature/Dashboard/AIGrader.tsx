import Button from '@/components/ui/Button';
import { Sparkle } from 'lucide-react';
import React, { useState } from 'react';

const AIGrader = () => {

    const [essay, setEssay] = useState('');

    return (
        <div className="space-y-4">
            <textarea
            className="w-full p-3 border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50 text-purple-900 placeholder-purple-400"
            placeholder="Type your essay here..."
            rows={6}
            onChange={(e) => setEssay(e.target.value)}
            value={essay}
            />
            <Button className="flex items-center space-x-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                <Sparkle size={15} /> <span>Grade it!</span>
            </Button>
        </div>
    );
};

export default AIGrader;
import React from 'react';
import { ReportOption } from '../types';

interface OptionPanelProps {
    title: string;
    options: ReportOption[];
    onOptionClick: (text: string) => void;
}

const OptionPanel: React.FC<OptionPanelProps> = ({ title, options, onOptionClick }) => {
    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 pb-2">
                {title}
            </h2>
            <div className="flex flex-wrap gap-2">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onOptionClick(option.long)}
                        className="bg-indigo-500 dark:bg-indigo-600 text-white text-sm font-medium py-2 px-3 rounded-md
                                   hover:bg-indigo-600 dark:hover:bg-indigo-700 
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-indigo-500
                                   transition-transform transform hover:scale-105 active:scale-95"
                    >
                        {option.short}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OptionPanel;

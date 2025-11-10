
import React, { useState, useMemo } from 'react';
import { ReportType } from '../types';
import { CopyIcon, ClearIcon } from './icons';

interface ReportDisplayProps {
    reportType: ReportType;
    findings: string[];
    diagnoses: string[];
    onClear: () => void;
}

const ReportDisplay: React.FC<ReportDisplayProps> = ({ reportType, findings, diagnoses, onClear }) => {
    const [isCopied, setIsCopied] = useState(false);

    const reportText = useMemo(() => {
        if (findings.length === 0 && diagnoses.length === 0) {
            return "點擊左側按鈕以生成報告...\nClick buttons on the left to generate the report...";
        }

        const parts: string[] = [reportType.toUpperCase()];

        if (findings.length > 0) {
            parts.push('\nFindings:');
            findings.forEach(f => parts.push(`   ${f}`));
        }

        if (diagnoses.length > 0) {
            parts.push('\nDiagnosis:');
            diagnoses.forEach(d => parts.push(`   ${d}`));
        }
        
        return parts.join('\n');
    }, [reportType, findings, diagnoses]);

    const handleCopy = () => {
        navigator.clipboard.writeText(reportText).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
                    報告預覽 (Report Preview)
                </h2>
                <div className="flex space-x-2">
                     <button
                        onClick={handleCopy}
                        className={`flex items-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors
                                   ${isCopied 
                                        ? 'bg-green-500 text-white' 
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'}
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-indigo-500`}
                    >
                        <CopyIcon />
                        <span>{isCopied ? '已複製!' : '複製報告'}</span>
                    </button>
                    <button
                        onClick={onClear}
                        className="flex items-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors bg-red-500 text-white hover:bg-red-600
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-red-500"
                    >
                       <ClearIcon />
                       <span>清除</span>
                    </button>
                </div>
            </div>
            <textarea
                readOnly
                value={reportText}
                className="flex-grow w-full p-4 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md resize-none font-mono text-sm leading-6
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={15}
            />
        </div>
    );
};

export default ReportDisplay;

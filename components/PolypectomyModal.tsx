
import React, { useState, useMemo, useEffect } from 'react';

interface Polyp {
    size: string;
    type: 'Hyperplastic' | 'Tubular adenoma' | 'SSA';
    paris: 'Is' | 'Ip' | 'Isp' | 'IIa' | 'IIb' | 'IIc';
    location: 'Cecum' | 'A colon' | 'T colon' | 'D colon' | 'S colon' | 'Rectum';
    method: 'Bx' | 'Cold snare polypectomy' | 'Hot snare polypectomy';
    hemoclip: '有' | '無';
}

const defaultPolyp: Polyp = {
    size: '0.3',
    type: 'Hyperplastic',
    paris: 'Is',
    location: 'S colon',
    method: 'Bx',
    hemoclip: '無',
};

const PolypectomyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [numPolyps, setNumPolyps] = useState(1);
    const [polyps, setPolyps] = useState<Polyp[]>([defaultPolyp]);
    const [generatedReport, setGeneratedReport] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        setPolyps(currentPolyps => {
            const newPolyps = [...currentPolyps];
            while (newPolyps.length < numPolyps) {
                newPolyps.push({ ...defaultPolyp });
            }
            return newPolyps.slice(0, numPolyps);
        });
    }, [numPolyps]);

    const handlePolypChange = (index: number, field: keyof Polyp, value: string) => {
        const newPolyps = [...polyps];
        newPolyps[index] = { ...newPolyps[index], [field]: value };
        setPolyps(newPolyps);
    };

    const generateReport = () => {
        const findings: string[] = [];
        const diagnoses: string[] = [];
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        polyps.forEach((polyp, index) => {
            if (!polyp.size) return; // Skip if size is not entered
            
            const hemoclipText = polyp.hemoclip === '有' ? ' Hemoclip was applied for hemostasis.' : '';
            findings.push(`A ${polyp.size} cm 0-${polyp.paris} polyp was noted over ${polyp.location}. (${alphabet[index]}) ${polyp.method} was done.${hemoclipText}`);

            const mappedMethod = polyp.method === 'Bx' ? 's/p biopsy and removal' : 's/p polypectomy';
            const mappedType = polyp.type === 'SSA' ? 'Sessile serrated adenoma' : polyp.type;
            diagnoses.push(`${mappedType}, 0-${polyp.paris}, ${polyp.size} cm, ${polyp.location} ${mappedMethod}`);
        });
        
        findings.push('Internal hemorrhoid was noted.');
        diagnoses.push('Internal hemorrhoid');

        const report = `Finding:
${findings.join('\n')}

Diagnosis:
${diagnoses.join('\n')}

Suggestion:
Pursue pathology result`;
        
        setGeneratedReport(report);
    };
    
    const handleCopy = () => {
        if (!generatedReport) return;
        navigator.clipboard.writeText(generatedReport).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    const renderPolypForm = (polyp: Polyp, index: number) => (
        <div key={index} className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg space-y-4">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">息肉 {index + 1}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Form Fields */}
                <div className="flex flex-col">
                    <label htmlFor={`size-${index}`} className="mb-1 text-sm font-medium">大小 (cm)</label>
                    <input id={`size-${index}`} type="text" value={polyp.size} onChange={(e) => handlePolypChange(index, 'size', e.target.value)} className="p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor={`type-${index}`} className="mb-1 text-sm font-medium">類型</label>
                    <select id={`type-${index}`} value={polyp.type} onChange={(e) => handlePolypChange(index, 'type', e.target.value)} className="p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none">
                        <option>Hyperplastic</option>
                        <option>Tubular adenoma</option>
                        <option>SSA</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor={`paris-${index}`} className="mb-1 text-sm font-medium">Paris</label>
                    <select id={`paris-${index}`} value={polyp.paris} onChange={(e) => handlePolypChange(index, 'paris', e.target.value)} className="p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none">
                        {['Is', 'Ip', 'Isp', 'IIa', 'IIb', 'IIc'].map(p => <option key={p}>{p}</option>)}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor={`location-${index}`} className="mb-1 text-sm font-medium">位置</label>
                    <select id={`location-${index}`} value={polyp.location} onChange={(e) => handlePolypChange(index, 'location', e.target.value)} className="p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none">
                        {['Cecum', 'A colon', 'T colon', 'D colon', 'S colon', 'Rectum'].map(l => <option key={l}>{l}</option>)}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor={`method-${index}`} className="mb-1 text-sm font-medium">切法</label>
                    <select id={`method-${index}`} value={polyp.method} onChange={(e) => handlePolypChange(index, 'method', e.target.value)} className="p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none">
                        {['Bx', 'Cold snare polypectomy', 'Hot snare polypectomy'].map(m => <option key={m}>{m}</option>)}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor={`hemoclip-${index}`} className="mb-1 text-sm font-medium">止血夾</label>
                    <select id={`hemoclip-${index}`} value={polyp.hemoclip} onChange={(e) => handlePolypChange(index, 'hemoclip', e.target.value)} className="p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none">
                        <option>無</option>
                        <option>有</option>
                    </select>
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col text-slate-800 dark:text-slate-200">
                <header className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400">切息肉報告產生器</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition">&times;</button>
                </header>
                <main className="p-6 flex-grow overflow-y-auto space-y-6">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="num-polyps" className="font-semibold">息肉數量:</label>
                        <select id="num-polyps" value={numPolyps} onChange={e => setNumPolyps(Number(e.target.value))} className="p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none">
                            {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>

                    <div className="space-y-4">
                        {polyps.map(renderPolypForm)}
                    </div>
                    
                    <button onClick={generateReport} className="w-full bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition transform hover:scale-105">
                        產生報告
                    </button>

                    {generatedReport && (
                        <div className="space-y-2">
                             <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold">報告預覽</h3>
                                <button onClick={handleCopy} className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${isCopied ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500'}`}>
                                    {isCopied ? '已複製!' : '複製報告'}
                                </button>
                            </div>
                            <textarea readOnly value={generatedReport} className="w-full p-4 h-64 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md resize-none font-mono text-sm" />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default PolypectomyModal;

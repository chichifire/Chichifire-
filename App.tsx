
import React, { useState, useCallback } from 'react';
import PolypectomyModal from './components/PolypectomyModal';

const ULCER_BX_REPORT = `Finding:
    esophagus: flamed mucosa breaks < 0.5 cm were noted over ECJ
    stomach: Hyperemic mucosa was noted over antrum. 
            Several shallow ulcers were noted over antrum. Biopsy was taken.
    Duodenum: no organic lesion or deformity was found

Diagnosis:
    Reflux esophagitis, LA grade A
    Superficial gastritis, antrum
    Gastric shallow ulcers, antrum, s/p bx
    Suggest pursue pathology result`;

const GASTRITIS_CLO_REPORT = `Finding:
    esophagus: flamed mucosa breaks < 0.5 cm were noted over ECJ
    stomach: Hyperemic mucosa was noted over antrum. 
            Several erosions were noted over antrum. CLO test was taken.
    Duodenum: no organic lesion or deformity was found

Diagnosis:
    Reflux esophagitis, LA grade A
    Superficial gastritis, antrum
    Gastric erosions, antrum, s/p CLO
    Suggest pursue CLO test result`;

const POLYP_BX_REPORT = `Finding:
    esophagus: flamed mucosa breaks < 0.5 cm were noted over ECJ
    stomach: Hyperemic mucosa was noted over antrum. 
            Several shallow ulcers were noted over antrum. Several polyps were noted at fundus and antrum. Biopsy was taken.
    Duodenum: no organic lesion or deformity was found

Diagnosis:
    Reflux esophagitis, LA grade A
    Superficial gastritis, antrum
    Gastric shallow ulcers, antrum, s/p bx
    Suggest pursue pathology result`;

const CFS_STANDARD_REPORT = `Finding:
A 0.3 cm 0-Is polyp was noted over S colon. Biopsy was done and removal.
Internal hemorrhoid was noted. 
Diagnosis:
Hyperplastic polyp, 0-Is, 0.3 cm, S colon s/p biopsy and removal.
Internal hemorrhoid
Suggestion:
Pursue pathology result`;

const App: React.FC = () => {
    const [copiedButton, setCopiedButton] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCopy = useCallback((text: string, buttonId: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedButton(buttonId);
            setTimeout(() => setCopiedButton(null), 2000);
        });
    }, []);

    const ReportButton = ({ id, text, content, onClick, primary = true }: { id: string; text: string; content?: string; onClick?: () => void; primary?: boolean }) => {
        const isCopied = copiedButton === id;
        const colorClasses = primary
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500'
            : 'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500';

        return (
            <button
                onClick={() => onClick ? onClick() : handleCopy(content!, id)}
                className={`w-full md:w-auto text-lg font-bold py-4 px-8 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900
                           ${isCopied
                                ? 'bg-green-500 text-white'
                                : colorClasses
                           }`}
            >
                {isCopied ? '已複製!' : text}
            </button>
        );
    };

    return (
        <div className="min-h-screen font-sans flex flex-col items-center justify-center p-4">
            <header className="absolute top-0 left-0 right-0 p-4 sm:p-6">
                <h1 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400">
                    打報告小助手 (Medical Report Assistant)
                </h1>
            </header>
            
            <main className="flex flex-col items-center justify-center space-y-10 text-center w-full max-w-4xl">
                 <div className="flex flex-col items-center w-full space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">EGD 報告</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        點擊按鈕複製 EGD 報告模板
                    </p>
                    <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
                        <ReportButton id="ulcer" text="ulcer -> Bx" content={ULCER_BX_REPORT} />
                        <ReportButton id="gastritis" text="Gastritis -> CLO" content={GASTRITIS_CLO_REPORT} />
                        <ReportButton id="polyp" text="polyp -> bx" content={POLYP_BX_REPORT} />
                    </div>
                 </div>

                 <hr className="w-1/2 border-slate-300 dark:border-slate-700" />

                 <div className="flex flex-col items-center w-full space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">CFS 報告</h2>
                     <p className="text-lg text-slate-600 dark:text-slate-400">
                        選擇報告類型
                    </p>
                    <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
                        <ReportButton id="cfs_standard" text="標準病人" content={CFS_STANDARD_REPORT} primary={false} />
                        <ReportButton id="cfs_polypectomy" text="切息肉病人" onClick={() => setIsModalOpen(true)} primary={false} />
                    </div>
                 </div>
            </main>

            {isModalOpen && <PolypectomyModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default App;

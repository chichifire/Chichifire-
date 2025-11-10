export type ReportType = 'EGD' | 'CFS';

export interface ReportOption {
    short: string;
    long: string;
}

export interface EGDReportOptions {
    findings: {
        esophagus: ReportOption[];
        stomach: ReportOption[];
        duodenum: ReportOption[];
    };
    diagnoses: ReportOption[];
}

export interface CFSReportOptions {
    findings: ReportOption[];
    diagnoses: ReportOption[];
}

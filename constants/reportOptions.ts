import { EGDReportOptions, CFSReportOptions } from '../types';

export const EGD_OPTIONS: EGDReportOptions = {
    findings: {
        esophagus: [
            { short: 'Normal', long: 'esophagus: Normal finding.' },
            { short: 'RE, LA-A precursor', long: 'esophagus: flamed mucosa breaks < 0.5 cm were noted over ECJ' },
            { short: 'Hiatal hernia', long: 'esophagus: Hiatal hernia was noted.' },
        ],
        stomach: [
            { short: 'Normal', long: 'stomach: Normal finding.' },
            { short: 'Hyperemic antrum', long: 'stomach: Hyperemic mucosa was noted over antrum.' },
            { short: 'Erosions, antrum + CLO', long: 'stomach: Several erosions were noted over antrum. CLO test was taken.' },
            { short: 'AG w/ IM, antrum', long: 'stomach: Atrophic gastritis with intestinal metaplasia over antrum.' },
            { short: 'GU, antrum LC, H1', long: 'stomach: A gastric ulcer was noted over lesser curvature of antrum, stage H1.' },
        ],
        duodenum: [
            { short: 'Normal', long: 'Duodenum: Normal finding.' },
            { short: 'No organic lesion', long: 'Duodenum: no organic lesion or deformity was found' },
            { short: 'DU, bulb ant. wall, active', long: 'Duodenum: An active ulcer was noted over anterior wall of bulb.' },
        ]
    },
    diagnoses: [
        { short: 'Normal', long: 'Normal EGD finding' },
        { short: 'RE, LA-A', long: 'Reflux esophagitis, LA grade A' },
        { short: 'Hiatal hernia', long: 'Hiatal hernia' },
        { short: 'Superficial gastritis', long: 'Superficial gastritis, antrum' },
        { short: 'Gastric erosions, s/p CLO', long: 'Gastric erosions, antrum, s/p CLO' },
        { short: 'AG w/ IM', long: 'Atrophic gastritis with intestinal metaplasia, antrum' },
        { short: 'GU, antrum, H1', long: 'Gastric ulcer, antrum, stage H1' },
        { short: 'DU, bulb, active', long: 'Duodenal ulcer, bulb, active stage' },
        { short: 'Pursue CLO result', long: 'Suggest pursue CLO test result' },
    ]
};

export const CFS_OPTIONS: CFSReportOptions = {
    findings: [
        { short: '0.3cm 0-Is polyp, T colon (Biopsy)', long: 'A 0.3 cm 0-Is polyp was noted over T colon. (A) Biopsy was done and removal.' },
        { short: '0.6cm 0-Is polyp, S colon (Cold Snare)', long: 'A 0.6 cm 0-Is polyp was noted over S colon. (B) Cold snare polypectomy was done.' },
        { short: '0.8cm 0-Is polyp, S colon (Hot Snare)', long: 'A 0.8 cm 0-Is polyp was noted over S colon. (C) Hot snare polypectomy was done.' },
        { short: '0.5cm 0-Ip polyp, Rectum (Polypectomy)', long: 'A 0.5 cm 0-Ip polyp was noted over Rectum. (D) Polypectomy was done.' },
        { short: 'Diverticulosis, S colon', long: 'Diverticulosis was noted over S colon.' },
        { short: 'Internal hemorrhoid', long: 'Internal hemorrhoid was noted.' },
        { short: 'External hemorrhoid', long: 'External hemorrhoid was noted.' },
    ],
    diagnoses: [
        { short: 'HP, 0.3cm, T colon (Biopsy)', long: 'Hyperplastic polyp, 0-Is, 0.3 cm, T colon s/p biopsy and removal.' },
        { short: 'HP, 0.6cm, S colon (Polypectomy)', long: 'Hyperplastic polyp, 0-Is, 0.6 cm, S colon s/p polypectomy' },
        { short: 'TA, 0.8cm, S colon (Polypectomy)', long: 'Tubular adenoma, 0-Is, 0.8 cm, S colon s/p polypectomy' },
        { short: 'TA, 0.5cm, Rectum (Polypectomy)', long: 'Tubular adenoma, 0-Ip, 0.5 cm, Rectum s/p polypectomy' },
        { short: 'Diverticulosis, S colon', long: 'Diverticulosis, S colon' },
        { short: 'Internal hemorrhoid', long: 'Internal hemorrhoid' },
        { short: 'External hemorrhoid', long: 'External hemorrhoid' },
    ]
};

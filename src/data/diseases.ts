/**
 * Maize leaf conditions with English + leb Acholi copy. Bundled for offline advisory.
 */
import type { AppLanguage } from '../i18n/types';

export type DiseaseId =
  | 'maize_leaf_blight'
  | 'maize_streak'
  | 'healthy'
  | 'mln'
  | 'not_maize_leaf';

export type DiseaseCopy = {
  name: string;
  shortDescription: string;
  symptoms: string[];
  management: string[];
  prevention: string[];
};

export type DiseaseInfo = {
  id: DiseaseId;
  en: DiseaseCopy;
  ach: DiseaseCopy;
};

export const diseases: DiseaseInfo[] = [
  {
    id: 'maize_leaf_blight',
    en: {
      name: 'Maize leaf blight',
      shortDescription:
        'Fungal disease causing long lesions on leaves; can reduce yield if untreated.',
      symptoms: [
        'Long, cigar-shaped brown or grey lesions on leaves',
        'Lesions often between leaf veins; may merge in wet weather',
        'Yellow halos sometimes around older spots',
      ],
      management: [
        'Remove badly infected lower leaves if practical (burn or bury away from field).',
        'Ask your agro-dealer for a labelled fungicide suitable for maize leaf blight.',
        'Improve air flow: avoid overcrowding; control weeds that keep leaves wet.',
        'Rotate maize with non-cereal crops where possible.',
      ],
      prevention: [
        'Use clean, certified seed from trusted sources.',
        'Avoid overhead irrigation that keeps foliage wet for long periods.',
        'Scout fields early, especially after warm, humid rains.',
      ],
    },
    ach: {
      name: 'Blight me bwooyo me bel',
      shortDescription:
        'Twooyo me fungus ma keto gweny madongo i bwooyo; romo dwoko bedo me yat ka pe ki keto.',
      symptoms: [
        'Gweny ma bor, ma rwot onyo ma can i bwooyo',
        'Gweny giketo i kind nyen me bwooyo; romo rwoyo ka twooyo pe',
        'Ribbe me yello romo bedo ikalo gweny ma odiko',
      ],
      management: [
        'Kwany bwooyo ma piny ma twooyo tek ka itwero (cwer onyo pik i kabedo ma pe tye i pur).',
        'Peny lapur me yat pi fungicide ma tye ki lagam ma ber pi blight me bel.',
        'Miyo yat me yom cwiny: kip kare ma yat mapol; gengo lum ma weko bwooyo a omel.',
        'Lok yat me bel ki yat ma pe a cereal ka itwero.',
      ],
      prevention: [
        'Ti ki nyig ma oyero ki ma a ki wil ma ber.',
        'Kip pe me pii ma weko bwooyo omel cawa malo.',
        'Nen pur mapol mapol, mapol mapol ka twooyo omel ki kidi.',
      ],
    },
  },
  {
    id: 'maize_streak',
    en: {
      name: 'Maize streak disease',
      shortDescription:
        'Viral disease spread by leafhoppers; shows as broken streaks on leaves.',
      symptoms: [
        'Fine, broken yellow or white streaks along leaf veins',
        'Stunted growth and smaller cobs on severely infected plants',
        'Symptoms often more visible on new growth',
      ],
      management: [
        'Uproot and destroy severely infected plants to reduce spread to neighbours.',
        'Control leafhoppers using methods advised by extension (insecticides only as labelled).',
        'Plant resistant varieties when available and recommended locally.',
        'Avoid planting next to infected fields when streak is known in the area.',
      ],
      prevention: [
        'Time planting to avoid peak leafhopper activity if known locally.',
        'Keep fields free of volunteer maize and alternate hosts near the crop.',
        'Use tolerant or resistant hybrids suited to your area when available.',
      ],
    },
    ach: {
      name: 'Streak me bel',
      shortDescription:
        'Twooyo me virus ma leafhopper gengo; nyuto i bwooyo calo ribbe ma opoto.',
      symptoms: [
        'Ribbe me yello onyo ma cwer ma patpat i yore me nyen me bwooyo',
        'Yat pe romo dong maber ki cob matidi i yat ma twooyo tek',
        'Nyut romo nen maber i yat manyen',
      ],
      management: [
        'Kwany ki cwer yat ma twooyo tek wek pe geng ne ki bur mapol.',
        'Keto leafhopper ikine ma lapur omiyo (insecticide kende ki lagam).',
        'Ket variety ma gengo twooyo ka tye ki ma kimiyo i kabedo ni.',
        'Kip pe keto ber ki pur ma twooyo ka streak angeyo ni tye i kabedo.',
      ],
      prevention: [
        'Ter keto yat wek kip cawa ma leafhopper tye ka tic malu.',
        'Wek pur bedo ma pe tye bel me awano ki yat mukene mapol i but yat.',
        'Ti ki hybrid ma gengo onyo ma yom cwiny pi kabedo ni ka tye.',
      ],
    },
  },
  {
    id: 'mln',
    en: {
      name: 'Maize lethal necrosis (MLN)',
      shortDescription:
        'A serious viral complex spread by insects; shows as severe streaking, drying, and stunting.',
      symptoms: [
        'Severe chlorotic streaks and leaf drying, often from base upward',
        'Stunted plants and poor ear development in advanced cases',
        'Can resemble other virus problems — confirm with local extension if unsure',
      ],
      management: [
        'Remove and destroy severely infected plants to slow spread.',
        'Control insect vectors (aphids, leafhoppers) using extension-recommended practices.',
        'Use clean seed and tolerant varieties where available and tested locally.',
      ],
      prevention: [
        'Rotate with non-host crops; avoid planting near heavily infected fields.',
        'Time planting to reduce exposure to peak vector pressure if known in your area.',
      ],
    },
    ach: {
      name: 'MLN (twooyo me bel ma twero keto yat)',
      shortDescription:
        'Twooyo me virus ma gengo yat; nyuto i bwooyo calo streak ki yat ma pe romo dong maber.',
      symptoms: [
        'Streak ma yello ki bwooyo ma omel, mapol mapol ki i piny',
        'Yat pe romo dong maber ki cob ni pe ber',
        'Romo bedo calo twooyo mukene — peny lapur ka pe in nge',
      ],
      management: [
        'Kwany ki cwer yat ma twooyo tek.',
        'Keto insect ma gengo ne ikine ma lapur omiyo.',
        'Ti ki nyig ma oyero ki variety ma yom cwiny.',
      ],
      prevention: [
        'Lok yat ki yat ma pe a host; kip keto ber ki pur ma twooyo.',
        'Ter keto yat me kip cawa magoro.',
      ],
    },
  },
  {
    id: 'not_maize_leaf',
    en: {
      name: 'Not a maize leaf',
      shortDescription:
        'The image does not show a clear maize leaf, or it may be a different plant. For best results, photograph maize leaves in good light.',
      symptoms: [
        'Background, soil-only, or non-maize leaves in the frame',
        'Blurry, too dark, or very small leaf area',
      ],
      management: [
        'Take a new photo: fill the frame with a maize leaf in daylight.',
        'Hold the phone steady; avoid sky-only or people-only shots.',
      ],
      prevention: [
        'Follow the in-app photo tips on the previous screens.',
      ],
    },
    ach: {
      name: 'Pe bwooyo me bel',
      shortDescription:
        'Cal pe nen calo bwooyo me bel, onyo tye yat mukene. Mi cal maber me bwooyo me bel i ceng.',
      symptoms: [
        'Cala me background, cato kende, onyo bwooyo pe me bel i cal',
        'Cal mabor, cato camil, onyo bwooyo tut tut',
      ],
      management: [
        'Mi cal manyen: nen bwooyo me bel i ceng i cal ni.',
        'Muk cal; kip cal pol kende onyo weng kende ber.',
      ],
      prevention: [
        'Lub nyukc me cal ma kidiyo i acaki i kom screen.',
      ],
    },
  },
  {
    id: 'healthy',
    en: {
      name: 'Healthy maize (no clear disease)',
      shortDescription:
        'Leaves look generally sound. Keep monitoring as the season progresses.',
      symptoms: [
        'Even green colour on most of the leaf blade',
        'No spreading brown or grey lesions typical of blight',
        'No broken yellow streaks along veins typical of streak disease',
      ],
      management: [
        'Continue regular scouting every few days.',
        'Ensure balanced nutrition and weed control as you normally would.',
        'If symptoms appear later, take a new clear photo in good light.',
      ],
      prevention: [
        'Maintain recommended plant spacing and rotation.',
        'Use clean seed and, where advised, treated seed.',
      ],
    },
    ach: {
      name: 'Bel ma yot (twooyo ma pe nen ber)',
      shortDescription:
        'Bwooyo nen calo yot. Med ka neno yat ka cawa me pur tye ka medo.',
      symptoms: [
        'Rangi me yero yot i kom bwooyo mapol',
        'Pe tye gweny ma rwot onyo ma can ma yaa cal blight',
        'Pe tye ribbe me yello ma patpat i yore cal streak',
      ],
      management: [
        'Med ka neno pur nino nino naka naka.',
        'Nen ni cam ki keto lum tye maber calo ipoloti.',
        'Ka nyut bilo cawa ma lub, mi cal manyen maber i ceng.',
      ],
      prevention: [
        'Lub kare ki kind yat ki lok yat ma kimiyo.',
        'Ti ki nyig ma oyero ki, ka kimiyo, nyig ma kitye.',
      ],
    },
  },
];

export function getDiseaseById(id: DiseaseId): DiseaseInfo | undefined {
  return diseases.find((d) => d.id === id);
}

export function getDiseaseCopy(info: DiseaseInfo, lang: AppLanguage): DiseaseCopy {
  return lang === 'ach' ? info.ach : info.en;
}

/**
 * Maize leaf conditions with English + leb Acholi copy. Bundled for offline advisory.
 */
import type { AppLanguage } from '../i18n/types';

export type DiseaseId =
  | 'common_rust'
  | 'gray_leaf_spot'
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
    id: 'common_rust',
    en: {
      name: 'Common Rust of Maize (Puccinia sorghi)',
      shortDescription:
        'A fungal disease that forms reddish-brown pustules on the leaves and spreads quickly in cool, humid weather.',
      symptoms: [
        'Small yellow spots on leaves',
        'Orange to reddish-brown powdery pustules on both leaf surfaces',
        'Rust-colored spores that rub off easily when touched',
        'Yellowing and drying of infected leaves',
        'Reduced plant growth and yield in severe infections',
      ],
      management: [
        'Plant rust-resistant maize varieties',
        'Apply recommended fungicides such as Propiconazole or Mancozeb when symptoms appear',
        'Remove and destroy heavily infected plant residues',
        'Practice crop rotation with non-host crops',
        'Monitor fields regularly for early detection',
      ],
      prevention: [
        'Use certified quality seed',
        'Plant at the recommended time',
        'Maintain proper plant spacing for good air circulation',
        'Keep fields free from weeds and volunteer maize plants',
        'Maintain good field sanitation by removing crop residues after harvest',
      ],
    },
    ach: {
      name: 'Common rust',
      shortDescription:
        'Twooyo me fungus ma keto gweny ma lyel i bwooyo; gengo oyotoyot ka twooyo ki kidi.',
      symptoms: [
        'Gweny ma lyel onyo ma cas i bwooyo ki piny ki malo',
        'Gweny odoko ma col mapol ka pur tye ka mede',
      ],
      management: [
        'Peny lapur me yat pi fungicide ma ber pi rust me bel ka twooyo tek',
        'Kwany bwooyo ma twooyo tek ka itwero',
        'Lok bel ki yat ma pe cereal wek pe twooyo omedi',
      ],
      prevention: [
        'Ti ki nyig me bel ma gengo rust',
        'Kip pe keto i kabedo ma omel ki ma pe yom yat',
      ],
    },
  },
  {
    id: 'gray_leaf_spot',
    en: {
      name: 'Gray Leaf Spot of Maize (Cercospora zeae-maydis)',
      shortDescription:
        'A fungal disease that produces rectangular gray-brown lesions between leaf veins and thrives in warm, humid weather.',
      symptoms: [
        'Small gray to tan spots on leaves',
        'Rectangular lesions that run parallel to leaf veins',
        'Lesions enlarge and turn gray or brown',
        'Leaves dry prematurely in severe infections',
        'Reduced grain yield',
      ],
      management: [
        'Plant resistant maize varieties',
        'Apply recommended fungicides when symptoms appear',
        'Remove and destroy infected crop residues',
        'Practice crop rotation with non-host crops',
        'Monitor fields regularly for early detection',
      ],
      prevention: [
        'Use certified quality seed',
        'Maintain proper plant spacing for good air circulation',
        'Practice crop rotation',
        'Keep fields free from weeds and volunteer maize plants',
        'Maintain good field sanitation after harvest',
      ],
    },
    ach: {
      name: 'Gray leaf spot',
      shortDescription:
        'Twooyo me fungus ma keto gweny ma can ma lyel i kind nyen me bwooyo; dongo ka twooyo ki kidi ki lyeto.',
      symptoms: [
        'Gweny ma can, ma lyel onyo ma yello ma cito i kind nyen me bwooyo',
        'Gweny romo rwoyo dok cwer bwooyo mapol ka twooyo tek',
      ],
      management: [
        'Kwany ki cwer bwooyo ma piny ma twooyo tek',
        'Peny lapur me yat pi fungicide ma keto tic i gray leaf spot',
        'Lok yat ki yat ma pe host',
      ],
      prevention: [
        'Ket variety ma gengo onyo ma yom cwiny',
        'Kip pe keto yat mapol wek yom cwiny yom',
      ],
    },
  },
  {
    id: 'maize_leaf_blight',
    en: {
      name: 'Maize Leaf Blight (Northern Leaf Blight - Exserohilum turcicum)',
      shortDescription:
        'A fungal disease that causes long, cigar-shaped lesions on leaves and can reduce yield if left untreated.',
      symptoms: [
        'Long, cigar-shaped grayish-green to brown lesions on leaves',
        'Lesions enlarge and become tan or brown',
        'Leaves dry prematurely',
        'Reduced plant vigor and grain yield',
        'Severe infections may cause extensive leaf blighting',
      ],
      management: [
        'Plant resistant maize varieties',
        'Apply recommended fungicides when symptoms first appear',
        'Remove and destroy infected crop residues',
        'Practice crop rotation with non-host crops',
        'Monitor fields regularly',
      ],
      prevention: [
        'Use certified quality seed',
        'Maintain proper plant spacing',
        'Practice crop rotation',
        'Keep fields free from weeds and volunteer maize plants',
        'Maintain good field sanitation',
      ],
    },
    ach: {
      name: 'Blight me bwooyo',
      shortDescription:
        'Twooyo me fungus ma keto gweny madongo i bwooyo; romo dwoko bedo me yat ka pe ki keto.',
      symptoms: [
        'Gweny ma bor, ma rwot onyo ma can i bwooyo',
        'Gweny romo rwoyo ka twooyo pe',
      ],
      management: [
        'Kwany bwooyo ma piny ma twooyo tek ka itwero',
        'Peny lapur me yat pi fungicide ma ber pi blight me bel',
        'Lok yat me bel ki yat ma pe cereal ka itwero',
      ],
      prevention: [
        'Ti ki nyig ma oyero ki ma a ki wil ma ber',
        'Kip pe me pii ma weko bwooyo omel cawa malo',
      ],
    },
  },
  {
    id: 'maize_streak',
    en: {
      name: 'Maize streak disease',
      shortDescription:
        'A viral disease spread by leafhoppers that shows as broken streaks on the leaves.',
      symptoms: [
        'Fine, broken yellow or white streaks along leaf veins',
        'Stunted growth and smaller cobs in severe cases',
      ],
      management: [
        'Uproot and destroy severely infected plants',
        'Control leafhoppers, which spread the disease',
        'Plant resistant varieties where available',
      ],
      prevention: [
        'Plant early to avoid peak leafhopper activity',
        'Use tolerant or resistant hybrids where available',
      ],
    },
    ach: {
      name: 'Maize Streak',
      shortDescription:
        'Twooyo me virus ma leafhopper gengo; nyuto i bwooyo calo ribbe ma opoto.',
      symptoms: [
        'Ribbe me yello onyo ma cwer ma patpat i yore me nyen me bwooyo',
        'Yat pe romo dong maber ki cob matidi ka twooyo tek',
      ],
      management: [
        'Kwany ki cwer yat ma twooyo tek',
        'Keto leafhopper, ma gengo twooyo ni',
        'Ket variety ma gengo twooyo ka tye',
      ],
      prevention: [
        'Ter keto yat wek kip cawa ma leafhopper tye ka tic malu',
        'Ti ki hybrid ma gengo onyo ma yom cwiny ka tye',
      ],
    },
  },
  {
    id: 'mln',
    en: {
      name: 'Maize lethal necrosis (MLN)',
      shortDescription:
        'A serious viral complex spread by insects that shows as severe streaking, drying, and stunting.',
      symptoms: [
        'Severe yellow streaking and leaf drying, often from the base upward',
        'Stunted plants with poor cob development',
      ],
      management: [
        'Remove and destroy severely infected plants',
        'Control aphids and leafhoppers',
        'Use clean seed and tolerant varieties where available',
      ],
      prevention: [
        'Rotate with non-host crops',
        'Avoid planting near heavily infected fields',
      ],
    },
    ach: {
      name: 'Maize lethal',
      shortDescription:
        'Twooyo me virus ma gengo yat; nyuto i bwooyo calo streak ki yat ma pe romo dong maber.',
      symptoms: [
        'Streak ma yello ki bwooyo ma omel, mapol mapol ki i piny',
        'Yat pe romo dong maber ki cob ni pe ber',
      ],
      management: [
        'Kwany ki cwer yat ma twooyo tek',
        'Keto insect ma gengo ne (aphids, leafhoppers)',
        'Ti ki nyig ma oyero ki variety ma yom cwiny',
      ],
      prevention: [
        'Lok yat ki yat ma pe host',
        'Kip keto ber ki pur ma twooyo tek',
      ],
    },
  },
  {
    id: 'not_maize_leaf',
    en: {
      name: 'Not a maize leaf',
      shortDescription:
        "We couldn't find a maize leaf in this photo. Please try again with a clear, close-up photo of a maize leaf.",
      symptoms: [],
      management: [],
      prevention: [],
    },
    ach: {
      name: 'Pe Oboke Anywagi',
      shortDescription:
        'Pe ki nongo bwooyo me bel i cal ni. Mi cal manyen ma nen maber, cok cok, me bwooyo me bel.',
      symptoms: [],
      management: [],
      prevention: [],
    },
  },
  {
    id: 'healthy',
    en: {
      name: 'Healthy maize (no clear disease)',
      shortDescription:
        'The leaf looks generally sound. Keep monitoring as the season progresses.',
      symptoms: [
        'Even green colour across most of the leaf',
        'No spreading lesions or streaks',
      ],
      management: [
        'Continue regular field scouting',
        'Maintain balanced nutrition and weed control',
      ],
      prevention: [
        'Maintain recommended spacing and crop rotation',
        'Use clean, treated seed where advised',
      ],
    },
    ach: {
      name: 'Bel ma yot (twooyo ma pe nen ber)',
      shortDescription:
        'Bwooyo nen calo yot. Med ka neno yat ka cawa me pur tye ka medo.',
      symptoms: [
        'Rangi me yero yot i kom bwooyo mapol',
        'Pe tye gweny onyo ribbe ma yaa twooyo',
      ],
      management: [
        'Med ka neno pur nino nino',
        'Nen ni cam ki keto lum tye maber',
      ],
      prevention: [
        'Lub kare ki kind yat ki lok yat ma kimiyo',
        'Ti ki nyig ma oyero ki, ka kimiyo, nyig ma kitye',
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

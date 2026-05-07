import type { AppLanguage } from './types';

/** UI copy: English + leb Acholi. */
const STRINGS = {
  en: {
    tabs: { home: 'Home', diagnose: 'Diagnose', more: 'More' },
    home: {
      heroSub: 'Maize disease help for farmers.',
      overviewSectionLabel: 'App overview',
      overviewIntro:
        'AGRICARE is a field companion for maize growers. It focuses on leaf health: you get a likely condition and clear advice on symptoms, what to do, and prevention. Use the Diagnose tab in the bottom menu when you are ready to add a leaf photo and run a check — not from this screen.',
      overviewBullet1: 'Built for offline use once the app is installed.',
      overviewBullet2: 'English or leb Acholi on key screens and articles.',
      overviewBullet3: 'Diagnosis steps and photo capture live only under Diagnose.',
      settingsShortcut: 'More: language & options',
      takePhoto: 'Take photo',
      /** Shown on camera action — explicit “camera” wording */
      useCamera: 'Use camera',
      useCameraA11y: 'Open the camera to photograph maize leaves',
      chooseGallery: 'Choose from gallery',
      stepsBeforePhoto: 'Steps & photo tips',
      cameraBlockTitle: 'Take a new photo',
      galleryBlockTitle: 'Use a photo you already have',
      orDivider: '— or —',
      aboutSettings: 'About & settings',
    },
    diagnose: {
      stackCapture: 'Take or choose photo',
      stackProcessing: 'Diagnosing leaves…',
      diagnosisFailedTitle: 'Diagnosis could not run',
      diagnosisFailedMsg:
        'Diagnosis could not read this image. Re-take a clear maize leaf photo and try again.',
      diagnosisFailedButton: 'Back to start',
      stackResult: 'Diagnosis result',
      homeTitle: 'Diagnose maize',
      tipPhoto:
        'Use daylight if you can. Hold the phone steady and fill the frame with the leaf.',
      howItWorks: 'How it works',
      step1: 'Take or choose a photo of maize leaves.',
      step2: 'The app checks the image.',
      step3:
        'After analysis, read the treatment, prevention, and recommendations for the identified condition.',
      illusCaption:
        'Photo should show one or two leaves clearly — not your face or the sky only.',
      captureHeading: 'Photo of maize leaves',
      captureLead: 'Tap a button below. Use a clear picture of one or two leaves.',
      captureChooseMethod: 'Add a photo',
      captureNote:
        'The photo stays on this device. The next step prepares it for the disease check.',
      permLibrary:
        'Allow photo library access so you can choose a maize leaf picture.',
      permCamera: 'Allow camera access to photograph maize leaves.',
      permNeeded: 'Permission needed',
      webCameraHint:
        'On a computer, “Take photo” may not open a camera — use “Choose from gallery” or run the app on your phone.',
      nativeCameraHint: 'Use daylight if you can. Hold steady and fill the frame with the leaf.',
      processingOverlay: 'Diagnosing leaves…',
      processingTitle: 'Diagnosing your leaf',
      processingSub: 'This runs on your device. No internet needed.',
      loadingStep1: 'Preparing your image',
      loadingStep2: 'Loading AI model',
      loadingStep3: 'Analysing leaf patterns',
      loadingStep4: 'Reading results',
      resultLikely: 'Likely condition',
      /** Shown above the large disease name after analysis */
      resultMaizeDiseaseLabel: 'Maize disease',
      resultFromAnalysis: 'From analysis of your leaf photo',
      resultDemoNote: 'Analysed on this device using an AI model trained on maize leaf images.',
      resultConfidence: 'Confidence',
      resultAdvisoryLead:
        'Advisory after analysis — for the condition above (symptoms, what to do, and prevention):',
      /** Goes straight to camera / gallery — new photo */
      resultStartNewDiagnosis: 'Start new diagnosis',
      /** Returns to diagnose intro (tips, how it works) */
      resultBackToDiagnoseHome: 'Back to diagnose tips',
    },
    advice: {
      symptoms: 'Symptoms to look for',
      management: 'Management & treatment',
      prevention: 'Prevention',
      disclaimer:
        'Always confirm chemical use and rates with product labels and local extension advice.',
    },
    settings: {
      title: 'More',
      sub: 'Language and app options.',
      language: 'Language',
      languageHint: 'English or leb Acholi for key screens and articles.',
      english: 'English',
      acholi: 'Leb Acholi',
      offlineTitle: 'Offline advisory',
      offlineHint:
        'Advisory text is shown on the result screen after analysis — stored in the app, no internet needed.',
      offlineOn: 'On',
      modelTitle: 'Diagnosis (on-device AI model)',
      modelBody:
        'Disease check runs fully on this device using a TFLite model trained on maize leaf images. No internet required.',
      aboutTitle: 'About AGRICARE',
      aboutBody:
        'Helps you spot maize leaf problems from a photo and gives simple advice. Works offline after install.',
      speechHelp:
        'Tap Listen (microphone) on any screen to hear the text read aloud in your chosen language.',
    },
    readAloud: {
      listen: 'Listen',
      stop: 'Stop',
      a11y: 'Read this screen aloud. Tap again to stop.',
    },
  },
  ach: {
    tabs: { home: 'Acaki', diagnose: 'Nong twooyo', more: 'Mukene' },
    home: {
      heroSub: 'Kony me twooyo me bel i pur.',
      overviewSectionLabel: 'Lok mapol i kom app',
      overviewIntro:
        'AGRICARE tye app me kony me pur me bel. Tye ki twooyo me bwooyo ki kony mayot ikom nyut, ngo me timo, ki gengo. Ti ki tab me Nong twooyo i cing me piny ka imito med cal me bwooyo ki cako neno — pe ki acaki ni.',
      overviewBullet1: 'Tiyo ka intanet pe mite ka app dong oketo.',
      overviewBullet2: 'English onyo leb Acholi i lok mapol.',
      overviewBullet3: 'Nyukc me twooyo ki cal tye i Nong twooyo kende.',
      settingsShortcut: 'Mukene: leb ki lok',
      takePhoto: 'Mi cal',
      useCamera: 'Ti ki camera',
      useCameraA11y: 'Yab camera wek imii cal me bwooyo me bel',
      chooseGallery: 'Yer cal ki gallery',
      stepsBeforePhoto: 'Nyukc ki lok me cal',
      cameraBlockTitle: 'Mi cal manyen',
      galleryBlockTitle: 'Ti ki cal ma dong tye',
      orDivider: '— onyo —',
      aboutSettings: 'Makwako app & ter',
    },
    diagnose: {
      stackCapture: 'Mi cal onyo yer cal',
      stackProcessing: 'Tye ka twooyo bwooyo…',
      diagnosisFailedTitle: 'Twooyo pe oromo timo',
      diagnosisFailedMsg:
        'Pe oromo neno cal ni. Mi cal maber me bwooyo me bel ka doki.',
      diagnosisFailedButton: 'Dwogo i acaki',
      stackResult: 'Kelo me twooyo',
      homeTitle: 'Nong twooyo me bel',
      tipPhoto:
        'Ti ki ceng ka itwero. Muk cal maber, nen bwooyo ber ikom cal.',
      howItWorks: 'Tye ka timo nining',
      step1: 'Mi cal onyo yer cal me bwooyo me bel.',
      step2: 'App tye ka neno cal.',
      step3:
        'Ka dong oromo neno, kwan ngo me keto, gengo, ki lok ma kimiyo pi twooyo ma kineno.',
      illusCaption:
        'Cal myero nen bwooyo acel onyo aryo maber — pe weng onyo pol matwal kende.',
      captureHeading: 'Cal me bwooyo me bel',
      captureLead: 'Dii bute ma piny. Ti ki cal maber me bwooyo acel onyo aryo.',
      captureChooseMethod: 'Med cal',
      captureNote:
        'Cal tye i cim ni. Nyukc ma lub tye ka yore cal me neno twooyo.',
      permLibrary: 'Miy yub me gallery wek iyero cal me bwooyo me bel.',
      permCamera: 'Miy yub me camera wek imii cal me bwooyo me bel.',
      permNeeded: 'Miyo yub mite',
      webCameraHint:
        'Ki kompiuta, “Mi cal” pe romo yab camera — ti ki “Yer cal ki gallery” onyo ti ki app i cim.',
      nativeCameraHint: 'Ti ki ceng ka itwero. Muk cal, nen bwooyo i cal.',
      processingOverlay: 'Tye ka twooyo bwooyo…',
      processingTitle: 'Tye ka twooyo bwooyo ni',
      processingSub: 'Tiyo ki cim ni. Intanet pe mite.',
      loadingStep1: 'Yubo cal mamegi',
      loadingStep2: 'Cano model AI',
      loadingStep3: 'Tye ka twooyo bwooyo',
      loadingStep4: 'Kelo lok me twooyo',
      resultLikely: 'Twooyo ma romo bedo',
      resultMaizeDiseaseLabel: 'Twooyo me bel',
      resultFromAnalysis: 'Ki i neno cal me bwooyo ni',
      resultDemoNote: 'Yero ki model AI ma tye i cim ni ma kitye i bwooyo me bel.',
      resultConfidence: 'Gen me neno',
      resultAdvisoryLead:
        'Kony me pur ka dong oromo neno — pi twooyo malu (nyut, ngo me timo, ki gengo):',
      resultStartNewDiagnosis: 'Cak twooyo manyen',
      resultBackToDiagnoseHome: 'Dwogo i nyukc me nong twooyo',
    },
    advice: {
      symptoms: 'Nyut me neno',
      management: 'Ngo me keto & yat',
      prevention: 'Ngo me gengo',
      disclaimer:
        'Lub lagam me yat ki lony lapur mapol mapol ikum tic ki chemistry.',
    },
    settings: {
      title: 'Mukene',
      sub: 'Leb ki lok mapol me app.',
      language: 'Leb',
      languageHint: 'English onyo leb Acholi pi lok mapol i app.',
      english: 'English',
      acholi: 'Leb Acholi',
      offlineTitle: 'Pur ma pe mito intanet',
      offlineHint:
        'Lok me pur bino i kelo ka dong oromo neno — tye i app, intanet pe mite.',
      offlineOn: 'Tye',
      modelTitle: 'Neno twooyo (model AI i cim)',
      modelBody:
        'Neno twooyo tiyo ki model TFLite ma tye i cim ni. Intanet pe mite.',
      aboutTitle: 'Makwako AGRICARE',
      aboutBody:
        'Kony me neno twooyo me bwooyo me bel ki cal ki kony mayot. Tye ka tiyo ka app dong oketo — intanet pe mite.',
      speechHelp:
        'Dii Listen (mic) i kom screen wek owiny lok ma kwan i leb ma iyero.',
    },
    readAloud: {
      listen: 'Kwan lok',
      stop: 'Cung',
      a11y: 'Kwan lok i kom screen ni. Dii doki wek cung.',
    },
  },
} as const;

export type Strings = (typeof STRINGS)['en'];

export function getStrings(lang: AppLanguage): Strings {
  return STRINGS[lang] as unknown as Strings;
}

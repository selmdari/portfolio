export type Lang = 'en' | 'fr';

export const ui = {
  en: {
    'nav.back': '← Back to project list',
    'splat.loading': 'Loading 3D scan…',
    'splat.hint': 'Drag to rotate · Scroll to zoom',
    'splat.resume': '↺ Resume 3D',
  },
  fr: {
    'nav.back': '← Retour aux projets',
    'splat.loading': 'Chargement du scan 3D…',
    'splat.hint': 'Glisser pour tourner · Défiler pour zoomer',
    'splat.resume': '↺ Reprendre la 3D',
  },
} as const;

export function t(lang: Lang, key: keyof typeof ui['en']): string {
  return ui[lang][key];
}

const disciplineNames: Record<string, { en: string; fr: string }> = {
  'cad':         { en: 'CAD',         fr: 'CAO' },
  'hardware':    { en: 'Hardware',    fr: 'Matériel' },
  'electronics': { en: 'Electronics', fr: 'Électronique' },
  'firmware':    { en: 'Firmware',    fr: 'Micrologiciel' },
  'robotics':    { en: 'Robotics',    fr: 'Robotique' },
  'design':      { en: 'Design',      fr: 'Design' },
  'mechanical':  { en: 'Mechanical',  fr: 'Mécanique' },
  'software':    { en: 'Software',    fr: 'Logiciel' },
  'structural':  { en: 'Structural',  fr: 'Structural' },
  'civil':       { en: 'Civil',       fr: 'Génie civil' },
  'fea':         { en: 'FEA',         fr: 'ÉEF' },
};

export function disciplineLabel(discipline: string, lang: Lang): string {
  const key = discipline.toLowerCase().replace(/\s+/g, '-');
  return disciplineNames[key]?.[lang] ?? discipline;
}

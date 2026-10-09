// Mirror of design-system v3 tokens — light + dark. Keep in sync with ../../app/globals.css.
// Compositions read from `themes[name]` so a single render pipeline produces both variants.

export type ThemeName = 'light' | 'dark';

type Theme = {
  blue: string;
  blueGlow: string;
  amber: string;
  bg: string;
  surface: string;
  surface2: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  border: string;
  borderMd: string;
  borderStr: string;
  success: string;
  successBg: string;
  successBd: string;
  meshA: string; // primary mesh gradient color (centred top-left)
  meshB: string; // secondary mesh gradient color (centred bottom-right)
  nodeShadow: string;
};

export const themes: Record<ThemeName, Theme> = {
  light: {
    blue: '#0B9EDE',
    blueGlow: 'rgba(11,158,222,0.12)',
    amber: '#F97316',
    bg: '#FFFFFF',
    surface: '#F8F9FB',
    surface2: '#F1F3F7',
    text1: '#0D1117',
    text2: '#374151',
    text3: '#6B7280',
    text4: '#9CA3AF',
    border: 'rgba(0,0,0,0.07)',
    borderMd: 'rgba(0,0,0,0.12)',
    borderStr: 'rgba(0,0,0,0.18)',
    success: '#16A34A',
    successBg: 'rgba(22, 163, 74, 0.10)',
    successBd: 'rgba(22, 163, 74, 0.20)',
    meshA: 'rgba(11,158,222,0.10)',
    meshB: 'rgba(11,158,222,0.08)',
    nodeShadow: 'rgba(11,158,222,0.14)',
  },
  dark: {
    blue: '#0EA5E9',
    blueGlow: 'rgba(14,165,233,0.18)',
    amber: '#F97316',
    bg: '#0A0C10',
    surface: '#0E1117',
    surface2: '#161B25',
    text1: '#F0F4F8',
    text2: 'rgba(255,255,255,0.75)',
    text3: 'rgba(255,255,255,0.55)',
    text4: 'rgba(255,255,255,0.35)',
    border: 'rgba(255,255,255,0.07)',
    borderMd: 'rgba(255,255,255,0.12)',
    borderStr: 'rgba(255,255,255,0.22)',
    success: '#22C55E',
    successBg: 'rgba(34, 197, 94, 0.14)',
    successBd: 'rgba(34, 197, 94, 0.30)',
    meshA: 'rgba(14,165,233,0.18)',
    meshB: 'rgba(14,165,233,0.10)',
    nodeShadow: 'rgba(14,165,233,0.30)',
  },
};

export const fonts = {
  display: '"Manrope", "Inter", system-ui, sans-serif', // v3.1 display face
  sans: '"Inter", system-ui, sans-serif',
  mono: '"JetBrains Mono", "Fira Code", monospace',
} as const;

export const radius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xl2: 24,
  full: 9999,
} as const;

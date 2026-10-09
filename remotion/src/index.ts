import { registerRoot } from 'remotion';
import { loadFont as loadManrope } from '@remotion/google-fonts/Manrope';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadJetBrainsMono } from '@remotion/google-fonts/JetBrainsMono';
import { RemotionRoot } from './Root';

// Load the site's v3.1 type stack explicitly. Without this the renders used
// whatever the rendering machine had installed (Segoe UI on Windows, DejaVu
// on Linux), so videos changed typeface depending on where they were built.
loadManrope('normal', { weights: ['600', '700', '800'], subsets: ['latin'] });
loadInter('normal', { weights: ['400', '500', '600'], subsets: ['latin'] });
loadJetBrainsMono('normal', { weights: ['400', '500'], subsets: ['latin'] });

registerRoot(RemotionRoot);

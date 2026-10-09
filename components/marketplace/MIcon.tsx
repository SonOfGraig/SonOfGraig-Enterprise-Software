import {
  Activity, AudioWaveform, BadgeCheck, Binary, Brain, Circle, CircleHelp, CloudOff, Download, FileText, Fingerprint, Gauge, Hand, Infinity as InfinityIcon,
  Key, LayoutGrid, Lock, LockOpen, Monitor, MoreHorizontal, Moon, Network, PowerOff, Radar, Route, ScanFace, Send, ShieldCheck, ShieldEllipsis, Smartphone,
  Snowflake, Sun, RefreshCw, Triangle, Vibrate, Waves, Zap, DoorClosed, Cpu, BarChart3, type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// The 2026 Marketplace components used Google's Material Symbols icon font.
// This maps every symbol they use to a lucide icon, sized by the surrounding
// font-size (1em) so the originals' text-* sizing classes still apply.
const MAP: Record<string, LucideIcon> = {
  ac_unit: Snowflake,
  account_tree: Network,
  all_inclusive: InfinityIcon,
  analytics: BarChart3,
  bolt: Zap,
  change_history: Triangle,
  cloud_off: CloudOff,
  dark_mode: Moon,
  description: FileText,
  desktop_windows: Monitor,
  download: Download,
  enhanced_encryption: ShieldEllipsis,
  fingerprint: Fingerprint,
  grid_view: LayoutGrid,
  help_outline: CircleHelp,
  hub: Network,
  key: Key,
  light_mode: Sun,
  lock: Lock,
  lock_open: LockOpen,
  memory: Cpu,
  more_horiz: MoreHorizontal,
  power_off: PowerOff,
  psychology: Brain,
  radar: Radar,
  route: Route,
  send: Send,
  sensor_door: DoorClosed,
  shield_lock: ShieldCheck,
  smartphone: Smartphone,
  spatial_tracking: ScanFace,
  speed: Gauge,
  sync: RefreshCw,
  touch_app: Hand,
  verified: BadgeCheck,
  verified_user: ShieldCheck,
  vibration: Vibrate,
  vital_signs: Activity,
  vpn_lock: Lock,
  waves: Waves,
  binary: Binary,
  audio: AudioWaveform,
};

export function MIcon({ name, className, ...rest }: { name: string; className?: string } & React.HTMLAttributes<HTMLSpanElement>) {
  const Icon = MAP[name] ?? Circle;
  return (
    <span aria-hidden="true" className={cn('inline-flex items-center justify-center leading-none text-[24px]', className)} {...rest}>
      <Icon width="1em" height="1em" strokeWidth={1.75} />
    </span>
  );
}

import { Home, Compass, Plane, CloudRain, UserRound } from 'lucide-react';
import { LiquidNavbar } from './liquid-glass-navbar';

export default function Demo() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 16px', background: '#dcebf5' }}>
      <LiquidNavbar tone="light" defaultActive={0} sound={false} items={[
        { label: 'Home', icon: <Home size={18} />, fx: 'glow' },
        { label: 'Explore', icon: <Compass size={18} />, fx: 'spin' },
        { label: 'Flights', icon: <Plane size={18} />, fx: 'plane' },
        { label: 'Weather', icon: <CloudRain size={18} />, fx: 'drop' },
        { label: 'Profile', icon: <UserRound size={18} />, fx: 'wave' },
      ]} />
      <span style={{ font: '500 12px/1 system-ui', color: 'rgba(11,19,43,.5)' }}>
        by <a href="https://guglielmogiannattasio.it" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(11,19,43,.7)' }}>guglielmogiannattasio.it</a>
      </span>
    </div>
  );
}

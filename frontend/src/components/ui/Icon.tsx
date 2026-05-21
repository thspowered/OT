type IconName =
  | 'alert'
  | 'arrow'
  | 'briefcase'
  | 'calendar'
  | 'chart'
  | 'check'
  | 'chevron'
  | 'dashboard'
  | 'filter'
  | 'flame'
  | 'mail'
  | 'moon'
  | 'phone'
  | 'search'
  | 'sun'
  | 'target'
  | 'user';

interface IconProps {
  name: IconName;
  size?: number;
}

const paths: Record<IconName, string> = {
  alert: 'M12 8v4m0 4h.01M10.3 3.6 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  briefcase: 'M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-9 0h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm4 5h4',
  calendar: 'M8 3v4m8-4v4M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z',
  chart: 'M4 19V5m0 14h16M8 16v-5m4 5V8m4 8v-7',
  check: 'm5 13 4 4L19 7',
  chevron: 'm8 10 4 4 4-4',
  dashboard: 'M4 13h7V4H4v9Zm9 7h7V4h-7v16ZM4 20h7v-5H4v5Z',
  filter: 'M4 5h16l-6 7v5l-4 2v-7L4 5Z',
  flame: 'M12 22a7 7 0 0 0 7-7c0-4-3-6-4-9-.4 2.2-1.7 3.2-3 4-1.6-2-1.2-4.5-.7-7C8 5.2 5 8.6 5 15a7 7 0 0 0 7 7Z',
  mail: 'M4 6h16v12H4V6Zm0 1 8 6 8-6',
  moon: 'M21 14.8A8.5 8.5 0 0 1 9.2 3 7 7 0 1 0 21 14.8Z',
  phone: 'M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6.4 6.4l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z',
  search: 'm21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z',
  sun: 'M12 4V2m0 20v-2m8-8h2M2 12h2m13.7-5.7 1.4-1.4M4.9 19.1l1.4-1.4m0-11.4L4.9 4.9m14.2 14.2-1.4-1.4M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-3a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  user: 'M20 21a8 8 0 0 0-16 0m12-13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z'
};

export function Icon({ name, size = 18 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}

const paths: Record<string, string> = {
  flow: 'M5 3v18M5 7h10a4 4 0 0 1 0 8H5M12 3l4 4-4 4',
  library: 'M4 4h6v16H4zM14 4h6v16h-6zM7 8v8M17 8v8',
  settings: 'M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  copy: 'M9 9h11v12H9zM5 16H3V3h12v2',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  download: 'M12 3v12M7 10l5 5 5-5M4 17v4h16v-4',
  upload: 'M12 16V4M7 9l5-5 5 5M4 17v4h16v-4',
  check: 'M5 12l4 4L19 6',
  close: 'M6 6l12 12M18 6 6 18',
  search: 'M20 20l-5-5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
  send: 'M3 3l19 9-19 9 4-9-4-9M7 12h15',
  file: 'M5 3h9l5 5v13H5zM14 3v6h5M8 13h8M8 17h6',
  plus: 'M12 5v14M5 12h14',
};

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.file} /></svg>;
}

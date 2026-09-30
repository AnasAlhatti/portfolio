export function Arrow({ diagonal = false, className = '', ...props }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export function Icon({ name, ...props }) {
  const paths = {
    plus: 'M12 5v14M5 12h14',
    close: 'm6 6 12 12M6 18 18 6',
    menu: 'M4 8h16M4 16h16',
    previous: 'm15 6-6 6 6 6',
    next: 'm9 6 6 6-6 6',
    download: 'M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4',
    code: 'm8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18',
    layers: 'm12 3 10 6-10 6L2 9l10-6ZM2 13l10 6 10-6M2 17l10 6 10-6',
    sparkle: 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z',
  };
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path d={paths[name] ?? paths.code} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

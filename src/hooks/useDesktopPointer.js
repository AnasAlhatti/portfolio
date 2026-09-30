import { useSyncExternalStore } from 'react';

const pointerQuery = '(min-width: 851px) and (hover: hover) and (pointer: fine)';
const subscribePointer = (callback) => {
  const query = window.matchMedia(pointerQuery);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
};

export function useDesktopPointer() {
  return useSyncExternalStore(subscribePointer, () => window.matchMedia(pointerQuery).matches, () => false);
}

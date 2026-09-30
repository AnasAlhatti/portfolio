import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
Object.defineProperty(window, 'matchMedia', { writable: true, value: vi.fn().mockImplementation((query) => ({
 matches: query.includes('prefers-reduced-motion'), media: query, onchange: null,
 addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn()
})) });
class Observer { observe() {} unobserve() {} disconnect() {} }
globalThis.IntersectionObserver = Observer;
globalThis.ResizeObserver = Observer;
window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();

const storageWindow = new JSDOM('', { url: 'https://portfolio.test/' }).window;
Object.defineProperty(globalThis, 'localStorage', { value: storageWindow.localStorage, configurable: true });
Object.defineProperty(globalThis, 'Storage', { value: storageWindow.Storage, configurable: true });
HTMLDialogElement.prototype.showModal = function () { this.open = true; };
HTMLDialogElement.prototype.close = function () { this.open = false; };

/// <reference types="vite/client" />
/// <reference types="vite-imagetools/client" />

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

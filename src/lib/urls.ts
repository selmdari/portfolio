export const baseUrl = (): string => import.meta.env.BASE_URL.replace(/\/$/, '');

export const withBase = (path: string): string =>
  `${baseUrl()}${path.startsWith('/') ? path : `/${path}`}`;

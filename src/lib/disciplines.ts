export function pillClass(discipline: string): string {
  const key = discipline.toLowerCase().replace(/\s+/g, '-');
  const map: Record<string, string> = {
    'hardware': 'hardware',
    'electronics': 'electronics',
    'firmware': 'firmware',
    'robotics': 'robotics',
    'design': 'design',
    'fea': 'fea',
    'structural': 'structural',
    'civil': 'civil',
    'mechanical': 'mechanical',
    'software': 'software',
  };
  return map[key] ?? 'default';
}

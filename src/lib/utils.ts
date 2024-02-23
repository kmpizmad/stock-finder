import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function capitalize(str: string): string {
  return str[0].toUpperCase() + str.substring(1);
}

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 1000
): (...args: Parameters<T>) => any {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);

    let result: any = null;
    timeout = setTimeout(async () => {
      result = await fn(...args);
    }, delay);

    return result;
  };
}

export function isDescendant(childNode: Node, parentNode: Node): boolean {
  if (childNode === parentNode) return true;
  if (childNode === document.body || childNode.parentElement === null) return false;

  return isDescendant(childNode.parentElement, parentNode);
}

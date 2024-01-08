import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getThumb(content: string) {
  const imgRegex = new RegExp(
    /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g
  );

  while (imgRegex.test(content)) {
    return RegExp.$2;
  }
}

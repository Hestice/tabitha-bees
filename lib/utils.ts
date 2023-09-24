import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSizeName(value: string) {
  switch (value) {
    case "s":
      return "Small"
    case "r":
      return "Regular"
    case "l":
      return "Large"
    case "one-size":
      return "One Size"
  }
}

export function getSizeValue(value: string) {
  switch (value) {
    case "s":
      return "120g"
    case "r":
      return "350g"
    case "l":
      return "450g"
    case "one-size":
      return "4.7g"
  }
}
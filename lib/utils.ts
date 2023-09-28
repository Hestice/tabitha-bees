import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSizeName(value: string) {
  switch (value) {
    case "xs":
      return "Extra Small"
    case "s":
      return "Small"
    case "r":
      return "Regular"
    case "l":
      return "Large"
    case "tube":
      return "Tube"
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
    case "tube":
      return "4.7g"
  }
}

export function getScentName(value: string) {
  switch (value) {
    case "n":
      return "Natural"
    case "c":
      return "Citronella"
    case "fp":
      return "French Pear"
    case "wb":
      return "White Birch"
  }
}
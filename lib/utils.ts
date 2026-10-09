import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// The design system's type tokens (globals.css @layer utilities) look like
// `text-*` utilities. Unregistered, tailwind-merge files them under text
// *colour* and silently drops them whenever a colour class such as
// `text-[var(--sg-text-1)]` sits beside them. Registering them as font sizes
// keeps both.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["hero", "display", "h1", "h2", "h3", "body-lg", "body", "caption", "label", "code"] },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

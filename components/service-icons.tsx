
import { IconProps } from "lucide-react"

export const ServiceIcons = {
  "home-cleaning": (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6M3 6h18M3 6c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2"/>
      <path d="m6 10 2 2 4-4"/>
    </svg>
  ),
  "repairs-maintenance": (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  "plumbing": (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2v2M12 8v2M12 14v2M12 20v2M2 12h2M8 12h2M14 12h2M20 12h2"/>
      <circle cx="12" cy="12" r="4"/>
    </svg>
  ),
  "painting-renovation": (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
      <path d="M8 12h8M12 16V8"/>
    </svg>
  ),
  "pest-control": (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0M4.5 4.5l15 15"/>
    </svg>
  )
}

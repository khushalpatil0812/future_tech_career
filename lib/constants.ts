export const SITE_NAME = "Future-Tech Career"
export const API_BASE = "/api"

export const CONTACT_INFO = {
  phones: ["7385552872", "9270315005"],
  email: "carreirsfuturetech@gmail.com",
  linkedin: "https://www.linkedin.com/company/future-tech-career/",
}

export const INQUIRY_TYPES = [
  "Career Guidance",
  "Resume Writing",
  "Interview Prep",
  "LinkedIn Optimization",
  "Internship Program",
  "Other",
] as const

export type InquiryType = (typeof INQUIRY_TYPES)[number]

/**
 * Simple logger utility that only logs in development mode
 * Prevents console.log/error statements in production
 */

const isDevelopment = process.env.NODE_ENV === 'development'

export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args)
    }
  },

  error: (message: string, error?: any) => {
    if (isDevelopment) {
      console.error(message, error)
    }
    // In production, you would send to error tracking service
    // e.g., Sentry.captureException(error)
  },

  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args)
    }
  },

  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args)
    }
  },
}

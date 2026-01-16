export const logger = {
  info: (message, ...args) => {
    console.log(`ℹ️  [INFO] ${message}`, ...args);
  },
  
  error: (message, ...args) => {
    console.error(`❌ [ERROR] ${message}`, ...args);
  },
  
  warn: (message, ...args) => {
    console.warn(`⚠️  [WARN] ${message}`, ...args);
  },
  
  success: (message, ...args) => {
    console.log(`✅ [SUCCESS] ${message}`, ...args);
  }
};

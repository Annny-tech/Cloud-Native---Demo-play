function timestamp() {
  return new Date()
    .toISOString();
}

const logger = {
  info(message) {
    console.log(
      `[${timestamp()}] [INFO] ${message}`
    );
  },

  error(message) {
    console.error(
      `[${timestamp()}] [ERROR] ${message}`
    );
  },

  warn(message) {
    console.warn(
      `[${timestamp()}] [WARN] ${message}`
    );
  }
};

export default logger;
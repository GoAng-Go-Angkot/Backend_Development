class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.name = 'ValidationError';
    this.details = details
  }
}

export default ValidationError
class DatabaseError extends Error {
  constructor(message, type) {
    super(message);
    this.name = 'DatabaseError';
    this.type = type
  }
}

export default DatabaseError
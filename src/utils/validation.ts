export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateMessage(content: string) {
  if (!content || typeof content !== 'string') {
    throw new ValidationError('Message content is required and must be a string');
  }

  if (content.length > 1000) {
    throw new ValidationError('Message content cannot exceed 1000 characters');
  }

  if (content.trim().length === 0) {
    throw new ValidationError('Message content cannot be empty');
  }

  return content.trim();
}

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    throw new ValidationError('Invalid email address');
  }
  return email.toLowerCase();
}

export function validatePhone(phone?: string) {
  if (!phone) return undefined;
  
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  if (!phoneRegex.test(phone)) {
    throw new ValidationError('Invalid phone number');
  }
  return phone;
}

export function validateName(name: string) {
  if (!name || name.trim().length < 2) {
    throw new ValidationError('Name must be at least 2 characters long');
  }
  if (name.length > 100) {
    throw new ValidationError('Name cannot exceed 100 characters');
  }
  return name.trim();
} 
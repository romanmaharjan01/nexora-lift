/**
 * Convert Firebase error codes to user-friendly messages
 */
export const getFirebaseErrorMessage = (errorCode) => {
  const errorMessages = {
    // Authentication errors
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'Email or password is incorrect.',
    'auth/wrong-password': 'Email or password is incorrect.',
    'auth/invalid-credential': 'Email or password is incorrect.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection and try again.',
    'auth/api-key-not-valid': 'Service temporarily unavailable. Please try again later.',
    'auth/email-already-in-use': 'This email is already registered. Please use another email or login.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/operation-not-allowed': 'Registration is currently disabled. Please try again later.',
    'auth/internal-error': 'An internal error occurred. Please try again.',
    'auth/invalid-api-key': 'Configuration error. Please contact support.',
    'auth/permission-denied': 'Permission denied. Please check your credentials.',
  };

  return errorMessages[errorCode] || 'An error occurred. Please try again.';
};

/**
 * Validate password strength and return specific error messages
 */
export const validatePassword = (password) => {
  const errors = [];

  if (!password) {
    return ['Password is required'];
  }

  if (password.length < 8) {
    errors.push(`At least 8 characters (currently ${password.length})`);
  }

  if (!/[a-z]/.test(password)) {
    errors.push('At least one lowercase letter (a-z)');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('At least one uppercase letter (A-Z)');
  }

  if (!/\d/.test(password)) {
    errors.push('At least one number (0-9)');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('At least one special character (!@#$%^&* etc.)');
  }

  return errors;
};

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

/**
 * Get admin-specific error messages
 */
export const getAdminErrorMessage = (errorCode) => {
  const errorMessages = {
    'auth/api-key-not-valid': 'Admin service connection failed. Please verify API key configuration.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
  };

  return errorMessages[errorCode] || getFirebaseErrorMessage(errorCode);
};


import logo from './logo.svg';
//import './App.css';

import React, { useState } from 'react';
import './PasswordStrengthTester.css';

const PasswordStrengthTester = () => {
  const [password, setPassword] = useState('');
  const [strengthResult, setStrengthResult] = useState('');

  const minPasswordLength = 8;
  const maxPasswordLength = 64;
  const complexityRequirements = [
    /[a-z]/,   // at least one lowercase letter
    /[A-Z]/,   // at least one uppercase letter
    /[0-9]/,   // at least one digit
    /[!@#$%^&*]/   // at least one special character
  ];

  const commonPasswords = [
    "123456", "password", "123456789", "12345678", "12345", "1234567",
    "qwerty", "abc123", "111111", "123123", "admin", "letmein", "welcome"
  ];

  const isPasswordValidLength = () => {
    return password.length >= minPasswordLength && password.length <= maxPasswordLength;
  };

  const meetsComplexityRequirements = () => {
    return complexityRequirements.every(pattern => pattern.test(password));
  };

  const checkCommonPatterns = () => {
    if (commonPasswords.includes(password.toLowerCase())) {
      return { pass: false, message: 'Password is too common.' };
    }

    const sequences = ['abcdefghijklmnopqrstuvwxyz', '0123456789', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
    for (let seq of sequences) {
      for (let i = 0; i < seq.length - 2; i++) {
        if (password.toLowerCase().includes(seq.slice(i, i + 3))) {
          return { pass: false, message: 'Password contains a common sequence of characters.' };
        }
      }
    }

    return { pass: true, message: 'Password is strong.' };
  };

  const hashPassword = () => {
    // Hashing logic can be implemented here (typically on the server side)
    // For demonstration, you can use a library like bcrypt.js if needed
    // Example: import bcrypt from 'bcryptjs'; bcrypt.hash(password, saltRounds, (err, hash) => { ... });
    // However, hashing should be done securely on the server, not in the client (React).
    return password; // Replace with actual hashing logic if needed
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isPasswordValidLength()) {
      setStrengthResult({ message: `Password must be between ${minPasswordLength} and ${maxPasswordLength} characters.`, type: 'error' });
    } else if (!meetsComplexityRequirements()) {
      setStrengthResult({ message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.', type: 'error' });
    } else {
      const commonPatternResult = checkCommonPatterns();
      if (!commonPatternResult.pass) {
        setStrengthResult({ message: `Password is too weak: ${commonPatternResult.message}`, type: 'error' });
      } else {
        // Hash the password (demo purposes, actual hashing should be done securely on the server)
        const hashedPassword = hashPassword(password);
        setStrengthResult({ message: `Password is strong. Hashed password: ${hashedPassword}`, type: 'success' });
      }
    }
  };

  return (
    <div className="container">
      <h1>Password Strength Tester</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a password to test its strength:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Test Strength</button>
      </form>
      {strengthResult && (
        <p className={`result ${strengthResult.type}`}>
          {strengthResult.message}
        </p>
      )}
    </div>
  );
};

export default PasswordStrengthTester;


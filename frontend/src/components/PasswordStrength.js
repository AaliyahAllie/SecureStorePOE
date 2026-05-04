// frontend/src/components/PasswordStrength.js
import React from 'react';

function PasswordStrength({ password }) {
  const requirements = [
    { label: '8-30 characters', regex: /^.{8,30}$/ },
    { label: 'One uppercase letter', regex: /[A-Z]/ },
    { label: 'One lowercase letter', regex: /[a-z]/ },
    { label: 'One number', regex: /\d/ },
    { label: 'One special character (@$!%*?&)', regex: /[@$!%*?&]/ }
  ];

  const getStrengthColor = () => {
    const met = requirements.filter(req => req.regex.test(password)).length;
    if (met === 0) return 'gray';
    if (met < 3) return 'red';
    if (met < 5) return 'orange';
    return 'green';
  };

  const getStrengthText = () => {
    const met = requirements.filter(req => req.regex.test(password)).length;
    if (met === 0) return 'Very Weak';
    if (met < 3) return 'Weak';
    if (met < 5) return 'Medium';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className="password-strength">
      <div className="strength-bar">
        <div
          className="strength-fill"
          style={{
            width: `${(requirements.filter(req => req.regex.test(password)).length / requirements.length) * 100}%`,
            backgroundColor: getStrengthColor()
          }}
        ></div>
      </div>
      <p className="strength-text" style={{ color: getStrengthColor() }}>
        Password Strength: {getStrengthText()}
      </p>
      <ul className="requirements-list">
        {requirements.map((req, index) => (
          <li
            key={index}
            className={req.regex.test(password) ? 'met' : 'not-met'}
          >
            {req.regex.test(password) ? '✓' : '✗'} {req.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordStrength;
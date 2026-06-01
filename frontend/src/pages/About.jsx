import React from 'react';

export default function About() {
  return (
    <div className="main-content">
      <div className="card">
        <h1>About the SecureBank Employee Portal</h1>
        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-primary)', fontWeight: 'var(--font-weight-semibold)' }}>
          A secure, compliant platform for processing and verifying international payment transactions.
        </p>
      </div>

      <div className="card">
        <h2>Portal Purpose</h2>
        <p>
          The SecureBank Employee Portal provides authorized banking employees with a controlled environment to:
        </p>
        <ul>
          <li>Review pending customer payment requests</li>
          <li>Verify transaction details for accuracy and compliance</li>
          <li>Submit validated transactions to the SWIFT network</li>
          <li>Monitor transaction status and audit history</li>
          <li>Maintain comprehensive records for regulatory compliance</li>
        </ul>
        <p>
          Each action within the portal is logged, timestamped, and attributed to the responsible employee for complete transparency and accountability.
        </p>
      </div>

      <div className="card">
        <h2>🔒 Security Features</h2>

        <h3>Transport Security</h3>
        <p>
          All communication between the employee portal and backend servers is secured using TLS/SSL encryption. This ensures that sensitive transaction data, authentication credentials, and personal information are protected from interception in transit.
        </p>

        <h3>Data Integrity & Cryptographic Hashing</h3>
        <p>
          Passwords and sensitive tokens are never stored in plaintext. The system uses industry-standard cryptographic hashing (bcrypt) with salt randomization. Password verification occurs only on the server side, eliminating exposure of raw credentials.
        </p>

        <h3>Input Validation & Sanitization</h3>
        <p>
          All user inputs are validated both on the client (for immediate feedback) and on the server (for security enforcement). This includes:
        </p>
        <ul>
          <li>Format validation for account numbers, amounts, and SWIFT codes</li>
          <li>Parameterized queries to prevent SQL injection</li>
          <li>HTML sanitization to prevent XSS attacks</li>
          <li>Type checking and boundary validation on all fields</li>
        </ul>

        <h3>Attack Protection</h3>
        <p>
          The portal is hardened against common attack vectors:
        </p>
        <ul>
          <li><strong>Rate Limiting:</strong> Prevents brute-force login attempts through account lockout mechanisms</li>
          <li><strong>CSRF Protection:</strong> Token-based request validation prevents cross-site request forgery</li>
          <li><strong>Session Security:</strong> Secure, HttpOnly cookies with SameSite attributes</li>
          <li><strong>Content Security Policy:</strong> Restricts script execution and resource loading</li>
          <li><strong>Authorization Checks:</strong> Role-based access control on all endpoints</li>
        </ul>

        <h3>Audit Logging</h3>
        <p>
          Every significant action—login, transaction verification, SWIFT submission, and data access—is logged with:
        </p>
        <ul>
          <li>Timestamp of the action (server time, immutable)</li>
          <li>Identity of the employee performing the action</li>
          <li>Type of action and parameters</li>
          <li>Result (success/failure) and error details</li>
          <li>Source IP address for anomaly detection</li>
        </ul>
        <p>
          Audit logs are stored securely and separately from transactional data, protected from tampering and accessible only to authorized compliance officers.
        </p>
      </div>

      <div className="card">
        <h2>📋 Banking Standards & Compliance</h2>

        <h3>SWIFT Compliance</h3>
        <p>
          The portal integrates with the SWIFT payment network and adheres to SWIFT messaging standards for international fund transfers. All transactions include the necessary SWIFT codes and beneficiary information required for cross-border payments.
        </p>

        <h3>KYC/AML Procedures</h3>
        <p>
          Know Your Customer (KYC) and Anti-Money Laundering (AML) screening is performed at transaction initiation and verified during the employee review process. This includes:
        </p>
        <ul>
          <li>Beneficiary name screening against sanctions lists</li>
          <li>Transaction amount monitoring for unusual patterns</li>
          <li>Jurisdiction risk assessment</li>
        </ul>

        <h3>Regulatory Standards</h3>
        <p>
          The portal is designed to comply with:
        </p>
        <ul>
          <li><strong>PCI DSS:</strong> For secure handling of financial data</li>
          <li><strong>GDPR:</strong> For data protection and user privacy</li>
          <li><strong>SOX:</strong> For financial reporting integrity and audit controls</li>
          <li><strong>ISO 27001:</strong> Information security management standards</li>
        </ul>

        <h3>Audit Trail & Recordkeeping</h3>
        <p>
          All transactions and employee actions are recorded in an immutable audit trail. This enables:
        </p>
        <ul>
          <li>Regulatory compliance demonstrations</li>
          <li>Incident investigation and forensic analysis</li>
          <li>Performance monitoring and employee accountability</li>
          <li>Transaction reconciliation with external systems</li>
        </ul>

        <p style={{ marginTop: 'var(--spacing-lg)', paddingTop: 'var(--spacing-base)', borderTop: '1px solid var(--color-border)', fontSize: 'var(--font-size-sm)', opacity: 0.8 }}>
          <strong>⚠️ Important Notice:</strong> This portal is for authorized employees only. All use is monitored and logged. Unauthorized access, misuse, or attempted circumvention of security controls is prohibited and subject to legal action.
        </p>
      </div>
    </div>
  );
}

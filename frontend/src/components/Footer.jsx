import React from 'react';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div>
          <h4>🔒 Security Features</h4>
          <ul>
            <li>Transport security via TLS/SSL encryption</li>
            <li>Cryptographic hashing for sensitive data</li>
            <li>Input validation and sanitization</li>
            <li>Protection against common attack vectors</li>
            <li>Complete audit logging of all actions</li>
          </ul>
        </div>

        <div>
          <h4>📋 Compliance</h4>
          <ul>
            <li>Banking standards compliance</li>
            <li>KYC/AML screening procedures</li>
            <li>SWIFT protocol integration</li>
            <li>Transaction audit trails</li>
            <li>Data protection regulations</li>
          </ul>
        </div>

        <div>
          <h4>📞 Support & Contact</h4>
          <p>
            <strong>Security Team:</strong> security@securebank.example
          </p>
          <p>
            <strong>Support Line:</strong> +1 (555) 123-4567
          </p>
          <p>
            <strong>Hours:</strong> 24/7 for security incidents
          </p>
          <p style={{ marginTop: 'var(--spacing-base)', fontSize: 'var(--font-size-sm)', opacity: 0.8 }}>
            All activities on this portal are monitored and logged for security and compliance purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}

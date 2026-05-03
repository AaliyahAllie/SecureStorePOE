// generate-certs.js - Generate self-signed certificates for local HTTPS
const fs = require('fs');
const path = require('path');
const forge = require('node-forge');

console.log('Generating self-signed certificates for localhost...');

// Create certs directory if it doesn't exist
const certsDir = path.join(__dirname, 'certs');
if (!fs.existsSync(certsDir)) {
  fs.mkdirSync(certsDir, { recursive: true });
}

// Generate key pair
const keys = forge.pki.rsa.generateKeyPair(2048);
const cert = forge.pki.createCertificate();

// Set certificate attributes
cert.publicKey = keys.publicKey;
cert.serialNumber = '01';
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

// Set certificate subject and issuer
const attrs = [{
  name: 'commonName',
  value: 'localhost'
}, {
  name: 'countryName',
  value: 'US'
}, {
  name: 'stateOrProvinceName',
  value: 'CA'
}, {
  name: 'localityName',
  value: 'San Francisco'
}, {
  name: 'organizationName',
  value: 'GlobalBank Dev'
}];

cert.setSubject(attrs);
cert.setIssuer(attrs);

// Add extensions
cert.setExtensions([{
  name: 'basicConstraints',
  cA: true
}, {
  name: 'keyUsage',
  keyCertSign: true,
  digitalSignature: true,
  nonRepudiation: true,
  keyEncipherment: true,
  dataEncipherment: true
}, {
  name: 'extKeyUsage',
  serverAuth: true,
  clientAuth: true
}, {
  name: 'subjectAltName',
  altNames: [{
    type: 2, // DNS
    value: 'localhost'
  }, {
    type: 7, // IP
    ip: '127.0.0.1'
  }, {
    type: 7, // IP
    ip: '::1'
  }]
}]);

// Sign the certificate
cert.sign(keys.privateKey);

// Convert to PEM format
const pemCert = forge.pki.certificateToPem(cert);
const pemKey = forge.pki.privateKeyToPem(keys.privateKey);

// Write files
fs.writeFileSync(path.join(certsDir, 'localhost.pem'), pemCert);
fs.writeFileSync(path.join(certsDir, 'localhost-key.pem'), pemKey);

console.log('✅ Self-signed certificates generated successfully');
console.log('Certificate files created in backend/certs/');
console.log('- localhost.pem (certificate)');
console.log('- localhost-key.pem (private key)');
console.log('');
console.log('⚠️  Note: These are self-signed certificates.');
console.log('   Browsers will show security warnings.');
console.log('   For production, use Let\'s Encrypt or a proper CA.');
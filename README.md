##  Project Overview

This project extends the Secure International Payments System by introducing a secure Employee International Payments Portal. The portal enables authorised bank employees to securely review, verify, approve, and submit international payment transactions to the SWIFT network.

Unlike customers, employees are pre-registered by the bank's administration team during onboarding and cannot self-register. Employees must authenticate using secure credentials before accessing payment information.

## Group Members & Responsibilities

| Member   | Task                                   | 
| -------- | -------------------------------------- |
| Member 1 | Admin portal(frontend and backend)     | 
| Member 2 | Admin portal(frontend and backend)     | 
| Member 3 | Documentation                          |  
| Member 4 | Read me file                           | 
| Member 5 | Documentation                          | 


## Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Node.js + Express
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT)
* **Password Security:** bcrypt (12 salt rounds)
* **Security Middleware:** Helmet.js, Express Rate Limit, CORS
* **SSL:** OpenSSL Self-Signed Certificate
* **CI/CD:** CircleCI
* **Code Quality & Security Analysis:** SonarQube

## Security Features

| Feature                      | Tool / Method                              |
| ---------------------------- | ------------------------------------------ |
| Password hashing & salting   | bcrypt (12 rounds)                         |
| Employee account management  | Pre-created accounts only                  |
| Input whitelisting           | RegEx validation (frontend + backend)      |
| Secure HTTP headers          | Helmet.js                                  |
| Rate limiting                | Express Rate Limit                         |
| Session hijacking protection | HttpOnly, Secure, SameSite cookies         |
| Clickjacking protection      | X-Frame-Options + CSP                      |
| XSS protection               | Content Security Policy + Input Validation |
| MITM protection              | HTTPS/TLS Encryption                       |
| DDoS protection              | Rate Limiting + WAF Strategy               |
| DevSecOps pipeline           | CircleCI + SonarQube                       |

### Prerequisites

* Node.js v18+
* MongoDB
* OpenSSL
* GitHub Account

### 1. Clone the Repository
git clone https://github.com/AaliyahAllie/SecureStorePOE.git

cd SecureStorePOE

### 2. Install Backend Dependencies

npm install

### 3. Install Frontend Dependencies

cd frontend

npm install

cd ..

### 4. Configure Environment Variables

Create a `.env` file:
```env
PORT=3001

MONGO_URI=mongodb://localhost:27017/securestore

JWT_SECRET=your_secure_secret_key

NODE_ENV=development

### 5.Generate SSL Certificate

openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

Generated files:

* `key.pem`
* `cert.pem`

### 6. Start the Backend

node server.js

Backend available at:
https://localhost:3001

### 7. Start the Frontend

cd frontend

npm run dev

Frontend available at:

https://localhost:3000


## Project Structure

SecureStorePOE/

├── .github/
│   └── workflows/
│       └── nodejs-ci.yml              
│
├── backend/
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js         
│   │   ├── bruteForce.js             
│   │   ├── csrfProtection.js        
│   │   ├── employeeAuth.js            
│   │   └── validators.js              
│   │
│   ├── models/
│   │   ├── AuditLog.js              
│   │   ├── Employee.js                
│   │   ├── Payment.js                
│   │   └── User.js                    
│   │
│   ├── routes/
│   │   ├── auth.js                   
│   │   ├── employeeAudit.js           
│   │   ├── employeeAuth.js          
│   │   ├── employeePayments.js      
│   │   └── payments.js               
│   │
│   ├── scripts/
│   │   └── seedEmployees.js           
│   │
│   ├── tests/
│   │
│   ├── __tests__/
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── generate-certs.js            
│   ├── jest.config.js                
│   ├── package.json
│   ├── package-lock.json
│   ├── seedEmployee.js
│   └── server.js                   
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── .babelrc
│   ├── .env.example
│   ├── .gitignore
│   ├── jest.config.js
│   ├── package.json
│   └── package-lock.json
│   ├── src/
│   ├── .azure-pipelines.yml
│   ├── .editorconfig
│   ├── .gitignore
│   ├──  .azure-pipelines -1.yml
│   ├──  .azure-pipelines.yml
│   └── README.md

## System Flow

    Employee Account Created by Administrator

                ↓

        Employee Login

                ↓

      Password Verification (bcrypt)

                ↓

        JWT Authentication

                ↓

      View Pending Transactions

                ↓

      Review Account Details

                ↓

        Verify SWIFT Code

                ↓

        Click "Verify"

                ↓

   Transaction Marked Verified

                ↓

        Click "Submit"

                ↓

    Status Updated to Submitted 



## Attack Protections


| Attack                     | Protection                                            |
| -------------------------- | ----------------------------------------------------- |
| Session Hijacking          | Secure Cookies, Session Expiration, JWT               |
| Clickjacking               | X-Frame-Options DENY, CSP Frame Restrictions          |
| SQL Injection              | Parameterized Queries, Mongoose ODM, RegEx Validation |
| Cross-Site Scripting (XSS) | Helmet CSP, Output Encoding, Input Validation         |
| Man-in-the-Middle (MITM)   | HTTPS/TLS, HSTS Headers                               |
| DDoS Attacks               | Rate Limiting, Traffic Filtering, WAF Strategy        |
| Brute Force Attacks        | Login Rate Limiting and Account Monitoring            |


##  CircleCI Pipeline

CircleCI is configured to automatically:

1. Pull source code from GitHub
2. Install dependencies
3. Run application tests
4. Execute SonarQube security scan
5. Report code quality metrics

Pipeline configuration:

.circleci/config.yml

## Demo video : 

## References

* bcrypt: https://www.npmjs.com/package/bcrypt
* React: https://react.dev
* Express.js: https://expressjs.com
* Helmet.js: https://helmetjs.github.io
* CircleCI: https://circleci.com
* SonarQube: https://www.sonarsource.com/products/sonarqube/
* OWASP Top Ten: https://owasp.org/www-project-top-ten/
* JWT: https://jwt.io
* MongoDB: https://mongoosejs.com/docs/
* OpenSSL: https://www.openssl.org/docs/


## Conclusion

The Employee International Payments Portal was developed according to secure software development principles and banking security requirements. Through the implementation of strong authentication mechanisms, encrypted communications, secure coding practices, automated security testing, and DevSecOps processes, the system provides a secure platform for reviewing and processing international payments before submission to the SWIFT network.


> © 2026 The Independent Institute of Education (Pty) Ltd

# Node.js TypeScript MySQL Boilerplate API

A simple authentication REST API built with Node.js, TypeScript, Express, Sequelize, and JWT.

## Tech Stack
- **Node.js + TypeScript** — runtime and language
- **Express** — web framework
- **MySQL + Sequelize** — database and ORM
- **JWT** — authentication tokens
- **Nodemailer** — email sending

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure `config.json`**
   - Add your MySQL password
   - Add your [Ethereal Email](https://ethereal.email/) SMTP credentials

3. **Start the server**
   ```bash
   npm run start:dev
   ```

4. **Open Swagger UI**
   ```
   http://localhost:4000/api-docs
   ```

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /accounts/register | Public | Register new account |
| POST | /accounts/verify-email | Public | Verify email with token |
| POST | /accounts/authenticate | Public | Login and get JWT token |
| POST | /accounts/refresh-token | Cookie | Get new JWT token |
| POST | /accounts/revoke-token | JWT | Revoke refresh token |
| POST | /accounts/forgot-password | Public | Request password reset |
| POST | /accounts/validate-reset-token | Public | Validate reset token |
| POST | /accounts/reset-password | Public | Reset password |
| GET | /accounts | Admin | Get all accounts |
| GET | /accounts/:id | JWT | Get account by ID |
| POST | /accounts | Admin | Create account |
| PUT | /accounts/:id | JWT | Update account |
| DELETE | /accounts/:id | JWT | Delete account |

## How Authentication Works

1. Register → verify email → login
2. Login returns a **JWT token** (expires in 15 min) and a **refresh token** (expires in 7 days)
3. Use JWT as `Bearer Token` in the Authorization header for protected routes
4. Use the refresh token to get a new JWT when it expires

## Notes
- First registered account is automatically **Admin**
- All other accounts are **User** by default
- Admin can access and manage all accounts
- Users can only access their own account
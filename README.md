# AES Encryption & Virtual Currency Mining System

## Overview
This repository contains two distinct modules:
- AES Encryption/Decryption using AES-256-CBC with secure key handling and base64-encoded output.
- Virtual Currency Mining System using Node.js, Express.js, Sequelize ORM, and SQLite — allowing users to "mine" coins over time with enforced claiming and daily limits.

## Q1: AES Encryption & Decryption
Setup
1. Install dependencies:
### `npm install`

2. Create a .env file and add your secret key (must be 32 bytes for AES-256):
### `ENCRYPTION_KEY=your-32-byte-encryption-key-here`

3. Run the script:
### `node Test.js`

## Q2: Virtual Currency Mining System
Setup Instructions
1. Install dependencies:
### `npm install express sequelize sqlite3 dotenv`

2. Start the server:
### `node server.js`

3. Test with Postman or cURL:
### `POST /api/mine/claim
{
  "username": "Raja"
}`

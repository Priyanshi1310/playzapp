require('dotenv').config();
const crypto= require('crypto');

const key = process.env.ENCRYPTION_KEY;
console.log(key.length);

//checking length of key
if(!key || key.length !== 32){
    throw new Error('Encryption key must be 32 characters long');
}

//encrypted function
function encrypt(text){
    const iv = crypto.randomBytes(16); //generate random iv of 16 bytes
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf-8', 'base64');
    encrypted += cipher.final('base64');
    return {
        iv: iv.toString('base64'), //converted iv to string(base 64)
        encryptedData: encrypted,
    }
}

//decrypted function(take encrypted data and iv as parameter)
function decrypt(encryptedData, iv){
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv, 'base64'));
    let decrypted = decipher.update(encryptedData, 'base64', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

//Example
const example = JSON.stringify({name:"Priyanshi Gupta", role:'Developer', company: "PlayzApp"});

//Call encrypt function to encrypt data
const encrypted = encrypt(example);
console.log("Encrypted Data : ", encrypted);

//call decrypt function to decrypt data
const decrypted = decrypt(encrypted.encryptedData, encrypted.iv);
console.log("Decrypted Data : ",decrypted)
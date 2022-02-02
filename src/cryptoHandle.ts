import CryptoJS from 'crypto-js';
import * as dotenv from 'dotenv';

const jsencrypt = new (require('node-jsencrypt-fix'))();

jsencrypt.setKey(`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA81dCnCKt0NVH7j5Oh2+S
GgEU0aqi5u6sYXemouJWXOlZO3jqDsHYM1qfEjVvCOmeoMNFXYSXdNhflU7mjWP8
jWUmkYIQ8o3FGqMzsMTNxr+bAp0cULWu9eYmycjJwWIxxB7vUwvpEUNicgW7v5nC
wmF5HS33Hmn7yDzcfjfBs99K5xJEppHG0qc+q3YXxxPpwZNIRFn0Wtxt0Muh1U8a
vvWyw03uQ/wMBnzhwUC8T4G5NclLEWzOQExbQ4oDlZBv8BM/WxxuOyu0I8bDUDdu
tJOfREYRZBlazFHvRKNNQQD2qDfjRz484uFs7b5nykjaMB9k/EJAuHjJzGs9MMMW
tQIDAQAB
-----END PUBLIC KEY-----`);

dotenv.config();

export const cryptoHandle = {
    SHA256: (item: string) => {
        if (typeof item === 'string')
            return CryptoJS.SHA256(item).toString(CryptoJS.enc.Hex);
        return null;
    },
    AES_ENC: (item: string) => {
        if (typeof item === 'string')
            return CryptoJS.AES.encrypt(item, process.env.ENCRYPT_KEY).toString();
        return null;
    },
    AES_DEC: (item: string) => {
        if (typeof item === 'string')
            return CryptoJS.AES.decrypt(item, process.env.ENCRYPT_KEY,).toString(CryptoJS.enc.Utf8);
        return null;
    },
    RSA_ENC: (item: string) => {
        if (typeof item === 'string')
            return jsencrypt.encrypt(item, 'base64', 'utf8');
        return null;
    }
}
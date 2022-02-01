import CryptoJS from 'crypto-js';
import * as dotenv from 'dotenv';

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
    }
}
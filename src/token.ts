import jwt from 'jsonwebtoken';
import { jwtTokenType } from './types';

export const jwtToken = {
    generateToken: async (userType: string, userID: string, userName: string): Promise<string> => {
        const token = jwt.sign(
            { type: userType, id: userID, name: userName },
            process.env.ENCRYPT_KEY,
            { algorithm: 'HS256', issuer: 'woongdo' });
        return token;
    },
    verifyToken: async (userToken: string): Promise<{ isError: boolean, returnValue: jwtTokenType }> => {
        try {
            const decoded = jwt.verify(userToken, process.env.ENCRYPT_KEY) as jwtTokenType;
            return {
                isError: false,
                returnValue: decoded
            };
        }
        catch (err) {
            return {
                isError: true,
                returnValue: { type: null, id: null, name: null, iat: null, iss: null }
            }
        }
    }
}
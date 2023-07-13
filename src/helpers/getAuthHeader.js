import {Buffer} from 'buffer';

export default function getAuthHeader(username, password){
    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
    return `Basic ${token}`;
}
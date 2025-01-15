import crypto from "crypto";





export function verifySignature(body: string, signature: string, channelSecret: string): boolean {
    const hash = crypto.createHmac("sha256", channelSecret).update(body).digest("base64");
    return hash === signature;
}
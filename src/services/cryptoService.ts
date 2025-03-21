import { Finance } from "@/types/Finance";
import CryptoJS from "crypto-js";

/**
 * Encrypts text using AES encryption.
 * @param text - The text to encrypt
 * @param secretKey - The secret key for encryption
 * @returns Encrypted string
 */
export const encryptText = (text: string, secretKey: string): string => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

/**
 * Decrypts text encrypted using AES encryption.
 * @param text - The encrypted string
 * @param secretKey - The secret key used during encryption
 * @returns Decrypted original text
 */
export const decryptText = (text: string, secretKey: string): string => {
  const bytes = CryptoJS.AES.decrypt(text, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const decryptFinances = (finances: Finance[], userId: string) => {
  return finances.map((finance) => {
    try {
      const decryptedName = decryptText(finance.name, userId);
      const decryptedAmount = parseFloat(decryptText(finance.amount.toString(), userId));
      const decryptedDescription = decryptText(finance.description, userId);

      return {
        ...finance,
        name: decryptedName,
        amount: decryptedAmount,
        description: decryptedDescription,
      };
    } catch (error) {
      console.error("Failed to decrypt finance:", finance.id, error);
      return null;
    }
  });
};

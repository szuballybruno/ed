import bcrypt from "bcryptjs";

export const hashPasswordAsync = (password: string) => bcrypt.hash(password, 12);

export const comparePasswordAsync = (passwordA: string, passwordB: string) => bcrypt.compare(passwordA, passwordB)
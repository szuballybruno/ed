import bcrypt from "bcryptjs";

export const hashPasswordAsync = (password: string) => bcrypt.hash(password, 12);

export const comparePasswordAsync = (unhashed: string, hashed: string) => bcrypt.compare(unhashed, hashed)
import bcrypt from "bcryptjs";

export const hashPasswordAsync = (password: string) => {

    const hash = bcrypt.hash(password, 12);
    return hash;
}

export const comparePasswordAsync = (unhashed: string, hashed: string) => {

    return bcrypt.compare(unhashed, hashed);
}
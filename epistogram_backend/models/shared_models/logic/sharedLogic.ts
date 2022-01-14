import { PasswordValidationIssueType } from "../types/sharedTypes"

export const validatePassowrd = (password: string, passwordControl: string): PasswordValidationIssueType | null => {

    if (!password || password === "")
        return "passwordIsEmpty";

    if (!passwordControl || passwordControl === "")
        return "controlPasswordIsEmpty";

    if (passwordControl !== password)
        return "doesNotMatchControlPassword";

    if (password.length < 6)
        return "tooShort";

    if (password.length > 30)
        return "tooLong";

    if (!textContainsNumber(password))
        return "hasNoNumber";

    return null;
}

export const textContainsNumber = (text: string) => {

    return /\d/.test(text);
}
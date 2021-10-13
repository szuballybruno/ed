import generatePassword from "password-generator";

export const generateEpistoPassword = () => {

    return generatePassword(6);
}
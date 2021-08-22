export default class FinalizeUserRegistrationDTO {
    phoneNumber: string;
    password: string;
    controlPassword: string;

    constructor(phoneNumber: string, password: string, controlPassword: string) {

        this.phoneNumber = phoneNumber;
        this.password = password;
        this.controlPassword = controlPassword;
    }
}
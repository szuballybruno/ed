export default class FinalizeUserRegistrationDTO {
    phoneNumber: string;
    password: string;
    controlPassword: string;
    invitationToken: string;

    constructor(phoneNumber: string, password: string, controlPassword: string, invitationToken: string) {

        this.phoneNumber = phoneNumber;
        this.password = password;
        this.controlPassword = controlPassword;
        this.invitationToken = invitationToken;
    }
}
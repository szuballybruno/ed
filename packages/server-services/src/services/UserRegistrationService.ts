import { getPassowrdValidationError } from '@episto/commonlogic';
import { ErrorWithCode, PasswordValidationIssueType } from '@episto/commontypes';
import { Company } from '../models/tables/Company';
import { TokenPair } from '../models/misc/TokenPair';
import { newNotImplemented } from '../utilities/helpers';
import { ActivationCodeService } from './ActivationCodeService';
import { AuthenticationService } from './AuthenticationService';
import { ORMConnectionService } from './ORMConnectionService';
import { TokenService } from './TokenService';
import { UserService } from './UserService';

export class UserRegistrationService {

    constructor(
        private _activationCodeService: ActivationCodeService,
        private _userService: UserService,
        private _tokenService: TokenService,
        private _ormService: ORMConnectionService,
        private _authenticationService: AuthenticationService) {
    }

    /**
     * This function registers a user using an activation code.
     * If said code is valid, it will be marked as used as there 
     * can not be another registration made with it.
     */
    async selfRegisterWithActivationCodeAsync(
        activationCode: string,
        email: string,
        firstName: string,
        lastName: string,
        password: string,
        passwordCompare: string,
        username: string) {

        // check code
        const activationCodeEntity = await this
            ._activationCodeService
            .isValidCodeAsync(activationCode);
        if (!activationCodeEntity)
            throw new ErrorWithCode(`Az aktivációs kód: ${activationCode} nem található az adatbázisban, vagy már felhasználásra került.`, 'activation_code_issue');

        const getPasswordValidationErrorMessage = (passwordValidationError: PasswordValidationIssueType) => {

            if (passwordValidationError === 'tooShort') {
                return 'A jelszónak legalább 6 karakter hosszúnak kell lennie.'
            }

            if (passwordValidationError === 'passwordIsEmpty') {
                return 'Nem adtál meg jelszót.'
            }

            if (passwordValidationError === 'hasNoNumber') {
                return 'A jelszónak legalább egy számot kell tartalmaznia.'
            }

            if (passwordValidationError === 'tooLong') {
                return 'A jelszó maximum 30 karakter hosszú lehet.'
            }

            if (passwordValidationError === 'doesNotMatchControlPassword') {
                return 'A két jelszó nem egyezik.'
            }

            if (passwordValidationError === 'controlPasswordIsEmpty') {
                return 'A jelszót kétszer kell megadni.'
            }

            return 'A megadott jelszó helytelen.'

        }

        // check given password
        const passwordValidationError = getPassowrdValidationError(password, passwordCompare);
        if (passwordValidationError)
            throw new ErrorWithCode(getPasswordValidationErrorMessage(passwordValidationError), 'corrupt_credentials');

        // check email
        const isEmailValid = this._validateEmail(email);
        if (!isEmailValid)
            throw new ErrorWithCode('Nem valós e-mail címet adtál meg.', 'email_invalid');

        // check fisrst name
        const isFirstNameValid = this._validateName(firstName);
        if (!isFirstNameValid)
            throw new ErrorWithCode('A keresztnév formátuma nem megfelelő.', 'first_name_invalid');

        // check last name
        const isLastNameValid = this._validateName(firstName);
        if (!isLastNameValid)
            throw new ErrorWithCode('A vezetéknév formátuma nem megfelelő.', 'last_name_invalid');

        // check username
        const isUsernameValid = this._validateName(username);
        if (!isUsernameValid)
            throw new ErrorWithCode('Ez a felhasználónév már foglalt, vagy nem megfelelő a formátuma.', 'username_invalid');

        const { companyId } = activationCodeEntity;

        // TODO
        // default depatment
        // const {} = await this
        //     ._ormService
        //     .query(User, { principalId })
        //     .select(Company)
        //     .leftJoin(Company, x => x
        //         .on('id', '=', 'companyId', User))
        //     .where('id', '=', 'principalId')
        //     .getSingle();

        // create user
        const { id: userId } = await this
            ._userService
            .createUserSimpleAsync({
                email,
                firstName,
                lastName,
                companyId,
                departmentId: 26 as any,
                registrationType: 'ActivationCode',
                invitationToken: null,
                unhashedPassword: password,
                username,
                registrationState: 'active'
            });

        // invalidate activation code
        await this
            ._activationCodeService
            .invalidateCodeAsync(activationCodeEntity.activationCodeId, userId);

        // login user 
        const tokens = await this._authenticationService
            .loginUserInternallyAsync(userId);

        return tokens;
    }

    /**
     * Accept user invitation
     */
    async selfRegisterWithInvitationTokenAsync(
        invitationToken: string,
        password: string,
        passwordControl: string) {

        // verify token
        const { userEmail } = this
            ._tokenService
            .verifyInvitaionToken(invitationToken);

        // check if user exists
        const user = await this._userService
            .getUserByEmailAsync(userEmail);

        if (!user)
            throw new ErrorWithCode('Nincs ilyen felhasználó.', 'bad request');

        const userId = user.id;

        // check passwords
        if (getPassowrdValidationError(password, passwordControl))
            throw new ErrorWithCode('Helytelen jelszó.', 'corrupt_credentials');

        // update user
        await this._userService
            .setUserInivitationDataAsync(userId, password);

        // login user 
        const tokens = await this._authenticationService
            .loginUserInternallyAsync(user.id);

        return tokens;
    }

    /**
     * This function registers a new user using a public access token.
     * Public access tokens come from public links, such as QR codes.
     */
    async selfRegisterViaPublicTokenAsync(
        publicRegToken: string,
        email: string,
        firstName: string,
        lastName: string): Promise<TokenPair> {

        throw newNotImplemented();
        // // verify public reg token
        // this._tokenService.verifyPublicRegistrationToken(publicRegToken);

        // // get new password
        // const generatedPassword = this.getDefaultPassword();

        // // create user
        // const user = await this._userService
        //     .createUserAsync({
        //         email,
        //         firstName,
        //         lastName,
        //         registrationType: 'PublicRegistrationToken',
        //         password: generatedPassword
        //     });

        // const userId = user.id;

        // // send mail
        // await this._emailService
        //     .sendSuccessfulRegistrationEmailAsync(user, generatedPassword);

        // // get auth tokens
        // const tokens = await this._authenticationService
        //     .getUserLoginTokens(user);

        // // set user current refresh token
        // await this._userService
        //     .setUserActiveRefreshToken(userId, tokens.refreshToken);

        // return tokens;
    }

    /**
     * Validate email address based on regex from StackOverflow,
     * TODO: tests.
     */
    private _validateEmail(email: string) {

        const emailFormat = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        if (email === '')
            return false;

        if (!email.match(emailFormat))
            return false;

        return true;
    }

    /**
     * Validate name
     */
    private _validateName(name: string) {

        if (name.length > 60)
            return false;

        return true;
    }
}

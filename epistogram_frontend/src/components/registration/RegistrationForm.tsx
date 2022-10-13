import { EpistoEntry } from '../controls/EpistoEntry';
import { RegistrationFormLogicType } from './RegistrationFormLogic';

export const RegistrationForm = ({ logic }: { logic: RegistrationFormLogicType }) => {

    return (
        <form >
            <div>
                <EpistoEntry
                    value={logic.phoneNumber}
                    labelVariant="top"
                    label="Telefonszám"
                    placeholder="Telefonszám"
                    name="phoneNumber"
                    setValue={logic.setPhoneNumber}
                    height="50px" />

                <EpistoEntry
                    value={logic.password}
                    labelVariant="top"
                    label="Jelszó"
                    placeholder="Jelszó"
                    name="password"
                    setValue={logic.setPassword}
                    height="50px" />

                <EpistoEntry
                    value={logic.passwordControl}
                    labelVariant="top"
                    label="Jelszó mégegyszer"
                    placeholder="Jelszó mégegyszer"
                    name="password"
                    setValue={logic.setPasswordControl}
                    height="50px" />
            </div>
        </form>
    );
};
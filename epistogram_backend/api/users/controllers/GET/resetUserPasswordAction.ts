import { Request } from "express";
import { globalConfig } from "../../../../server";
import { sendResetPasswordMailAsync } from "../../../../services/emailService";
import { getJWTToken } from "../../../../services/jwtGen";
import { getUserById } from "../../../../services/userService";
import { TypedError } from "../../../../utilities/helpers";

export const resetUserPasswordAction = async (req: Request) => {

    // get user 
    const user = await getUserById(req.params.userId);
    if (!user)
        throw new TypedError("User not found.", "bad request");

    // get reset token
    const resetPawsswordToken = await getJWTToken({ userId: user._id }, globalConfig.mail.tokenMailSecret, "24h");

    // send mail
    const userFullName = `${user.userData.lastName} ${user.userData.firstName}`;
    await sendResetPasswordMailAsync(user.userData.email, userFullName, resetPawsswordToken);
};

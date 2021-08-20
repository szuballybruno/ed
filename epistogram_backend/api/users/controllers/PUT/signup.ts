import { Request } from "express";
import { User } from "../../../../models/entities/User";
import { hashPasswordAsync } from "../../../../services/crypt";
import { sendInvitaitionMailAsync } from "../../../../services/emailService";
import { useCollection } from "../../../../services/persistance";
import { getUserByEmail } from "../../../../services/userService";
import { TypedError, withValue } from "../../../../utilities/helpers";

const withValueOrBadRequest = (obj: any) => withValue(obj, () => {

    throw new TypedError("Requied filed has no value!", "bad request");
});

export const createUserAction = async (req: Request) => {

    // get and check sent data 
    const creationData = withValueOrBadRequest(req.body);
    const email = withValueOrBadRequest(creationData.email);
    const role = withValueOrBadRequest(creationData.role);
    const username = withValueOrBadRequest(creationData.username);
    const firstName = withValueOrBadRequest(creationData.firstName);
    const lastName = withValueOrBadRequest(creationData.lastName);
    const organizationId = withValueOrBadRequest(creationData.organizationId);
    const innerRole = withValueOrBadRequest(creationData.innerRole);
    const userFullName = `${lastName} ${firstName}`;

    // does user already exist?
    const existingUser = await getUserByEmail(email);
    if (existingUser)
        throw new TypedError("User already exists.", "bad request");

    // hash user password 
    const hashedDefaultPassword = await hashPasswordAsync("guest");

    // insert new user 
    const { insertItem } = await useCollection("users");

    const newUser = {
        userData: {
            active: true,
            email: email,
            role: role,
            username: username,
            firstName: firstName,
            lastName: lastName,
            organizationId: organizationId,
            password: hashedDefaultPassword,
            innerRole: innerRole
        }
    } as User;

    const insertResults = await insertItem(newUser);
    const userId = insertResults.insertedId;

    // send invitaion mail
    await sendInvitaitionMailAsync(email, userFullName, userId);
};

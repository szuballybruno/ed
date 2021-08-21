import { Request } from "express";
import { User } from "../../../../models/entities/User";
import { getUserIdFromRequest } from "../../../../services/authentication";
import { hashPasswordAsync } from "../../../../services/crypt";
import { sendInvitaitionMailAsync } from "../../../../services/emailService";
import { log } from "../../../../services/logger";
import { useCollection } from "../../../../services/persistance";
import { getUserByEmail, getUserById } from "../../../../services/userService";
import { TypedError, withValue } from "../../../../utilities/helpers";

const withValueOrBadRequest = (obj: any) => withValue(obj, () => {

    throw new TypedError("Requied filed has no value!", "bad request");
});

export const createUserAction = async (req: Request) => {

    const currentUserId = getUserIdFromRequest(req);
    const currentUser = await getUserById(currentUserId);

    // get and check sent data 
    const creationData = withValueOrBadRequest(req.body);
    const email = withValueOrBadRequest(creationData.email);
    const role = withValueOrBadRequest(creationData.role);
    const firstName = withValueOrBadRequest(creationData.firstName);
    const lastName = withValueOrBadRequest(creationData.lastName);
    const innerRole = withValueOrBadRequest(creationData.innerRole);
    const userFullName = `${lastName} ${firstName}`;

    // if user is admin require organizationId to be provided
    // otherwise use the current user's organization
    const organizationId = currentUser.userData.role === "admin"
        ? withValueOrBadRequest(creationData.organizationId)
        : currentUser.userData.organizationId;

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

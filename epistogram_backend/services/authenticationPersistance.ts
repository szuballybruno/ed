
class RefreshTokenContainer {
    userEmail: string;
    token: string;

    constructor(userEmail: string, token: string) {
        this.userEmail = userEmail;
        this.token = token;
    }
}

const refreshTokens = [] as RefreshTokenContainer[];

export const getRefreshTokenByUserEmail = (userEmail: string) =>
    refreshTokens.filter(x => x.userEmail == userEmail)[0];

export const setRefreshToken = (userEmail: string, token: string) => {

    const existingTokenContainerForUser = getRefreshTokenByUserEmail(userEmail);

    if (existingTokenContainerForUser) {

        existingTokenContainerForUser.token = token;
    }

    else {

        refreshTokens.push(new RefreshTokenContainer(userEmail, token));
    }
}
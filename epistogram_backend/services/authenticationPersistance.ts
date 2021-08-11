
class RefreshTokenContainer {
    userEmail: string;
    token: string;

    constructor(userEmail: string, token: string) {
        this.userEmail = userEmail;
        this.token = token;
    }
}

var refreshTokens = [] as RefreshTokenContainer[];

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

export const removeRefreshToken = (userEmail: string) => {

    refreshTokens = refreshTokens.filter(x => x.userEmail != userEmail);
}
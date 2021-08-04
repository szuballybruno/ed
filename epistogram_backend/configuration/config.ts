export const config = {
    backendUrl: "http://localhost:5000",
    backendUrlMinimal: "http://localhost:5000",
    uploadFolderPath: "/Users/spenc",
    frontendUrl: "http://localhost:3000",

    // backendUrl: "https://dev.epistogram.com/api",
    // backendUrlMinimal: "https://dev.epistogram.com",
    // frontendUrl: "https://dev.epistogram.com",

    database: {
        serverUrl: "80.77.112.163:27017",
        dbName: "epistogramdb",
        dbUsername: "epistogrambackend",
        dbPassword: "Arorer243"
    },

    tokenSecret: "AROWILLSAVETHEAPP",


    tokenMailSecret: "AROWILLSAVETHEMAIL",
    mailHost: "mail.privateemail.com",
    senderEmail: "private@spenglermanfred.com",
    senderPassword: "Arorer243*",

    scpConfig: {
        host: '80.77.112.163',
        port: 22,
        username: 'spenglermanfred',
        privateKey: require('fs').readFileSync('/Users/spenc/Documents/putty_id_rsa.ppk') + "",
        passphrase: "MrPeach243Cock*"
    }
}

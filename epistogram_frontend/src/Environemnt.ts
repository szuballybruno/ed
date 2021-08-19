export const isLocalhost = process.env.IS_DEPLOYED_ENVIRONMENT ? false : true;

export const backendUrl = isLocalhost
    ? "localhost:5000/"
    : window.location.origin + "/api/"

console.log(process.env.IS_DEPLOYED_ENVIRONMENT + " - " + isLocalhost);
console.log(isLocalhost ? "Running on localhost." : "Running deployed to an environment.");
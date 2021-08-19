export const isLocalhost = !!process.env.IS_DEPLOYED_ENVIRONMENT;

export const backendUrl = isLocalhost
    ? window.location.origin + "/api/"
    : "localhost:5000/"

console.log(isLocalhost ? "Running on localhost." : "Running deployed to an environment.");
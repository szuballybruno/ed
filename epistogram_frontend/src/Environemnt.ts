export const isLocalhost = process.env.REACT_APP_IS_DEPLOYED ? false : true;

export const backendUrl = isLocalhost
    ? "localhost:5000/"
    : window.location.origin + "/api/"

console.log(process.env.REACT_APP_IS_DEPLOYED + " - " + isLocalhost);
console.log(isLocalhost ? "Running on localhost." : "Running deployed to an environment.");
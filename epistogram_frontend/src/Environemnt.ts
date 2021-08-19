export const isLocalhost = process.env.REACT_APP_IS_DEPLOYED ? false : true;

export const backendUrl = isLocalhost
    ? "http://localhost:5000/"
    : window.location.origin + "/api/"

if (isLocalhost)
    console.warn("Application is running on LOCALHOST, in localhost mode!");
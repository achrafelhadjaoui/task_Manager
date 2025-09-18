const backendDomain = import.meta.env.VITE_BACKEND_URL;

const apiEndpoints = {
    signUp: {
        method: "POST",
        url: `${backendDomain}/api/signup`
    },
    signIn: {
        method: "POST",
        url: `${backendDomain}/api/signin`
    },
    dashboard: {
        method: "GET",
        url: `${backendDomain}/api/dashboard`
    },
};

export { apiEndpoints };
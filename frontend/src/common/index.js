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
    current_user : {
        url : `${backendDomain}/api/user-details`,
        method : "GET"
    },
    dashboard: {
        method: "GET",
        url: `${backendDomain}/api/dashboard`
    },
    createTask: {
        method: "POST",
        url: `${backendDomain}/api/create-task`
    },
    getTasks: {
        method: "GET",
        url: `${backendDomain}/api/get-tasks`
    },
    updateTask: {
        method: "PUT",
        url: `${backendDomain}/api/update-task`
    },
    deleteTask: {
        method: "DELETE",
        url: `${backendDomain}/api/delete-task`
    },
    logout_user : {
        method : "POST",
        url : `${backendDomain}/api/logout`
    }
};

export { apiEndpoints };
import IDEbackend from "./IDEbackend";

export const loginUser = async (email,password) =>{
    const {data} = await IDEbackend.post('api/users/login', {
        email,
        password,
    });
    return data;
}

export const signupUser = async (userData) =>{
    const {data} = await IDEbackend.post('api/users/signup', userData);
    return data;
}

export const logoutUser = async () => {
    const response = await IDEbackend.get('api/users/logout');
    return response;
}
export const updateTheme = async (theme) => {
    const response = await IDEbackend.put('api/users/theme',theme);
    return response;
}
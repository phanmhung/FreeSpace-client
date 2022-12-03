import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const user = JSON.parse(localStorage.getItem('user'));
const token = JSON.parse(localStorage.getItem('token'));
const dark = JSON.parse(localStorage.getItem('dark'));
const initState ={
    user: user || "",
    token: token || "",
    dark: dark || false,
}

const AppContext = createContext();

const AppProvider = ({children}) =>{

    const [state, setState] = useState(initState);
    if (state.dark){
        document.documentElement.classList.add("dark");
    }
    else {
        document.documentElement.classList.remove("dark");
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    const autoFetch = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL,
    });
    

    // Add a request interceptor
    autoFetch.interceptors.request.use(function (config) {
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    autoFetch.interceptors.response.use(function (response) {
        // Do something with response data
        return response;
    }, function (error) {
        // Do something with response error
        if (error.response.status === 401){
            logOut();
            toast.error("Your session has expired. Please login again!");
        }
        if (error.response.status === 403){
            toast.error("You are not authorized to perform this action!");
            logOut();
        }
        if (error.response.status === 11000){
            toast.error("Something went wrong. Try again later!");
        }
        return Promise.reject(error);
    });

    const removeFromLocalStorage = () =>{
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    const addToLocalStorage = (user, token) =>{
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(token));
    }

    const setOneState =(key, value) =>{
        setState({...state, [key]: value});
    };

    const setNameAndToken = (user, token) =>{
        setState({...state, user, token});
        addToLocalStorage(user, token);
    };

    const logOut = () =>{
        removeFromLocalStorage();
        setState({...state, user: "", token: ""});
    }
    return (
        <AppContext.Provider value={{
                ...state,
                logOut,
                setNameAndToken,
                setOneState,
                addToLocalStorage,
                setState,autoFetch
            }}>
            {children}
        </AppContext.Provider>
    )
};

const useAppContext = () =>{
    return useContext(AppContext);
}

export {AppProvider, useAppContext};
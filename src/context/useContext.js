import { createContext, useContext, useState } from "react";

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
                setState
            }}>
            {children}
        </AppContext.Provider>
    )
};

const useAppContext = () =>{
    return useContext(AppContext);
}

export {AppProvider, useAppContext};
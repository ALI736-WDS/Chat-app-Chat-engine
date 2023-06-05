import React, { useState, useEffect, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false);
    const history = useHistory();  //baraye push user estefade mishe

    useEffect(() => {
        auth.onAuthStateChanged(user => {   //meshle onChange(): vaghti karbar ba google, emailesho entekhab kard bia in code haro anjam bede
            setUser(user);  //etelaate karbar ke omad, aval etelaat ro set kon to user
            setLoading(false);
            // console.log(user)
            if (user) history.push("/chats");
        })
    }, [user, history])

    return (
        <div>
            <AuthContext.Provider value={user}>
                {!loading && children}  {/* vaghti (!loading)loading true shod... */}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthContextProvider;
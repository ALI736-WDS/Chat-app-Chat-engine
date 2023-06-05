import React, { Component, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';

// Components
import Navbar from './Navbar';

// Styles
import styles from "./Chats.module.css"

// Context
import { AuthContext } from "../contexts/AuthContextProvider";
import axios from 'axios';


const Chats = () => {

    const [loading, setLoading] = useState(true);
    const user = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if (!user) {  //agar etelaate karbar vojud nadasht yani sign in nakarde bud
            history.push("/")  //be safhe asli hedayat beshhe
            return;  //va az barname kharej beshe va barname ejra nashe
        }

        axios.get("https://api.chatengine.io/users/me", {  //ersale darkhast baraye inke bebinim hesab karbari dare ya na
            headers: {
                "projectID": "c76b1138-1b35-4092-b0a9-9144cc864d15",  //donbale che user che karbari to che project bashe
                "user-name": user.email,
                "user-secret": user.uid
            }
        })
            .then(() => {  //sabr kon va agar karbar hesab dasht...
                setLoading(false)
            })
            .catch(() => {  //agar hesab nadasht
                let formdata = new FormData();
                formdata.append("email", user.email);
                formdata.append("username", user.email);
                formdata.append("secret", user.uid);
                getFile(user.phtoURL)
                    .then(avatar => {
                        formdata.append("avatar", avatar, avatar.name) //"avatar", avatar: avatar karbar hamun avaytar hast | "avatar.name: userPhoto.jpg"
                        axios.post("https://api.chatengine/io/users/", formdata, {
                            headers: {
                                "private-key": "baa875c2-d664-4fa5-a1f4-599fe675ace6"
                            }
                        })
                            .then(() => setLoading(false))
                            .catch(error => console.log(error))
                    })
            })
    }, [user, history])

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();  //yek file shabie onject ke aks toush hast
        return new File([data], "userPhoto.jpg", { type: "image/jped" })
    }

    const logoutHandler = async () => {
        await auth.signOut();
        history.push("/")
    }

    if (!user || loading) return "Loading..."  //agar etelaate karbar vojud nadashte bashe ya dare loading mikhore ta etelaat biad


    return (
        <div className={styles.container}>
            <Navbar logoutHandler={logoutHandler} />
            projectID=""

            <ChatEngine
                height="calc(100vh - 50px)"
                projectID="c76b1138-1b35-4092-b0a9-9144cc864d15"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;
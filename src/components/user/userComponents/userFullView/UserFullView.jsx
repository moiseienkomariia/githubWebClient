import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import style from "./UserFullView.module.scss";
import {getUserFullViewByName} from "components/user/service/UserService";

const UserFullView = () => {
    const {state} = useLocation();
    const [user, setUser] = useState([]);
    const [error, setError] = useState('');

    //TODO catch error after change url

    useEffect(() => {
        getUserFullViewByName(state.username)
            .then((result) => {
                if (typeof result.message != "undefined") {
                    throw new Error(result.message);
                }
                setUser(result);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    return (
        <>
            <div className={style.user}>
                <img className={style.avatar} src={user.avatar_url} alt=""/>
                <div>
                    <div className="login">{user.login}</div>
                    <a className={style.btnLink} href={user.html_url} target="_blank" rel="noreferrer">Link to github</a>
                </div>
            </div>
        </>
    )
}
export default UserFullView;
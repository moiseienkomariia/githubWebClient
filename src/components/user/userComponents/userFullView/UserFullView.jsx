import React, {useEffect, useState} from 'react';
import {createSearchParams, useLocation, useParams} from "react-router-dom";
import style from "./UserFullView.module.scss";
import {getUserFullViewByName, getUserRepos} from "components/user/service/UserService";
import ErrorMessage from "../../../error/ErrorMessage";
import UserReposList from "../userRepos/userReposList/UserReposList";

const UserFullView = () => {
    const {state} = useLocation();
    const [user, setUser] = useState([]);
    const params = useParams();
    const [error, setError] = useState('');
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const name = params.name != null ? params.name : params.owner;
        getUserFullViewByName(name)
            .then((result) => {
                setUser(result);
            })
            .catch((error) => {
                setError(error);
                setHasError(true);
            });
    }, []);

    return (
        <>
            {hasError ?
                <ErrorMessage message={error.message}/>
                :
                <div className={style.userFullView}>
                    <div className={style.user}>
                        <img className={style.avatar} src={user.avatar_url} alt=""/>
                        <div>
                            <div className="login">{user.login}</div>
                            <a className={style.btnLink} href={user.html_url} target="_blank" rel="noreferrer">Link to
                                github</a>
                        </div>
                    </div>
                    <div className={style.userRepos}>
                        <UserReposList username={user.login} reposCount={user.public_repos} page='1' perPage='30' />
                    </div>
                </div>
            }
        </>
    )
}
export default UserFullView;
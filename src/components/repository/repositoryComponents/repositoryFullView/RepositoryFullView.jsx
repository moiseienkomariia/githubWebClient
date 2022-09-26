import {useLocation, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getRepositoryFullViewByName} from "../../service/RepositoryService";
import style from "./RepositoryFullView.module.scss"
import Title from "../../../../ui/title/Title";
import ErrorMessage from "../../../error/ErrorMessage";

const RepositoryFullView = () => {
    const {state} = useLocation();
    const [repo, setRepo] = useState([]);
    const [error, setError] = useState('');
    const params = useParams();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        getRepositoryFullViewByName(params.name, params.owner)
            .then((result) => {
                setRepo(result);
            })
            .catch((error) => {
                setError(error);
                setHasError(true);
            });
    }, []);
    return (
        <>
            {hasError ?
                <>
                    <ErrorMessage message={error.message} />
                </>
                :
                <div className={style.repo}>
                    <Title>{repo.name}</Title>
                    <span className={style.lang}>
                        {repo.language != null ? <span className={style.langPill}>{repo.language}</span> : ''}
                    </span>
                    <div>{repo.description}</div>
                    <div className={style.footer}>
                        {repo.stargazers_count > 0 ?
                            <span className={style.stars}>
                                Stars: {repo.stargazers_count}
                            </span>
                            : '' }
                        {repo.forks_count > 0 ?
                            <span className={style.forks}>
                                Forks: {repo.forks_count}
                            </span>
                            : '' }
                        <a className={style.btn} href={repo.clone_url} target="_blank">Link to github</a>
                    </div>
                </div>
            }
        </>
        );
}

export default RepositoryFullView;

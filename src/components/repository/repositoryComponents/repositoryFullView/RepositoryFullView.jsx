import {useLocation, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getRepositoryFullViewByName} from "../../service/RepositoryService";
import style from "./RepositoryFullView.module.scss"
import Title from "../../../../ui/title/Title";
import ErrorMessage from "../../../error/ErrorMessage";
import Contents from "./contents/Contents";
import RepoHeader from "./contents/content/RepoHeader";
import RepoInfo from "./contents/content/RepoInfo";

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
                <>
                    <Title>{repo.full_name}</Title>
                    <RepoHeader repo={repo}/>
                    <div className={style.repo}>
                        <Contents repoName={params.name} repoOwner={params.owner} repo={repo}/>
                        <RepoInfo repo={repo} />
                    </div>
                </>
            }
        </>
        );
}

export default RepositoryFullView;

import {useLocation, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getRepositoryContributors,getRepositoryFullViewByName} from "../../service/RepositoryService";
import {getRepositoryReleases} from "../../service/ReleaseService";
import style from "./RepositoryFullView.module.scss"
import Title from "../../../../ui/title/Title";
import ErrorMessage from "../../../error/ErrorMessage";
import Release from "./Release";
import Contributor from "./Contributor";

const RepositoryFullView = () => {
    const {state} = useLocation();
    const [repo, setRepo] = useState([]);
    const [error, setError] = useState('');
    const params = useParams();
    const [hasError, setHasError] = useState(false);
    const [repositoryReleases, setRepositoryReleases] = useState([]);
    const [repositoryContributors, setRepositoryContributors] = useState([]);


    useEffect(() => {
        getRepositoryReleases(params.name, params.owner)
            .then((result) => {
                setRepositoryReleases(result);
            })
            .catch((error) => {
                setError(error);
                setHasError(true)
            });
        getRepositoryContributors(params.name, params.owner)
            .then((result) => {
                setRepositoryContributors(result);
                console.log(repositoryContributors);
            })
            .catch((error) => {
                setError(error);
                setHasError(true)
            });
    }, []);

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
                    <div className={style.repo}>
                        <div className={style.repoHeader}>
                            <div>
                                {repo.stargazers_count > 0 ?
                                    <span className={style.stars}>
                                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                                         data-view-component="true" className={style.star}>
                                        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                                    </svg>
                                        {repo.stargazers_count}
                                </span>
                                    : '' }
                                {repo.forks_count > 0 ?
                                    <span className={style.forks}>
                                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                                         data-view-component="true" className="octicon octicon-repo-forked mr-2">
                                        <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                                    </svg>
                                        {repo.forks_count}
                                </span>
                                    : '' }
                                <a className={style.btn} href={repo.clone_url} target="_blank">Link to github</a>
                            </div>
                        </div>
                        <div className={style.repoInfo}>
                            <Title className={style.subTitle}>About</Title>
                            <div className={style.description}>{repo.description}</div>
                            <div>
                                {repo.watchers_count > 0 ?
                                    <span className={style.watchersCount}>
                                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                                     data-view-component="true" className="octicon octicon-eye mr-2">
                                    <path d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"></path>
                                </svg>
                                        {repo.watchers_count}
                            </span>
                                    : '' }
                                {repo.license != null ?
                                    <span className={style.license}>
                                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"
                                     className="octicon octicon-law mr-2">
                                    <path d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path>
                                </svg>
                                        {repo.license.name}
                            </span>
                                    : '' }
                            </div>
                            {repositoryContributors.length > 0 ?
                                <div className={style.contributors}>
                                    <Title className={style.subTitle}>Contributors</Title>
                                    {repositoryContributors.map((contributor) => <Contributor contributor={contributor} key={contributor.id} />)}
                                </div>
                                : '' }
                        </div>
                        {repositoryReleases.length > 0 ?
                            <div className={style.releases}>
                                <Title className={style.subTitle}>Releases</Title>
                                {repositoryReleases.map((release) => <Release release={release} key={release.id} />)}
                            </div>
                            : '' }
                    </div>
                </>
            }
        </>
        );
}

export default RepositoryFullView;

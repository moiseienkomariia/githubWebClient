import React, {useEffect, useState} from 'react';
import style from "../../RepositoryFullView.module.scss";
import Title from "../../../../../../ui/title/Title";
import Contributor from "../../contributor/Contributor";
import Release from "../../release/Release";
import {getRepositoryReleases} from "../../../../service/ReleaseService";
import {getRepositoryContributors} from "../../../../service/RepositoryService";
import {useParams} from "react-router-dom";

const RepoInfo = ({repo}) => {
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
            })
            .catch((error) => {
                setError(error);
                setHasError(true)
            });
    }, []);
    return (
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
            {repositoryReleases.length > 0 ?
                <div className={style.releases}>
                    <Title className={style.subTitle}>Releases</Title>
                    {repositoryReleases.map((release) => <Release release={release} key={release.id} />)}
                </div>
                : '' }
        </div>
    );
};

export default RepoInfo;
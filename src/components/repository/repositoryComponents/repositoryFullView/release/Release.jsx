import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ErrorMessage from "../../../../error/ErrorMessage";
import style from "./Release.module.scss"

const Release = ({release}) => {
    const params = useParams();
    const [error, setError] = useState('');
    const [hasError, setHasError] = useState(false);

    return(
        <>
        {
            hasError ?
                <>
                    <ErrorMessage message={error.message}/>
                </>
                :
                <div className={style.release}>
                    <div className={style.tagName}>
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                             data-view-component="true" className="octicon octicon-tag flex-shrink-0 mt-1 color-fg-success">
                            <path fillRule="evenodd"
                                  d="M2.5 7.775V2.75a.25.25 0 01.25-.25h5.025a.25.25 0 01.177.073l6.25 6.25a.25.25 0 010 .354l-5.025 5.025a.25.25 0 01-.354 0l-6.25-6.25a.25.25 0 01-.073-.177zm-1.5 0V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 010 2.474l-5.026 5.026a1.75 1.75 0 01-2.474 0l-6.25-6.25A1.75 1.75 0 011 7.775zM6 5a1 1 0 100 2 1 1 0 000-2z"></path>
                        </svg>
                        <span>{release.tag_name}</span>
                    </div>
                    <div className={style.date}>{new Date(release.published_at).toLocaleDateString()}</div>
                    <div className={style.author}>
                        <img style={{borderRadius:"50%"}} width="25px" height="25px" src={release.author.avatar_url}
                             alt="autor"/>
                        <span>{release.author.login}</span>
                    </div>
                </div>
        }
        </>
    )
}
export default Release;
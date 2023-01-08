import React, {useEffect, useState} from "react";
import {generatePath, Link, useParams} from "react-router-dom";
import ErrorMessage from "../../../../error/ErrorMessage";
import style from "./Contents.module.scss"
import {getRepositoryContents} from "../../../service/RepositoryService";

const Contents = () => {

    const params = useParams();
    const [contents, setContents] = useState([]);
    const [error, setError] = useState('');
    const [hasError, setHasError] = useState(false);
    const [branches, setBranches] = useState(null);

    useEffect(() => {
        getRepositoryContents(params.name, params.owner)
            .then((result) => {
                let data = result.sort((a, b) => {
                    if (a.type < b.type) {
                        return -1;
                    }
                });
                setContents(data);
            })
            .catch((error) => {
                setError(error);
                setHasError(true)
            });
    }, [params.name, params.owner, params.filename])

    return(
        <>
            {
                hasError ?
                    <>
                        <ErrorMessage message={error.message}/>
                    </>
                    :
                    <div className={style.content}>
                        {contents.length > 0 ? contents.map(
                            (content) =>
                                <div key={`${content.sha}_${content.name}`} className={style.contentItem}>
                                    <span className={style.contentIcon}>
                                        {content.type == "dir"
                                            ?
                                            <svg fill="darkcyan" aria-label="Directory" aria-hidden="true" height="16"
                                                 viewBox="0 0 16 16" version="1.1" width="16"
                                                 data-view-component="true">
                                                <path d="M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H7.5a.25.25 0 01-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z"></path>
                                            </svg>
                                            :
                                            <svg aria-label="File" aria-hidden="true" height="16" viewBox="0 0 16 16"
                                                 version="1.1" width="16" data-view-component="true">
                                                <path fill="darkcyan" d="M3.75 1.5a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 019 4.25V1.5H3.75zm6.75.062V4.25c0 .138.112.25.25.25h2.688a.252.252 0 00-.011-.013l-2.914-2.914a.272.272 0 00-.013-.011zM2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V1.75z"></path>
                                            </svg>
                                        }
                                    </span>
                                    <Link className={style.contentLink} to={generatePath("/repository/:owner/:name/:filename", {owner: params.owner, name: params.name, filename: content.name})}
                                          state={{repoOwner: params.owner, repoName: params.name, content: content}}>
                                        {content.name}
                                    </Link>
                                </div>

                            )
                            : ''
                        }
                    </div>
            }
        </>
    )
}
export default Contents;
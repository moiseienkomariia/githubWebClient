import {Link, useParams} from "react-router-dom";
import {generatePath} from "react-router-dom";
import style from "./Repository.module.scss";

const Repository = ({item}) => {
    const path = generatePath("/repository/:owner/:name", {owner: item.owner.login,name: item.name});

    //TODO link to open issues and issues Component
    return (
        <div className={style.repo}>
            <div className={style.lang}>
                {item.language != null ? <span className={style.langPill}>{item.language}</span> : ''}
            </div>
            <div className={style.name}>
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                     data-view-component="true" className={style.repoIcon}>
                    <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
                </svg>
                <Link className={style.btnLink} to={path} state={{ repositoryName: item.name, repoOwner: item.owner.login }}>
                    {item.name}
                </Link>
            </div>
            {item.description != null ? <div className={style.description}>{item.description}</div> : ''}
            <div className={style.info}>
                {item.stargazers_count > 0
                    ?
                    <>
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16"
                         data-view-component="true" className={style.star}>
                        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                    </svg>
                    <span className={style.stars}>{item.stargazers_count}</span>
                    </>
                    :
                    ''
                }
                <span className={style.updateDate}>Updated on {new Date(item.updated_at).toLocaleDateString()}</span>
                {item.license != null ? <span className={style.license}>{item.license.name}</span> : ''}
                {item.open_issues_count > 0 ? <span className={style.issues}>{item.open_issues_count} issues need help</span> : ''}
            </div>
            <div className={style.footer}>
                <a className={style.btn} href={item.clone_url} target="_blank">
                    <svg height="16" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32"
                         data-view-component="true" className={style.github}>
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                </a>
            </div>
        </div>
    )
}
export default Repository;
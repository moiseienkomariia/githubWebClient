import {Link, useParams} from "react-router-dom";
import {generatePath} from "react-router-dom";
import style from "./Repository.module.scss";
import React from "react";

const Repository = ({item}) => {
    const path = generatePath("/repository/:owner/:name", {owner: item.owner.login,name: item.name});

    return (
        <div className={style.repo}>
            <div className={style.lang}>
                {item.language != null ? <span className={style.langPill}>{item.language}</span> : ''}
            </div>
            <div className={style.header}>
                <span>{item.name}</span>
            </div>
            <div className={style.footer}>
                {item.stargazers_count > 0 ?
                    <span className={style.stars}>
                        Stars: {item.stargazers_count}
                    </span>
                    : '' }
                <div>
                    <a className={style.btn} href={item.clone_url} target="_blank">Link to github</a>
                    <Link className={style.btn} to={path} state={{ repositoryName: item.name, repoOwner: item.owner.login }}>
                        Show
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Repository;
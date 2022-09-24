import {Link} from "react-router-dom";
import {generatePath} from "react-router-dom";
import style from "./User.module.scss"

const User = ({item}) => {
    const path = generatePath("/user/:login", {login: item.login})
    return (
        <div className={style.user}>
            <img className={style.avatar} src={item.avatar_url} alt=""/>
            <div>
                <strong>Name: </strong> {item.login} <br/>
                <a className={style.btn} href={item.html_url} target="_blank" rel="noreferrer">Link to github</a>
                <Link className={style.btn} to={path} state={{ username: item.login }}>
                    Show
                </Link>
            </div>
        </div>
    )
}
export default User;
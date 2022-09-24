import style from "./Button.module.scss";

export const Button = ({children, onClickFunc}) => {
    return (
        <button className={style.btn} type="button" onClick={onClickFunc}>
            {children}
        </button>
    )
}
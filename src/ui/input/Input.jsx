import style from "./Input.module.scss";

const Input = ({label, id, type, onChangeFunc, value, placeholder}) => {
    return (
        <>
            {
                label != "" ?
                    <label htmlFor={id}>{label}</label>
                : ''
            }
            <input className={style.input}
                   id={id}
                   type={type}
                   onChange={onChangeFunc}
                   value={value}
                   placeholder={placeholder}
            />
        </>
    )
}

export default Input;
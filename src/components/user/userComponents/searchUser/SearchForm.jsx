import Input from "ui/input/Input";
import {Button} from "ui/button/Button";
import {useNavigate, createSearchParams} from "react-router-dom";
import style from "./SearchForm.module.scss"
import React, {useState} from "react";


const SearchForm = ({id, placeholder}) => {
    const navigate = useNavigate();
    const [inputUserValue, setUserValue] = useState("");

    const handleInputUserChange = (event) => {
        setUserValue(event.target.value);
    };

    return(
    <div className={style.searchFormWrapper}>
        <label className="sr-only" htmlFor={id}>Search GitHub user</label>
        <Input label="" id={id} type="text"
               onChangeFunc={handleInputUserChange}
               value={inputUserValue}
               placeholder={placeholder}
               />
        <Button  onClickFunc={() => {
            navigate({
                pathname: "/users/search",
                search: `?${createSearchParams({
                    name: inputUserValue,
                    page: 1
                })}`
            });
        }}>Ok</Button>
    </div>
    )
}
export default SearchForm;
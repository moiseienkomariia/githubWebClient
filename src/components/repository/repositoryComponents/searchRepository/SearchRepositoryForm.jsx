import Input from "ui/input/Input";
import {Button} from "ui/button/Button";
import {useNavigate, createSearchParams} from "react-router-dom";
import style from "./SearchRepository.module.scss"
import React, {useState} from "react";


const SearchForm = ({id, placeholder}) => {
    const navigate = useNavigate();
    const [inputSearchRepoValue, setInputSearchRepoValue] = useState("");

    const handleInputRepoChange = (event) => {
        setInputSearchRepoValue(event.target.value);
    };
    return(
        <div className={style.searchFormWrapper}>
            <label className="sr-only" htmlFor={id}>Search GitHub repository</label>
            <Input id={id} type="text"
                   onChangeFunc={handleInputRepoChange}
                   value={inputSearchRepoValue}
                   placeholder={placeholder}
            />
            <Button  onClickFunc={() => {
                navigate({
                    pathname: "/repositories/search",
                    search: `?${createSearchParams({
                        q: inputSearchRepoValue,
                        page: 1
                    })}`
                });
            }}>Ok</Button>
        </div>
    )
}
export default SearchForm;
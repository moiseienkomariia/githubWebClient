import Input from "ui/input/Input";
import {Button} from "ui/button/Button";
import {useNavigate, createSearchParams} from "react-router-dom";
import style from "./SearchForm.module.scss"


const SearchForm = ({handleInputUserChange,inputUserValue,placeholder}) => {
    const navigate = useNavigate();
    return(
    <div className={style.searchFormWrapper}>
        <Input label="" id="searchUser" type="text"
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
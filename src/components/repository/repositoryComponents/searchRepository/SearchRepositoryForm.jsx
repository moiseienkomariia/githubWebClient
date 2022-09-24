import Input from "ui/input/Input";
import {Button} from "ui/button/Button";
import {useNavigate, createSearchParams} from "react-router-dom";
import style from "./SearchRepository.module.scss"


const SearchForm = ({handleInputRepoChange,inputSearchRepoValue,placeholder}) => {
    const navigate = useNavigate();
    return(
        <div className={style.searchFormWrapper}>
            <Input label="" id="searchUser" type="text"
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
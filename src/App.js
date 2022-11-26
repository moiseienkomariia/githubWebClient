import style from './App.module.scss';
import './style.css';
import {Link, Route, Routes} from "react-router-dom";
import Repositories from "components/repository/repositoryComponents/repositoryList/Repositories";
import Main from "components/main/Main";
import Users from "components/user/userComponents/usersList/Users";
import React, {useState} from "react";
import Searchform from "components/user/userComponents/searchUser/SearchForm";
import {useQuery} from "hooks/Query";
import UserFullView from "components/user/userComponents/userFullView/UserFullView";
import SearchRepositoryForm from "components/repository/repositoryComponents/searchRepository/SearchRepositoryForm";
import RepositoryFullView from "./components/repository/repositoryComponents/repositoryFullView/RepositoryFullView";
import Content from "./components/repository/repositoryComponents/repositoryFullView/contents/content/Content";

function App() {
  const query = useQuery();

  const [inputUserValue, setUserValue] = useState("");
  const [inputSearchRepoValue, setInputSearchRepoValue] = useState("");

  const handleInputUserChange = (event) => {
    setUserValue(event.target.value);
  };

  const handleInputRepoChange = (event) => {
    setInputSearchRepoValue(event.target.value);
  };

  // TODO Make Header component
  return (
      <div className={style.container}>
        <header className={style.header}>
          <Link to="/">Home</Link>
          <div>
            <Searchform handleInputUserChange={handleInputUserChange}
                        inputUserValue={inputUserValue}
                        placeholder="Search GitHub User"/>
            <SearchRepositoryForm handleInputRepoChange={handleInputRepoChange}
                                  inputSearchRepoValue={inputSearchRepoValue}
                                  placeholder="Search GitHub Repository"/>
          </div>
        </header>
        <main>
          <Routes>
            <Route exact={true} path="/" element={<Main/>}/>
            <Route exact={false} path={`/users/search`} element={<Users name={query.get("name")} page={query.get("page")} perPage="5" />} />
            <Route exact={false} path="/user/:name" element={<UserFullView/>}/>
            <Route exact={false} path={`/repositories/search`} element={<Repositories q={query.get("q")} page={query.get("page")} perPage="10" />} />
            <Route exact={false} path="/repository/:owner/:name" element={<RepositoryFullView/>}/>
            <Route exact={false} path="/:owner/:name/:filename" element={<Content />} />}
          </Routes>
        </main>
      </div>
  );
}

export default App;


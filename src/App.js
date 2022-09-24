import style from './App.module.scss';
import './style.css';
import {Link, Route, Routes} from "react-router-dom";
import Repositories from "./components/account/repositories/Repositories";
import Main from "./components/main/Main";
import Users from "./components/user/userComponents/usersList/Users";
import React, {useState} from "react";
import Searchform from "./components/user/userComponents/searchUser/SearchForm";
import {useQuery} from "./hooks/Query";
import UserFullView from "./components/user/userComponents/userFullView/UserFullView";

function App() {
  const [inputUserValue, setUserValue] = useState("");
  const query = useQuery();

  const handleInputUserChange = (event) => {
    setUserValue(event.target.value);
  };

  // TODO Make Header component
  return (
      <div className={style.container}>

        <header className={style.header}>
          <Link to="/">Home</Link>
          <Searchform handleInputUserChange={handleInputUserChange}
                      inputUserValue={inputUserValue}
                      placeholder="Search GitHub User"/>
        </header>
        <main>
          <Routes>
            <Route exact={true} path="/" element={<Main/>}/>
            <Route exact={false} path={`/users/search`} element={<Users name={query.get("name")} page={query.get("page")} perPage="5" />} />
            <Route exact={false} path="/user/:name" element={<UserFullView/>}/>
            <Route exact={false} path="/user/:name/repositories" element={<Repositories/>}/>
          </Routes>
        </main>
      </div>
  );
}

export default App;


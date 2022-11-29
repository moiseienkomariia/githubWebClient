import {searchUsersByName} from "components/user/service/UserService";
import ReactPaginate from "react-paginate";
import React, {useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";
import style from "./Users.module.scss";
import User from "components/user/userComponents/userSlimView/User";
import Title from "ui/title/Title";
import ErrorMessage from "../../../error/ErrorMessage";
import styles from "../../../repository/repositoryComponents/repositoryList/Repositories.module.scss";

const Users = ({name, page, perPage}) => {
    const [users, setUsers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(page);
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState([]);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        searchUsersByName(name, currentPage, perPage)
            .then((results) => {
                initPageInfo(results.total_count, perPage);
                setUsers(results.items);
            })
            .catch((error) => {
                setError(error);
                setHasError(true);
            });
    }, [currentPage, searchParams]);

    const handlePageClick = (event) => {
        let cPage = event.selected + 1;
        setCurrentPage(cPage);
        setSearchParams({
            name: name,
            page: cPage
        });
        searchParams.set(name, cPage);
    };

    const initPageInfo = (totalCount, perPage) => {
        setPages(Math.ceil(totalCount / perPage));
        setTotalCount(totalCount);
    }

    useMemo(() => {
        window.scrollTo({top: 0})
    }, [currentPage])

    return (
        <>
            {hasError ?
                <ErrorMessage message={error.message} />
            :
                <>
                    {users.length > 0 ? <Title>Results for {name}:</Title> : <Title>User not found</Title>}
                    {users.length > 0 ? users.map((user)=><User key={user.id} item={user} />) : ''}
                    {totalCount > perPage ?
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={perPage}
                            pageCount={pages}
                            previousLabel="preview"
                            renderOnZeroPageCount={null}
                            containerClassName={styles.pagination}
                            pageClassName={styles.page}
                            pageLinkClassName={styles.pageLink}
                            activeClassName={styles.active}
                            previousClassName={`${styles.btn} ${styles.prev}`}
                            nextClassName={`${styles.btn} ${styles.next}`}
                        />
                    : ''}
                </>
            }
        </>
    )
}
export default Users;
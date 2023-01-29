import React, {useEffect, useMemo, useState} from 'react';
import {getUserRepos} from "../../../service/UserService";
import Repository from "../../../../repository/repositoryComponents/repositorySlimView/Repository";
import {useSearchParams} from "react-router-dom";
import ReactPaginate from "react-paginate";
import styles from "./UserReposList.module.scss";
import ErrorMessage from "../../../../error/ErrorMessage";

const UserReposList = ({username, reposCount, page, perPage}) => {
    const [userRepos, setUserRepos] = useState([]);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(page);
    const [queryParams, setQueryParams] = useSearchParams();
    const [hasLoaded, setHasLoaded] = useState(false);
    const [error, setError] = useState([]);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        getUserRepos(username, currentPage, perPage)
            .then((results) => {
                setUserRepos(results);
                initPageInfo(reposCount, perPage);
                setHasLoaded(true);
            })
            .catch((error) => {
                setError(error);
                setHasError(true);
            });;
    }, [username, reposCount, page, perPage]);

    const handlePageClick = (event) => {
        let cPage = event.selected + 1;
        setCurrentPage(cPage);
        setQueryParams({
            page: cPage,
        });
        queryParams.set(cPage);
    };

    const initPageInfo = (totalCount, perPage) => {
        setPages(Math.ceil(totalCount / perPage));
    }

    useMemo(() => {
        window.scrollTo({top: 0})
    }, [currentPage])


    return (
        <>
            {hasLoaded &&
            <>
                {userRepos.length > 0 ? userRepos.map((repo) => <Repository key={repo.id} item={repo}/>) : ''}
                {reposCount > perPage ?
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
                    /> : ''}
            </>
            }
            {hasError &&
                <ErrorMessage message={error.message} />
            }
        </>
    );
};

export default UserReposList;
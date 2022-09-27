import React, {useEffect, useState} from "react";
import {searchReposByName} from "components/repository/service/RepositoryService";
import {useSearchParams} from "react-router-dom";
import Title from "ui/title/Title";
import ReactPaginate from "react-paginate";
import style from './Repositories.modules.scss';
import Repository from "../repositorySlimView/Repository";
import ErrorMessage from "../../../error/ErrorMessage";

const Repositories = ({q, page, perPage}) => {
    const [repositories, setRepositories] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(page);
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState([]);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        searchReposByName(q, currentPage, perPage)
            .then((results) => {
                initPageInfo(results.total_count, perPage);
                setRepositories(results.items);
            })
            .catch((error) => {
                setError(error);
                setHasError(true)
            });
    }, [currentPage, searchParams]);

    const initPageInfo = (totalCount, perPage) => {
        let count = totalCount < 1000 ? totalCount : 1000;
        setPages(Math.ceil(count / perPage));
        setTotalCount(totalCount);
    }

    const handlePageClick = (event) => {
        let cPage = event.selected + 1;
        setCurrentPage(cPage);
        setSearchParams({
            q: q,
            page: cPage
        });
        searchParams.set(q, cPage);
    };

    return (
        <>
            {hasError ?
                <>
                    <ErrorMessage message={error.message}/>
                </>
                :
                <>
                    {repositories.length > 0 ? <Title>{totalCount} repository results</Title> : <Title>Repositories not found</Title>}
                    {repositories.length > 0 ? repositories.map((repo) => <Repository key={repo.id} item={repo}/>) : ''}
                    {totalCount > perPage ?
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={perPage}
                            pageCount={pages}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            containerClassName="pagination"
                            pageClassName="page"
                            pageLinkClassName="pageLink"
                            activeClassName="active"
                            previousClassName="prev"
                            nextClassName="next"
                        />
                        : ''}
                </>
            }
        </>
    )
}

export default Repositories;
import useBreadcrumbs from "use-react-router-breadcrumbs";
import {NavLink, useLocation, useParams} from "react-router-dom";
import b from "./Breadcrumbs.module.scss";
import React, {useEffect, useState} from "react";
import {useQuery} from "../../hooks/Query";

const Breadcrumbs = () => {
    const {state} = useLocation();
    const query = useQuery();
    const [name, setName] = useState('');

    const DynamicOwnerBreadcrumb = ({ match }) => (
        <span>{match.params.owner}</span>
    );
    useEffect(() => {
        setName(state != null && state.username != null ? state.username : '');
    }, [state]);
    const routes = [
        { path: "/users", breadcrumb: null },
        { path: "/users/search", breadcrumb: `${query.get('name')}` },
        { path: "/user", breadcrumb: null },
        { path: "/user/:name", breadcrumb: `${name}` },
        { path: "/repositories", breadcrumb: null },
        { path: "/repositories/search", breadcrumb: `${query.get('q')}` },
        { path: "/repository", breadcrumb: null },
        { path: "/repository/:owner", breadcrumb: DynamicOwnerBreadcrumb },
    ];

    const breadcrumbs = useBreadcrumbs(routes);

    return (
        <nav aria-label="Breadcrumbs">
            <ol className={b.breadcrumbs}>
                {breadcrumbs.map(({ match, breadcrumb }) => (
                    <li className={b.breadcrumbsItem}>
                        <NavLink key={match.pathname} to={match.pathname}>
                            {breadcrumb}
                        </NavLink>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
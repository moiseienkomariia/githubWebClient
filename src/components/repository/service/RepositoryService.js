import {config} from "config";

export const searchReposByName = (name, page, perPage) => {
    return fetch(`${config.API_URL}/search/repositories?q=${name}&page=${page}&per_page=${perPage}`)
        .then((res) => res.json());
}

export const getRepositoryFullViewByName = (repoName, repoOwner) => {
    return fetch(`${config.API_URL}/repos/${repoOwner}/${repoName}`)
        .then((res) => res.json());
}
import {config} from "config";
import {checkResponse} from "../../error/ErrorService";

export const searchReposByName = (name, page, perPage) => {
    return fetch(`${config.API_URL}/search/repositories?q=${name}&page=${page}&per_page=${perPage}`)
        .then((res) => checkResponse(res));
}

export const getRepositoryFullViewByName = (repoName, repoOwner) => {
    return fetch(`${config.API_URL}/repos/${repoOwner}/${repoName}`)
        .then((res) => checkResponse(res));
}

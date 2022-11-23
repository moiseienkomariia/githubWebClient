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

export const getRepositoryContributors = (repoName, repoOwner) => {
    return fetch(`${config.API_URL}/repos/${repoOwner}/${repoName}/contributors`)
        .then((res) => checkResponse(res));
}

export const getRepositoryContents = (repoName, repoOwner) => {
    return fetch(`${config.API_URL}/repos/${repoOwner}/${repoName}/contents`)
        .then((res) => checkResponse(res));
}

export const getRepositoryBranches = (repoName, repoOwner) => {
    return fetch(`${config.API_URL}/repos/${repoOwner}/${repoName}/branches`)
        .then((res) => checkResponse(res));
}

export const getRepositoryContentFile = (repoName, repoOwner, sha) => {
    return fetch(`${config.API_URL}/repos/${repoOwner}/${repoName}/git/blobs/${sha}`)
        .then((res) => checkResponse(res));
}

export const getRepositoryContentDir = (repoName, repoOwner, sha) => {
    return fetch(`${config.API_URL}/repos/${repoOwner}/${repoName}/git/trees/${sha}`)
        .then((res) => checkResponse(res));
}

export const getRepositoryContentForBranch = (repoName, repoOwner, name, ref) => {
    return fetch(`${config.API_URL}/repos/${repoOwner}/${repoName}/contents/${name}?ref=${ref}`)
        .then((res) => checkResponse(res));
}


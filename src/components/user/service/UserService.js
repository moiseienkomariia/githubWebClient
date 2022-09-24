import {config} from "config";

export const searchUsersByName = (name, page, perPage) => {
    return fetch(`${config.API_URL}/search/users?q=${name}&page=${page}&per_page=${perPage}`)
        .then((res) => res.json());
}

export const getUserFullViewByName = (username) => {
    return fetch(`${config.API_URL}/users/${username}`)
        .then((res) => res.json());
}
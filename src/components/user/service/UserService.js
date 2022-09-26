import {config} from "config";
import {checkResponse} from "../../error/ErrorService";

export const searchUsersByName = (name, page, perPage) => {
    return fetch(`${config.API_URL}/search/users?q=${name}&page=${page}&per_page=${perPage}`)
        .then((res) => checkResponse(res));
}

export const getUserFullViewByName = (username) => {
    return fetch(`${config.API_URL}/users/${username}`)
        .then((res) => checkResponse(res));
}
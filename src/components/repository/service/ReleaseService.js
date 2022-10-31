import {config} from "../../../config";
import {checkResponse} from "../../error/ErrorService";

export const getRepositoryReleases = (repoName, repoOwner) => {
    return fetch(`${config.API_URL}/repos/${repoOwner}/${repoName}/releases`)
        .then((res) => checkResponse(res));
}

export const getReleaseAssets = (repoName, repoOwner, releaseId) => {
    return fetch(`${config.API_URL}/repos/${repoOwner}/${repoName}/releases/${releaseId}/assets`)
        .then((res) => checkResponse(res));
}

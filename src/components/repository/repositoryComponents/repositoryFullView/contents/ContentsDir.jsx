import React from 'react';
import Contents from "./Contents";
import {useParams} from "react-router-dom";

const ContentsDir = () => {
    const params = useParams();
    return (
        <Contents repoName={params.name} repoOwner={params.owner}/>
    );
};

export default ContentsDir;
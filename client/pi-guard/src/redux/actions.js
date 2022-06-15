
export const addFindings = (finding) => {
    return {
        type: 'SCANNER: GITHUB REPO HISTORY CLEANER', payload: finding
    };
}

export const setGithubUsername = (username) => {
    return {
        type: 'SET GITHUB USERNAME', payload: username
    };
}

export const setGithubRepoName = (repo_name) => (dispatch) => {
    dispatch({ type: 'SET GITHUB REPO NAME', payload: repo_name });
}

export const setGithubFileName = (file_name) => (dispatch) => {
    dispatch({ type: 'SET GITHUB FILE NAME', payload: file_name });
}

export const setGithubLatestCommit = (latest_commit_sha) => (dispatch) => {
    dispatch({ type: 'SET GITHUB LATEST COMMIT', payload: latest_commit_sha });
}
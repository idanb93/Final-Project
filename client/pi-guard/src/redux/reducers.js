
const initialState = {
    findings: [],
}

export const reducer = (state = initialState, action = {}) => {

    switch (action.type) {

        case 'SCANNER: GITHUB REPO HISTORY CLEANER':
            let newFindings = [...state.findings];
            newFindings.push(action.payload);
            return { ...state, findings: newFindings };

        case 'UPDATE FINDING DETAIL' :
            console.log('action.payload: ', action.payload);
            let newFinding = {...state.finding};
            newFinding[action.payload.detailToUpdate] = action.payload.detailToUpdate;
            return {...state, finding: newFinding};

        case 'SET GITHUB USERNAME':
            let newGithubUsernames = [...state.findings];
            newGithubUsernames.push(action.payload);
            return { ...state, githubUsernames: newGithubUsernames };

        case 'SET GITHUB REPO NAME':
            let newGithubRepoNames = [...state.findings];
            newGithubRepoNames.push(action.payload);
            return { ...state, githubRepoNames: newGithubRepoNames };

        case 'SET GITHUB FILE NAME':
            let newGithubFileNames = [...state.findings];
            newGithubFileNames.push(action.payload);
            return { ...state, githubFilesNames: newGithubFileNames };

        case 'SET GITHUB LATEST COMMIT':
            let newGithubCommits = [...state.findings];
            newGithubCommits.push(action.payload);
            return { ...state, githubCommits: newGithubCommits };

        default:
            return { ...state };
    }
}
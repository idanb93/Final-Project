const dotenv = require('dotenv');
const axios = require('axios');
const { decode } = require('js-base64');

dotenv.config();

const getLatestCommitInRepo = async (githubUsername, githubRepoName) => {

    try {
        const response = await axios(`https://api.github.com/repos/${githubUsername}/${githubRepoName}/commits`);

        if (response.status === 403) {
            console.log('rate limit exceeded!');
            return false;
        }

        const commits = response.data;
        return commits[0]?.sha;
    }
    catch (err) {
        console.log(err);
    }
}

const getTargetFilesInRepo = async (githubUsername, githubRepoName, latestCommitSha) => {

    const listOfFilesInRepo = [];

    try {
        const response = await axios(`https://api.github.com/repos/${githubUsername}/${githubRepoName}/git/trees/${latestCommitSha}`);
        const commitDetails = response.data;

        commitDetails.tree.forEach((node) => {
            // checks if a node in the tree is a folder(tree) or a file(blob):
            if (node.type === 'blob') {
                listOfFilesInRepo.push(node.path);
            }
        })

        console.log('getFilesInRepo: ', listOfFilesInRepo);
        return listOfFilesInRepo;

    } catch (err) {
        console.log(err);
    }
}

const searchTermsInFile = (decodedContentOfFile, filename, findings) => {

    // const regex = new RegExp('[0-9a-zA-Z]{32}', 'ig')
    const apiKeyPattern = '[0-9a-zA-Z]{32}'

    let startingIndexOfPattern = -1;

    let terms = [
        "key",
        "KEY",
        "api_key",
        "API_KEY",
        "apiKey",
        "ApiKey",
        "password",
        "Password",
        "PASSWORD",
        "token",
        "Token",
        "TOKEN",
    ];

    console.log(filename);

    terms.map((term) => {

        let newRegex = new RegExp('["]{0,1}' + term + '["]{0,1}' + '[ ]{0,1}(=|:)[ ]{0,1}["]{0,1}' + apiKeyPattern + '["]{0,1}');
        startingIndexOfPattern = decodedContentOfFile.search(newRegex);
        // console.log('startingIndexOfPattern: ', startingIndexOfPattern);

        if (startingIndexOfPattern !== -1) {

            let newFinding = {
                finding: decodedContentOfFile.substring(startingIndexOfPattern, startingIndexOfPattern + 80),
                filename,
            };
            findings.push(newFinding);

        } else {
            console.log('Pattern was not found!');
        }
    })
}

const scanFiles = async (githubUsername, githubRepoName, listOfFilesInRepo) => {

    const findings = [];

    if (listOfFilesInRepo) {
        for (let i = 0; i < listOfFilesInRepo.length; i++) {
            try {
                const response = await axios(`https://api.github.com/repos/${githubUsername}/${githubRepoName}/contents/${listOfFilesInRepo[i]}`);
                const data = response.data;
                let decodedContentOfFile = decode(data.content);
                searchTermsInFile(decodedContentOfFile, listOfFilesInRepo[i], findings);
            } catch (e) {
                console.log(e);
            }
        }
    } else {
        console.log('There are no files to check in the repo!');
    }

    console.log('findings at the end of handleFiles: ', findings);
    return findings;

}

const _scan = async (req, res) => {

    const { githubUsername, githubRepoName } = req.body;

    let result = {
        githubUsername,
        githubRepoName,
        latestCommitSha: '',
        findings: [],
    }

    try {
        result.latestCommitSha = await getLatestCommitInRepo(githubUsername, githubRepoName);
        const listOfFilesInRepo = await getTargetFilesInRepo(githubUsername, githubRepoName, result.latestCommitSha);
        result.findings = await scanFiles(githubUsername, githubRepoName, listOfFilesInRepo);
        console.log('findings of the files scannings in _scan: ', result.findings);
        res.status(200).send(result).end();

    } catch (e) {
        res.status(403).send({ msg: 'Github API rate limit exceeded, please try again in one hour' });
    }
}

module.exports = {
    _scan,
}
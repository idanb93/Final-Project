import { connect } from 'react-redux';

import {
    addFindings,
} from '../redux/actions';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

const subscribedScanners = [

    {
        name: 'Github Repo History Cleaner',
        description: 'cleansing bad data(Passwords, Credentials & other Private data) out of your Git repository history'
    },
    {
        name: 'Config Files Scanner',
        description: 'this scanner searches for config files problems(.jenkinsfile)'
    },

]

function Scanners(props) {
    // 
    // Using a function that calles a function in useState will make sure that we will not run what's inside of it again and again
    // Which can hurt the performance of our application, so when dealing with function components and using useState hook
    // it is good to remember to use a function that calles a function
    const [result, setResult] = useState(() => {});
    const navigate = useNavigate();

    const handleScan = async () => {

        fetch('/scanners', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                githubUsername: result.githubUsername,
                githubRepoName: result.githubRepoName
            })
        })
        .then(response=>{
            
            if (response.status === 403){
                alert('Github API rate limit exceeded, please try again in one hour');
                return 'rate limit exceeded';
            } else {
                return response.json();
            }
        })
        .then(data=>{
            if (data !== 'rate limit exceeded'){
                props.updateFindings(data);
                navigate('/report');
            }
        })
        .catch(e=>{
            alert(e);
        })

    }

    return (
        <>
            <section id="dashboard-section">
                <div id="scanners-details">
                    {
                        subscribedScanners.map((scanner, index) => {
                            return (

                                <div key={index} className={'scanner-active'}>
                                    <h5 className='scanner-detail'>{scanner.name}</h5>
                                    <p className='scanner-detail'>{scanner.description}</p>
                                    <input className="scanner-input" type={'text'} placeholder={'Github Username'}  onChange={(e) => { setResult(prevResult => { return { ...prevResult, githubUsername: e.target.value } }) }} />
                                    <input className="scanner-input" type={'text'} placeholder={'Github Repo Name'} onChange={(e) => { setResult(prevResult => { return { ...prevResult, githubRepoName: e.target.value } }) }} />
                                    {/* <input className="scanner-input" type={'text'} placeholder={'Github Repo File'} onChange={(e) => setGithubRepoFile(e.target.value)} /> */}
                                    <button className="scanner-input" onClick={(e) => handleScan(e)}>Scan</button>
                                    <Link to={'/report'}> <button className="scanner-input">Report</button></Link>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateFindings: (result) => dispatch(addFindings(result)),
    }
}

export default connect(null, mapDispatchToProps)(Scanners);
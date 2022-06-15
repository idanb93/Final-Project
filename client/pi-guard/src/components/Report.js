import { connect } from 'react-redux';
import { useState } from 'react';

function Report(props) {

    // const saveReport = () => {
    //     fetch('/save-report', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'Application/json'
    //         },
    //         body: JSON.stringify({

    //         })
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data);
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //     })

    // }

    const [findingIndex, setFindingIndex] = useState(0);

    return (
        <>
            <section id="dashboard-section">
                {<div id="findings">
                    <h3>Report: </h3>
                    <button id="save-report-button" style={{ marginBottom: '2vh' }}>Save Report</button>
                    <div className="finding">
                        <div className="finding-index">
                            <h2>#</h2>
                        </div>
                        <div className="finding-content">
                            <p>Finding Details</p>
                        </div>
                        <div className="finding-content">
                            <p>Github Username</p>
                        </div>
                        <div className="finding-content">
                            <p>Repo Name</p>
                        </div>
                        <div className="finding-content">
                            <p>File Name</p>
                        </div>
                        <div className="finding-content">
                            <p>Commit SHA</p>
                        </div>
                        <div className="finding-content">
                            <p>Line</p>
                        </div>
                    </div>


                    {

                        props.result.map((scan, index) => {

                            return (
                                <>
                                    {
                                        scan.findings.map((finding, index) => {
                                            return (
                                                <div className="finding">
                                                    <div className="finding-index">
                                                        <h2>{findingIndex}</h2>
                                                        {/* {setFindingIndex(prevFindingIndex => prevFindingIndex + 1)} */}
                                                    </div>
                                                    <div className="finding-content">
                                                        <p>{finding.finding}</p>
                                                    </div>
                                                    <div className="finding-content">
                                                        <p>{scan.githubUsername}</p>
                                                    </div>
                                                    <div className="finding-content">
                                                        <p>{scan.githubRepoName}</p>
                                                    </div>
                                                    <div className="finding-content">
                                                        <p>{finding.filename}</p>
                                                    </div>
                                                    <div className="finding-content">
                                                        <p>{scan.latestCommitSha}</p>
                                                    </div>
                                                    <div className="finding-content">
                                                        <p></p>
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }
                                </>
                            )
                        })

                    }
                </div>

                }
            </section>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        result: state.findings,
    }
}


export default connect(mapStateToProps, null)(Report);
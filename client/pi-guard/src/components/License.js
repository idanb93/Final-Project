import {Link} from 'react-router-dom';

const scanners = [

    {
        name: 'Tainted Libraries or Components',
        description: 'The scanner goes thorugh your repos and scan for vulnerablities in libraries',
        isPurchased: false,
    },
    {
        name: 'Github ',
        isPurchased: false,
    },
    {
        name: 'Github Repo History Cleaner',
        description: 'cleansing bad data(Passwords, Credentials & other Private data) out of your Git repository history',
        isPurchased: true,
    },
    {
        name: 'Config Files Scanner',
        description: 'this scanner searches for config files problems(.jenkinsfile)',
        isPurchased: true,
    },
    {
        name: 'Code Suggestions',
        description: 'Suggestions that will make your code more readable, manageable and stands in newer standarts(ES6)',
        isPurchased: false,
    }

]

function License() {

    return (
        <>
            <section id="dashboard-section">
                <>
                    <div id="scanners-details">
                        {
                            scanners.map((scanner, index) => {

                                return (
                                    <div key={index} className={scanner.isPurchased ? 'scanner-active' : 'scanner'}>
                                        <h5>{scanner.name}</h5>
                                        <p>{scanner.description}</p>
                                        {scanner.isPurchased ? <Link to={'/scanners'}><button>Use</button></Link> : <button>Purchase</button>}
                                    </div>
                                )
                            }) 
                              
                              
                        }
                    </div>
                </>
            </section>
        </>
    )
}


export default License;
import { Link, useNavigate } from 'react-router-dom';

function UsersNavbar(props) {

    const navigate = useNavigate();

    const handleLogout = () => {
        fetch('/logout')
            .then(response => {
                alert('You have been successfully logged out!');
                navigate('/', { replace: true });
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <nav id='navbar'>
            < h4 id="website-title"> PI-GUARD </h4>
            <div>
                <Link className="navbar-brand text-white text-lg brand-text" to="/logout" onClick={handleLogout}>Logout</Link>
            </div>
        </nav>
    )
}

export default UsersNavbar;
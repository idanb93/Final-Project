import {Link} from 'react-router-dom';

function PublicNavbar(props) {
    return (
        <nav id='navbar'>
        < h4 id="website-title"> PI-GUARD </h4>
        <div>
            <Link className="navbar-brand text-white text-lg brand-text" to="/"> Login </Link>
            <Link className="navbar-brand text-white text-lg brand-text" to="/signup"> Signup </Link>
        </div>
    </nav>
    )
}

export default PublicNavbar;
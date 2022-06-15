import { useLocation } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';
import UsersNavbar from './UsersNavbar';

function Navbar (){

    const location = useLocation();

    const openRoutes = [
        '/',
        '/signup'
    ];

    const isOpenRoute = openRoutes.includes(location.pathname);

    return (
        <div>
            {isOpenRoute && <PublicNavbar/> }
            {!isOpenRoute && <UsersNavbar/>}
        </div>
    )

}

export default Navbar;
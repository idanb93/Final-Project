import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as BiIcons from 'react-icons/bi';
import * as IoIcons from 'react-icons/io';
import * as TbIcons from 'react-icons/tb';
import { Link } from 'react-router-dom';


function Sidebar() {

    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch('/logout')
        .then(response => {
            alert('You have been successfully logged out!');
            navigate('/', { replace: true });
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <>
            <div className='navbar-2'>
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
            </div>
            < nav className={sidebar ? 'nav-menu active' : 'nav-menu'} >
                <ul className='nav-menu-items'>
                    <div>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </div>
                    <div>
                        <li key={'logout'} className={'nav-text'} id={'sidebar-signout'} onClick={handleLogout}>
                            <Link to={'/logout'}>
                                {<BiIcons.BiLogOutCircle />}
                                <span>Logout</span>
                            </Link>
                        </li>
                    </div>
                </ul>
            </nav >
        </>
    )

}

export default Sidebar;


const SidebarData = [
    {
        title: 'Scanners',
        path: '/scanners',
        icon: <TbIcons.TbZoomCode />,
        cName: 'nav-text'
    },
    {
        title: 'Team',
        path: '/team',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: 'Alerts',
        path: '/alerts',
        icon: <FiIcons.FiAlertTriangle/>,
        cName: 'nav-text'
    },
    {
        title: 'License',
        path: '/license',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text'
    },
    {
        title: 'Analytics',
        path: '/analytics',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    }
];
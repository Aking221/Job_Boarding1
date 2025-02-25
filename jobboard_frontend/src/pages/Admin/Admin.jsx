import { useState } from 'react';
import "../../styles/AdminCss/Admin.css"
import * as React from 'react';
import Button from '@mui/material/Button';
import logoHeaderAdmin from '../../assets/image/logoBanner.png';
import Users from '../../components/AdminComponents/Users';
import Joboffers from '../../components/AdminComponents/Joboffers';
import Company from '../../components/AdminComponents/Company';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext3';
import { Link } from 'react-router-dom';





export function Admin () {

    const navigate = useNavigate();
    const { logout } = React.useContext(AuthContext);


    const [activeSection, setActiveSection] = useState ('Joboffers');

    return (
        <div className='admin-page'>

            <header className='admin-header'>
                <div className='admin-logo-header'>
                    <Link to='/' onClick={logout} >
                        <img src={logoHeaderAdmin} alt="Le super logo de Pinkedin" className="logo"/>
                    </Link>
                </div>
                <div className='admin-group-header'>
                    <div className='admin-avatar'>

                            <AdminPanelSettingsIcon
                            fontSize='large'
                            sx={{
                            color:'#FC6EDA',
                            }}
                            />
                    </div>
                    <Button
                    variant='contained'
                    size='small'
                    onClick={() => {
                        logout();
                        navigate('/');
                    }}
                    sx={{
                        width: '80px',
                        height:'30px',
                        borderRadius: '10px',
                        backgroundColor: '#FC6EDA',
                        textTransform: 'none',
                        boxShadow: 'none',

                        fontSize:'14px',
                        fontFamily: 'Open_sans, sans-serif',
                            '&:hover': {
                                boxShadow: 'none',
                                backgroundColor: '#fff',
                                color: '#FC6EDA',
                                border: '1px solid #FC6EDA',

                        }
                    }}>
                        Log Out
                    </Button>

                </div>
            </header>

            <div className='admin-sidebar'>
                <div className='admin-sidebar-button'>
                    <Button
                        variant='contained'
                        onClick={() => setActiveSection('JobOffers')}
                        size='small'
                        sx={{
                            width: '90px',
                            backgroundColor: '#FC6EDA',
                            textTransform: 'none',
                            fontSize:'16px',
                            fontFamily: 'Open_sans, sans-serif',
                                '&:hover': {
                                backgroundColor: '#E056B3',
                                fontWeight: 'bold',
                            }
                        }}>
                        Offers
                    </Button>
                    <Button
                        variant='contained'
                        onClick={() => setActiveSection('Company')}
                        size='small'
                        sx={{
                            width: '90px',
                            backgroundColor: '#FC6EDA',
                            textTransform: 'none',
                            fontSize:'16px',
                            fontFamily: 'Open_sans, sans-serif',
                                '&:hover': {
                                backgroundColor: '#E056B3',
                                fontWeight: 'bold',
                            }
                        }}>
                        Company
                    </Button>
                    <Button
                        variant='contained'
                        onClick={() => setActiveSection('Users')}
                        size='small'
                        sx={{
                            width: '90px',
                            backgroundColor: '#FC6EDA',
                            textTransform: 'none',
                            fontSize:'16px',
                            fontFamily: 'Open_sans, sans-serif',
                                '&:hover': {
                                backgroundColor: '#E056B3',
                                fontWeight: 'bold',
                            }
                        }}>
                        Users
                    </Button>
                </div>
            </div>

            <div className='admin-content'>
                {activeSection === 'JobOffers' && <Joboffers />}
                {activeSection === 'Company' && <Company/>}
                {activeSection === 'Users' && <Users />}

            </div>
        </div>
    )
}

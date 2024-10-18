import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/AdminCss/Admin.css"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import logoHeaderAdmin from '../../assets/image/logoBanner.png';
import Dashboard from '../../components/AdminComponents/Dashboard';
import Users from '../../components/AdminComponents/Users';
import Joboffers from '../../components/AdminComponents/Joboffers';
import Company from '../../components/AdminComponents/Company';

export function Admin () {

    const [activeSection, setActiveSection] = useState ('Dashboard');

    return (
        <div className='admin-page'>

            <header className='admin-header'>
                <div className='admin-logo-header'>
                        <img src={logoHeaderAdmin} alt="Le super logo de Pinkedin" className="logo"/>
                </div>
                <div className='admin-group-header'>
                    <div className='admin-avatar'>
                        <Avatar sx={{
                            backgroundColor : '#FC6EDA',
                        }}>MD
                        </Avatar>
                    </div>

                </div>
            </header>

            <div className='admin-sidebar'>
                <div className='admin-sidebar-button'>
                    <Button
                        variant='contained'
                        onClick={() => setActiveSection('Dashboard')}
                        size='small'
                        sx={{
                            width: '100px',
                            borderRadius:'10px',
                            backgroundColor: '#FC6EDA',
                            textTransform: 'none',
                            fontSize:'16px',
                            fontFamily: 'Open_sans, sans-serif',
                                '&:hover': {
                                backgroundColor: '#E056B3',
                                fontWeight: 'bold',
                            }
                        }}>
                        Dahsbord
                    </Button>
                    <Button
                        variant='contained'
                        onClick={() => setActiveSection('JobOffers')}
                        size='small'
                        sx={{
                            width: '100px',
                            borderRadius:'10px',
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
                            width: '100px',
                            borderRadius:'10px',
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
                            width: '100px',
                            borderRadius:'10px',
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
                {activeSection === 'Dashboard' && <Dashboard />}
                {activeSection === 'JobOffers' && <Joboffers />}
                {activeSection === 'Company' && <Company/>}
                {activeSection === 'Users' && <Users />}

            </div>
        </div>
    )
}

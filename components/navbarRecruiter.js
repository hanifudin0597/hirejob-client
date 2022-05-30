import React, { useEffect, useState } from 'react'
import styleNavbar from '../styles/Navbar.module.css'
import Link from 'next/link'
import Cookie from 'js-cookie'
import axios from 'axios'

export default function navbar() {
    const idUser = Cookie.get('idUser')
    const token = Cookie.get('token')
    const [dataCompany, setDataCompany] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:5002/company/${idUser}`, {
            'Access-Control-Allow-Origin': true,
            headers: { token }
        })
            .then((result) => {
                // console.log(result.data.data)
                setDataCompany(result.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const onHome = () => {
        window.location.href = `/recruiter/listuser`
    }

    const onMyprofile = () => {
        window.location.href = `/recruiter/companyprofile/${idUser}`
    }

    // console.log(dataCompany)

    return (
        <nav className={`navbar navbar-expand-lg bg-light ${styleNavbar.navbar} `} >
            <div className="container-fluid">
                {/* <Link href='' > */}
                < img src='/logo2.svg' onClick={onHome} />
                {/* </Link> */}

                <div className={` d-flex ${styleNavbar.navContent}`}>
                    <div>
                        <img className={styleNavbar.iconNavbar} src='/icon-message.svg' />
                    </div>
                    <div>
                        <img className={styleNavbar.iconNavbar} src='/icon-notification.svg' />
                    </div>
                    <div>
                        <Link href=''>
                            {/* <h5>My Profile</h5> */}
                            <button onClick={onMyprofile} className={styleNavbar.buttonMyProfile} >My Profile</button>
                        </Link>
                    </div>
                    <div>
                        {
                            dataCompany.photo ? (
                                <img className={styleNavbar.iconUser} src={`http://localhost:5002/${dataCompany.photo}`} alt='user' />
                            ) : (
                                <img className={styleNavbar.iconUser} src={`http://localhost:5002/company.png`} />
                            )
                        }

                    </div>
                </div>
            </div>
        </nav >
    )
}

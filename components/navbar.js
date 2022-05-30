import React, { useEffect, useState } from 'react'
import styleNavbar from '../styles/Navbar.module.css'
import Link from 'next/link'
import Cookie from 'js-cookie'
import axios from 'axios'

export default function navbar() {
    const idUser = Cookie.get('idUser')
    const token = Cookie.get('token')
    const [dataUser, setDataUser] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:5002/user/${idUser}`, {
            'Access-Control-Allow-Origin': true,
            headers: { token }
        })
            .then((result) => {
                setDataUser(result.data.data.user)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    // console.log(dataUser)


    // console.log(idUser)


    // console.log(props.decoded, props.token)

    // const isLoggin = () => {
    //     if (token) {
    //         return (
    //             <div className={styleNavbar.navContent}>
    //                 <div>
    //                     <img className={styleNavbar.iconNavbar} src='/icon-message.svg' />
    //                 </div>
    //                 <div>
    //                     <img className={styleNavbar.iconNavbar} src='/icon-notification.svg' />
    //                 </div>
    //                 <div>
    //                     <img src='/icon-notification.svg' alt='user' />
    //                 </div>

    //             </div>
    //         )
    //     }
    //     else {
    //         return (
    //             <div className={styleNavbar.navContent}>
    //                 <form className="d-flex" role="search">
    //                     <Link href='/login' >
    //                         <button className={`${styleNavbar.buttonLogin}`} type="submit">Masuk</button>
    //                     </Link>
    //                     <Link href='/register'>
    //                         <button className={`${styleNavbar.buttonDaftar}`} type="submit">Daftar</button>
    //                     </Link>
    //                 </form>
    //             </div>
    //         )
    //     }
    // }

    const onHome = () => {
        window.location.href = `/listuser`
    }

    const onMyprofile = () => {
        window.location.href = `/detailuser/${idUser}`
    }

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
                            dataUser.photo ? (
                                <img className={styleNavbar.iconUser} src={`http://localhost:5002/${dataUser.photo}`} alt='user' />
                            ) : (
                                <img className={styleNavbar.iconUser} src={`http://localhost:5002/user.png`} />
                            )
                        }

                    </div>
                    {/* {isLoggin()} */}
                </div>
            </div>
        </nav >
    )
}

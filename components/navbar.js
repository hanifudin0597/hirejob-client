import React from 'react'
import styleNavbar from '../styles/Navbar.module.css'
import Link from 'next/link'
import jwt_decode from 'jwt-decode'

export async function getServerSideProps(context) {
    const { token } = context.req.cookies
    const decoded = jwt_decode(token);
    return {
        props: {
            token,
            decoded
        },
    }
}

export default function navbar(props) {
    // const token = props.token


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

    return (
        <nav className={`navbar navbar-expand-lg bg-light ${styleNavbar.navbar} `} >
            <div className="container-fluid">
                <Link href={`/listuser`} >
                    <img src='/logo2.svg' />
                </Link>

                <div className={` d-flex ${styleNavbar.navContent}`}>
                    <div>
                        <img className={styleNavbar.iconNavbar} src='/icon-message.svg' />
                    </div>
                    <div>
                        <img className={styleNavbar.iconNavbar} src='/icon-notification.svg' />
                    </div>
                    <div>
                        <img className={styleNavbar.iconUser} src='/user.jpg' alt='user' />
                    </div>
                    {/* {isLoggin()} */}
                </div>
            </div>
        </nav >
    )
}

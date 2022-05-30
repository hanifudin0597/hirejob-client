import React from 'react'
import styleAuth from '../styles/decorationAuth.module.css'
import Image from "next/image"

export default function decorationAuth() {
    return (
        <div className='col-sm-5 col-md-6'>
            <div className={styleAuth.decoration} >
                {/* <img className={styleAuth.imgDecoration} src='/images/decorationauth.jpg' /> */}
                <Image className={styleAuth.imgDecoration} src='/images/decorationauth.jpg' width={640} height={651} />
                <div className={styleAuth.formLogoLogin}>
                    {/* <img src={logoLogin} alt="" /> */}
                    <h1 className={`${styleAuth.decorH1}`} >Temukan developer</h1>
                    <h1 className={`${styleAuth.decorH1}`}>berbakat & terbaik</h1>
                    <h1 className={`${styleAuth.decorH1}`}>di berbagai bidang</h1>
                    <h1 className={`${styleAuth.decorH1}`}> keahlian</h1>
                </div>
            </div>
        </div>
    )
}

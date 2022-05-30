import React, { useState, useEffect } from 'react'
import Footer from '../../../components/footer'
import styleEditCompany from '../../../styles/Editcompany.module.css'
import { Multiselect } from 'multiselect-react-dropdown'
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'
import Image from 'next/image'
import Navbar from '../../../components/navbarRecruiter'
import Cookie from 'js-cookie'

const EditCompany = (props) => {
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

    const onEditProfile = () => {
        window.location.href = `/recruiter/editcompany/${idUser}`
    }

    const onLogout = () => {
        Cookie.remove('token', { path: '/' })
        Cookie.remove('idUser', { path: '/' })
        window.location.href = `/recruiter/login`
    }
    return (
        <>
            <Navbar />
            <section className={styleEditCompany.bodyContent} >
                <div className={`d-flex ${styleEditCompany.header}`}>
                </div>
                <div className={styleEditCompany.companyProfile} >
                    {
                        dataCompany.photo ? (
                            <img className={`${styleEditCompany.photoUser}`} src={`http://localhost:5002/${dataCompany.photo}`} />
                        ) : (
                            <img className={`${styleEditCompany.photoUser}`} src={`http://localhost:5002/company.png`} width={200} height={200} />
                        )
                    }

                    <label className={styleEditCompany.userName} >{dataCompany.company_name}</label>
                    <p className={styleEditCompany.userPosition} >{dataCompany.company_type}</p>
                    <div className={`d-flex ${styleEditCompany.location}`} >
                        <img className={styleEditCompany.imgLocation} src='/location.svg' />
                        <p className={styleEditCompany.userLocation} >{dataCompany.city}</p>
                    </div>
                    <p className={styleEditCompany.description} >{dataCompany.description}</p>
                    <button onClick={onEditProfile} className={styleEditCompany.buttonSave} >Edit Profile</button>
                    <div className={styleEditCompany.iconSosmed} >
                        <div className={`d-flex ${styleEditCompany.listSosmed}`} >
                            <Image src={`/icon/email.svg`} width={23} height={23} />
                            <label className={styleEditCompany.userLocation} >{dataCompany.email_company}</label>
                        </div>
                        <div className={`d-flex ${styleEditCompany.listSosmed}`} >
                            <Image src={`/icon/instagram.svg`} width={23} height={23} />
                            <label className={styleEditCompany.userLocation} >{dataCompany.instagram}</label>
                        </div>
                        <div className={`d-flex ${styleEditCompany.listSosmed}`} >
                            <Image src={`/icon/phone.svg`} width={23} height={23} />
                            <label className={styleEditCompany.userLocation} >{dataCompany.phone_company}</label>
                        </div>
                        <div className={`d-flex ${styleEditCompany.listSosmed}`} >
                            <Image src={`/icon/linkedin.svg`} width={23} height={23} />
                            <label className={styleEditCompany.userLocation} >{dataCompany.linkedin}</label>
                        </div>
                        <button onClick={onLogout} className={styleEditCompany.buttonSave} >Logout</button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

// EditCompany.layout = 'Layoutnavbar'

export default EditCompany;

import React, { useState, useEffect } from 'react'
import Footer from '../../../components/footer'
import styleEditUser from '../../../styles/Edituser.module.css'
import { Multiselect } from 'multiselect-react-dropdown'
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'
import Navbar from '../../../components/navbarRecruiter'
import Cookie from 'js-cookie'

const EditCompany = (props) => {
    const idUser = Cookie.get('idUser')
    const token = Cookie.get('token')
    const [photo, setPhoto] = useState("")
    const [isChangePhoto, setIsChangePhoto] = useState(false)
    const [dataCompany, setDataCompany] = useState('')
    const [form, setForm] = useState({
        companyName: '',
        companyType: '',
        city: '',
        description: '',
        emailCompany: '',
        instagram: '',
        phoneCompany: '',
        linkedin: ''
    })

    const body = {
        companyName: form.companyName,
        companyType: form.companyType,
        city: form.city,
        description: form.description,
        emailCompany: form.emailCompany,
        instagram: form.instagram,
        phoneCompany: form.phoneCompany,
        linkedin: form.linkedin
    }

    useEffect(() => {
        axios.get(`http://localhost:5002/company/${idUser}`, {
            'Access-Control-Allow-Origin': true,
            headers: { token }
        })
            .then((result) => {
                // console.log(result)
                setDataCompany(result.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const onUpdateCompany = (e) => {
        e.preventDefault()

        axios.put(`http://localhost:5002/company/${idUser}`, body, {
            'Access-Control-Allow-Origin': true,
            headers: { token }
        })
            .then((result) => {
                // console.log(result)
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Berhasil update company profile',
                })
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChangeImage = async () => {
        const formData = new FormData();
        formData.append("photo", photo)

        axios.put(`http://localhost:5002/company/${idUser}/photo`, formData, {
            'Access-Control-Allow-Origin': true,
            headers: { token },
            "Content-Type": "multipart/form-data"
        })
            .then((result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Update Photo successfully',
                })
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: 'Update Photo failed',
                })
            })
    }
    return (
        <>
            <Navbar />
            <section className={styleEditUser.bodyContent} >
                <div className={`d-flex ${styleEditUser.header}`}>

                    <div className={`d-flex ${styleEditUser.CardContent} w-100`}>
                        <div className={`col-lg-4 col-12 `} >
                            <div className="card">
                                <div className="card-body d-flex flex-column">
                                    {
                                        dataCompany.photo ? (
                                            <img src={`http://localhost:5002/${dataCompany.photo}`} className={styleEditUser.photoUser} />
                                        ) :
                                            (
                                                <img src={`${process.env.REACT_APP_BACKEN_URL}/user.png`} className={styleEditUser.photoUser} />
                                            )
                                    }

                                    <div className={styleEditUser.lineSpacing} ></div>
                                    <div className='d-flex justify-content-center align-items-center w-100' >
                                        <img src='/button-edit.svg' />
                                        <label htmlFor="files" className={styleEditUser.userPosition} >Edit photo</label>
                                        <input className="hidden" hidden type="file" id="files" onChange={(e) => {
                                            setPhoto(e.target.files[0])
                                            setIsChangePhoto(true)
                                        }} />
                                    </div>
                                    {isChangePhoto && <button onClick={handleChangeImage} className={styleEditUser.buttonSavePhoto} type="submit" >Save</button>}
                                    <label className={styleEditUser.userName} >{dataCompany.company_name}</label>
                                    <p className={styleEditUser.userPosition} >{dataCompany.company_type}</p>
                                    <div className={`d-flex ${styleEditUser.location}`} >
                                        <img className={styleEditUser.imgLocation} src='/location.svg' />
                                        <p className={styleEditUser.userLocation} >{dataCompany.city}</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={(e) => onUpdateCompany(e)} type='submit' className={styleEditUser.buttonSave} >Simpan</button>
                            <button className={styleEditUser.buttonCancel} >Batal</button>
                        </div>
                        <div className={styleEditUser.spasi} ></div>
                        <div className={`col-lg-8 col-12`} >
                            {/* card edit profile */}
                            <form >
                                <div className={`card ${styleEditUser.marginCard}`}>

                                    <div className="card-body d-flex flex-column">
                                        {
                                            // (dataUser === '') ? (<div>Loading</div>) :
                                            //     (
                                            <>
                                                <label className={styleEditUser.labelProfile} >Data diri</label>
                                                <label className={styleEditUser.labelInput} >Nama Perusahaan</label>
                                                <input onChange={(e) => setForm({ ...form, companyName: e.target.value })} className={styleEditUser.input} defaultValue={dataCompany.company_name} type='input' />
                                                <label className={styleEditUser.labelInput} >Bidang</label>
                                                <input onChange={(e) => setForm({ ...form, companyType: e.target.value })} className={styleEditUser.input} defaultValue={dataCompany.company_type} type='input' />
                                                <label className={styleEditUser.labelInput}  >Kota</label>
                                                <input onChange={(e) => setForm({ ...form, city: e.target.value })} className={styleEditUser.input} defaultValue={dataCompany.city} type='input' />
                                                <label className={styleEditUser.labelInput} >Deskripsi singkat</label>
                                                <input onChange={(e) => setForm({ ...form, description: e.target.value })} className={styleEditUser.input} defaultValue={dataCompany.description} type='input' />
                                                <label className={styleEditUser.labelInput} >Email</label>
                                                <input onChange={(e) => setForm({ ...form, emailCompany: e.target.value })} className={styleEditUser.input} defaultValue={dataCompany.email_company} type='input' />
                                                <label className={styleEditUser.labelInput} >Instagram</label>
                                                <input onChange={(e) => setForm({ ...form, instagram: e.target.value })} className={styleEditUser.input} defaultValue={dataCompany.instagram} type='input' />
                                                <label className={styleEditUser.labelInput} >No telepon</label>
                                                <input onChange={(e) => setForm({ ...form, phoneCompany: e.target.value })} className={styleEditUser.input} defaultValue={dataCompany.phone_company} type='input' />
                                                <label className={styleEditUser.labelInput} >Linkedin</label>
                                                <input onChange={(e) => setForm({ ...form, linkedin: e.target.value })} className={styleEditUser.input} defaultValue={dataCompany.linkedin} type='input' />
                                            </>
                                            // )
                                        }
                                    </div>

                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </section>
            <Footer />
        </>
    )
}

// EditCompany.layout = 'Layoutnavbar'

export default EditCompany;

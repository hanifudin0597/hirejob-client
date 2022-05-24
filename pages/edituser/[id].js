import React, { useState, useEffect } from 'react'
import Footer from '../../components/footer'
import styleEditUser from '../../styles/Edituser.module.css'
import { Multiselect } from 'multiselect-react-dropdown'
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'

export async function getServerSideProps(context) {
    const { token } = context.req.cookies
    return {
        props: {
            token
        },
    }
}

const EditUser = (props) => {
    const router = useRouter()
    const { id } = router.query
    const token = props.token

    // console.log(token)

    // 
    const [photo, setPhoto] = useState("")
    const [isChangePhoto, setIsChangePhoto] = useState(false)
    const [dataUser, setDataUser] = useState('')

    // edit Data diri
    const [name, setName] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [address, setAddress] = useState('')
    const [workplace, setWorkplace] = useState('')
    const [description, setDescription] = useState('')
    const [skillName, setSkillName] = useState({})

    // add experience
    const [jobPosition, setJobPosition] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [dateJob, setDateJob] = useState('')
    const [jobDesc, setJobDesc] = useState('')

    // add portofolio
    const [aplicationName, setAplicationName] = useState('')
    const [linkRepo, setLinkRepo] = useState('')
    const [typeApp, setTypeApp] = useState('')
    const [aplicationPhoto, setAplicationPhoto] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:5002/user/${id}`, {
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

    const handleChangeImage = async () => {
        const formData = new FormData();
        formData.append("photo", photo)

        axios.put(`http://localhost:5002/user/${id}/photo`, {
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

    // update profile
    const onUpdateUser = (e) => {
        e.preventDefault()

        if (name === "" | jobDescription === "" | address === "" | workplace === "" | description === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'semua input wajib di isi',
            })
        }
        else {
            const body = {
                name: name,
                jobDescription: jobDescription,
                address: address,
                workplace: workplace,
                description: description,
                skillName: skillName
            }
            axios.put(`http://localhost:5002/user/${id}`, body, {
                headers: { token }
            })
                .then((response) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Update User Success',
                    })
                    window.location.reload()
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'Update User failed',
                    })
                })
        }
    }

    const onCreateExp = (e) => {
        e.preventDefault()

        if (jobPosition === "" | companyName === "" | dateJob === "" | jobDesc === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'semua input wajib di isi',
            })
        }
        else {
            const body = {
                position: jobPosition,
                company: companyName,
                date: dateJob,
                description: jobDesc,
            }
            axios.post(`http://localhost:5002/experience`, body, {
                headers: { token }
            })
                .then((response) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Add Experience Success',
                    })
                    window.location.reload()
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'Add Experience failed',
                    })
                })
        }
    }
    const onCreatePorto = (e) => {
        e.preventDefault()

        if (aplicationName === "" | linkRepo === "" | typeApp === "" | aplicationPhoto === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'semua input wajib di isi',
            })
        }
        else {
            const formData = new FormData();
            formData.append("name", aplicationName);
            formData.append("repository", linkRepo);
            formData.append("type", typeApp);
            formData.append("photo", aplicationPhoto)
            axios.post(`http://localhost:5002/portofolio`, formData, {
                'Access-Control-Allow-Origin': true,
                headers: { token },
                "Content-Type": "multipart/form-data"
            })
                .then((response) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Add Experience Success',
                    })
                    window.location.reload()
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'Add Experience failed',
                    })
                })
        }
    }

    return (
        <>
            <section className={styleEditUser.bodyContent} >
                <div className={`d-flex ${styleEditUser.header}`}>

                    <div className={`d-flex ${styleEditUser.CardContent} w-100`}>
                        <div className={`col-lg-4 col-12 `} >
                            <div className="card">
                                <div className="card-body d-flex flex-column">
                                    <img src={`${process.env.REACT_APP_BACKEN_URL}/user.png`} className={styleEditUser.photoUser} />
                                    <div className={styleEditUser.lineSpacing} ></div>
                                    <div className='d-flex justify-content-center align-items-center w-100' >
                                        <img src='/button-edit.svg' />
                                        <label htmlFor="files" className={styleEditUser.userPosition} >Edit</label>
                                        <input className="hidden" hidden type="file" id="files" onChange={(e) => {
                                            setPhoto(e.target.files[0])
                                            setIsChangePhoto(true)
                                        }} />
                                    </div>
                                    {isChangePhoto && <button onClick={handleChangeImage} className={styleEditUser.buttonSavePhoto} type="submit" >Save</button>}
                                    <label className={styleEditUser.userName} >{dataUser.name}</label>
                                    <p className={styleEditUser.userPosition} >{dataUser.job_description}</p>
                                    <div className={`d-flex ${styleEditUser.location}`} >
                                        <img className={styleEditUser.imgLocation} src='/location.svg' />
                                        <p className={styleEditUser.userLocation} >{dataUser.workplace}</p>
                                    </div>
                                    <p className={styleEditUser.typeWork} >Freelancer</p>
                                </div>
                            </div>
                        </div>
                        <div className={styleEditUser.spasi} ></div>
                        <div className={`col-lg-8 col-12`} >
                            {/* card edit profile */}
                            <form onSubmit={(e) => onUpdateUser(e)} >
                                <div className={`card ${styleEditUser.marginCard}`}>

                                    <div className="card-body d-flex flex-column">
                                        {
                                            (dataUser === '') ? (<div>Loading</div>) :
                                                (
                                                    <>
                                                        <label className={styleEditUser.labelProfile} >Data diri</label>
                                                        <label className={styleEditUser.labelInput} >Nama lengkap</label>
                                                        <input onChange={(e) => setName(e.target.value)} className={styleEditUser.input} defaultValue={dataUser.name} type='input' />
                                                        <label className={styleEditUser.labelInput} >Job Desk</label>
                                                        <input onChange={(e) => setJobDescription(e.target.value)} className={styleEditUser.input} defaultValue={dataUser.job_description} type='input' />
                                                        <label className={styleEditUser.labelInput}  >Domisili</label>
                                                        <input onChange={(e) => setAddress(e.target.value)} className={styleEditUser.input} defaultValue={dataUser.address} type='input' />
                                                        <label className={styleEditUser.labelInput} >Tempat kerja</label>
                                                        <input onChange={(e) => setWorkplace(e.target.value)} className={styleEditUser.input} defaultValue={dataUser.workplace} type='input' />
                                                        <label className={styleEditUser.labelInput} >Deskripsi singkat</label>
                                                        <input onChange={(e) => setDescription(e.target.value)} className={styleEditUser.input} defaultValue={dataUser.description} type='input' />
                                                    </>
                                                )
                                        }
                                    </div>

                                </div>
                                {/* card add Skill */}
                                <div className={`card ${styleEditUser.marginCard}`}>
                                    <div className="card-body d-flex flex-column">
                                        <label className={styleEditUser.labelProfile} >Skill</label>
                                        <div className={styleEditUser.marginSkill}></div>
                                        <Multiselect
                                            isObject={false}
                                            onKeyPressFn={function noRefCheck() { }}
                                            onRemove={function noRefCheck() { }}
                                            onSearch={function noRefCheck() { }}
                                            onSelect={function noRefCheck() { }}
                                            options={[
                                                'HTML',
                                                'CSS',
                                                'Javascript',
                                                'NodeJS',
                                                'ExpressJS',
                                                'MYSQL',
                                                'PostgreSQL',
                                                'Flutter',
                                                'Laravel',
                                                'PHP'
                                            ]}
                                        />
                                    </div>
                                </div>
                                <button type='submit' className={styleEditUser.buttonSave} >Simpan</button>
                                <button className={styleEditUser.buttonCancel} >Batal</button>
                            </form>
                            {/* card add pengalaman */}
                            <div className={`card ${styleEditUser.marginCard}`}>
                                <form onSubmit={(e) => onCreateExp(e)} >
                                    <div className="card-body d-flex flex-column">
                                        <label className={styleEditUser.labelProfile} >Pengalaman kerja</label>
                                        <label className={styleEditUser.labelInput} >Posisi</label>
                                        <input onChange={(e) => setJobPosition(e.target.value)} className={styleEditUser.input} type='input' />
                                        <div className='d-flex w-100'>
                                            <div className='d-flex flex-column w-100'>
                                                <label className={styleEditUser.labelInput} >Nama Perusahaan</label>
                                                <input onChange={(e) => setCompanyName(e.target.value)} className={styleEditUser.input} type='input' />
                                            </div>
                                            <div className={styleEditUser.spasi} ></div>
                                            <div className='d-flex flex-column w-100'>
                                                <label className={styleEditUser.labelInput} >Bulan/tahun</label>
                                                <input onChange={(e) => setDateJob(e.target.value)} className={styleEditUser.input} type='input' />
                                            </div>
                                        </div>
                                        <label className={styleEditUser.labelInput} >Deskripsi singkat</label>
                                        <textarea onChange={(e) => setJobDesc(e.target.value)} className={styleEditUser.inputTextArea} ></textarea>

                                        <button type='submit' className={styleEditUser.buttonExp} >Tambah pengalaman kerja</button>
                                    </div>
                                </form>
                            </div>
                            {/* card add Portofolio */}
                            <div className={`card ${styleEditUser.marginCard}`}>
                                <form onSubmit={(e) => onCreatePorto(e)} >
                                    <div className="card-body d-flex flex-column">
                                        <label className={styleEditUser.labelProfile} >Portofolio</label>
                                        <label className={styleEditUser.labelInput} >Nama Aplikasi</label>
                                        <input onChange={(e) => setAplicationName(e.target.value)} className={styleEditUser.input} type='input' />
                                        <label className={styleEditUser.labelInput} >Link Repository</label>
                                        <input onChange={(e) => setLinkRepo(e.target.value)} className={styleEditUser.input} type='input' />
                                        <label className={styleEditUser.labelInput} >Type Portofolio</label>
                                        <input onChange={(e) => setTypeApp(e.target.value)} className={styleEditUser.input} type='input' />
                                        {/* <di className={`d-flex ${styleEditUser.marginRadio}`} >
                                        <input className={styleEditUser.inputRadio} type="radio" />
                                        <label>Aplikasi mobile</label>
                                        <input className={styleEditUser.inputRadio} type="radio" />
                                        <label>Aplikasi Web</label>
                                    </di> */}
                                        <label className={styleEditUser.labelInput} >Input Gambar</label>
                                        <label className={styleEditUser.inputImg} htmlFor="upload">
                                            <span className={styleEditUser.formLogoImg}>
                                                <img alt="" />
                                            </span>
                                            <input onChange={(e) => setAplicationPhoto(e.target.files[0])} className={styleEditUser.uploadImg} type="file" id="upload" required />
                                        </label>


                                        <button type='submit' className={styleEditUser.buttonPorto} >Tambah Portofolio</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <Footer />
        </>
    )
}

EditUser.layout = 'Layoutnavbar'

export default EditUser;

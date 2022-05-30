import React, { useState } from 'react'
import Decorauth from '../../../components/decorationAuth'
import styleAuth from '../../../styles/decorationAuth.module.css'
import Link from "next/link"
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function register() {
    const router = useRouter()
    const [form, setForm] = useState({
        name: '',
        email: '',
        companyName: '',
        position: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })

    const onSubmit = (e) => {
        e.preventDefault()
        if (form.name === "" | form.email === "" | form.phone === "" | form.password === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'semua input wajib di isi',
            })
        }
        else {
            if (form.password !== form.confirmPassword) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password harus sama',
                })
            } else {
                const body = {
                    name: form.name,
                    email: form.email,
                    companyName: form.companyName,
                    position: form.position,
                    phone: form.phone,
                    password: form.password,
                }
                axios.post(`http://localhost:5002/register/company`, body)
                    .then((response) => {
                        router.push("/recruiter/login")
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Berhasil register',
                        })
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed',
                            text: 'Gagal register',
                        })
                    })
            }
        }
    }
    return (
        <>
            <div className={`row g-0 ${styleAuth.contain}`} >
                <Decorauth />
                <div className={`col-md-6 ${styleAuth.overflowRegisterScroll}`} >
                    <div className={styleAuth.formInput}>
                        <div className={styleAuth.formGroup}>
                            <h1 className={styleAuth.inputH1} >Halo, Pewpeople</h1>
                            <small className={styleAuth.inputSmall}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</small>
                            <form onSubmit={(e) => onSubmit(e)} >
                                <label className={styleAuth.inputLabel} >Name</label>
                                <input onChange={(e) => setForm({ ...form, name: e.target.value })} className={styleAuth.formInputType} type="text" placeholder="examplexxx@gmail.com" />
                                <label className={styleAuth.inputLabel} >Email</label>
                                <input onChange={(e) => setForm({ ...form, email: e.target.value })} className={styleAuth.formInputType} type="email" placeholder="Password" />
                                <label className={styleAuth.inputLabel} >Perusahaan</label>
                                <input onChange={(e) => setForm({ ...form, companyName: e.target.value })} className={styleAuth.formInputType} type="text" placeholder="PT Mandiri...." />
                                <label className={styleAuth.inputLabel} >Jabatan</label>
                                <input onChange={(e) => setForm({ ...form, position: e.target.value })} className={styleAuth.formInputType} type="text" placeholder="HRD" />
                                <label className={styleAuth.inputLabel} >No Handphone</label>
                                <input onChange={(e) => setForm({ ...form, phone: e.target.value })} className={styleAuth.formInputType} type="text" placeholder="examplexxx@gmail.com" />
                                <label className={styleAuth.inputLabel} >Kata Sandi</label>
                                <input onChange={(e) => setForm({ ...form, password: e.target.value })} className={styleAuth.formInputType} type="password" placeholder="Password" />
                                <label className={styleAuth.inputLabel} >Konfirmasi Kata Sansi</label>
                                <input onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className={styleAuth.formInputType} type="password" placeholder="Password" />
                                <button className={styleAuth.inputButton} type="submit" >Daftar</button>
                                <a className={styleAuth.inputAhref} href="">Forgot Password ?</a>
                                <div className={styleAuth.formNoAccount}>
                                    <label className={styleAuth.inputLabel}>Don't have an account? </label>
                                    <Link href="/recruiter/login" className={styleAuth.inputAhrefLink}>
                                        Masuk disini
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
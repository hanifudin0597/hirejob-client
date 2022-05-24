import React, { useState, useEffect } from 'react'
import Decorauth from '../../components/decorationAuth'
import styleAuth from '../../styles/decorationAuth.module.css'
import Link from "next/link"
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function login() {
    const router = useRouter()
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const onSubmit = (e) => {
        e.preventDefault()
        if (form.email === "" | form.password === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'semua input wajib di isi',
            })
        }
        else {
            const body = {
                email: form.email,
                password: form.password,
            }
            axios.post(`http://localhost:5002/login/`, body)
                .then((response) => {
                    document.cookie = `token=${response.data.token.jwt};path=/`
                    router.push("/listuser")
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Berhasil masuk',
                    })
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'Gagal masuk',
                    })
                })
        }
    }

    return (
        <>
            <div className='row g-0' >
                <Decorauth />
                <div className='col-md-6' >
                    <div className={styleAuth.formInput}>
                        <div className={styleAuth.formGroup}>
                            <h1 className={styleAuth.inputH1} >Halo, Pewpeople</h1>
                            <small className={styleAuth.inputSmall}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</small>
                            <form onSubmit={(e) => onSubmit(e)} >
                                <label className={styleAuth.inputLabel} >Email</label>
                                <input onChange={(e) => setForm({ ...form, email: e.target.value })} className={styleAuth.formInputType} type="text" placeholder="examplexxx@gmail.com" />
                                <label className={styleAuth.inputLabel} >Password</label>
                                <input onChange={(e) => setForm({ ...form, password: e.target.value })} className={styleAuth.formInputType} type="password" placeholder="Password" />
                                <button className={styleAuth.inputButton} type="submit" >Masuk</button>
                                <a className={styleAuth.inputAhref} href="">Forgot Password ?</a>
                                <div className={styleAuth.formNoAccount}>
                                    <label className={styleAuth.inputLabel}>Don't have an account? </label>
                                    <Link href="/register" className={styleAuth.inputAhrefLink}>
                                        Daftar disini
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

import React, { useState } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookie from 'js-cookie';
import styleAuth from '../../../styles/decorationAuth.module.css';
import Decorauth from '../../../components/decorationAuth';

export default function login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.email === '' || form.password === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'semua input wajib di isi',
      });
    } else {
      const body = {
        email: form.email,
        password: form.password,
      };
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login/company`, body)
        .then((response) => {
          Cookie.set('token', `${response.data.token.jwt}`, { path: '/' });
          Cookie.set('idUser', `${response.data.token.idRecruiter}`, { path: '/' });
          window.location.href = '/recruiter/listuser';
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Berhasil masuk',
          });
        })
        .catch((err) => {
          if (err.response.data.code === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Failed',
              text: `${err.response.data.error}`,
            });
          }
        });
    }
  };
  const onLoginPekerja = () => {
    window.location.href = '/login';
  };
  return (
    <div className="row g-0">
      <Decorauth />
      <div className="col-md-6">
        <div className={styleAuth.formInput}>
          <div className={styleAuth.formGroup}>
            <h1 className={styleAuth.inputH1}>Halo, Pewpeople</h1>
            <small className={styleAuth.inputSmall}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</small>
            <form onSubmit={(e) => onSubmit(e)}>
              <label className={styleAuth.inputLabel}>Email</label>
              <input onChange={(e) => setForm({ ...form, email: e.target.value })} className={styleAuth.formInputType} type="text" placeholder="Email Address" />
              <label className={styleAuth.inputLabel}>Password</label>
              <input onChange={(e) => setForm({ ...form, password: e.target.value })} className={styleAuth.formInputType} type="password" placeholder="Password" />
              <button className={styleAuth.inputButton} type="submit">Masuk</button>
              <button className={styleAuth.inputButton} onClick={onLoginPekerja} type="button">Masuk sebagai pekerja</button>
              {/* <a className={styleAuth.inputAhref} href="">Forgot Password ?</a> */}
              <div className={styleAuth.formNoAccount}>
                <label className={styleAuth.inputLabel}>Don&apos;t have an account? </label>
                <div style={{ marginTop: '13px', marginLeft: '5px' }}>
                  <Link href="/recruiter/register" style={{ marginTop: '50px' }} className={styleAuth.inputAhrefLink}>
                    Daftar disini
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

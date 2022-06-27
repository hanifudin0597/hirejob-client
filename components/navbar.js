/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookie from 'js-cookie';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import styleNavbar from '../styles/Navbar.module.css';

export default function navbar() {
  const idUser = Cookie.get('idUser');
  const token = Cookie.get('token');
  const [dataUser, setDataUser] = useState('');
  const [dataCompany, setDataCompany] = useState('');

  let decoded = '';
  if (token) {
    decoded = jwtDecode(token);
  }

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${idUser}`, {
      'Access-Control-Allow-Origin': true,
      headers: { token },
    })
      .then((result) => {
        setDataUser(result.data.data.user);
      })
      .catch(() => {

      });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company/${idUser}`, {
      'Access-Control-Allow-Origin': true,
      headers: { token },
    })
      .then((result) => {
        // console.log(result.data.data)
        setDataCompany(result.data.data);
      })
      .catch(() => {

      });
  }, []);

  const onHomeWorker = () => {
    window.location.href = '/listuser';
  };

  const onMyprofileWorker = () => {
    window.location.href = `/detailuser/${idUser}`;
  };

  const onHomeRecruiter = () => {
    window.location.href = '/recruiter/listuser';
  };

  const onMyprofileRecruiter = () => {
    window.location.href = `/recruiter/companyprofile/${idUser}`;
  };

  const onMessage = () => {
    window.location.href = '/message';
  };

  return (
    <nav className={`navbar navbar-expand-lg bg-light ${styleNavbar.navbar} `}>
      <div className="container-fluid">
        {decoded.level === '1' ? (
          <img src="/logo2.svg" onClick={onHomeWorker} />
        ) : (
          <img src="/logo2.svg" onClick={onHomeRecruiter} />
        )}
        <div className={` d-flex ${styleNavbar.navContent}`}>
          <div>
            <img onClick={onMessage} className={styleNavbar.iconNavbar} src="/icon-message.svg" />
          </div>
          <div>
            <img className={styleNavbar.iconNavbar} src="/icon-notification.svg" />
          </div>
          <div>
            {decoded.level === '1' ? (
              <Link href="">
                <button onClick={onMyprofileWorker} className={styleNavbar.buttonMyProfile}>My Profile</button>
              </Link>
            ) : (
              <Link href="">
                <button onClick={onMyprofileRecruiter} className={styleNavbar.buttonMyProfile}>My Profile</button>
              </Link>
            )}

          </div>
          <div>
            {decoded.level === '1' ? (
              dataUser.photo ? (
                <img className={styleNavbar.iconUser} src={`${process.env.NEXT_PUBLIC_API_URL}/${dataUser.photo}`} alt="user" />
              ) : (
                <img className={styleNavbar.iconUser} src={`${process.env.NEXT_PUBLIC_API_URL}/user.png`} />
              )
            ) : (
              dataCompany.photo ? (
                <img className={styleNavbar.iconUser} src={`${process.env.NEXT_PUBLIC_API_URL}/${dataCompany.photo}`} alt="user" />
              ) : (
                <img className={styleNavbar.iconUser} src={`${process.env.NEXT_PUBLIC_API_URL}/company.png`} />
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

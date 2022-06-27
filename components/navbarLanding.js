import React from 'react';
import Image from 'next/image';
import styleNavbar from '../styles/Navbar.module.css';
import LogoNav from '../public/logo2.svg';

export default function navbarLanding() {
  const onLogin = () => {
    window.location.href = '/login';
  };
  const onRegister = () => {
    window.location.href = '/register';
  };
  return (
    <div>
      <nav className={`navbar navbar-expand-lg bg-light ${styleNavbar.navbar} `}>
        <div className="container-fluid">
          <Image
            src={LogoNav}
            width={200}
            height={50}
          />
          <div className={` d-flex ${styleNavbar.navContent}`}>
            <div>
              <button
                onClick={onLogin}
                style={{
                  border: '2px solid #5E50A1', borderRadius: '5px', height: '40px', width: '80px', marginRight: '10px', backgroundColor: 'white',
                }}
              >
                Masuk
              </button>
              <button
                onClick={onRegister}
                style={{
                  border: '2px solid #5E50A1', borderRadius: '5px', height: '40px', width: '80px', marginRight: '10px', backgroundColor: '#5E50A1', color: 'white',
                }}
              >
                Daftar
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

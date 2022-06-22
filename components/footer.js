import React from 'react';
import styleFooter from '../styles/Footer.module.css';

export default function footer() {
  return (
    <div>
      <footer className={`${styleFooter.footer}`}>
        <div className={`d-flex flex-column align-items-center h-100 ${styleFooter.footerMargin}`}>
          <div className="w-100 d-flex flex-column justify-content-left align-items-start">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className={`w-100 d-flex ${styleFooter.textFooter}`}>
            <small className={styleFooter.footerH1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor</small>
          </div>
          <div className={`d-flex ${styleFooter.footerBottom} justify-content-left align-items-start`}>
            <div>2020 Pewworld. All right reserved</div>
            <div className={`d-flex justify-content-end ${styleFooter.contact}`}>
              <div className={styleFooter.phone}>Telepon</div>
              <div className={styleFooter.email}>Email</div>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}

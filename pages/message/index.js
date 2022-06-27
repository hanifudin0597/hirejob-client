/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import Cookie from 'js-cookie';
import styleListUser from '../../styles/Listuser.module.css';
import Footer from '../../components/footer';
import user from '../../public/images/user.jpg';

function Message() {
  const token = Cookie.get('token');
  const idUser = Cookie.get('idUser');
  const [message, setMessage] = useState();

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/message/${idUser}`, {
      'Access-Control-Allow-Origin': true,
      headers: { token },
    })
      .then((result) => {
        setMessage(result.data.data);
      })
      .catch(() => {
      });
  }, []);
  return (
    <>
      <section style={{ minHeight: '100vh' }} className={styleListUser.bodyContent}>
        {message ? (
          message.map((items, index) => (
            <div key={index} className="row flex">
              <div className="col-1" />
              <div
                className="col-2"
                style={{
                  borderRadius: '5px', minHeight: '50vh', backgroundColor: 'white', marginTop: '40px', marginRight: '40px',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <Image src={user} width={50} height={50} layout="fixed" style={{ borderRadius: '30px' }} />
                  <label style={{ marginTop: '20px', position: 'absolute' }} htmlFor="">{items.recruiter_id}</label>
                </div>
              </div>
              <div
                className="col-7"
                style={{
                  borderRadius: '5px', minHeight: '50vh', backgroundColor: 'white', marginTop: '40px',
                }}
              >
                <div style={{ marginTop: '20px' }}>
                  <label htmlFor="">{ items.message}</label>
                </div>
              </div>
              <div className="col-1" />
            </div>
          ))
        ) : (
          <div className="row flex">
            <div className="col-1" />
            <div
              className="col-2"
              style={{
                borderRadius: '5px', minHeight: '50vh', backgroundColor: 'white', marginTop: '40px', marginRight: '40px',
              }}
            >
              <div style={{ position: 'relative' }}>
                {/* <Image src={user} width={50} height={50} layout="fixed" style={{ borderRadius: '30px' }} /> */}
                <label style={{ marginTop: '20px', position: 'absolute' }} htmlFor="" />
              </div>
            </div>
            <div
              className="col-7"
              style={{
                borderRadius: '5px', minHeight: '50vh', backgroundColor: 'white', marginTop: '40px',
              }}
            >
              <div style={{ marginTop: '20px' }}>
                <label htmlFor="" />
              </div>
            </div>
            <div className="col-1" />
          </div>
        )}

      </section>
      <Footer />
    </>
  );
}

Message.layout = 'Layoutnavbar';

export default Message;

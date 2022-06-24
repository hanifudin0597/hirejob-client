/* eslint-disable no-console */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import styleDetailUser from '../../styles/Detailuser.module.css';
import Footer from '../../components/footer';

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  return {
    props: {
      token
    },
  };
}

const DetailUser = (props) => {
  const [activeTabs, setactiveTabs] = useState('1');
  const router = useRouter();
  const { id } = router.query;
  const { token } = props;
  const idUser = Cookie.get('idUser');
  // console.log(idUser)

  const decoded = jwtDecode(token);

  // state for data detailUser
  const [dataUser, setDataUser] = useState('');
  const [dataPortofolio, setDataPortofolio] = useState('');
  const [dataExperience, setDataExperience] = useState('');
  // const [isLoading, setIsLoading] = useState(true);
  const [dataCompany, setDataCompany] = useState('');

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
      'Access-Control-Allow-Origin': true,
      headers: { token }
    })
      .then((result) => {
        setDataUser(result.data.data.user);
        setDataPortofolio(result.data.data.portofolio);
        setDataExperience(result.data.data.experience);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onLogout = () => {
    Cookie.remove('token', { path: '/' });
    Cookie.remove('idUser', { path: '/' });
    router.push('/login');
  };

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company/${idUser}`, {
      'Access-Control-Allow-Origin': true,
      headers: { token }
    })
      .then((result) => {
        setDataCompany(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onDeletePorto = (id) => {
    Swal.fire({
      title: 'Are you sure to delete this portofolio?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/portofolio/${id}`, {
          'Access-Control-Allow-Origin': true,
          headers: { token }
        })
          .then((result) => {
            if (result.data.code === 200) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );

              window.location.href = `/detailuser/${idUser}`;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  // send message to worker
  const sendMessage = () => {
    const body = {
      from: dataCompany.id,
      to: id,
      messageContent: `Hai ${dataUser.name} kami dari ${dataCompany.company_name} telah melihat profile kamu, dan kami tertatik untuk menawarkan pekerjaan di perusahaan kami sebagai web developer. Jika kamu tertarik silahkan hubungi no ini ${dataCompany.phone}`,
      recruiterId: dataCompany.company_name
    };

    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/message`, body, {
      'Access-Control-Allow-Origin': true,
      headers: { token }
    })
      .then((result) => {
        if (result.data.code === 200) {
          Swal.fire(
            'Success',
            'Succes send message to hire',
            'success'
          );
        }
        router.push(`/detailuser/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section className={styleDetailUser.bodyContent}>
        <div className={`d-flex ${styleDetailUser.header}`}>
          <div className={`d-flex ${styleDetailUser.CardContent} w-100`}>
            <div className="col-lg-4 col-12 ">
              <div className="card">
                <div className="card-body d-flex flex-column">
                  <div className="justify-content-center align-items-center d-flex flex-column">
                    {
                      dataUser.photo ? (
                        <img className={styleDetailUser.photoUser} src={`${process.env.NEXT_PUBLIC_API_URL}/${dataUser.photo}`} alt="img user" />
                      ) : (
                        <img className={styleDetailUser.photoUser} src={`${process.env.NEXT_PUBLIC_API_URL}/user.png`} alt="img user" />
                      )
                  }
                    {
                      idUser ? (
                        dataUser.id === idUser ? (
                          <Link href={`/edituser/${id}`}>
                            <label className={styleDetailUser.editProfile}> Edit Profile</label>
                          </Link>
                        ) :
                          (
                            <div><></></div>
                          )
                      ) : (
                        <div><></></div>
                      )
                  }
                  </div>

                  <label className={styleDetailUser.userName}>{dataUser.name}</label>
                  <p className={styleDetailUser.userPosition}>{dataUser.job_description}</p>
                  <div className={`d-flex ${styleDetailUser.location}`}>
                    <img className={styleDetailUser.imgLocation} src="/location.svg" />
                    <p className={styleDetailUser.userLocation}>{dataUser.workplace}</p>
                  </div>
                  <p className={styleDetailUser.typeWork}>Freelancer</p>
                  <p className={styleDetailUser.description}>{dataUser.description}</p>
                  <div className="justify-content-center align-items-center d-flex flex-column">
                    {decoded.level === '1' ? (<></>)
                      : decoded.level === '2' ? (
                        <button onClick={sendMessage} className={styleDetailUser.buttonHire}>Hire</button>
                      ) : <></>}
                  </div>

                  <label className={styleDetailUser.skill}>Skill</label>
                  <div className={styleDetailUser.widthSkills}>
                    {
                      dataUser.skill_name ? (
                        dataUser.skill_name.map((items, index) => (
                          <button key={index} className={styleDetailUser.listSkill}>{items}</button>
                        ))
                      ) : (
                        <div />
                      )
                    }
                  </div>
                  <div className="justify-content-center align-items-center d-flex flex-column">
                    {
                      idUser ? (
                        dataUser.id === idUser ? (
                          <button onClick={() => onLogout()} className={styleDetailUser.buttonLogout}>logout</button>
                        ) :
                          (
                            <div />
                          )
                      ) : (
                        <div />
                      )
                    }
                  </div>

                </div>
              </div>
            </div>
            <div className={styleDetailUser.spasi} />
            <div className={`col-lg-8 col-12 ${styleDetailUser.responsiveDetailPorto}`}>
              <div className="card w-100">
                <div className={`card-body ${styleDetailUser.widthCardBody}`}>
                  <Nav tabs className={`d-flex justify-content-left ${styleDetailUser.nabTab}`}>
                    <NavItem>
                      <NavLink className={activeTabs === '1' ? 'active' : ''} onClick={() => setactiveTabs('1')}>
                        Portofolio
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={activeTabs === '2' ? 'active' : ''} onClick={() => setactiveTabs('2')}>
                        Pengalaman kerja
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTabs} className={styleDetailUser.tabContentNav}>
                    <TabPane tabId="1">
                      {/* Portofolio */}
                      <div className={`main d-flex flex-row w-100 ${styleDetailUser.formPortofolio}`}>
                        {
                          (dataPortofolio === '') ? (<div>Loading</div>) :
                            (
                              dataPortofolio.map((items, index) => (
                                <div key={index} style={{ position: 'relative' }} className={`d-flex flex-column align-items-center ${styleDetailUser.detailPortofolio}`}>
                                  <img src={`${process.env.NEXT_PUBLIC_API_URL}/${items.photo}`} className={styleDetailUser.photoPortofolio} />
                                  <label>{items.name}</label>
                                  {idUser === id ? (
                                    <button onClick={() => onDeletePorto(items.id)} style={{ border: 'none', position: 'absolute', right: '-20px', top: '-10px', borderRadius: '100%', backgroundColor: 'red', color: 'white', paddingLeft: '8px', paddingRight: '8px' }}>X</button>
                                  ) : null}

                                </div>
                              ))
                            )
                        }
                      </div>
                    </TabPane>
                    <TabPane tabId="2">
                      {/* Pengalaman kerja */}
                      {
                        (dataExperience === '') ? (<div>Loading</div>) :
                          (
                            dataExperience.map((items, index) => (
                              <div key={index} className="card-body d-flex flex-row w-100">
                                <div className="col-lg-2">
                                  <img className={styleDetailUser.photoExp} src="/tokopedia.jpg" />
                                </div>
                                <div className="col-lg-10">
                                  <label className={styleDetailUser.expName}>{items.position}</label>
                                  <p>{items.company}</p>
                                  <p className={styleDetailUser.expDate}>{items.date}</p>
                                  <p>{items.description}</p>
                                </div>
                              </div>
                            ))
                          )
                      }
                    </TabPane>
                  </TabContent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

DetailUser.layout = 'Layoutnavbar';

export default DetailUser;

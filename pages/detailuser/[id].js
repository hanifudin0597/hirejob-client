import React, { useState, useEffect } from 'react'
import Footer from '../../components/footer'
import styleDetailUser from '../../styles/Detailuser.module.css'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import Cookie from 'js-cookie'

export async function getServerSideProps(context) {
    const { token } = context.req.cookies
    return {
        props: {
            token
        },
    }
}

const DetailUser = (props) => {
    const [activeTabs, setactiveTabs] = useState('1')
    const router = useRouter()
    const { id } = router.query
    const token = props.token
    const idUser = Cookie.get('idUser')
    // console.log(idUser)

    // state for data detailUser
    const [dataUser, setDataUser] = useState('')
    const [dataPortofolio, setDataPortofolio] = useState('')
    const [dataExperience, setDataExperience] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:5002/user/${id}`, {
            'Access-Control-Allow-Origin': true,
            headers: { token }
        })
            .then((result) => {
                setDataUser(result.data.data.user)
                setDataPortofolio(result.data.data.portofolio)
                setDataExperience(result.data.data.experience)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const onLogout = () => {
        Cookie.remove('token', { path: '/' })
        Cookie.remove('idUser', { path: '/' })
        router.push('/login')
    }


    return (
        <>
            <section className={styleDetailUser.bodyContent} >
                <div className={`d-flex ${styleDetailUser.header}`}>
                    <div className={`d-flex ${styleDetailUser.CardContent} w-100`}>
                        <div className={`col-lg-4 col-12 `} >
                            <div className="card">
                                <div className="card-body d-flex flex-column">
                                    {
                                        dataUser.photo ? (
                                            <img className={styleDetailUser.photoUser} src={`http://localhost:5002/${dataUser.photo}`} alt='img user' />
                                        ) : (
                                            < img className={styleDetailUser.photoUser} src={`http://localhost:5002/user.png`} alt='img user' />
                                        )
                                    }
                                    {
                                        idUser ? (
                                            dataUser.id == idUser ? (
                                                <Link href={`/edituser/${id}`} >
                                                    <label className={styleDetailUser.editProfile} > Edit Profile</label>
                                                </Link>
                                            ) :
                                                (
                                                    <div></div>
                                                )
                                        ) : (
                                            <div></div>
                                        )
                                    }

                                    <label className={styleDetailUser.userName} >{dataUser.name}</label>
                                    <p className={styleDetailUser.userPosition} >{dataUser.job_description}</p>
                                    <div className={`d-flex ${styleDetailUser.location}`} >
                                        <img className={styleDetailUser.imgLocation} src='/location.svg' />
                                        <p className={styleDetailUser.userLocation} >{dataUser.workplace}</p>
                                    </div>
                                    <p className={styleDetailUser.typeWork} >Freelancer</p>
                                    <p className={styleDetailUser.description} >{dataUser.description}</p>
                                    <button className={styleDetailUser.buttonHire} >Hire</button>
                                    <label className={styleDetailUser.skill} >Skill</label>
                                    <div className={styleDetailUser.widthSkills} >
                                        {
                                            dataUser.skill_name ? (
                                                dataUser.skill_name.map((items, index) => (
                                                    <button key={index} className={styleDetailUser.listSkill} >{items}</button>
                                                ))
                                            ) : (
                                                <div></div>
                                            )
                                        }
                                    </div>
                                    {
                                        idUser ? (
                                            dataUser.id == idUser ? (
                                                <button onClick={() => onLogout()} className={styleDetailUser.buttonLogout} >logout</button>
                                            ) :
                                                (
                                                    <div></div>
                                                )
                                        ) : (
                                            <div></div>
                                        )

                                    }

                                </div>
                            </div>
                        </div>
                        <div className={styleDetailUser.spasi} ></div>
                        <div className={`col-lg-8 col-12`} >
                            <div className="card">
                                <div className={`card-body ${styleDetailUser.widthCardBody}`}>
                                    <Nav tabs className={`d-flex justify-content-left ${styleDetailUser.nabTab}`}>
                                        <NavItem>
                                            <NavLink className={activeTabs == "1" ? "active" : ""} onClick={() => setactiveTabs("1")}>
                                                Portofolio
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className={activeTabs == "2" ? "active" : ""} onClick={() => setactiveTabs("2")}>
                                                Pengalaman kerja
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={activeTabs} className={styleDetailUser.tabContentNav} >
                                        <TabPane tabId="1">
                                            {/* Portofolio */}
                                            <div className={`main d-flex flex-row w-100 ${styleDetailUser.formPortofolio}`}>
                                                {
                                                    (dataPortofolio === '') ? (<div>Loading</div>) :
                                                        (
                                                            dataPortofolio.map((items, index) => (
                                                                <div key={index} className={`d-flex flex-column align-items-center ${styleDetailUser.detailPortofolio}`} >
                                                                    <img src={`http://localhost:5002/${items.photo}`} className={styleDetailUser.photoPortofolio} />
                                                                    <label>{items.name}</label>
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
                                                                <div className='col-lg-2' >
                                                                    <img className={styleDetailUser.photoExp} src='/tokopedia.jpg' />
                                                                </div>
                                                                <div className='col-lg-10' >
                                                                    <label className={styleDetailUser.expName} >{items.position}</label>
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
    )
}

DetailUser.layout = 'Layoutnavbar'

export default DetailUser;

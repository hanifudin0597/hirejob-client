import React, { useState, useEffect } from 'react'
import Footer from '../../components/footer'
import styleListUser from '../../styles/Listuser.module.css'
import axios from 'axios'
import Link from 'next/link'

export async function getServerSideProps(context) {
    try {
        const response = await axios({
            method: "get",
            url: `${process.env.REACT_APP_BACKEN_URL}/user`,
        })
        return {
            props: {
                data: response.data,
                error: false,
                errorMessage: ""
            },
        }
    } catch (error) {
        return {
            props: {
                data: [],
                error: true,
                errorMessage: "Error"
            },
        }
    }
}

const ListUser = (props) => {
    const [data, setData] = useState(props.data)
    // console.log(data)
    return (
        <>
            <section className={styleListUser.bodyContent} >
                <div className={styleListUser.header}>
                    <label className={styleListUser.labelHeader} >Top Jobs</label>
                </div>
                <div className={`d-flex flex-row ${styleListUser.contentListUser}`}>
                    <div className='d-flex w-100'>
                        <form className=' d-flex w-100'>
                            <input className={styleListUser.inputSearch} placeholder='Search for any skill' />
                            <button className={styleListUser.buttonSearch} >Search</button>
                        </form>
                    </div>
                </div>
                {

                    data.data.map((item, index) => (
                        <div key={index} className={`card ${styleListUser.cardListUser}`}>
                            <div className="card-body row d-flex">
                                <div className='col-md-2' >
                                    {
                                        item.photo ? (
                                            <img className={styleListUser.userPhoto} src={`${process.env.REACT_APP_BACKEN_URL}/${item.photo}`} alt='img user' />
                                        ) : (
                                            < img className={styleListUser.userPhoto} src={`${process.env.REACT_APP_BACKEN_URL}/user.png`} alt='img user' />
                                        )
                                    }

                                </div>
                                <div className='col-md-8'>
                                    <label className={styleListUser.userName} >{item.name}</label>
                                    <p className={styleListUser.userPosition} >Web Developer</p>
                                    <div className={`d-flex ${styleListUser.location}`} >
                                        <img className={styleListUser.imgLocation} src='/location.svg' />
                                        <p className={styleListUser.userLocation} >Jakarta</p>
                                    </div>
                                    <div className={styleListUser.widthSkills} >
                                        {
                                            item.skill_name ? (
                                                item.skill_name.map((a, b) => (
                                                    <button className={styleListUser.skills} >{a}</button>
                                                ))
                                            ) : (
                                                <div></div>
                                            )


                                        }
                                    </div>
                                </div>
                                <div className='col-md-2'>
                                    <Link href={`/detailuser/${item.id}`} >
                                        <button className={styleListUser.detailUser} >Lihat Profile</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))

                }


            </section>
            <Footer />
        </>
    )
}

// ListUser.layout = 'Layoutnavbar'
ListUser.layout = 'Layoutnavbar'

export default ListUser;

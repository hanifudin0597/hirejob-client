/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2';
import styleEditUser from '../../styles/Edituser.module.css';
import Footer from '../../components/footer';

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  return {
    props: {
      token,
    },
  };
}

function EditUser(props) {
  const router = useRouter();
  const { id } = router.query;
  const { token } = props;

  const [photo, setPhoto] = useState('');
  const [isChangePhoto, setIsChangePhoto] = useState(false);
  const [dataUser, setDataUser] = useState('');

  // edit Data diri
  const [name, setName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [address, setAddress] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [description, setDescription] = useState('');
  const [skillName, setSkillName] = useState('');

  const [Exp, setExp] = useState({
    experience: [
      {
        jobPosition: '',
        companyName: '',
        dateJob: '',
        jobDesc: '',
      },
    ],

  });
  const [form, setForm] = useState({
    portofolio: [
      {
        aplicationName: '',
        linkRepo: '',
        typeApp: '',
        aplicationPhoto: '',
      },
    ],
  });

  const [photoApp, setPhotoApp] = useState('');

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
      'Access-Control-Allow-Origin': true,
      headers: { token },
    })
      .then((result) => {
        setDataUser(result.data.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangeImage = async () => {
    const formData = new FormData();
    formData.append('photo', photo);

    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}/photo`, formData, {
      'Access-Control-Allow-Origin': true,
      headers: { token },
      'Content-Type': 'multipart/form-data',
    })
      .then((result) => {
        console.log(result);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Update Photo successfully',
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Update Photo failed',
        });
      });
  };

  // update profile
  const onUpdateUser = (e) => {
    e.preventDefault();

    if (name === '' || jobDescription === '' || address === '' || workplace === '' || description === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'semua input wajib di isi',
      });
    } else {
      const body = {
        name,
        jobDescription,
        address,
        workplace,
        description,
        skillName: `{${skillName}}`,
      };
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, body, {
        headers: { token },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      const Experience = {
        position: Exp.experience[0].jobPosition,
        company: Exp.experience[0].companyName,
        date: Exp.experience[0].dateJob,
        description: Exp.experience[0].jobDesc,
      };
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/experience`, Experience, {
        headers: { token },
      })
        .then((responseExp) => {
          console.log(responseExp);
        })
        .catch((errExp) => {
          console.log(errExp);
        });

      const formData = new FormData();
      formData.append('name', form.portofolio[0].aplicationName);
      formData.append('repository', form.portofolio[0].linkRepo);
      formData.append('type', form.portofolio[0].typeApp);
      formData.append('photo', photoApp);
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/portofolio`, formData, {
        'Access-Control-Allow-Origin': true,
        headers: { token },
        'Content-Type': 'multipart/form-data',
      })
        .then((responsePort) => {
          console.log(responsePort);
        })
        .catch((errPorto) => {
          console.log(errPorto);
        });

      Swal.fire(
        'Success!',
        'Update profile success!',
        'success',
      );
      router.push(`/detailuser/${id}`);
    }
  };

  // create porto
  const addPorto = () => {
    setForm({
      portofolio: [
        ...form.portofolio,
        {
          aplicationName: '',
          linkRepo: '',
          typeApp: '',
          aplicationPhoto: '',
        },
      ],
    });
  };
  const handleInputPorto = (e, index) => {
    const newPorto = form.portofolio.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [e.target.id]: e.target.id === 'image' ? e.target.files : e.target.value,
        };
      }
      return item;
    });

    setForm({
      portofolio: newPorto,
    });
  };
  const deletePorto = (index) => {
    const newPorto = form.portofolio.filter((item, i) => {
      if (i !== index) {
        return item;
      }
    });

    setForm({
      portofolio: newPorto,
    });
  };

  // create exp
  const addExp = () => {
    setExp({
      experience: [
        ...Exp.experience,
        {
          jobPosition: '',
          companyName: '',
          dateJob: '',
          jobDesc: '',
        },
      ],
    });
  };
  const handleInputExp = (e, index) => {
    const newExp = Exp.experience.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [e.target.id]: e.target.id === 'image' ? e.target.files[0] : e.target.value,
        };
      }
      return item;
    });

    setExp({
      experience: newExp,
    });
  };
  const deleteExp = (index) => {
    const newExp = Exp.experience.filter((item, i) => {
      if (i !== index) {
        return item;
      }
    });

    setExp({
      experience: newExp,
    });
  };
  const onDetailProfile = () => {
    window.location.href = `/detailuser/${id}`;
  };
  return (
    <>
      <section className={styleEditUser.bodyContent}>
        <div className={`d-flex ${styleEditUser.header}`}>
          <div className={`d-flex ${styleEditUser.CardContent} w-100`}>
            <div className={`col-lg-4 col-12 ${styleEditUser.cardSave}`}>
              <div className="card">
                <div className="card-body d-flex flex-column">
                  {
                      dataUser.photo ? (
                        <img src={`${process.env.NEXT_PUBLIC_API_URL}/${dataUser.photo}`} className={styleEditUser.photoUser} />
                      )
                        : (
                          <img src={`${process.env.NEXT_PUBLIC_API_URL}/user.png`} className={styleEditUser.photoUser} />
                        )
                  }
                  <div className={styleEditUser.lineSpacing} />
                  <div className="d-flex justify-content-center align-items-center w-100">
                    <img src="/button-edit.svg" />
                    <label htmlFor="files" className={styleEditUser.userPosition}>Edit photo</label>
                    <input
                      className="hidden"
                      hidden
                      type="file"
                      id="files"
                      onChange={(e) => {
                        setPhoto(e.target.files[0]);
                        setIsChangePhoto(true);
                      }}
                    />
                  </div>
                  {isChangePhoto && <button onClick={handleChangeImage} className={styleEditUser.buttonSavePhoto} type="submit">Save</button>}
                  <label className={styleEditUser.userName}>{dataUser.name}</label>
                  <p className={styleEditUser.userPosition}>{dataUser.job_description}</p>
                  <div className={`d-flex ${styleEditUser.location}`}>
                    <img className={styleEditUser.imgLocation} src="/location.svg" />
                    <p className={styleEditUser.userLocation}>{dataUser.workplace}</p>
                  </div>
                  <p className={styleEditUser.typeWork}>Freelancer</p>
                </div>
              </div>
              <button onClick={(e) => onUpdateUser(e)} type="submit" className={styleEditUser.buttonSave}>Simpan</button>
              <button onClick={onDetailProfile} className={styleEditUser.buttonCancel} type="button">Batal</button>
            </div>
            <div className={styleEditUser.spasi} />
            <div className={`col-lg-8 col-12 ${styleEditUser.responsiveEditForm}`}>
              {/* card edit profile */}
              <form>
                <div className={`card ${styleEditUser.marginCard}`}>
                  <div className="card-body d-flex flex-column">
                    {
                        (dataUser === '') ? (<div>Loading</div>)
                          : (
                            <>
                              <label className={styleEditUser.labelProfile}>Data diri</label>
                              <label className={styleEditUser.labelInput}>Nama lengkap</label>
                              <input onChange={(e) => setName(e.target.value)} className={styleEditUser.input} defaultValue={dataUser.name} type="input" />
                              <label className={styleEditUser.labelInput}>Job Desk</label>
                              <input onChange={(e) => setJobDescription(e.target.value)} className={styleEditUser.input} defaultValue={dataUser.job_description} type="input" />
                              <label className={styleEditUser.labelInput}>Domisili</label>
                              <input onChange={(e) => setAddress(e.target.value)} className={styleEditUser.input} defaultValue={dataUser.address} type="input" />
                              <label className={styleEditUser.labelInput}>Tempat kerja</label>
                              <input onChange={(e) => setWorkplace(e.target.value)} className={styleEditUser.input} defaultValue={dataUser.workplace} type="input" />
                              <label className={styleEditUser.labelInput}>Deskripsi singkat</label>
                              <input onChange={(e) => setDescription(e.target.value)} className={styleEditUser.input} defaultValue={dataUser.description} type="input" />
                            </>
                          )
                    }
                  </div>
                </div>
                {/* card add Skill */}
                <div className={`card ${styleEditUser.marginCard}`}>
                  <div className="card-body d-flex flex-column">
                    <label className={styleEditUser.labelProfile}>Skill</label>
                    <div className={styleEditUser.marginSkill} />
                    <input onChange={(e) => setSkillName(e.target.value)} defaultValue={dataUser.skill_name} className={styleEditUser.input} type="input" />
                  </div>
                </div>
              </form>
              {/* card add pengalaman */}
              <div className={`card ${styleEditUser.marginCard}`}>
                <form>
                  {Exp.experience.map((item, index) => (
                    <div key={index} className="card-body d-flex flex-column">
                      <label className={styleEditUser.labelProfile}>Pengalaman kerja</label>
                      <label className={styleEditUser.labelInput}>Posisi</label>
                      <input
                        onChange={(e) => handleInputExp(e, index)}
                        className={styleEditUser.input}
                        id="jobPosition"
                        value={item.jobPosition}
                        type="input"
                      />
                      <div className="d-flex w-100">
                        <div className={`d-flex flex-column w-100 ${styleEditUser.inputTwoField}`}>
                          <label className={styleEditUser.labelInput}>Nama Perusahaan</label>
                          <input
                            onChange={(e) => handleInputExp(e, index)}
                            id="companyName"
                            value={item.companyName}
                            className={styleEditUser.input}
                            type="input"
                          />
                        </div>
                        <div className={styleEditUser.spasi} />
                        <div className={`d-flex flex-column w-100 ${styleEditUser.inputTwoField}`}>
                          <label className={styleEditUser.labelInput}>Bulan/tahun</label>
                          <input
                            onChange={(e) => handleInputExp(e, index)}
                            id="dateJob"
                            value={item.dateJob}
                            className={styleEditUser.inputDate}
                            type="date"
                          />
                        </div>
                      </div>
                      <label className={styleEditUser.labelInput}>Deskripsi singkat</label>
                      <textarea
                        onChange={(e) => handleInputExp(e, index)}
                        id="jobDesc"
                        value={item.jobDesc}
                        className={styleEditUser.inputTextArea}
                      />
                      <button onClick={() => deleteExp(index)} type="button" style={{ marginBottom: '10px', backgroundColor: 'red', color: 'white' }} className={styleEditUser.buttonPorto}>delete Experience</button>
                      <button onClick={addExp} type="button" className={styleEditUser.buttonExp}>Tambah pengalaman kerja</button>
                    </div>
                  ))}
                </form>
              </div>
              {/* card add Portofolio */}
              <div className={`card ${styleEditUser.marginCard}`}>
                <form>
                  {form.portofolio.map((item, index) => (
                    <div key={index} className="card-body d-flex flex-column">
                      <label className={styleEditUser.labelProfile}>Portofolio</label>
                      <label className={styleEditUser.labelInput}>Nama Aplikasi</label>
                      <input
                        onChange={(e) => handleInputPorto(e, index)}
                        id="aplicationName"
                        value={item.aplicationName}
                        className={styleEditUser.input}
                        type="input"
                      />
                      <label className={styleEditUser.labelInput}>Link Repository</label>
                      <input
                        onChange={(e) => handleInputPorto(e, index)}
                        id="linkRepo"
                        value={item.linkRepo}
                        className={styleEditUser.input}
                        type="input"
                      />
                      <label className={styleEditUser.labelInput}>Type Portofolio</label>
                      <input
                        onChange={(e) => handleInputPorto(e, index)}
                        id="typeApp"
                        value={item.typeApp}
                        className={styleEditUser.input}
                        type="input"
                      />
                      <label className={styleEditUser.labelInput}>Input Gambar</label>
                      <label className={styleEditUser.inputImg} htmlFor="aplicationPhoto">
                        <span className={styleEditUser.formLogoImg}>
                          <img alt="" />
                        </span>
                        <input
                          onChange={(e) => setPhotoApp(e.target.files[0])}
                          value={item.aplicationPhoto}
                          className={styleEditUser.uploadImg}
                          type="file"
                          id="aplicationPhoto"
                          required
                        />
                      </label>
                      <button onClick={() => deletePorto(index)} type="button" style={{ marginBottom: '10px', backgroundColor: 'red', color: 'white' }} className={styleEditUser.buttonPorto}>delete Portofolio</button>
                      <button onClick={addPorto} type="button" className={styleEditUser.buttonPorto}>Tambah Portofolio</button>
                    </div>
                  ))}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

EditUser.layout = 'Layoutnavbar';

export default EditUser;

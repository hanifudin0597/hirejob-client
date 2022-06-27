/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import ReactPaginate from 'react-paginate';
import Footer from '../../../components/footer';
import styleListUser from '../../../styles/Listuser.module.css';

export async function getServerSideProps(context) {
  const search = context.query.search || '';
  const sort = context.query.sort || '';
  // const limit = context.query.limit || '';
  const page = context.query.page || '';
  try {
    const response = await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_API_URL}/user?search=${search}&sort=${sort}&limit=4&page=${page}`,
    });
    return {
      props: {
        data: response.data,
        error: false,
        errorMessage: '',
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
        error: true,
        errorMessage: 'Error',
      },
    };
  }
}

function ListUser(props) {
  const router = useRouter();
  const { search, sort } = router.query;

  // const [data] = useState(props.data);
  const [searchValue, setSerachValue] = useState(search || '');
  const [sortValue, setSortValue] = useState(sort);
  // const [pageValue, setPageValue] = useState();

  const onSearchName = async (e) => {
    e.preventDefault();

    let url = '/listuser?';

    if (searchValue) {
      url += `&search=${searchValue}`;
    }
    if (sortValue) {
      url += `&sort=${sortValue}`;
    }

    window.location.href = `${url}`;
  };

  const handlePageClick = ({ selected: selectedPage }) => {
    const page = selectedPage + 1;
    let url = '/listuser?';

    if (page) {
      url += `&page=${page}`;
    }

    router.push(`${url}`);

    // window.location.href = `${url}`;
  };

  const onDetailUser = (id, e) => {
    e.preventDefault();
    window.location.href = `/detailuser/${id}`;
  };
  return (
    <>
      <section className={styleListUser.bodyContent}>
        <div className={styleListUser.header}>
          <label className={styleListUser.labelHeader}>Top Jobs</label>
        </div>
        <div className={`d-flex flex-row ${styleListUser.contentListUser}`}>
          <div className="d-flex w-100">
            <form onSubmit={(e) => onSearchName(e)} className=" d-flex w-100">
              <input onChange={(e) => setSerachValue(e.target.value)} className={styleListUser.inputSearch} placeholder="Search for any skill" />
              <select onChange={(e) => setSortValue(e.target.value)} className={styleListUser.inputSort} name="cars" id="cars">
                <option value=""> Sort by </option>
                <option selected={sortValue === 'name'} value="name">Name</option>
                <option selected={sortValue === 'address'} value="address">Address</option>
              </select>
              <button type="submit" className={styleListUser.buttonSearch}>Search</button>
            </form>
          </div>
        </div>
        {
          props.data.data.map((item, index) => (
            <div key={index} style={{ marginBottom: '5px' }} className={`card ${styleListUser.cardListUser}`}>
              <div className="card-body row d-flex">
                <div className={`col-md-2 ${styleListUser.centerSM}`}>
                  {
                      item.photo ? (
                        <img className={styleListUser.userPhoto} src={`${process.env.NEXT_PUBLIC_API_URL}/${item.photo}`} alt="img user" />
                      ) : (
                        <img className={styleListUser.userPhoto} src={`${process.env.NEXT_PUBLIC_API_URL}/user.png`} alt="img user" />
                      )
                  }

                </div>
                <div className={`col-md-8 ${styleListUser.centerSM}`}>
                  <label className={styleListUser.userName}>{item.name}</label>
                  <p className={styleListUser.userPosition}>Web Developer</p>
                  <div className={`d-flex ${styleListUser.location}`}>
                    <img className={styleListUser.imgLocation} src="/location.svg" />
                    <p className={styleListUser.userLocation}>Jakarta</p>
                  </div>
                  <div className={styleListUser.widthSkills}>
                    {
                        item.skill_name ? (
                          item.skill_name.map((a, b) => (
                            <button key={b} className={styleListUser.skills}>{a}</button>
                          ))
                        ) : (
                          <div />
                        )
                    }
                  </div>
                </div>
                <div className={`col-md-2 ${styleListUser.centerDetailProfile}`}>
                  <Link href="">
                    <button onClick={(e) => onDetailUser(item.id, e)} className={styleListUser.detailUser}>Lihat Profile</button>
                  </Link>
                </div>
              </div>
              {/* <div className={styleListUser.spasi} ></div> */}
            </div>
          ))
        }
        <div className={`flex ${styleListUser.paginationBottom}`} style={{ marginLeft: '40%', marginTop: '50px' }}>
          <ReactPaginate
            breakLabel="..."
            onPageChange={handlePageClick}
            pageCount={props.data.pagination.totalPage}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

ListUser.layout = 'Layoutnavbar';

export default ListUser;

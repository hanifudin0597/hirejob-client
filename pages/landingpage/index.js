import React from 'react';
import { Row, Col } from 'reactstrap';
// import Link from 'next/router';
import styleIndex from '../../styles/Landingpage.module.css';

export default function landingpage() {
  return (
    <Row className="d-flex flex-column gx-0">
      <Col>
        {/* <NavBarPrimary /> */}
      </Col>
      <Col>
        {/* main content */}
        <section className={`row gx-0 ${styleIndex.hero}`}>
          <div className={`content col-9 d-flex flex-column justify-content-center height: 100% w-75% ${styleIndex.content}`}>
            <h1 className={`${styleIndex.texth1}`}>Discover Recipe & Delicious Food</h1>
            <div className={styleIndex.formGroup}>
              <div className={`icon ${styleIndex.fontAwesomeSearch} `}><i className="fa-solid fa-magnifying-glass" /></div>
              <form action="">
                <input type="text" className={styleIndex.formGroupInput} placeholder="Search Restaurant, Food" />
              </form>
            </div>
          </div>
          <div className={`col-3 d-flex align-items-center ${styleIndex.decoration}`}>
            <img className={styleIndex.decorationImg} src="https://s3-alpha-sig.figma.com/img/2ca7/faff/4da51338c06dd21688b82eae3bc9dfa6?Expires=1650844800&Signature=RIAAwPyMnN9sDA~c8Vx37nsEZmfiLIZ6GG7h2MNZd7paGI2p4uAg65T6oU8WaDhakelGrKs1xwc-UrgHIYT89AiyFc72oh2QiE0g8luZRbgBPnQXwxh1~0JqrwW9n16h98vvpU4o9isbtvAZXSdbmS1wFdthyKyFPplbOaZ6NmxRxqEUHgR~CJywLOQBeHhvNNHt3CQ-Ku3G1tcYeLMcHg8L6vjCwMBZUP7G13keRoshWpkOH6vr7ogdNa~djMUphT7c8hnnJIX0n2cvqxeb9G2Zj2C4j8tT~GfbgfuraEWSw1SSFbLWF0KggZeUVnylNnn5tIr8BKEQt4H61zpcYw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="logo" />
          </div>
        </section>
      </Col>
      <Col>
        {/* Recomended recipe */}
        <section className={`row second-hero d-flex flex-column gx-0 ${styleIndex.heroRecommendedRecipe}`}>
          <div className={`text-popular-recipe col-12 ${styleIndex.textRecommendedMobile}`}>
            <h1 className={styleIndex.textRecommendedRecipe}>Popular For You !</h1>
          </div>
          <div className={`row d-flex flex-row col-12 ${styleIndex.recommendedRecipeMobile}`}>
            <div className="col-sm-12 col-md-12 col-lg-6 ">
              <img className={styleIndex.recommendedImg} src="https://s3-alpha-sig.figma.com/img/e20b/679e/52207741d95649c4cb58a57ba663027f?Expires=1650844800&Signature=NxY1FvFXnvn4ivra4pxiWZPNIu4UQY5704bDmh8GcP7~B0rCYn9gZd7fdeHWATJTKwWxZACIzZt2Zu4nyOx~v8~8XWZdavNAIrF-J1Vw8C6uH8wJmOzxvpFE7-rjJSx~cxWnW1aiV0IKzrK9ah3e7YXNbZ-nkw5-oTq6BSdvR6jHQS-zcNpxN0ZyZ4qcETdr3e73v4yVdcovdXFr6kR~M-oO~UR-9tVG0nLf2~Sbu03dQ54YVH2gUBoJdqMGyLKa-fBGobZmeSe6BbE8UVKwXmAHvAaMiiR~PoGtgWGfl27tHteiVMAKfBbNvz8n9d2b4pek8LtkNS58w2bQ0h-Wmg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="popular recipe" />
              {/* <div className={styleIndex.boderRecommendedImg} ></div> */}
            </div>
            <div className={`col-sm-12 col-md-12 col-lg-6 d-flex flex-column justify-content-center ${styleIndex.formTextRecommended}`}>
              <h1 className={styleIndex.textRecommendedImg}>Healthy Bone Broth Ramen (Quick & Easy)</h1>
              <small className={styleIndex.textSmallRecommendedImg}>
                Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s
                right!
              </small>
              <button className={styleIndex.buttonRecommended} onClick="location.href='/detailrecipe.html'" type="submit">Learn More</button>
            </div>
          </div>

        </section>
      </Col>

      <Col>
        {/* <Footer /> */}
      </Col>
    </Row>
  );
}

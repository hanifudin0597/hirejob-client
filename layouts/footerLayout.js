import React from 'react';
import Footer from '../components/footer';

export default function layout(props) {
  const { children } = props;
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}

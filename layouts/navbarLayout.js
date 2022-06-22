import React from 'react';
import Navbar from '../components/navbar';

export default function layout(props) {
  const { children } = props;
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

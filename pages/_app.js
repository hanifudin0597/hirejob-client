import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../layouts/navbarLayout';

const layouts = {
  Layoutnavbar: Navbar,
};

function NoLayout({ children }) {
  return <>{children}</>;
}

function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || NoLayout;
  // console.log(pageProps.token, pageProps.idUser)
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

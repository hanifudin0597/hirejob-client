// import '../styles/globals.css'
// import "bootstrap/dist/css/bootstrap.css"

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp


import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.css"
import Navbar from '../layouts/navbarLayout'
// import Footer from '../layouts/footerLayout'


const layouts = {
  Layoutnavbar: Navbar,
  // Layoutfooter: Footer
};

const NoLayout = ({ children }) => {
  return <>{children}</>
}

function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || NoLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )

}

export default MyApp
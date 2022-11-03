import Navbar from '../Navbar'
import Footer from '../Footer'
import Main from '../Main'



export default function Layout({ children }) {

    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    )
  }
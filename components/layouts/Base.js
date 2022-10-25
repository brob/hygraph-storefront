import Navbar from '../Navbar'
import Footer from '../Footer'
import Main from '../main'



export default function Layout({ children }) {

    return (
      <>
        <Navbar />
        <Main>{children}</Main>
        <Footer />
      </>
    )
  }
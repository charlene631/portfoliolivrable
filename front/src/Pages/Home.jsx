import Filter from "../components/Filter"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Main from "../components/Main"

const Home = ({data})=>{
    return(
        <>
        <Header/>
        <Filter data={data}/>
        <Main/>
        <Footer/>
        </>
    )
}
export default Home
import { useEffect, useState } from "react"
import FilterCategory from "../components/FilterCategory"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Main from "../components/Main"

const Home = () => {
    const [documents, setDocuments] = useState([])
    const [filterDocument, setFilterDocument] = useState([])
    const [category, setCategory] = useState("")
    const [filter, setFilter] = useState(false)

    useEffect(() => {
        fetch("http://localhost:3000/documents")
            .then((r) => {
                if (r.ok) {
                    return r.json()
                }
            })
            .then((data) => {
                setDocuments(data)
            })


        fetch("http://localhost:3000/categories/getAll")
            .then((r) => {
                if (r.ok) {
                    return r.json()
                }
            })
            .then((data) => {
                setCategory(data)
            })
    }, [])

    return (
        <>
            <Header filter={setFilter}  />
            <FilterCategory categories={category} filter={setFilterDocument} activeFilter={setFilter} />
            <Main  data={filter? filterDocument :documents}  />
            <Footer />
        </>
    )
}
export default Home
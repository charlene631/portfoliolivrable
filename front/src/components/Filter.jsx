import { useState } from "react"

const filterCategory = ({ data }) => {
const [document, setDocument] = useState([])

    const filterCategory =(e)=>{
        console.log(e.target.id)
        fetch("http://localhost:3000/documents")
        .then((r)=>{
            if(r.ok){
                r.json()
            }
        })
        .then((data)=>{
            console.log(data)
            setDocument(data)
        })
    }
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                border: "1px solid black",
                padding: "15px",
                backgroundColor: "white"
            }}>
            {data && data.map((d, i) => {
                return (
                    <div
                    id={d.id}
                    key={i}
                       onClick={filterCategory}
                        style={{
                            border: "1px solid black",
                            padding: "5px"
                        }}
                    >{d.name}
                    </div>)
            })}
        </div>
    )
}
export default filterCategory
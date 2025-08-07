const filterCategory = ({ categories, filter, activeFilter }) => {
    const all =()=>{
activeFilter(false)
    }
    const filterCat = (e) => {
        fetch(`http://localhost:3000/categories/document?id=${e.target.id}`)
            .then((r) => {
                if (r.ok) {
                    return r.json()
                }
            })
            .then((data) => {
                filter(data)
            })

        activeFilter(true)
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
            <div
            onClick={all}
                style={{
                    border: "1px solid black",
                    padding: "5px"
                }}
            >ALL
            </div>
            {categories && categories.map((d, i) => {
                return (
                    <div
                        id={d.id}
                        key={i}
                        onClick={filterCat}
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
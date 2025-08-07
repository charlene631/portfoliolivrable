import Card from "./Card"

const Main = ({data}) => {
    console.log(data)
    return (
        <main style={{
            display:"flex", 
            justifyContent:"center",
            gap:"25px", 
            flexWrap:"wrap", 
            margin:"25px"
        }}>
            { data.map((d, i)=>{return(<Card key={i} category={d.format} image={d.cloudinary_url} title={d.title} description={d.description}/>)})}
        </main>
    )
}
export default Main
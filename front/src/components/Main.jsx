import Card from "./Card"

const Main = () => {
    return (
        <main style={{
            display:"flex", 
            justifyContent:"center",
            gap:"25px", 
            flexWrap:"wrap", 
            margin:"25px"
        }}>
            <Card image="../../public/audio.png"/>
            <Card image="../../public/pdf.webp"/>
            <Card image="../../public/texte.png"/>
            <Card image="../../public/video.png"/>
            <Card image="../../public/video.png"/>
        </main>
    )
}
export default Main
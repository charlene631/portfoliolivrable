import { Link } from "react-router-dom";

const Card = ({ image, title, description, category }) => {
    return (
        <div className="card" style={{ width: "18rem" }}>
            <p style={{display: "flex",justifyContent:"center", backgroundColor:"#DFF0D8", width:"auto"}}>{category}</p>
            <div
                style={{
                    height: "150px",
                    width: "100%",
                    backgroundImage: `url(${image})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }}
                className="card-img-top"
            >
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p  className="card-text">{description}</p>
               
            </div>
            
            <Link to={'/document'}> <p style={{width:"100%", color:"#DFF0D8", backgroundColor:"#3B384D"}}  className="button">En savoir plus</p></Link>
        </div>
    );
};

export default Card;

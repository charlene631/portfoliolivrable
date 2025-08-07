import { Link } from "react-router-dom";

const Card = ({ image }) => {
    return (
        <div className="card" style={{ width: "18rem" }}>
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
                <h5 className="card-title">{"title"}</h5>
                <p className="card-text">{"categorie, fhfdhcfjhedcshqgdchjgdfhvgsfrfreferferf"}</p>
               <Link to={'/document'}> <p className="btn btn-primary">En savoir plus</p></Link>
            </div>
        </div>
    );
};

export default Card;

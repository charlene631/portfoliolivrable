import { Link } from "react-router-dom"

const Header = ({filter}) => {
    const home = ()=>{
        filter(false)
    }
    return (
        <nav style={{width:"100%"}} className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link onClick={home} to={'/'} className="navbar-brand">Accessitheque</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                           <Link onClick={home} to={'/'} className="nav-link active" aria-current="page">Home</Link> 
                        </li>
                    </ul>
                </div>
               <Link to='/connect'><button className="btn">Se Connecter</button></Link> 
            </div>
        </nav>
    )
}
export default Header
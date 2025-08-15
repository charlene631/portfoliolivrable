import { Link } from "react-router-dom";

const Header = ({ filter }) => {
  const home = () => {
    if (filter) filter(false);
  };

  return (
    <header>
      {/* Lien d'évitement pour l'accessibilité */}
      <a 
        href="#main-content" 
        className="visually-hidden-focusable"
      >
        Aller au contenu principal
      </a>

      <nav 
        className="navbar navbar-expand-lg bg-body-tertiary"
        role="navigation" 
        aria-label="Navigation principale"
        style={{ width: "100%" }}
      >
        <div className="container-fluid">
          {/* Logo / Nom du site */}
          <Link 
            onClick={home} 
            to="/" 
            className="navbar-brand fw-bold"
          >
            accessiWeb
          </Link>

          {/* Bouton menu mobile */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Ouvrir le menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Liens de navigation */}
          <div 
            className="collapse navbar-collapse" 
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link 
                  onClick={home} 
                  to="/" 
                  className="nav-link active" 
                  aria-current="page"
                >
                  Accueil
                </Link>
              </li>
            </ul>

            {/* Bouton connexion */}
            <div className="d-flex">
              <Link to="/connect">
                <button className="button ms-2">
                  Se connecter
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

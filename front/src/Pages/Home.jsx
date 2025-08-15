import { useEffect, useState } from "react";
import FilterCategory from "../components/FilterCategory";
import Main from "../components/Main";

const Home = ({ filter, setFilter }) => {
  const [documents, setDocuments] = useState([]);
  const [filterDocument, setFilterDocument] = useState([]);
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(""); // nouvel état pour l’erreur

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    // Récupération des documents
    fetch(`${API_URL}/documents`)
      .then((r) => {
        if (!r.ok) throw new Error(`Erreur HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => setDocuments(data))
      .catch(() => setError("Impossible de récupérer les documents."));

    // Récupération des catégories
    fetch(`${API_URL}/categories/getAll`)
      .then((r) => {
        if (!r.ok) throw new Error(`Erreur HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => setCategory(data))
      .catch(() => setError("Impossible de récupérer les catégories."));
  }, [API_URL]);

  return (
    <div>
      {/* Affichage d’un message d’erreur si besoin */}
      {error && (
        <div className="alert alert-warning text-center" role="alert">
          {error}
        </div>
      )}

      {/* Affichage “Chargement…” si documents ou categories non chargés et pas d’erreur */}
      {!error && (documents.length === 0 || category.length === 0) && (
        <div className="text-center my-3">Chargement...</div>
      )}

      {/* Affichage principal quand les données sont prêtes */}
      {documents.length > 0 && category.length > 0 && (
        <>
          <FilterCategory
            categories={category}
            filter={setFilterDocument}
            activeFilter={setFilter}
          />
          <Main data={filter ? filterDocument : documents} />
        </>
      )}
    </div>
  );
};

export default Home;

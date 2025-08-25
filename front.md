
## schéma du flux filter

        App.jsx
   +----------------+
   |  useState      |
   |  filter        |
   |  setFilter     |
   +----------------+
          │
          │ passe setFilter
          ▼
     Header.jsx
   +----------------+
   | Bouton Accueil  |
   | onClick:        |
   | setFilter(false)|
   +----------------+
          │
          ▼
        (App.jsx)
          │
          ▼
      Routes / Home.jsx
   +----------------+
   | Props reçues : |
   | filter         |
   | setFilter      |
   +----------------+
          │
          ▼
 FilterCategory.jsx
   +----------------+
   | Boutons catégories |
   | onClick: setFilterDocument |
   |         setFilter         |
   +----------------+
          │
          ▼
      Home.jsx
   +----------------+
   | Affichage docs |
   | Main data =   |
   | filter ?      |
   | filterDocument|
   | : documents   |
   +----------------+


   ## Schéma flux de données complet de l'application

        Frontend React
   +----------------------+
   | Home.jsx / Filter etc|
   | useEffect fetch API  |
   +----------------------+
             |
             | fetch(`${API_URL}/documents`)
             v
      Backend Express/API
   +----------------------+
   | documentsController  |
   | listDocuments()      |
   | res.status(200).json |
   +----------------------+
             |
             | Appel vers le modèle
             v
      documentsModel.js
   +----------------------+
   | getAllDocuments()    |
   | Requête SQL / BDD    |
   +----------------------+
             |
             | Retourne tableau documents
             v
      documentsController
   +----------------------+
   | res.json(documents)  |
   +----------------------+
             |
             | JSON renvoyé au front
             v
        Front React
   +----------------------+
   | .then(data => setDocuments(data))
   | Affichage via Main.jsx
   | (ou message d’erreur si catch)
   +----------------------+

---

📌 **Points clés**
1. **Cloudinary** : côté backend, l’URL des fichiers uploadés est stockée dans la BDD. React reçoit cette URL dans le JSON et peut l’afficher dans un `<img>` ou un lien `<a>`.  
2. **Gestion d’erreur** :  
   - Si fetch échoue → catch → `setError` → message visible utilisateur.  
   - Si le serveur renvoie une erreur HTTP (ex. 500) → throw → catch → message d’erreur.  
3. **State React** : `documents` est mis à jour uniquement si la réponse est valide.  
4. **Filtrage** (`filter`) :  
   - Centralisé dans `App.jsx`.  
   - `Header` peut réinitialiser.  
   - `FilterCategory` peut mettre à jour le filtrage local.  

---


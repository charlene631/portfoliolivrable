# Erreurs courantes et solutions - Accessitheque API

---

## 1. Erreur : "No recipients defined" dans Nodemailer

**Symptômes :**  
- Erreur lors de l’envoi d’email  
- Message `No recipients defined`

**Cause :**  
- Le champ `to` passé à Nodemailer est vide ou `undefined`.

**Solution :**  
- Vérifier que la variable contenant l’email (`email` par ex.) est bien extraite de `req.body` et passée à la fonction `sendEmail`.  
- Ne pas faire `const { email } = req.body.email;` mais bien `const { email } = req.body;`.  
- Ajouter un `console.log(to)` dans `sendEmail` pour s’assurer que la variable est bien définie avant l’envoi.

---

## 2. Erreur : "Bind parameters must not contain undefined"

**Symptômes :**  
- Échec d’insertion en base  
- Erreur de paramètre SQL avec valeur `undefined`

**Cause :**  
- Variable(s) non initialisée(s) ou absente(s) lors de l’appel à la requête SQL.

**Solution :**  
- Valider en amont que toutes les variables sont bien définies.  
- Ne pas passer `undefined` dans la requête SQL, utiliser `null` ou une valeur par défaut.  
- Ajouter un log avant l’appel SQL pour vérifier les valeurs envoyées.

---

## 3. Pas de logs visibles dans le terminal

**Symptômes :**  
- `console.log` dans le code ne s’affiche pas.

**Cause :**  
- Serveur non démarré dans le terminal actif.  
- Erreur bloquant l’exécution avant le log.  
- Mauvais fichier ou code modifié non rechargé.

**Solution :**  
- Démarrer le serveur avec `npm run dev` dans le terminal.  
- Ajouter des logs en début de route ou middleware pour confirmer le passage.  
- Utiliser `nodemon` pour recharger automatiquement.  
- Vérifier le point d’entrée serveur (`server.js`).

---

## 4. Validation des champs utilisateur

**Bonne pratique :**  
- Toujours vérifier la présence et la validité des champs (`name`, `lastname`, `email`, `password`) avant traitement.  
- Rejeter les requêtes incomplètes avec un code 400.

---

# Fin du document

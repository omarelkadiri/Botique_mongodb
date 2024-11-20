const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb://localhost:27017"; // Adresse du serveur MongoDB
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connexion réussie à MongoDB");

    const db = client.db("Boutique");
    const categoriesCollection = db.collection("categories");
    const productsCollection = db.collection("products");


    // **************Données des catégories
    const categories = [
      { "_id": "C001", "nom": "Homme" },
      { "_id": "C002", "nom": "Femme" }
    ];


    // *************Données des produits
    const products = [
      {
        "_id": "P001",
        "nom": "T-shirt en coton",
        "description": "T-shirt confortable en coton bio.",
        "image": "https://example.com/images/tshirt_coton.jpg",
        "categorieId": "C001",
        "variations": [
          {
            "taille": "S",
            "couleur": { "nom": "Rouge", "code": "#F00" },
            "quantiteEnStock": 10,
            "prix": 19.99,
            "image": "https://example.com/images/Homme/P001_Rouge.jpg"
          },
          {
            "taille": "M",
            "couleur": { "nom": "Jaune", "code": "#FF0" },
            "quantiteEnStock": 5,
            "prix": 19.99,
            "image": "https://example.com/images/Homme/P001_Rouge.jpg"
          }
        ]
      },
      {
        "_id": "P002",
        "nom": "Jean slim",
        "description": "Jean slim fit avec un look moderne.",
        "image": "https://example.com/images/jean_slim.jpg",
        "categorieId": "C001",
        "variations": [
          {
            "taille": "M",
            "couleur": { "nom": "Noir", "code": "#000" },
            "quantiteEnStock": 7,
            "prix": 39.99,
            "image": "https://example.com/images/Homme/P002_Noir.jpg"
          }
        ]
      },
      {
        "_id": "P003",
        "nom": "Robe d'été",
        "description": "Robe légère et élégante pour les journées ensoleillées.",
        "image": "https://example.com/images/robe_ete.jpg",
        "categorieId": "C002",
        "variations": [
          {
            "taille": "S",
            "couleur": { "nom": "Blanc", "code": "#EEE" },
            "quantiteEnStock": 15,
            "prix": 29.99,
            "image": "https://example.com/images/Femme/P003_Blanche.jpg"
          }
        ]
      }
    ];

    // ******** insertion
    await categoriesCollection.insertMany(categories);
    console.log("Catégories insérées");

    await productsCollection.insertMany(products);
    console.log("Produits insérés");
  } catch (e) {
    console.error("Erreur:", e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

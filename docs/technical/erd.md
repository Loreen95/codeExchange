# Entity Relationship Diagram (ERD)
Voor de onder andere de User Stories "Inloggen" en "Registreren" is een database tabel nodig waar de informatie van een gebruiker in opgeslagen kan worden. Hiervoor wordt over het algemeen een Entity Relationship Diagram (ERD) opgesteld, waarin je kunt lezen hoe de verschillende database tabellen eruit zouden moeten zien.

![ERD](./assets/erd.svg)

Korte uitleg van wat je hierboven ziet:

- De tabelnaam is `user`.

- Deze heeft 4 kolommen, waarvan de `id` de primaire sleutel is. Dat kun je zien aan het sleuteltje.

- `email`, `password` en `username` zijn verplichte velden. Dat kun je zien aan de `NN` (NOT NULL)

Bovenstaande ERD is gemaakt met de taal `DBML` via de website [dbdiagram.io](https://dbdiagram.io/). Dit kun je zelf ook gebruiken om je database tabellen verder uit te breiden voor dit project.

Helaas bevat een afbeelding van een ERD niet alle informatie die in een DBML-bestand beschreven staat. Het is dus altijd handig die er ook nog even bij te pakken:

```dbml
Table user {
  id int(11) [pk, increment]
  email varchar(255) [not null, unique]
  password varchar(255) [not null]
  username varchar(255) [not null, unique]
}
```

In principe staat hier exact hetzelfde als wat je al uit de afbeelding had kunnen halen. De extra informatie zit hem echter in het `id`-veld, die *auto increment* zou moeten zijn, wat ervoor zorgt dat de database automatisch nummers bepaald voor de ID's. Daarnaast zijn zowel `email` als `username` unieke velden, wat betekent dat deze velden nooit een waarde mogen bevatten die al eerder is gebruikt! Dit zijn beide zaken die MySQL voor je kan afdwingen vanuit de database, daar hoef je dus niet zelf logica voor te maken.

Het mooie van DBML is ook dat deze gelijk een SQL-script kan genereren:

```sql
CREATE TABLE `user` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) UNIQUE NOT NULL
);
```

Door bovenstaand script op je database uit te voeren heb je een volledig correcte `user`-tabel waar je data in kunt opslaan.

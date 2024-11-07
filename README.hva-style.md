# Uitleg van de Styling in HvA Thema

## Algemene Uitleg

Deze styleset biedt een uitgebreide verzameling CSS-stijlen voor het consistent en aantrekkelijk vormgeven van webpagina's. De stijlen zijn georganiseerd in verschillende secties, elk gericht op een specifiek aspect van de gebruikersinterface. Hieronder volgt een overzicht van de beschikbare onderdelen:

- **[CSS Imports](#css-imports)**: Hoe CSS-bestanden te importeren en organiseren.
- **[Externe Libraries](#externe-libraries)**: Integratie van externe libraries zoals Font Awesome.
- **[CSS-variabelen](#css-variabelen)**: Voor het definiëren van herbruikbare kleuren en stijlen.
- **[Algemene Layout](#algemene-layout)**: Basisstijlen voor de `body` en hulpprogrammaklassen voor flexbox, marges, padding, tekstuitlijning en breedte.
- **[Hoofdinhoud](#hoofdinhoud)**: Stijlen voor de hoofdinhoud van de pagina.
- **[Knoppen](#knoppen)**: Stijlen voor primaire en secundaire knoppen.
- **[Navigatiebalk](#navigatiebalk)**: Stijlen voor de navigatiebalk en navigatielinks.
- **[Zijbalkfilter](#zijbalkfilter)**: Stijlen voor de zijbalk met filtersecties en selecteerbare tags.
- **[Profiel onderdelen](#profiel-onderdelen)**: Stijlen voor het gebruikersprofiel, inclusief gebruikersafbeelding en gebruikersnaam.
- **[Vragenlijst](#vragenlijst)**: Stijlen voor het weergeven van vragen als een lijst, inclusief meta-data en tags.
- **[Paginering](#paginering)**: Stijlen voor het weergeven van pagineringslinks.
- **[Modals](#modals)**: Stijlen voor modale vensters met een donkere achtergrond en schaduw.
- **[Tabellen](#tabellen)**: Stijlen voor tabellen met een consistente opmaak en hover-effect.
- **[Kaarten](#kaarten)**: Stijlen voor kaarten met een flexibele layout en schaduw.
- **[Formulieren](#formulieren)**: Stijlen voor formulieren met een consistente opmaak, randen en schaduw.

## CSS Imports

### Hoe CSS Imports Werken

CSS imports maken het mogelijk om CSS-bestanden in andere CSS-bestanden te importeren. Dit is handig om je stijlen modulair en georganiseerd te houden. Je kunt specifieke stijlen importeren in je hoofdbestand of in individuele pagina's, afhankelijk van je behoeften.

### Importeren van CSS-bestanden

Om een CSS-bestand te importeren in een ander CSS-bestand, gebruik je de `@import` regel. Hier is een voorbeeld van hoe je dit kunt doen:

```css
@import url('path/to/your/css/file.css');
```

Vervang `path/to/your/css/file.css` door het pad naar het CSS-bestand dat je wilt importeren.

### Voorbeeld: Importeren van Specifieke Onderdelen

Stel dat je een project hebt met verschillende CSS-bestanden voor verschillende onderdelen, zoals `buttons.css`, `navbar.css`, en `forms.css`. Je kunt deze bestanden importeren in je hoofdbestand of in een specifiek bestand voor een individuele pagina.

#### Hoofdbestand

In je hoofdbestand (`main.css`), kun je alle benodigde CSS-bestanden importeren:

```css
@import url('buttons.css');
@import url('navbar.css');
@import url('forms.css');
```

#### Individuele Pagina

Als je alleen de stijlen voor knoppen en formulieren nodig hebt op een specifieke pagina, kun je alleen die bestanden importeren:

```css
@import url('buttons.css');
@import url('forms.css');
```

### Voordelen van CSS Imports

- **Modulariteit**: Houd je CSS-bestanden klein en beheersbaar door ze op te splitsen in logische onderdelen.
- **Herbruikbaarheid**: Gebruik dezelfde stijlen op meerdere pagina's zonder code te dupliceren.
- **Onderhoudbaarheid**: Maak het eenvoudiger om wijzigingen aan te brengen door stijlen op één plek te beheren.

Door CSS imports te gebruiken, kun je je stijlen beter organiseren en je project onderhoudbaar houden.
## Externe Libraries

### Font Awesome

Font Awesome is een populaire icon library die een breed scala aan pictogrammen biedt die eenvoudig in webprojecten kunnen worden geïntegreerd. Om Font Awesome te gebruiken, moet je de CSS-bestanden importeren in je project. Dit kan op verschillende manieren, maar de meest gebruikelijke methode is via een CDN (Content Delivery Network).

#### Importeren via CDN

Om Font Awesome te gebruiken, kun je ook de CSS-bestanden lokaal in je project opnemen en deze importeren via je eigen CSS-bestand. Download de Font Awesome bestanden van de officiële website en voeg de CSS-bestanden toe aan je project. Voeg vervolgens de volgende regel toe aan je CSS-bestand om de CSS-bestanden te importeren:

```css
@import url('path/to/font-awesome/css/all.min.css');
```

Vervang `path/to/font-awesome/css/` door het pad naar de locatie waar je de CSS-bestanden hebt opgeslagen in je project of het webadres van je gebruikte library.

#### Gebruik van Iconen

Na het importeren van Font Awesome kun je iconen toevoegen aan je HTML door de juiste klassen te gebruiken. Bijvoorbeeld, om een huis-icoon toe te voegen, gebruik je de volgende HTML:

```html
<i class="fas fa-home"></i>
```

Hiermee wordt een huis-icoon weergegeven op je webpagina.

Door deze styleset en externe libraries zoals Font Awesome te gebruiken, kun je snel en eenvoudig een consistente en aantrekkelijke gebruikersinterface creëren voor je webprojecten.

## CSS-variabelen
De CSS-variabelen zijn gedefinieerd in de `:root` selector. Deze variabelen maken het gemakkelijk om kleuren en andere stijlen consistent te houden door het hele bestand.

```css
:root {
    --primary-color: #005792;
    --secondary-color: #333333;
    --accent-color: #C60035;
    --background-color: #F5F5F5;
    --white: #FFFFFF;
    --gray: #8C8C8C;
    --light-gray: #E1E4E8;
    --border-color: var(--light-gray);
    --hover-color: #B8002E;
    --link-color: #005792;
    --link-hover-color: #003F5E;
}
```
**Uitleg:** CSS-variabelen worden gedefinieerd met `--variabele-naam` en kunnen overal in het CSS-bestand worden hergebruikt, doormiddel van het aanroepen van `var(--variabele-naam)`. Dit maakt het eenvoudig om kleuren en andere stijlen consistent te houden.

## Algemene Layout
De algemene layout definieert de basisstijl voor de `body` van de pagina en enkele hulpprogrammaklassen voor flexbox, marges, padding, tekstuitlijning en breedte.

```css
body {
    font-family: sans-serif;
    background-color: var(--background-color);
    color: var(--secondary-color);
    margin: 0px;
}
```
**Uitleg:** De `body` selector stelt de algemene stijl van de pagina in, zoals het lettertype, de achtergrondkleur en de tekstkleur.

```css
.flex {
    display: flex;
}
```
**Uitleg:** De `.flex` klasse maakt gebruik van flexbox om een flexibele container te creëren die zijn kinderen in een rij of kolom kan plaatsen.

```css
.flex-col {
    flex-direction: column;
}
```
**Uitleg:** De `.flex-col` klasse stelt de richting van de flexbox in op kolom, waardoor de kinderen onder elkaar worden geplaatst.

```css
.flex-row {
    flex-direction: row;
}
```
**Uitleg:** De `.flex-row` klasse stelt de richting van de flexbox in op rij, waardoor de kinderen naast elkaar worden geplaatst.

```css
.items-center {
    align-items: center;
}
```
**Uitleg:** De `.items-center` klasse centreert de kinderen verticaal binnen de flex container.

```css
.justify-between {
    justify-content: space-between;
}
```
**Uitleg:** De `.justify-between` klasse verdeelt de kinderen gelijkmatig met ruimte ertussen.

```css
.m-0 {
    margin: 0;
}
```
**Uitleg:** De `.m-0` klasse stelt de marge in op 0.

```css
.mb-4 {
    margin-bottom: 1rem;
}
```
**Uitleg:** De `.mb-4` klasse stelt de marge aan de onderkant in op 1 rem-eenheid.

```css
.mt-4 {
    margin-top: 1rem;
}
```
**Uitleg:** De `.mt-4` klasse stelt de marge aan de bovenkant in op 1 rem-eenheid.

```css
.p-4 {
    padding: 1rem;
}
```
**Uitleg:** De `.p-4` klasse stelt de padding in op 1 rem-eenheid.

```css
.px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}
```
**Uitleg:** De `.px-2` klasse stelt de padding aan de linker- en rechterkant in op 0.5 rem-eenheid.

```css
.text-center {
    text-align: center;
}
```
**Uitleg:** De `.text-center` klasse centreert de tekst.

```css
.text-left {
    text-align: left;
}
```
**Uitleg:** De `.text-left` klasse lijnt de tekst links uit.

```css
.w-full {
    width: 100%;
}
```
**Uitleg:** De `.w-full` klasse stelt de breedte in op 100%.

```css
.bg-white {
    background-color: var(--white);
}
```
**Uitleg:** De `.bg-white` klasse stelt de achtergrondkleur in op wit.

```css
.border {
    border: 1px solid var(--border-color);
}
```
**Uitleg:** De `.border` klasse voegt een rand toe met een kleur die is gedefinieerd door de `--border-color` variabele.

```css
.rounded {
    border-radius: 0.5rem;
}
```
**Uitleg:** De `.rounded` klasse maakt de hoeken van een element afgerond met een straal van 0.5 rem-eenheid.

## Hoofdinhoud
De hoofdinhoud (`main-content`) bevat de hoofdinhoud van elke pagina De inhoud is gestyled met een standaard achtergrondkleur.

```css
.main-content {
    flex-grow: 1;
    background-color: var(--background-color);
    padding: 1rem;
}
```
**Uitleg:** De `.main-content` klasse stelt de flex-groei, achtergrondkleur en padding in voor de hoofdinhoud.

```css
@media (max-width: 768px) {
    .main-content {
          padding: 1rem 0;
    }
}
```
## Responsive containers
De `.container` klasse maakt gebruik van flexbox om een flexibele container te creëren die zijn kinderen in een rij plaatst. Dit zorgt ervoor dat de inhoud naast elkaar wordt weergegeven. De breedte van de container is ingesteld op 100%, zodat deze de volledige beschikbare ruimte inneemt.

```css
.container {
    display: flex;
    flex-direction: row;
    width: 100%;
}
```
**Uitleg:** De `.container` klasse stelt de flexbox layout in op rijrichting (row), waardoor de kinderen naast elkaar worden geplaatst. De breedte is ingesteld op 100%, zodat de container de volledige breedte van de oudercontainer inneemt.

```css
@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }
}
```
**Uitleg:** De media query zorgt ervoor dat de flex-richting van de `.container` klasse wordt veranderd naar kolom (column) wanneer de schermbreedte 768px of kleiner is. Dit zorgt ervoor dat de inhoud onder elkaar wordt gestapeld, wat de leesbaarheid en bruikbaarheid op kleinere schermen verbetert.

## Knoppen
De knoppen `btn` zijn gestyled met een primaire kleur achtergrond en witte tekst. Er is ook een secundaire knopstijl beschikbaar.

```css
.btn {
    background-color: var(--primary-color);
    color: var(--white);
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: none;
    cursor: pointer;
}
```
**Uitleg:** De `.btn` klasse stelt de stijl van de knoppen in, inclusief achtergrondkleur, tekstkleur, padding, afgeronde hoeken, geen rand en een cursor die verandert in een pointer.

```css
.btn:hover {
    color: var(--white);
    background-color: var(--hover-color);
}
```
**Uitleg:** De `.btn:hover` klasse verandert de achtergrondkleur van de knoppen wanneer erover wordt gehoverd.

```css
.btn-secondary {
    background-color: #e1e4e8;
    color: var(--secondary-color);
}
```
**Uitleg:** De `.btn-secondary` klasse stelt de stijl van de secundaire knoppen in, inclusief achtergrondkleur en tekstkleur.

## Navigatiebalk
De navigatiebalk `navbar` is gestyled met een primaire kleur achtergrond en witte tekst. De logo en navigatielinks zijn uitgelijnd met flexbox.

```css
.navbar {
    background-color: var(--primary-color);
    padding: 1rem;
    display: flex;
    color: var(--white);
}
```
**Uitleg:** De `.navbar` klasse stelt de achtergrondkleur, padding, flexbox layout en tekstkleur in voor de navigatiebalk.

```css
.navbar .logo {
    font-weight: bold;
    font-size: 2rem;
    color: var(--white);
}
```
**Uitleg:** De `.navbar .logo` klasse stelt het logo in met een vet lettertype, een grotere lettergrootte en een witte kleur.

```css
.navbar .nav-links {
    display: flex;
    gap: 1rem;
    margin-right: auto;
    margin-left: 10%;
}
```
**Uitleg:** De `.navbar .nav-links` klasse maakt gebruik van flexbox om de navigatielinks in een rij te plaatsen met een ruimte van 1 rem tussen de links.

```css
.navbar .nav-links a {
    text-decoration: none;
    color: var(--white);
    font-weight: 500;
    padding: 0.5rem 1rem;
    background-color: var(--accent-color);
    border-radius: 0.25rem;
    transition: background-color 0.3s ease;
}
```
**Uitleg:** De `.navbar .nav-links a` klasse stelt de stijl van de links in, inclusief geen onderstreping, witte tekstkleur, vetgedrukte tekst, padding, achtergrondkleur, afgeronde hoeken en een overgangseffect voor de achtergrondkleur.

```css
.navbar .nav-links a:hover {
    background-color: var(--secondary-color);
}
```
**Uitleg:** De `.navbar .nav-links a:hover` klasse verandert de achtergrondkleur van de links wanneer erover wordt gehoverd.

```css
@media (max-width: 768px) {
	.navbar {
		flex-direction: column;
		align-items: flex-start;
	}
	.navbar .nav-links {
		flex-direction: row;
		width: 80%;
		margin-top: 1rem;
		flex-wrap: wrap;
		
	}
	.navbar .nav-links a {
		min-width: 100px;
		width: 45%;
		text-align: center;
		padding: 1rem 0;
	}
}
```
**Uitleg:** Om ervoor te zorgen dat de navigatiebalk goed werkt op kleinere schermen, gebruiken we een media query die van toepassing is op schermen met een maximale breedte van 768px. Binnen deze media query passen we de stijl van de navigatiebalk en de navigatielinks aan:
- `.navbar`: De flex-richting wordt veranderd naar kolom (column), zodat de items onder elkaar worden gestapeld. De items worden uitgelijnd aan de linkerkant (flex-start).
- `.navbar .nav-links`: De flex-richting wordt ingesteld op rij (row), de breedte wordt aangepast naar 80%, en er wordt een marge van 1rem bovenaan toegevoegd. De links worden ook gewrapt (flex-wrap: wrap) zodat ze netjes in de beschikbare ruimte passen.
- `.navbar .nav-links a`: Elke link krijgt een minimale breedte van 100px en een breedte van 45% van de container. De tekst wordt gecentreerd en er wordt padding toegevoegd om de klikbare ruimte te vergroten.

Deze aanpassingen zorgen ervoor dat de navigatiebalk gebruiksvriendelijk blijft op kleinere schermen. 

## Zijbalkfilter
De zijbalk `.sidebar` bevat filtersecties met selecteerbare tags. De styling zorgt ervoor dat de tags veranderen van kleur wanneer ze worden geselecteerd of wanneer erover wordt gehoverd.

```css
.sidebar {
    width: 250px;
    background-color: var(--white);
    padding: 1rem;
    border: 1px solid var(--border-color);
    flex-shrink: 0;
}
```
**Uitleg:** De `.sidebar` klasse stelt de breedte, achtergrondkleur, padding, rand en flex-shrink in voor de zijbalk.

```css
.sidebar .filter-section {
    margin-bottom: 2rem;
}
```
**Uitleg:** De `.sidebar .filter-section` klasse voegt een marge aan de onderkant toe aan elke filtersectie.

```css
.sidebar .filter-section h3 {
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--secondary-color);
}
```
**Uitleg:** De `.sidebar .filter-section h3` klasse stelt de stijl van de kopteksten in de filtersecties in, inclusief vetgedrukte tekst, marge aan de onderkant en tekstkleur.

```css
.sidebar .filter-section ul {
    list-style-type: none;
    padding: 0;
}
```
**Uitleg:** De `.sidebar .filter-section ul` klasse verwijdert de standaard lijststijl en padding van de ongeordende lijsten.

```css
.sidebar .filter-section ul li {
    margin-bottom: 0.5rem;
}
```
**Uitleg:** De `.sidebar .filter-section ul li` klasse voegt een marge aan de onderkant toe aan elk lijstitem.

```css
.sidebar .filter-section ul li label {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem 1rem;
    background-color: var(--light-gray);
    border-radius: 0.25rem;
    transition: background-color 0.3s ease, color 0.3s ease;
}
```
**Uitleg:** De `.sidebar .filter-section ul li label` klasse stelt de stijl van de labels in, inclusief flexbox layout, cursor, padding, achtergrondkleur, afgeronde hoeken en overgangseffecten voor achtergrondkleur en tekstkleur.

```css
.sidebar .filter-section ul li label:hover {
    background-color: var(--primary-color);
    color: var(--white);
}
```
**Uitleg:** De `.sidebar .filter-section ul li label:hover` klasse verandert de achtergrondkleur en tekstkleur van de labels wanneer erover wordt gehoverd.

```css
.sidebar .filter-section ul li input[type="checkbox"] {
    display: none;
}
```
**Uitleg:** De `.sidebar .filter-section ul li input[type="checkbox"]` klasse verbergt de standaard checkbox.

```css
.sidebar .filter-section ul li input[type="checkbox"]:checked+label {
    background-color: var(--primary-color);
    color: var(--white);
}
```
**Uitleg:** De `.sidebar .filter-section ul li input[type="checkbox"]:checked+label` klasse verandert de achtergrondkleur en tekstkleur van de labels wanneer de checkbox is aangevinkt.

```css
.sidebar .filter-section ul li label .icon {
    margin-right: 0.5rem;
    color: var(--primary-color);
}
```
**Uitleg:** De `.sidebar .filter-section ul li label .icon` klasse stelt de stijl van de iconen in, inclusief marge aan de rechterkant en kleur.

```css
.sidebar .filter-section ul li input[type="checkbox"]:checked+label .icon {
    color: var(--white);
}
```
**Uitleg:** De `.sidebar .filter-section ul li input[type="checkbox"]:checked+label .icon` klasse verandert de kleur van de iconen wanneer de checkbox is aangevinkt.

## Profiel onderdelen
Het gebruikers profiel heeft styling voor het weergeven van de gebruikersafbeelding en de gebruikersnaam.

```css
.user-profile {
    display: flex;
    align-items: center;
    padding: 1rem 0;
}
```
**Uitleg:** De `.user-profile` klasse maakt gebruik van flexbox om de gebruikersprofielsectie uit te lijnen en voegt padding toe aan de boven- en onderkant.

```css
.user-profile img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 1rem;
}
```
**Uitleg:** De `.user-profile img` klasse stelt de stijl van de profielfoto in, inclusief afgeronde hoeken, breedte, hoogte en marge aan de rechterkant.

```css
.user-profile .username {
    font-size: 1.2rem;
    color: var(--secondary-color);
}
```
**Uitleg:** De `.user-profile .username` klasse stelt de stijl van de gebruikersnaam in, inclusief lettergrootte en kleur.

## Vragenlijst
De vragenlijst `.question-list` bevat styling voor het weergeven van vragen als een lijst, waarbij meta-data en tags kunnen worden gebruikt. 

```css
.question-list {
    display: flex;
    flex-direction: column;
}
```
**Uitleg:** De `.question-list` klasse maakt gebruik van flexbox om de vragenlijst in een kolom te plaatsen.

```css
.question-item {
    background-color: var(--white);
    border: 1px solid var(--border-color);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
}
```
**Uitleg:** De `.question-item` klasse stelt de stijl van de vragenlijstitems in, inclusief achtergrondkleur, rand, padding, afgeronde hoeken, marge aan de onderkant en schaduw.

```css
.question-item .title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
}
```
**Uitleg:** De `.question-item .title` klasse stelt de stijl van de titels van de vragenlijstitems in, inclusief lettergrootte, vetgedrukte tekst, kleur en marge aan de onderkant.

```css
.question-item .meta {
    font-size: 0.9rem;
    color: var(--gray);
    margin-bottom: 1rem;
}
```
**Uitleg:** De `.question-item .meta` klasse stelt de stijl van de metadata van de vragenlijstitems in, inclusief lettergrootte, kleur en marge aan de onderkant.

```css
.question-item .tags {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}
```
**Uitleg:** De `.question-item .tags` klasse maakt gebruik van flexbox om de tags in een rij te plaatsen met een ruimte van 0.5 rem tussen de tags en voegt een marge aan de bovenkant toe.

```css
.tag {
    background-color: var(--accent-color);
    color: var(--white);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.8rem;
}
```
**Uitleg:** De `.tag` klasse stelt de stijl van de tags in, inclusief achtergrondkleur, tekstkleur, padding, afgeronde hoeken en lettergrootte.


## Paginering
De paginering `pagination` is gestyled om de links in het midden uit te lijnen en een actieve pagina te markeren.

```css
.pagination {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
}
```
**Uitleg:** De `.pagination` klasse maakt gebruik van flexbox om de pagineringslinks in het midden uit te lijnen met een ruimte van 1 rem tussen de links en voegt een marge aan de bovenkant toe.

```css
.pagination .page-link {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 0.25rem;
    color: var(--primary-color);
    cursor: pointer;
}
```
**Uitleg:** De `.pagination .page-link` klasse stelt de stijl van de pagineringslinks in, inclusief padding, rand, afgeronde hoeken, tekstkleur en een cursor die verandert in een pointer.

```css
.page-link.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
}
```
**Uitleg:** De `.page-link.active` klasse stelt de stijl van de actieve pagineringslink in, inclusief achtergrondkleur, tekstkleur en randkleur.

```css
.pagination .page-link:hover {
    background-color: var(--background-color);
}
```
**Uitleg:** De `.pagination .page-link:hover` klasse verandert de achtergrondkleur van de pagineringslinks wanneer erover wordt gehoverd.

## Modals
De modals zijn gestyled om een donkere achtergrond te hebben wanneer ze worden geopend en een schaduw om ze te laten opvallen.

### Hoe het werkt:
Het `dialog`-element is een native HTML-element dat wordt gebruikt om modale vensters te maken. Het biedt ingebouwde functionaliteit voor het weergeven en verbergen van modals, inclusief ondersteuning voor een donkere achtergrond wanneer de modal wordt geopend. Voor meer informatie over het `dialog`-element, zie de [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog).

### Betrokken JavaScript functies

1. **`showModal()`**: Deze functie wordt gebruikt om een modal venster te openen en het als een modaal dialoogvenster weer te geven. Het zorgt ervoor dat de rest van de pagina niet toegankelijk is totdat de modal wordt gesloten.
    ```javascript
    const modal = document.querySelector('dialog');
    modal.showModal();
    ```

2. **`close()`**: Deze functie wordt gebruikt om een geopend modal venster te sluiten. Het maakt de rest van de pagina weer toegankelijk.
    ```javascript
    const modal = document.querySelector('dialog');
    modal.close();
    ```

3. **`show()`**: Deze functie opent een modal venster, maar in tegenstelling tot `showModal()`, blokkeert het niet de interactie met de rest van de pagina.
    ```javascript
    const modal = document.querySelector('dialog');
    modal.show();
    ```

**Voorbeeld:**
```html
<dialog id="myModal">
  <p>Dit is een modal venster.</p>
  <button id="closeBtn">Sluiten</button>
</dialog>

<button id="openBtn">Open Modal</button>

<script>
    const modal = document.querySelector('#myModal');   
    const openBtn = document.querySelector('#openBtn');
    const closeBtn = document.querySelector('#closeBtn');   

    openBtn.addEventListener('click', () => modal.showModal());
    closeBtn.addEventListener('click', () => modal.close());
</script>
```


```css
dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5); /* Black w/ opacity */
}
```
**Uitleg:** De `dialog::backdrop` selector stelt de achtergrondkleur in wanneer de modal wordt geopend, met een zwarte kleur en een doorzichtigheid van 50%. Subselectors zoals `::backdrop` worden gebruikt om specifieke delen van een element te stylen, in dit geval de achtergrond van een geopend dialoogvenster. Deze subselectors kunnen helpen om meer gedetailleerde en specifieke stijlen toe te passen zonder extra HTML-elementen toe te voegen.

```css
dialog {
    border: none;
    border-radius: 0.25rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: var(--background-color);
    width: 30%; /* Could be more or less, depending on screen size */
    max-width: 500px;
    padding: 0;
}
```
**Uitleg:** De `dialog` selector stelt de stijl van de modal in, inclusief geen rand, afgeronde hoeken, schaduw, achtergrondkleur, breedte en padding.

```css
.modal-header {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
}
```

**Uitleg:** De `.modal-header` klasse stelt de stijl van de koptekst van de modal in, inclusief padding, achtergrondkleur, tekstkleur en een rand aan de onderkant.

```css
.modal-body {
    padding: 1rem;
    color: var(--secondary-color);
}
```
**Uitleg:** De `.modal-body` klasse stelt de stijl van de hoofdinhoud van de modal in, inclusief padding en tekstkleur.

```css
.modal-close {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--white);
    cursor: pointer;
}
```
**Uitleg:** De `.modal-close` klasse stelt de stijl van de sluitknop van de modal in, inclusief rechts uitlijnen, lettergrootte, vetgedrukte tekst, kleur en een cursor die verandert in een pointer.

```css
.modal-close:hover,
.modal-close:focus {
    color: var(--secondary-color);
    text-decoration: none;
    cursor: pointer;
}
```

```css
.modal-button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 0.25rem;
    color: var(--primary-color);
    cursor: pointer;
    background-color: var(--background-color);
}
```
**Uitleg:** De `.modal-button` klasse stelt de stijl van de knoppen in die worden gebruikt om modale vensters te openen of te sluiten, inclusief padding, rand, afgeronde hoeken, tekstkleur, cursor en achtergrondkleur.

```css
.modal-button:hover {
    background-color: var(--secondary-color);
    color: white;
}
```
**Uitleg:** De `.modal-button:hover` klasse verandert de achtergrondkleur en tekstkleur van de knoppen wanneer erover wordt gehoverd.


## Tabellen
De tabellen zijn gestyled om een consistente opmaak te hebben met een witte achtergrond, randen en een hover-effect.

/* Table Styling */
```css
table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
    background-color: var(--white);
}
```
**Uitleg:** De `table` selector stelt de stijl van de tabellen in, inclusief volledige breedte, samengevouwen randen, marge aan de onderkant en een witte achtergrondkleur.

```css
table tr:first-of-type th:first-of-type {
    border-top-left-radius: 0.5rem;
}

table tr:first-of-type th:last-of-type {
    border-top-right-radius: 0.5rem;
}

table tr:last-of-type td:first-of-type {
    border-bottom-left-radius: 0.5rem;
}
table tr:last-of-type td:last-of-type {
    border-bottom-right-radius: 0.5rem;
}
```
**Uitleg:** De `table tr:n-of-type td:n-of-type` of `th:n-of-type`selectors maken de hoeken van de tabel afgerond met een straal van 0.5 rem-eenheid. Dit werkt alleen correct als de tabel een table head met `th` elementen bevat, omdat alleen de bovenste hoeken van de `th` worden afgerond.

```css
table th {
    background-color: var(--primary-color);
    color: var(--white);
    font-weight: 600;
}
```
**Uitleg:** De `table th` selector stelt de stijl van de tabelkoppen in, inclusief achtergrondkleur, tekstkleur en vetgedrukte tekst.

```css
table th,
table td {
    padding: 0.75rem;
    text-align: left;
    border: 1px solid var(--border-color);
}
```
**Uitleg:** De `table th` en `table td` selectors stellen de stijl van de tabelkoppen en cellen in, inclusief padding, tekstuitlijning naar links en een rand.

```css
table tr:hover {
    background-color: var(--hover-color);
    color: var(--white);
}
```
**Uitleg:** De `table tr:hover` selector verandert de achtergrondkleur en tekstkleur van de tabelrijen wanneer erover wordt gehoverd.

```css
table .icon {
    margin-right: 0.5rem;
    fill: var(--primary-color);
}
```
**Uitleg:** De `table .icon` klasse stelt de stijl van de iconen in de tabel in, inclusief marge aan de rechterkant en kleur.

```css
table .icon:hover {
    fill: var(--white);
}
```
**Uitleg:** De `table .icon:hover` selector verandert de kleur van de iconen wanneer erover wordt gehoverd.

## Kaarten
De kaarten zijn gestyled om een flexibele layout te hebben met een schaduw en een hover-effect.

```css
.card-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
}
```
**Uitleg:** De `.card-wrapper` klasse maakt gebruik van flexbox om de kaarten in een rij te plaatsen, met ruimte ertussen en gecentreerd.

```css
.card {
    display: flex;
    flex-direction: column;
    flex-basis: 28%;
    max-width: 40%;
    height: 20rem;
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    transition: box-shadow 0.3s ease;
}
```
**Uitleg:** De `.card` klasse stelt de stijl van de kaarten in, inclusief flexbox layout, breedte, hoogte, achtergrondkleur, rand, afgeronde hoeken, schaduw, padding, marge aan de onderkant en een overgangseffect voor de schaduw.

```css
.card:hover {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);

}
```
**Uitleg:** De `.card:hover` klasse verandert de schaduw van de kaarten wanneer erover wordt gehoverd, waardoor ze meer opvallen met een grotere schaduw.

```css
.card-header {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
}
```
**Uitleg:** De `.card-header` klasse stelt de stijl van de koptekst van de kaart in, inclusief lettergrootte, vetgedrukte tekst, kleur en marge aan de onderkant.

```css
.card-body {
    font-size: 1rem;
    color: var(--secondary-color);
}
```
**Uitleg:** De `.card-body` klasse stelt de stijl van de hoofdinhoud van de kaart in, inclusief lettergrootte en kleur.

```css
.card-footer {
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
}
```
**Uitleg:** De `.card-footer` klasse stelt de stijl van de voettekst van de kaart in, inclusief marge aan de bovenkant, flexbox layout en uitlijning naar rechts.

```css
.card-footer .btn {
    margin-left: 0.5rem;
}
```
**Uitleg:** De `.card-footer .btn` klasse voegt een marge aan de linkerkant toe aan knoppen in de voettekst van de kaart.

## Formulieren
De formulieren zijn gestyled om een consistente opmaak te hebben met een witte achtergrond, randen en een schaduw.

```css
form {
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
    margin: auto;
    margin-bottom: 1.5rem;
    max-width: 60%;
}
```
**Uitleg:** De `form` selector stelt de stijl van de formulieren in, inclusief achtergrondkleur, rand, afgeronde hoeken, padding, schaduw, marge en maximale breedte.

```css
form .form-group {
    margin-bottom: 1rem;
}
```
**Uitleg:** De `.form-group` klasse voegt een marge aan de onderkant toe aan elke formulierelementgroep.

```css
form label {
    display: block;
    font-weight: 600;
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
}
```
**Uitleg:** De `form label` selector stelt de stijl van de labels in, inclusief blokweergave, vetgedrukte tekst, tekstkleur en marge aan de onderkant.

```css
form input[type="text"].invalid,
form input[type="email"].invalid,
form input[type="password"].invalid,
form input[type="number"].invalid,
form select.invalid,
form textarea.invalid {
    border: 1px solid var(--accent-color);
}
```
**Uitleg:** De `form input.invalid`, `form select.invalid` en `form textarea.invalid` selectors stellen de stijl van de invoervelden, selectievakjes en tekstgebieden in wanneer ze een ongeldige invoer bevatten, inclusief een randkleur die is gedefinieerd door de `--accent-color` variabele.

```css
form input[type="text"],
form input[type="email"],
form input[type="password"],
form input[type="number"],
form select,
form textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 0.25rem;
    font-size: 1rem;
    color: var(--secondary-color);
    background-color: var(--background-color);
}
```
**Uitleg:** De `form input`, `form select` en `form textarea` selectors stellen de stijl van de invoervelden, selectievakjes en tekstgebieden in, inclusief breedte, padding, rand, afgeronde hoeken, lettergrootte, tekstkleur en achtergrondkleur.

```css
form input[type="text"]:focus,
form input[type="email"]:focus,
form input[type="password"]:focus,
form input[type="number"]:focus,
form select:focus,
form textarea:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 5px rgba(0, 87, 146, 0.5);
}
```
**Uitleg:** De `form input:focus`, `form select:focus` en `form textarea:focus` selectors stellen de stijl van de invoervelden, selectievakjes en tekstgebieden in wanneer ze gefocust zijn, inclusief randkleur, geen omlijning en een schaduw.

```css
form button[type="submit"] {
    background-color: var(--primary-color);
    color: var(--white);
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: background-color 0.3s ease;
}
```
**Uitleg:** De `form button[type="submit"]` selector stelt de stijl van de verzendknoppen in, inclusief achtergrondkleur, tekstkleur, padding, geen rand, afgeronde hoeken, cursor, lettergrootte, vetgedrukte tekst en een overgangseffect voor de achtergrondkleur.

```css
form button[type="submit"]:hover {
    background-color: var(--hover-color);
}
```
**Uitleg:** De `form button[type="submit"]:hover` selector verandert de achtergrondkleur van de verzendknoppen wanneer erover wordt gehoverd.

```css
form .form-text {
    font-size: 0.875rem;
    color: var(--gray);
    margin-top: 0.5rem;
}
```
**Uitleg:** De `.form-text` klasse stelt de stijl van de aanvullende tekst in formulieren in, inclusief lettergrootte, kleur en marge aan de bovenkant.

```css
form .form-error {
    color: var(--accent-color);
    font-size: 0.875rem;
    margin-top: 0.5rem;
}
```
**Uitleg:** De `.form-error` klasse stelt de stijl van de foutmeldingen in formulieren in, inclusief tekstkleur, lettergrootte en marge aan de bovenkant.

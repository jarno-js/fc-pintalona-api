# ⚽ FC Pintalona API

REST API voor het beheren van het FC Pintalona zaalvoetbalteam. Dit is een schoolproject dat een volledig functioneel team management systeem biedt met spelers, wedstrijden, statistieken en blessurebeheer.

## 📋 Inhoudsopgave

- [Features](#features)
- [Technologie Stack](#technologie-stack)
- [Installatie](#installatie)
- [Database Setup](#database-setup)
- [Gebruik](#gebruik)
- [API Endpoints](#api-endpoints)
- [Validatie](#validatie)
- [Project Structuur](#project-structuur)
- [Bronvermelding](#bronvermelding)

## ✨ Features

### Verplichte Features (Basis Requirements)
- ✅ **Twee CRUD interfaces**: Players en Matches
- ✅ **Basisvalidatie**: Velden niet leeg, numerieke validatie, naam validatie
- ✅ **Paginatie**: Limit & offset parameters op player en match endpoints
- ✅ **Zoekfunctie**: Zoeken op naam (players), tegenstander en datum (matches)

### Extra Features (Voor Hogere Score)
- ✅ **Geavanceerde validatie**:
  - Unieke rugnummers per speler
  - Datum validatie (expected_return_date > injury_date)
  - Minuten validatie (0-60 voor zaalvoetbal)
  - ENUM validatie voor posities en statussen
- ✅ **Zoeken op meerdere velden**: Combinatie van naam + positie, opponent + datum + status
- ✅ **Sorteren**: Sorteer op verschillende velden (naam, datum, goals, etc.)
- ✅ **Match statistieken per speler**: Goals, assists, kaarten, man of the match
- ✅ **Injuries tracking**: Volledig blessurebeheer systeem
- ✅ **Team statistieken endpoints**: Topscorers, assists, kaarten, algemene teamstats

## 🛠 Technologie Stack

- **Runtime**: Node.js (versie 20+)
- **Framework**: Express.js 4.18.2
- **Database**: MySQL met mysql2 driver
- **Environment Variables**: dotenv
- **Code Style**: Prettier

## 📦 Installatie

### Vereisten

- Node.js versie 20 of hoger
- MySQL Server (versie 8.0 of hoger aanbevolen)
- Git

### Stap 1: Clone de Repository

```bash
git clone https://github.com/jarno-js/fc-pintalona-api.git
cd node.js-project
```

### Stap 2: Installeer Dependencies

```bash
npm install
```

### Stap 3: Environment Variables

Maak een `.env` bestand aan in de root directory (kopieer `.env.example`):

```bash
cp .env.example .env
```

Pas de waarden aan in `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=jouw_wachtwoord
DB_NAME=fc_pintalona
DB_PORT=3306
```

## 🗄 Database Setup

### Optie 1: Handmatig via MySQL CLI

```bash
# Log in op MySQL
mysql -u root -p

# Voer de schema SQL uit
source database/schema.sql

# Voer de seed data SQL uit (optioneel, voor voorbeelddata)
source database/seed.sql
```

### Optie 2: Via MySQL Workbench

1. Open MySQL Workbench
2. Maak een nieuwe connectie of gebruik een bestaande
3. Open `database/schema.sql` en voer uit
4. Open `database/seed.sql` en voer uit (optioneel)

### Database Schema Overzicht

De database bevat 4 hoofdtabellen:

- **players**: Spelersinformatie (naam, rugnummer, positie, geboortedatum)
- **matches**: Wedstrijden (datum, tegenstander, score, status)
- **match_stats**: Spelerstatistieken per wedstrijd (goals, assists, kaarten)
- **injuries**: Blessureregistratie (type, datums, status)

## 🚀 Gebruik

### Development Server Starten

```bash
npm run dev
```

De server start op `http://localhost:3000` (of de PORT die je in `.env` hebt ingesteld).

### Production Server

```bash
npm start
```

### Server Testen

Bezoek `http://localhost:3000` in je browser om de API documentatie te zien.

Health check endpoint:
```bash
curl http://localhost:3000/api/health
```

## 📚 API Endpoints

Volledige documentatie is beschikbaar op `http://localhost:3000` wanneer de server draait.

### Players Endpoints

| Method | Endpoint | Beschrijving |
|--------|----------|--------------|
| GET | `/api/players` | Alle spelers (met paginatie, filters, sortering) |
| GET | `/api/players/search` | Zoek spelers op naam/positie |
| GET | `/api/players/:id` | Een specifieke speler |
| GET | `/api/players/:id/stats` | Statistieken van een speler |
| GET | `/api/players/:id/injuries` | Blessures van een speler |
| POST | `/api/players` | Nieuwe speler aanmaken |
| PUT | `/api/players/:id` | Speler updaten |
| DELETE | `/api/players/:id` | Speler verwijderen |

### Matches Endpoints

| Method | Endpoint | Beschrijving |
|--------|----------|--------------|
| GET | `/api/matches` | Alle wedstrijden (met paginatie, filters) |
| GET | `/api/matches/search` | Zoek wedstrijden |
| GET | `/api/matches/upcoming` | Aankomende wedstrijden |
| GET | `/api/matches/completed` | Afgeronde wedstrijden |
| GET | `/api/matches/:id` | Een specifieke wedstrijd |
| GET | `/api/matches/:id/stats` | Statistieken van een wedstrijd |
| POST | `/api/matches` | Nieuwe wedstrijd aanmaken |
| POST | `/api/matches/:id/stats` | Stats toevoegen voor speler |
| PUT | `/api/matches/:id` | Wedstrijd updaten |
| DELETE | `/api/matches/:id` | Wedstrijd verwijderen |

### Statistics Endpoints

| Method | Endpoint | Beschrijving |
|--------|----------|--------------|
| GET | `/api/stats/topscorers` | Top 10 doelpuntenmakers |
| GET | `/api/stats/assists` | Top 10 assist-gevers |
| GET | `/api/stats/cards` | Spelers met meeste kaarten |
| GET | `/api/stats/team` | Uitgebreide team statistieken |
| PUT | `/api/stats/:id` | Match stats updaten |
| DELETE | `/api/stats/:id` | Match stats verwijderen |

### Injuries Endpoints

| Method | Endpoint | Beschrijving |
|--------|----------|--------------|
| GET | `/api/injuries` | Alle blessures |
| GET | `/api/injuries/active` | Alleen actieve blessures |
| POST | `/api/injuries` | Nieuwe blessure registreren |
| PUT | `/api/injuries/:id` | Blessure updaten |
| DELETE | `/api/injuries/:id` | Blessure verwijderen |

### Query Parameters Voorbeelden

**Paginatie:**
```
GET /api/players?limit=10&offset=0
```

**Sorteren:**
```
GET /api/players?sortBy=name&order=ASC
GET /api/matches?sortBy=match_date&order=DESC
```

**Filteren:**
```
GET /api/players?position=Aanvaller&active=true
GET /api/matches?status=completed
```

**Zoeken:**
```
GET /api/players/search?name=Jan&position=Keeper
GET /api/matches/search?opponent=FC United&date=2024-01-15
```

## ✅ Validatie

De API implementeert uitgebreide validatie:

### Player Validatie
- Naam: Verplicht, alleen letters en spaties
- Rugnummer: 1-99, uniek per speler
- Positie: Keeper, Verdediger, Middenvelder, Aanvaller
- Geboortedatum: Geldige datum

### Match Validatie
- Wedstrijddatum: Verplicht, geldige datum
- Tegenstander: Verplicht
- Scores: >= 0
- Status: scheduled, completed, cancelled
- Home/Away: home, away

### Match Stats Validatie
- Goals/Assists/Kaarten: >= 0
- Gespeelde minuten: 0-60 (zaalvoetbal)
- Speler en wedstrijd moeten bestaan
- Unieke combinatie per speler per wedstrijd

### Injury Validatie
- Blessure type: Verplicht
- Blessure datum: Verplicht, geldige datum
- Expected return date: Moet na blessure datum zijn
- Status: active, recovering, recovered

## 📁 Project Structuur

```
node.js-project/
├── config/
│   └── database.js          # Database connectie configuratie
├── controllers/
│   ├── playersController.js # Players business logic
│   ├── matchesController.js # Matches business logic
│   ├── matchStatsController.js
│   ├── injuriesController.js
│   └── statisticsController.js
├── database/
│   ├── schema.sql           # Database schema (CREATE TABLES)
│   └── seed.sql             # Voorbeelddata
├── middleware/
│   └── validation.js        # Validatie middleware
├── routes/
│   ├── players.js           # Player routes
│   ├── matches.js           # Match routes
│   ├── stats.js             # Statistics routes
│   └── injuries.js          # Injury routes
├── public/
│   ├── index.html           # API documentatie pagina
│   └── style.css            # (indien gebruikt)
├── .env                     # Environment variabelen (niet in git)
├── .env.example             # Template voor .env
├── .gitignore               # Git ignore bestand
├── package.json             # NPM dependencies en scripts
├── server.js                # Main entry point
└── README.md                # Deze file
```

## 🎯 Gebruiksvoorbeelden

### Speler Aanmaken

```bash
curl -X POST http://localhost:3000/api/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jan Janssen",
    "jersey_number": 10,
    "position": "Aanvaller",
    "birth_date": "1998-05-15",
    "active": true
  }'
```

### Wedstrijd Aanmaken

```bash
curl -X POST http://localhost:3000/api/matches \
  -H "Content-Type: application/json" \
  -d '{
    "match_date": "2024-03-20",
    "match_time": "20:00",
    "opponent": "FC United",
    "location": "Schepdaal",
    "home_away": "home",
    "status": "scheduled"
  }'
```

### Match Statistieken Toevoegen

```bash
curl -X POST http://localhost:3000/api/matches/1/stats \
  -H "Content-Type: application/json" \
  -d '{
    "player_id": 1,
    "goals": 2,
    "assists": 1,
    "yellow_cards": 0,
    "red_cards": 0,
    "minutes_played": 60,
    "man_of_the_match": true
  }'
```

## 📖 Bronvermelding

### Documentatie & Tutorials
- [Express.js Official Documentation](https://expressjs.com/) - Web framework
- [MySQL Documentation](https://dev.mysql.com/doc/) - Database
- [Node.js Documentation](https://nodejs.org/docs/latest/api/) - Runtime environment
- [mysql2 npm package](https://www.npmjs.com/package/mysql2) - MySQL client voor Node.js
- [dotenv Documentation](https://www.npmjs.com/package/dotenv) - Environment variables

### Referenties
- [REST API Best Practices](https://restfulapi.net/) - API design patterns
- [MDN Web Docs - HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) - HTTP methods en status codes
- [SQL Tutorial - W3Schools](https://www.w3schools.com/sql/) - SQL query referentie

### Tools
- [Postman](https://www.postman.com/) - API testing (gebruikt tijdens development)
- [MySQL Workbench](https://www.mysql.com/products/workbench/) - Database management
- [VS Code](https://code.visualstudio.com/) - Code editor

## 👨‍💻 Auteur

Schoolproject voor [Naam School/Cursus]

## 📝 Licentie

ISC

---

**FC Pintalona** - Zaalvoetbal Team Management API

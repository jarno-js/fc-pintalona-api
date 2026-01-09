# Database Seeding

## Spelers Seeder

Deze seeder voegt alle FC Pintalona spelers toe aan de database voor het seizoen 2025-2026.

### Spelers die worden toegevoegd:

**13 spelers in totaal:**
- 2 Keepers (Thomas Vankeirsbilck #13, Elias Heijndrickx #24)
- 4 Verdedigers (Jorik Van den Eeden #5, Brende Baeck #7, Drizzt Charot #15, David Kowalewski #21)
- 4 Middenvelders (Jarno Janssens #6, Lars Faignaert #11, Ilias Mesror #17, Kiandro Lademacher #69)
- 3 Aanvallers (Mathias De Buyst #9, Senne Stiens #10, Brent Van Nyverseel #99)

**Geboortedatums zijn voorlopig:**
- De seeder gebruikt dummy geboortedatums (1999-2001)
- Je kunt deze later aanpassen via de API of direct in de database

### Gebruik:

```bash
npm run seed:players
```

**Note:** De seeder skipt automatisch spelers die al bestaan (op basis van rugnummer).

---

## Wedstrijden Seeder

Deze seeder voegt alle FC Pintalona wedstrijden toe aan de database voor het seizoen 2025-2026.

### Wedstrijden die worden toegevoegd:

#### SuperLeague (7 wedstrijden)
- Speeldag 12-18 (januari - maart 2026)
- Mix van thuis en uit wedstrijden
- Tegen: Bizon Boys, De Diltons, Tik & Binnen, Black Wolves, JK Oosthoek Futures, MVC Kasteeltje, Freedomfighters

#### Copa Dilbeccha - Groep B (2 wedstrijden)
- Speeldag 4: FC Pintalona vs Freedomfighters (thuis)
- Speeldag 5: Azzuri vs FC Pintalona (uit)

### Gebruik:

1. Zorg ervoor dat je database is aangemaakt en de schema is geïmporteerd:
   ```bash
   mysql -u root -p < database/schema.sql
   ```

2. Zorg dat je `.env` bestand correct is ingesteld:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=jouw_wachtwoord
   DB_NAME=FcPintalona
   DB_PORT=3306
   ```

3. Voer de seeder uit:
   ```bash
   npm run seed:matches
   ```

### Notities:
- Alle wedstrijden hebben status 'scheduled' (nog te spelen)
- Scores zijn NULL omdat wedstrijden nog niet gespeeld zijn
- Wedstrijdinformatie komt van www.dilbeek-minivoetbal.be
- Je kunt deze wedstrijden later updaten met scores via de API

---

## Alles in één keer seeden

Om zowel spelers als wedstrijden in één keer toe te voegen:

```bash
npm run seed:all
```

Dit voert eerst de spelers seeder uit, daarna de wedstrijden seeder.

---

## Database Reset

### Alleen data verwijderen
Om alle oude data te verwijderen (maar tabellen behouden):

```bash
npm run db:reset
```

### Reset + Fresh Seed
Om de database helemaal leeg te maken en opnieuw te vullen met verse data:

```bash
npm run db:fresh
```

Dit commando:
1. Verwijdert alle oude spelers, wedstrijden, statistieken en blessures
2. Reset de auto-increment tellers
3. Voegt alle FC Pintalona spelers toe
4. Voegt alle competitie wedstrijden toe

**⚠️ Waarschuwing:** Dit verwijdert ALLE data permanent! Gebruik dit alleen als je een schone database wilt.

-- Seed data voor FC Pintalona database
USE FcPintalona;

-- Clear existing data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE match_stats;
TRUNCATE TABLE injuries;
TRUNCATE TABLE matches;
TRUNCATE TABLE players;
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- SPELERS - FC Pintalona Ploeg
-- ============================================
INSERT INTO players (name, jersey_number, position, birth_date, active) VALUES
('Jarno Janssens', 6, 'Middenvelder', '2000-03-15', true),
('Jorik Van den Eeden', 5, 'Verdediger', '1999-07-22', true),
('Senne Stiens', 10, 'Aanvaller', '2001-01-10', true),
('Brent Van Nyverseel', 99, 'Aanvaller', '2000-11-05', true),
('Mathias De Buyst', 9, 'Aanvaller', '2000-05-18', true),
('Lars Faignaert', 11, 'Middenvelder', '1999-09-30', true),
('Drizzt Charot', 15, 'Verdediger', '2001-04-12', true),
('Ilias Mesror', 17, 'Middenvelder', '2000-08-25', true),
('Kiandro Lademacher', 69, 'Middenvelder', '2001-02-14', true),
('David Kowalewski', 21, 'Verdediger', '1999-12-03', true),
('Thomas Vankeirsbilck', 13, 'Keeper', '2000-06-20', true),
('Brende Baeck', 7, 'Verdediger', '2001-03-08', true),
('Elias Heijndrickx', 24, 'Keeper', '2000-10-17', true);

-- ============================================
-- WEDSTRIJDEN - SuperLeague (Gespeeld)
-- ============================================
INSERT INTO matches (match_date, match_time, opponent, location, home_away, pintalona_score, opponent_score, status, competition, notes) VALUES
('2025-09-01', '21:00:00', 'FC Baldikwaanst', 'Dilbeek', 'away', 6, 14, 'completed', 'SuperLeague', 'SuperLeague - Speeldag 1'),
('2025-09-09', '21:00:00', 'Azzuri', 'Schepdaal', 'home', 4, 5, 'completed', 'SuperLeague', 'SuperLeague - Speeldag 2'),
('2025-09-16', '22:00:00', 'Bizon Boys', 'Dilbeek', 'away', 3, 4, 'completed', 'SuperLeague', 'SuperLeague - Speeldag 3'),
('2025-09-29', '20:00:00', 'De Diltons', 'Dilbeek', 'away', 1, 2, 'completed', 'SuperLeague', 'SuperLeague - Speeldag 4'),
('2025-10-13', '21:00:00', 'Tik & Binnen', 'Dilbeek', 'away', 4, 9, 'completed', 'SuperLeague', 'SuperLeague - Speeldag 5'),
('2025-10-20', '22:00:00', 'Black Wolves', 'Schepdaal', 'home', 5, 5, 'completed', 'SuperLeague', 'SuperLeague - Speeldag 6'),
('2025-11-25', '20:00:00', 'Freedomfighters', 'Schepdaal', 'home', 5, 3, 'completed', 'SuperLeague', 'SuperLeague - Speeldag 7'),
('2025-12-09', '21:00:00', 'FC Baldikwaanst', 'Schepdaal', 'home', 5, 0, 'completed', 'SuperLeague', 'Forfait overwinning'),
('2025-12-16', '22:00:00', 'Azzuri', 'Dilbeek', 'away', 12, 6, 'completed', 'SuperLeague', 'SuperLeague - Speeldag 9');

-- ============================================
-- WEDSTRIJDEN - SuperLeague (Aankomend)
-- ============================================
INSERT INTO matches (match_date, match_time, opponent, location, home_away, status, competition, notes) VALUES
('2026-01-06', '22:00:00', 'Bizon Boys', 'Schepdaal', 'home', 'scheduled', 'SuperLeague', 'SuperLeague - Speeldag 12'),
('2026-01-20', '21:00:00', 'De Diltons', 'Schepdaal', 'home', 'scheduled', 'SuperLeague', 'SuperLeague - Speeldag 13'),
('2026-01-27', '20:00:00', 'Tik & Binnen', 'Schepdaal', 'home', 'scheduled', 'SuperLeague', 'SuperLeague - Speeldag 14'),
('2026-02-10', '22:00:00', 'Black Wolves', 'Dilbeek', 'away', 'scheduled', 'SuperLeague', 'SuperLeague - Speeldag 15'),
('2026-03-03', '22:00:00', 'JK Oosthoek Futures', 'Dilbeek', 'away', 'scheduled', 'SuperLeague', 'SuperLeague - Speeldag 16'),
('2026-03-10', '20:00:00', 'MVC Kasteeltje', 'Schepdaal', 'home', 'scheduled', 'SuperLeague', 'SuperLeague - Speeldag 17'),
('2026-03-16', '21:00:00', 'Freedomfighters', 'Dilbeek', 'away', 'scheduled', 'SuperLeague', 'SuperLeague - Speeldag 18');

-- ============================================
-- WEDSTRIJDEN - Copa (Gespeeld)
-- ============================================
INSERT INTO matches (match_date, match_time, opponent, location, home_away, pintalona_score, opponent_score, status, competition, notes) VALUES
('2025-09-23', '20:00:00', 'Tik & Binnen', 'Dilbeek', 'away', 2, 9, 'completed', 'Copa', 'Copa - Speeldag 1'),
('2025-12-01', '21:00:00', 'MVC Kasteeltje', 'Schepdaal', 'home', 2, 9, 'completed', 'Copa', 'Copa - Speeldag 3');

-- ============================================
-- WEDSTRIJDEN - Copa (Aankomend)
-- ============================================
INSERT INTO matches (match_date, match_time, opponent, location, home_away, status, competition, notes) VALUES
('2026-01-12', '21:00:00', 'Freedomfighters', 'Schepdaal', 'home', 'scheduled', 'Copa', 'Copa - Speeldag 4'),
('2026-02-24', '21:00:00', 'Azzuri', 'Dilbeek', 'away', 'scheduled', 'Copa', 'Copa - Speeldag 5');

-- ============================================
-- VERIFICATIE
-- ============================================
SELECT '=====================================' AS '';
SELECT 'DATABASE SEEDING VOLTOOID' AS '';
SELECT '=====================================' AS '';
SELECT '' AS '';
SELECT CONCAT('Spelers toegevoegd: ', COUNT(*)) AS 'SPELERS' FROM players;
SELECT CONCAT('Wedstrijden toegevoegd: ', COUNT(*)) AS 'WEDSTRIJDEN' FROM matches;
SELECT CONCAT('  • Afgerond: ', COUNT(*)) AS '' FROM matches WHERE status = 'completed';
SELECT CONCAT('  • Ingepland: ', COUNT(*)) AS '' FROM matches WHERE status = 'scheduled';
SELECT '' AS '';
SELECT '=====================================' AS '';

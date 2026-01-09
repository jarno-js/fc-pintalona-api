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
-- MATCH STATISTIEKEN - Gespeelde wedstrijden
-- ============================================

-- Match 1: FC Baldikwaanst (6-14 verlies) - Speeldag 1
INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match) VALUES
(1, 1, 3, 1, 0, 0, 60, true),   -- Jarno Janssens (topscorer deze match)
(11, 1, 0, 0, 0, 0, 60, false),  -- Thomas Vankeirsbilck (keeper)
(3, 1, 2, 1, 0, 0, 60, false),   -- Senne Stiens
(4, 1, 1, 0, 0, 0, 60, false),   -- Brent Van Nyverseel
(6, 1, 0, 2, 1, 0, 60, false),   -- Lars Faignaert
(9, 1, 0, 1, 0, 0, 60, false),   -- Kiandro Lademacher
(2, 1, 0, 0, 1, 0, 60, false);   -- Jorik Van den Eeden

-- Match 2: Azzuri (4-5 verlies) - Speeldag 2
INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match) VALUES
(1, 2, 2, 1, 0, 0, 60, true),    -- Jarno Janssens (2 goals)
(13, 2, 0, 0, 0, 0, 60, false),  -- Elias Heijndrickx (keeper)
(3, 2, 1, 1, 0, 0, 60, false),   -- Senne Stiens
(5, 2, 1, 0, 0, 0, 60, false),   -- Mathias De Buyst
(8, 2, 0, 2, 0, 0, 60, false),   -- Ilias Mesror (nog niet geblesseerd)
(7, 2, 0, 0, 0, 0, 60, false),   -- Drizzt Charot
(12, 2, 0, 0, 1, 0, 60, false);  -- Brende Baeck

-- Match 3: Bizon Boys (3-4 verlies) - Speeldag 3
INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match) VALUES
(1, 3, 1, 1, 0, 0, 60, false),   -- Jarno Janssens
(11, 3, 0, 0, 0, 0, 60, false),  -- Thomas Vankeirsbilck
(4, 3, 1, 0, 0, 0, 60, false),   -- Brent Van Nyverseel
(5, 3, 1, 1, 0, 0, 60, true),    -- Mathias De Buyst (MOTM)
(6, 3, 0, 1, 0, 0, 60, false),   -- Lars Faignaert
(10, 3, 0, 0, 0, 0, 60, false),  -- David Kowalewski
(2, 3, 0, 0, 1, 0, 60, false);   -- Jorik Van den Eeden

-- Match 4: De Diltons (1-2 verlies) - Speeldag 4
INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match) VALUES
(1, 4, 1, 0, 0, 0, 60, true),    -- Jarno Janssens (enige goal)
(13, 4, 0, 0, 0, 0, 60, false),  -- Elias Heijndrickx
(3, 4, 0, 0, 1, 0, 60, false),   -- Senne Stiens
(9, 4, 0, 0, 0, 0, 60, false),   -- Kiandro Lademacher
(7, 4, 0, 0, 0, 0, 60, false),   -- Drizzt Charot
(12, 4, 0, 1, 0, 0, 60, false),  -- Brende Baeck
(2, 4, 0, 0, 2, 0, 60, false);   -- Jorik Van den Eeden

-- Match 5: Tik & Binnen (4-9 verlies) - Speeldag 5
INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match) VALUES
(1, 5, 2, 1, 0, 0, 60, true),    -- Jarno Janssens (2 goals weer)
(11, 5, 0, 0, 1, 0, 60, false),  -- Thomas Vankeirsbilck
(3, 5, 1, 0, 0, 0, 60, false),   -- Senne Stiens
(4, 5, 1, 1, 0, 0, 60, false),   -- Brent Van Nyverseel
(5, 5, 0, 1, 0, 0, 60, false),   -- Mathias De Buyst
(6, 5, 0, 1, 1, 0, 60, false),   -- Lars Faignaert
(10, 5, 0, 0, 0, 0, 60, false);  -- David Kowalewski

-- Match 6: Black Wolves (5-5 gelijkspel) - Speeldag 6
INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match) VALUES
(1, 6, 3, 0, 0, 0, 60, true),    -- Jarno Janssens (hattrick!)
(13, 6, 0, 0, 0, 0, 60, false),  -- Elias Heijndrickx
(3, 6, 1, 2, 0, 0, 60, false),   -- Senne Stiens
(5, 6, 1, 1, 0, 0, 60, false),   -- Mathias De Buyst
(8, 6, 0, 1, 0, 0, 60, false),   -- Ilias Mesror (laatste match voor blessure)
(9, 6, 0, 1, 0, 0, 60, false),   -- Kiandro Lademacher
(7, 6, 0, 0, 0, 0, 60, false);   -- Drizzt Charot

-- Match 7: Freedomfighters (5-3 winst!) - Speeldag 7
INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match) VALUES
(1, 7, 2, 2, 0, 0, 60, true),    -- Jarno Janssens (2 goals + 2 assists)
(11, 7, 0, 0, 0, 0, 60, false),  -- Thomas Vankeirsbilck
(3, 7, 2, 1, 0, 0, 60, false),   -- Senne Stiens
(4, 7, 1, 0, 0, 0, 60, false),   -- Brent Van Nyverseel
(6, 7, 0, 2, 0, 0, 60, false),   -- Lars Faignaert
(12, 7, 0, 0, 0, 0, 60, false),  -- Brende Baeck
(9, 7, 0, 0, 1, 0, 60, false);   -- Kiandro Lademacher

-- Match 8: FC Baldikwaanst (5-0 winst - forfait) - Speeldag 8
INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match) VALUES
(1, 8, 0, 0, 0, 0, 0, false),    -- Jarno Janssens (forfait - geen stats)
(11, 8, 0, 0, 0, 0, 0, false);   -- Thomas Vankeirsbilck

-- Match 9: Azzuri (12-6 winst!) - Speeldag 9
INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match) VALUES
(1, 9, 5, 2, 0, 0, 60, true),    -- Jarno Janssens (5 GOALS! Topscorer match)
(13, 9, 0, 0, 0, 0, 60, false),  -- Elias Heijndrickx
(3, 9, 3, 3, 0, 0, 60, false),   -- Senne Stiens (hattrick)
(4, 9, 2, 2, 0, 0, 60, false),   -- Brent Van Nyverseel
(5, 9, 1, 1, 0, 0, 60, false),   -- Mathias De Buyst
(6, 9, 1, 3, 0, 0, 60, false),   -- Lars Faignaert
(9, 9, 0, 1, 0, 0, 60, false);   -- Kiandro Lademacher

-- Match 10: Copa - Tik & Binnen (2-9 verlies)
INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match) VALUES
(1, 10, 1, 0, 0, 0, 60, false),  -- Jarno Janssens
(11, 10, 0, 0, 0, 0, 60, false), -- Thomas Vankeirsbilck
(3, 10, 1, 1, 0, 0, 60, true),   -- Senne Stiens
(5, 10, 0, 0, 0, 0, 60, false),  -- Mathias De Buyst
(7, 10, 0, 0, 1, 0, 60, false),  -- Drizzt Charot
(10, 10, 0, 1, 0, 0, 60, false), -- David Kowalewski
(12, 10, 0, 0, 0, 0, 60, false); -- Brende Baeck

-- Match 11: Copa - MVC Kasteeltje (2-9 verlies)
INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match) VALUES
(1, 11, 1, 1, 0, 0, 60, true),   -- Jarno Janssens
(13, 11, 0, 0, 1, 0, 60, false), -- Elias Heijndrickx
(3, 11, 1, 0, 0, 0, 60, false),  -- Senne Stiens
(4, 11, 0, 1, 1, 0, 60, false),  -- Brent Van Nyverseel
(6, 11, 0, 0, 0, 0, 60, false),  -- Lars Faignaert
(9, 11, 0, 0, 0, 0, 60, false),  -- Kiandro Lademacher
(2, 11, 0, 0, 0, 0, 60, false);  -- Jorik Van den Eeden

-- ============================================
-- BLESSURES
-- ============================================
INSERT INTO injuries (player_id, injury_type, description, injury_date, expected_return_date, status) VALUES
(8, 'Enkelblessure', 'Verzwikte enkel tijdens wedstrijd tegen Black Wolves', '2025-10-21', '2026-02-01', 'active');
-- Ilias Mesror geblesseerd na match 6 (20 okt 2025), verwacht terug begin februari

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
SELECT CONCAT('Match statistieken: ', COUNT(*)) AS 'STATS' FROM match_stats;
SELECT CONCAT('Blessures: ', COUNT(*), ' (actief)') AS 'INJURIES' FROM injuries WHERE status = 'active';
SELECT '' AS '';
SELECT '=====================================' AS '';
SELECT '' AS '';
SELECT 'TOPSCORER: Jarno Janssens' AS '';
SELECT CONCAT('Totaal goals: ', SUM(goals)) AS '' FROM match_stats WHERE player_id = 1;
SELECT '' AS '';
SELECT '=====================================' AS '';

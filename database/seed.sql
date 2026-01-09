-- Seed data voor FC Pintalona database
USE FcPintalona;

-- Voorbeeldspelers toevoegen
INSERT INTO players (name, jersey_number, position, birth_date, active) VALUES
('Jarno De Smet', 10, 'Aanvaller', '1998-03-15', true),
('Kevin Martens', 1, 'Keeper', '1997-07-22', true),
('Stijn Willems', 5, 'Verdediger', '1999-01-10', true),
('Thomas Van Der Linden', 8, 'Middenvelder', '1998-11-05', true),
('Maxim Peeters', 11, 'Aanvaller', '1999-04-18', true),
('Lucas Janssen', 3, 'Verdediger', '1997-09-30', true),
('Nick Vermeulen', 7, 'Middenvelder', '1998-06-12', true),
('Ruben Claes', 9, 'Aanvaller', '1999-02-25', true),
('Sander Goossens', 4, 'Verdediger', '1998-08-14', true),
('Bram Hendrickx', 6, 'Middenvelder', '1997-12-03', true),
('Matthias Dekker', 2, 'Verdediger', '1999-05-20', false),
('Tim Maes', 12, 'Keeper', '1998-10-08', true);

-- Wedstrijden toevoegen
INSERT INTO matches (match_date, match_time, opponent, location, home_away, pintalona_score, opponent_score, status, notes) VALUES
('2024-01-15', '20:00:00', 'FC United Schepdaal', 'Schepdaal', 'home', 8, 3, 'completed', 'Uitstekende wedstrijd, dominante overwinning'),
('2024-01-22', '19:30:00', 'Dilbeek Devils', 'Dilbeek', 'away', 4, 4, 'completed', 'Spannende gelijkspel in de laatste minuut'),
('2024-01-29', '20:30:00', 'Asse Athletes', 'Schepdaal', 'home', 6, 2, 'completed', 'Goede teamprestatie'),
('2024-02-05', '21:00:00', 'Ternat Tigers', 'Ternat', 'away', 3, 5, 'completed', 'Moeilijke avond, te veel fouten'),
('2024-02-12', '20:00:00', 'Groot-Bijgaarden Giants', 'Schepdaal', 'home', 7, 4, 'completed', 'Comeback in tweede helft'),
('2024-02-19', '19:00:00', 'Wemmel Warriors', 'Wemmel', 'away', 5, 5, 'completed', 'Evenwichtige wedstrijd'),
('2024-02-26', '20:30:00', 'Strombeek Strikers', 'Schepdaal', 'home', NULL, NULL, 'scheduled', NULL),
('2024-03-04', '21:00:00', 'Meise Masters', 'Meise', 'away', NULL, NULL, 'scheduled', NULL),
('2024-03-11', '20:00:00', 'Wolvertem Wolves', 'Schepdaal', 'home', NULL, NULL, 'scheduled', NULL),
('2024-03-18', '19:30:00', 'Londerzeel Lions', 'Londerzeel', 'away', NULL, NULL, 'scheduled', NULL);

-- Match statistieken voor afgeronde wedstrijden
-- Match 1: FC United Schepdaal (8-3 winst)
INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match) VALUES
(1, 1, 3, 2, 0, 0, 60, true),   -- Jarno De Smet (MOTM)
(2, 1, 0, 0, 0, 0, 60, false),  -- Kevin Martens (keeper)
(3, 1, 1, 1, 1, 0, 60, false),  -- Stijn Willems
(4, 1, 1, 2, 0, 0, 60, false),  -- Thomas Van Der Linden
(5, 1, 2, 1, 0, 0, 60, false),  -- Maxim Peeters
(6, 1, 0, 1, 0, 0, 60, false),  -- Lucas Janssen
(7, 1, 1, 0, 0, 0, 60, false);  -- Nick Vermeulen

-- Match 2: Dilbeek Devils (4-4 gelijkspel)
INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match) VALUES
(1, 2, 2, 1, 1, 0, 60, false),
(2, 2, 0, 0, 0, 0, 60, false),
(4, 2, 1, 1, 0, 0, 60, false),
(5, 2, 1, 0, 0, 0, 60, true),   -- Maxim Peeters (MOTM)
(7, 2, 0, 2, 1, 0, 60, false),
(8, 2, 0, 0, 0, 0, 45, false),  -- Ruben Claes
(9, 2, 0, 0, 1, 0, 60, false);  -- Sander Goossens

-- Match 3: Asse Athletes (6-2 winst)
INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match) VALUES
(1, 3, 2, 0, 0, 0, 60, false),
(2, 3, 0, 0, 0, 0, 60, false),
(3, 3, 0, 1, 0, 0, 60, false),
(4, 3, 2, 2, 0, 0, 60, true),   -- Thomas Van Der Linden (MOTM)
(5, 3, 1, 1, 0, 0, 60, false),
(8, 3, 1, 0, 0, 0, 60, false),
(10, 3, 0, 1, 0, 0, 60, false); -- Bram Hendrickx

-- Match 4: Ternat Tigers (3-5 verlies)
INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match) VALUES
(1, 4, 1, 0, 0, 0, 60, false),
(12, 4, 0, 0, 1, 0, 60, false), -- Tim Maes (keeper)
(3, 4, 0, 0, 2, 0, 60, false),
(5, 4, 1, 0, 1, 0, 60, false),
(7, 4, 0, 1, 0, 0, 60, false),
(8, 4, 1, 1, 0, 0, 60, true),   -- Ruben Claes (MOTM)
(9, 4, 0, 0, 1, 0, 60, false);

-- Match 5: Groot-Bijgaarden Giants (7-4 winst)
INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match) VALUES
(1, 5, 4, 1, 0, 0, 60, true),   -- Jarno De Smet (MOTM)
(2, 5, 0, 0, 0, 0, 60, false),
(4, 5, 1, 2, 0, 0, 60, false),
(5, 5, 1, 1, 0, 0, 60, false),
(6, 5, 0, 0, 0, 0, 60, false),
(7, 5, 1, 1, 1, 0, 60, false),
(10, 5, 0, 1, 0, 0, 60, false);

-- Match 6: Wemmel Warriors (5-5 gelijkspel)
INSERT INTO match_stats (player_id, match_id, goals, assists, yellow_cards, red_cards, minutes_played, man_of_the_match) VALUES
(1, 6, 2, 2, 0, 0, 60, false),
(2, 6, 0, 0, 1, 0, 60, false),
(3, 6, 1, 0, 0, 0, 60, false),
(4, 6, 0, 1, 0, 0, 60, false),
(5, 6, 2, 0, 0, 0, 60, true),   -- Maxim Peeters (MOTM)
(7, 6, 0, 1, 0, 0, 60, false),
(8, 6, 0, 1, 1, 0, 60, false);

-- Blessures toevoegen
INSERT INTO injuries (player_id, injury_type, description, injury_date, expected_return_date, actual_return_date, status) VALUES
(11, 'Enkelblessure', 'Verzwikte enkel tijdens training', '2024-01-10', '2024-02-20', NULL, 'recovering'),
(3, 'Hamstring', 'Lichte hamstringblessure', '2024-02-20', '2024-03-05', NULL, 'active'),
(7, 'Knieblessure', 'Kniepijn na wedstrijd', '2024-01-05', '2024-01-20', '2024-01-18', 'recovered');

-- Verificatie queries
SELECT 'Spelers:' as info, COUNT(*) as aantal FROM players;
SELECT 'Wedstrijden:' as info, COUNT(*) as aantal FROM matches;
SELECT 'Match statistieken:' as info, COUNT(*) as aantal FROM match_stats;
SELECT 'Blessures:' as info, COUNT(*) as aantal FROM injuries;

-- Toon topscorers
SELECT
  p.name,
  p.jersey_number,
  SUM(ms.goals) as total_goals,
  SUM(ms.assists) as total_assists
FROM players p
JOIN match_stats ms ON p.id = ms.player_id
GROUP BY p.id, p.name, p.jersey_number
ORDER BY total_goals DESC
LIMIT 5;

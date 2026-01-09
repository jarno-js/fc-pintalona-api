-- FC Pintalona Database Schema
-- Zaalvoetbal Team Management System

DROP DATABASE IF EXISTS FcPintalona;
CREATE DATABASE FcPintalona CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE FcPintalona;

-- Players Table
CREATE TABLE players (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    jersey_number INT UNIQUE,
    position ENUM('Keeper', 'Verdediger', 'Middenvelder', 'Aanvaller'),
    birth_date DATE,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_jersey_number CHECK (jersey_number BETWEEN 1 AND 99)
);

-- Matches Table
CREATE TABLE matches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    match_date DATE NOT NULL,
    match_time TIME,
    opponent VARCHAR(100) NOT NULL,
    location VARCHAR(100) DEFAULT 'Schepdaal',
    home_away ENUM('home', 'away') DEFAULT 'home',
    pintalona_score INT DEFAULT NULL,
    opponent_score INT DEFAULT NULL,
    status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_pintalona_score CHECK (pintalona_score IS NULL OR pintalona_score >= 0),
    CONSTRAINT chk_opponent_score CHECK (opponent_score IS NULL OR opponent_score >= 0)
);

-- Match Statistics Table
CREATE TABLE match_stats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    player_id INT NOT NULL,
    match_id INT NOT NULL,
    goals INT DEFAULT 0,
    assists INT DEFAULT 0,
    yellow_cards INT DEFAULT 0,
    red_cards INT DEFAULT 0,
    minutes_played INT DEFAULT 0,
    man_of_the_match BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
    CONSTRAINT chk_goals CHECK (goals >= 0),
    CONSTRAINT chk_assists CHECK (assists >= 0),
    CONSTRAINT chk_yellow_cards CHECK (yellow_cards >= 0),
    CONSTRAINT chk_red_cards CHECK (red_cards >= 0),
    CONSTRAINT chk_minutes_played CHECK (minutes_played BETWEEN 0 AND 60),
    UNIQUE KEY unique_player_match (player_id, match_id)
);

-- Injuries Table
CREATE TABLE injuries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    player_id INT NOT NULL,
    injury_type VARCHAR(100) NOT NULL,
    description TEXT,
    injury_date DATE NOT NULL,
    expected_return_date DATE,
    actual_return_date DATE,
    status ENUM('active', 'recovering', 'recovered') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    CONSTRAINT chk_expected_return CHECK (expected_return_date IS NULL OR expected_return_date >= injury_date),
    CONSTRAINT chk_actual_return CHECK (actual_return_date IS NULL OR actual_return_date >= injury_date)
);

-- Create indexes for better performance
CREATE INDEX idx_players_active ON players(active);
CREATE INDEX idx_players_position ON players(position);
CREATE INDEX idx_matches_date ON matches(match_date);
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_injuries_status ON injuries(status);
CREATE INDEX idx_injuries_player ON injuries(player_id);
CREATE INDEX idx_match_stats_player ON match_stats(player_id);
CREATE INDEX idx_match_stats_match ON match_stats(match_id);

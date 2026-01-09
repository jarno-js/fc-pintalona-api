// API Base URL
const API_URL = 'http://localhost:3000/api';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    loadDashboard();
});

// Tab Navigation
function initializeTabs() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            switchTab(tab);
        });
    });

    // Stats tabs
    const statsTabButtons = document.querySelectorAll('.stats-tab-btn');
    statsTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const statsTab = btn.dataset.statsTab;
            switchStatsTab(statsTab);
        });
    });
}

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Load data for the tab
    switch(tabName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'players':
            loadPlayers();
            break;
        case 'matches':
            loadMatches();
            break;
        case 'stats':
            loadTopScorers();
            break;
        case 'injuries':
            loadInjuries();
            break;
    }
}

function switchStatsTab(tabName) {
    // Hide all stats tabs
    document.querySelectorAll('.stats-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active from all stats buttons
    document.querySelectorAll('.stats-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[data-stats-tab="${tabName}"]`).classList.add('active');

    // Load data
    switch(tabName) {
        case 'topscorers':
            loadTopScorers();
            break;
        case 'assists':
            loadAssists();
            break;
        case 'cards':
            loadCards();
            break;
    }
}

// ============ DASHBOARD ============
async function loadDashboard() {
    try {
        const teamStats = await fetch(`${API_URL}/stats/team`).then(r => r.json());

        // Update overview cards
        document.getElementById('total-players').textContent = teamStats.players.active_players;
        document.getElementById('total-matches').textContent = teamStats.overview.completed_matches;
        document.getElementById('total-wins').textContent = teamStats.record.wins;
        document.getElementById('win-percentage').textContent = teamStats.record.win_percentage;

        // Load upcoming matches
        const upcoming = await fetch(`${API_URL}/matches/upcoming`).then(r => r.json());
        const upcomingHTML = upcoming.slice(0, 5).map(match => `
            <div class="upcoming-match">
                <strong>${formatDate(match.match_date)}</strong> - ${match.opponent}
                <br><small>${match.location} (${match.home_away === 'home' ? 'Thuis' : 'Uit'})</small>
            </div>
        `).join('');
        document.getElementById('upcoming-matches').innerHTML = upcomingHTML || '<p>Geen aankomende wedstrijden</p>';

        // Load top scorers
        const scorers = await fetch(`${API_URL}/stats/topscorers?limit=5`).then(r => r.json());
        const scorersHTML = scorers.map(scorer => `
            <div class="scorer-item">
                <span class="scorer-name">${scorer.name} (#${scorer.jersey_number || 'N/A'})</span>
                <span class="scorer-goals">${scorer.total_goals} goals</span>
            </div>
        `).join('');
        document.getElementById('top-scorers').innerHTML = scorersHTML || '<p>Nog geen statistieken</p>';

        // Display team form
        const formHTML = teamStats.current_form.split('').map(letter =>
            `<div class="form-letter ${letter}">${letter}</div>`
        ).join('');
        document.getElementById('team-form').innerHTML = formHTML || '<p>Nog geen vorm</p>';

    } catch (error) {
        console.error('Error loading dashboard:', error);
        showError('Kon dashboard niet laden');
    }
}

// ============ PLAYERS ============
async function loadPlayers() {
    try {
        const searchName = document.getElementById('player-search').value;
        const position = document.getElementById('position-filter').value;

        let url = `${API_URL}/players?limit=100`;

        if (searchName || position) {
            url = `${API_URL}/players/search?`;
            if (searchName) url += `name=${searchName}&`;
            if (position) url += `position=${position}`;
        }

        const response = await fetch(url);
        const players = await response.json();
        const playersList = players.data || players;

        const grid = document.getElementById('players-grid');

        if (playersList.length === 0) {
            grid.innerHTML = '<p style="color: white; text-align: center;">Geen spelers gevonden</p>';
            return;
        }

        grid.innerHTML = playersList.map(player => `
            <div class="player-card">
                <div class="player-header">
                    <div class="player-jersey">${player.jersey_number || '?'}</div>
                    <div class="player-name">${player.name}</div>
                </div>
                <div class="player-info">
                    ${player.position ? `<span class="player-position">${player.position}</span>` : ''}
                    ${player.birth_date ? `<p>Geboortedatum: ${formatDate(player.birth_date)}</p>` : ''}
                    <p>Status: ${player.active ? '✅ Actief' : '❌ Inactief'}</p>
                </div>
                <div class="player-actions">
                    <button class="btn-edit" onclick="editPlayer(${player.id})">Bewerken</button>
                    <button class="btn-delete" onclick="deletePlayer(${player.id}, '${player.name}')">Verwijderen</button>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading players:', error);
        showError('Kon spelers niet laden');
    }
}

function openPlayerModal() {
    document.getElementById('playerModalTitle').textContent = 'Nieuwe Speler';
    document.getElementById('playerForm').reset();
    document.getElementById('playerId').value = '';
    document.getElementById('playerModal').classList.add('show');
}

function closePlayerModal() {
    document.getElementById('playerModal').classList.remove('show');
}

async function editPlayer(id) {
    try {
        const player = await fetch(`${API_URL}/players/${id}`).then(r => r.json());

        document.getElementById('playerModalTitle').textContent = 'Speler Bewerken';
        document.getElementById('playerId').value = player.id;
        document.getElementById('playerName').value = player.name;
        document.getElementById('playerJersey').value = player.jersey_number || '';
        document.getElementById('playerPosition').value = player.position || '';
        document.getElementById('playerBirthDate').value = player.birth_date ? player.birth_date.split('T')[0] : '';
        document.getElementById('playerActive').checked = player.active;

        document.getElementById('playerModal').classList.add('show');
    } catch (error) {
        console.error('Error loading player:', error);
        showError('Kon speler niet laden');
    }
}

async function savePlayer(event) {
    event.preventDefault();

    const id = document.getElementById('playerId').value;
    const data = {
        name: document.getElementById('playerName').value,
        jersey_number: parseInt(document.getElementById('playerJersey').value) || null,
        position: document.getElementById('playerPosition').value || null,
        birth_date: document.getElementById('playerBirthDate').value || null,
        active: document.getElementById('playerActive').checked
    };

    try {
        const url = id ? `${API_URL}/players/${id}` : `${API_URL}/players`;
        const method = id ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            closePlayerModal();
            loadPlayers();
            showSuccess(id ? 'Speler bijgewerkt' : 'Speler toegevoegd');
        } else {
            const error = await response.json();
            showError(error.error || 'Er is een fout opgetreden');
        }
    } catch (error) {
        console.error('Error saving player:', error);
        showError('Kon speler niet opslaan');
    }
}

async function deletePlayer(id, name) {
    if (!confirm(`Weet je zeker dat je ${name} wilt verwijderen?`)) return;

    try {
        const response = await fetch(`${API_URL}/players/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadPlayers();
            showSuccess('Speler verwijderd');
        } else {
            showError('Kon speler niet verwijderen');
        }
    } catch (error) {
        console.error('Error deleting player:', error);
        showError('Kon speler niet verwijderen');
    }
}

// ============ MATCHES ============
async function loadMatches() {
    try {
        const searchOpponent = document.getElementById('match-search').value;
        const competition = document.getElementById('competition-filter').value;
        const status = document.getElementById('status-filter').value;

        let url = `${API_URL}/matches?limit=100&sortBy=match_date&order=DESC`;

        const response = await fetch(url);
        const matches = await response.json();
        let matchesList = matches.data || matches;

        // Filter client-side by competition if selected
        if (competition) {
            matchesList = matchesList.filter(m => m.competition === competition);
        }

        // Filter client-side by opponent if search is provided
        if (searchOpponent) {
            matchesList = matchesList.filter(m =>
                m.opponent.toLowerCase().includes(searchOpponent.toLowerCase())
            );
        }

        // Filter client-side by status if selected
        if (status) {
            matchesList = matchesList.filter(m => m.status === status);
        }

        const table = document.getElementById('matches-list');

        if (matchesList.length === 0) {
            table.innerHTML = '<p style="color: white; text-align: center; padding: 20px;">Geen wedstrijden gevonden</p>';
            return;
        }

        table.innerHTML = matchesList.map(match => {
            let scoreClass = '';
            let scoreText = '-';

            if (match.status === 'completed' && match.pintalona_score !== null) {
                scoreText = `${match.pintalona_score} - ${match.opponent_score}`;
                if (match.pintalona_score > match.opponent_score) scoreClass = 'win';
                else if (match.pintalona_score < match.opponent_score) scoreClass = 'loss';
                else scoreClass = 'draw';
            }

            const competitionBadge = match.competition === 'Copa'
                ? '<span class="competition-badge copa">Copa</span>'
                : '<span class="competition-badge superleague">SuperLeague</span>';

            return `
                <div class="match-row">
                    <div class="match-date">${formatDate(match.match_date)}</div>
                    <div>
                        <div class="match-opponent">${match.opponent}</div>
                        <small>${match.location} - ${match.home_away === 'home' ? 'Thuis' : 'Uit'}</small>
                        ${competitionBadge}
                    </div>
                    <div class="match-score ${scoreClass}">${scoreText}</div>
                    <div>
                        <span class="match-status status-${match.status}">
                            ${match.status === 'scheduled' ? 'Ingepland' : match.status === 'completed' ? 'Afgerond' : 'Geannuleerd'}
                        </span>
                    </div>
                    <div class="match-actions">
                        <button class="btn-stats" onclick="openStatsModal(${match.id}, '${match.opponent}')">📊 Stats</button>
                        <button class="btn-edit" onclick="editMatch(${match.id})">Bewerken</button>
                        <button class="btn-delete" onclick="deleteMatch(${match.id})">Verwijderen</button>
                    </div>
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error('Error loading matches:', error);
        showError('Kon wedstrijden niet laden');
    }
}

function openMatchModal() {
    document.getElementById('matchModalTitle').textContent = 'Nieuwe Wedstrijd';
    document.getElementById('matchForm').reset();
    document.getElementById('matchId').value = '';
    document.getElementById('matchModal').classList.add('show');
}

function closeMatchModal() {
    document.getElementById('matchModal').classList.remove('show');
}

async function editMatch(id) {
    try {
        const match = await fetch(`${API_URL}/matches/${id}`).then(r => r.json());

        document.getElementById('matchModalTitle').textContent = 'Wedstrijd Bewerken';
        document.getElementById('matchId').value = match.id;
        document.getElementById('matchDate').value = match.match_date.split('T')[0];
        document.getElementById('matchTime').value = match.match_time || '';
        document.getElementById('matchOpponent').value = match.opponent;
        document.getElementById('matchLocation').value = match.location;
        document.getElementById('matchHomeAway').value = match.home_away;
        document.getElementById('matchCompetition').value = match.competition || 'SuperLeague';
        document.getElementById('matchPintalonaScore').value = match.pintalona_score !== null ? match.pintalona_score : '';
        document.getElementById('matchOpponentScore').value = match.opponent_score !== null ? match.opponent_score : '';
        document.getElementById('matchStatus').value = match.status;
        document.getElementById('matchNotes').value = match.notes || '';

        document.getElementById('matchModal').classList.add('show');
    } catch (error) {
        console.error('Error loading match:', error);
        showError('Kon wedstrijd niet laden');
    }
}

async function saveMatch(event) {
    event.preventDefault();

    const id = document.getElementById('matchId').value;
    const pintalonaScore = document.getElementById('matchPintalonaScore').value;
    const opponentScore = document.getElementById('matchOpponentScore').value;

    const data = {
        match_date: document.getElementById('matchDate').value,
        match_time: document.getElementById('matchTime').value || null,
        opponent: document.getElementById('matchOpponent').value,
        location: document.getElementById('matchLocation').value,
        home_away: document.getElementById('matchHomeAway').value,
        competition: document.getElementById('matchCompetition').value,
        pintalona_score: pintalonaScore ? parseInt(pintalonaScore) : null,
        opponent_score: opponentScore ? parseInt(opponentScore) : null,
        status: document.getElementById('matchStatus').value,
        notes: document.getElementById('matchNotes').value || null
    };

    try {
        const url = id ? `${API_URL}/matches/${id}` : `${API_URL}/matches`;
        const method = id ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            closeMatchModal();
            loadMatches();
            showSuccess(id ? 'Wedstrijd bijgewerkt' : 'Wedstrijd toegevoegd');
        } else {
            const error = await response.json();
            showError(error.error || 'Er is een fout opgetreden');
        }
    } catch (error) {
        console.error('Error saving match:', error);
        showError('Kon wedstrijd niet opslaan');
    }
}

async function deleteMatch(id) {
    if (!confirm('Weet je zeker dat je deze wedstrijd wilt verwijderen?')) return;

    try {
        const response = await fetch(`${API_URL}/matches/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadMatches();
            showSuccess('Wedstrijd verwijderd');
        } else {
            showError('Kon wedstrijd niet verwijderen');
        }
    } catch (error) {
        console.error('Error deleting match:', error);
        showError('Kon wedstrijd niet verwijderen');
    }
}

// ============ STATISTICS ============
async function loadTopScorers() {
    try {
        const scorers = await fetch(`${API_URL}/stats/topscorers?limit=10`).then(r => r.json());

        const html = scorers.map((scorer, index) => `
            <div class="stats-row">
                <div class="stats-rank">${index + 1}</div>
                <div class="stats-player">
                    <strong>${scorer.name}</strong>
                    <br><small>#${scorer.jersey_number || 'N/A'} - ${scorer.position || 'N/A'}</small>
                </div>
                <div class="stats-value">${scorer.total_goals}</div>
                <div>${scorer.matches_played} wedstrijden</div>
                <div>${scorer.goals_per_match} per wedstrijd</div>
            </div>
        `).join('');

        document.getElementById('topscorers-list').innerHTML = html || '<p style="padding: 20px;">Nog geen statistieken</p>';
    } catch (error) {
        console.error('Error loading top scorers:', error);
        showError('Kon topscorers niet laden');
    }
}

async function loadAssists() {
    try {
        const assisters = await fetch(`${API_URL}/stats/assists?limit=10`).then(r => r.json());

        const html = assisters.map((player, index) => `
            <div class="stats-row">
                <div class="stats-rank">${index + 1}</div>
                <div class="stats-player">
                    <strong>${player.name}</strong>
                    <br><small>#${player.jersey_number || 'N/A'} - ${player.position || 'N/A'}</small>
                </div>
                <div class="stats-value">${player.total_assists}</div>
                <div>${player.matches_played} wedstrijden</div>
                <div>${player.assists_per_match} per wedstrijd</div>
            </div>
        `).join('');

        document.getElementById('assists-list').innerHTML = html || '<p style="padding: 20px;">Nog geen statistieken</p>';
    } catch (error) {
        console.error('Error loading assists:', error);
        showError('Kon assists niet laden');
    }
}

async function loadCards() {
    try {
        const cards = await fetch(`${API_URL}/stats/cards?limit=10`).then(r => r.json());

        const html = cards.map((player, index) => `
            <div class="stats-row">
                <div class="stats-rank">${index + 1}</div>
                <div class="stats-player">
                    <strong>${player.name}</strong>
                    <br><small>#${player.jersey_number || 'N/A'} - ${player.position || 'N/A'}</small>
                </div>
                <div>🟨 ${player.total_yellow_cards}</div>
                <div>🟥 ${player.total_red_cards}</div>
                <div class="stats-value">${player.total_card_points}</div>
            </div>
        `).join('');

        document.getElementById('cards-list').innerHTML = html || '<p style="padding: 20px;">Nog geen statistieken</p>';
    } catch (error) {
        console.error('Error loading cards:', error);
        showError('Kon kaarten niet laden');
    }
}

// ============ INJURIES ============
async function loadInjuries() {
    try {
        const statusFilter = document.getElementById('injury-status-filter').value;

        let url = statusFilter === 'active' || statusFilter === 'recovering'
            ? `${API_URL}/injuries/active`
            : `${API_URL}/injuries`;

        const injuries = await fetch(url).then(r => r.json());

        const filteredInjuries = statusFilter && statusFilter !== 'active' && statusFilter !== 'recovering'
            ? injuries.filter(i => i.status === statusFilter)
            : injuries;

        const table = document.getElementById('injuries-list');

        if (filteredInjuries.length === 0) {
            table.innerHTML = '<p style="color: white; text-align: center; padding: 20px;">Geen blessures gevonden</p>';
            return;
        }

        table.innerHTML = filteredInjuries.map(injury => `
            <div class="injury-row">
                <div class="injury-player">
                    <strong>${injury.player_name}</strong>
                    <br><small>#${injury.jersey_number || 'N/A'} - ${injury.position || 'N/A'}</small>
                </div>
                <div><strong>${injury.injury_type}</strong></div>
                <div><small>${injury.description || 'Geen beschrijving'}</small></div>
                <div>
                    <small>Sinds: ${formatDate(injury.injury_date)}</small>
                    ${injury.expected_return_date ? `<br><small>Verwacht: ${formatDate(injury.expected_return_date)}</small>` : ''}
                </div>
                <div>
                    <span class="injury-status status-${injury.status}">
                        ${injury.status === 'active' ? 'Actief' : injury.status === 'recovering' ? 'Herstellend' : 'Hersteld'}
                    </span>
                </div>
                <div class="match-actions">
                    <button class="btn-edit" onclick="editInjury(${injury.id})">Bewerken</button>
                    <button class="btn-delete" onclick="deleteInjury(${injury.id})">Verwijderen</button>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading injuries:', error);
        showError('Kon blessures niet laden');
    }
}

async function openInjuryModal() {
    document.getElementById('injuryModalTitle').textContent = 'Nieuwe Blessure';
    document.getElementById('injuryForm').reset();
    document.getElementById('injuryId').value = '';

    // Load players for dropdown
    try {
        const players = await fetch(`${API_URL}/players?limit=100`).then(r => r.json());
        const playersList = players.data || players;

        const select = document.getElementById('injuryPlayerId');
        select.innerHTML = '<option value="">Selecteer speler</option>' +
            playersList.filter(p => p.active).map(p =>
                `<option value="${p.id}">${p.name} (#${p.jersey_number || 'N/A'})</option>`
            ).join('');
    } catch (error) {
        console.error('Error loading players:', error);
    }

    document.getElementById('injuryModal').classList.add('show');
}

function closeInjuryModal() {
    document.getElementById('injuryModal').classList.remove('show');
}

async function editInjury(id) {
    try {
        const injury = await fetch(`${API_URL}/injuries`).then(r => r.json())
            .then(injuries => injuries.find(i => i.id === id));

        // Load players for dropdown
        const players = await fetch(`${API_URL}/players?limit=100`).then(r => r.json());
        const playersList = players.data || players;

        const select = document.getElementById('injuryPlayerId');
        select.innerHTML = playersList.map(p =>
            `<option value="${p.id}" ${p.id === injury.player_id ? 'selected' : ''}>${p.name} (#${p.jersey_number || 'N/A'})</option>`
        ).join('');

        document.getElementById('injuryModalTitle').textContent = 'Blessure Bewerken';
        document.getElementById('injuryId').value = injury.id;
        document.getElementById('injuryType').value = injury.injury_type;
        document.getElementById('injuryDescription').value = injury.description || '';
        document.getElementById('injuryDate').value = injury.injury_date.split('T')[0];
        document.getElementById('injuryExpectedReturn').value = injury.expected_return_date ? injury.expected_return_date.split('T')[0] : '';
        document.getElementById('injuryActualReturn').value = injury.actual_return_date ? injury.actual_return_date.split('T')[0] : '';
        document.getElementById('injuryStatus').value = injury.status;

        document.getElementById('injuryModal').classList.add('show');
    } catch (error) {
        console.error('Error loading injury:', error);
        showError('Kon blessure niet laden');
    }
}

async function saveInjury(event) {
    event.preventDefault();

    const id = document.getElementById('injuryId').value;
    const data = {
        player_id: parseInt(document.getElementById('injuryPlayerId').value),
        injury_type: document.getElementById('injuryType').value,
        description: document.getElementById('injuryDescription').value || null,
        injury_date: document.getElementById('injuryDate').value,
        expected_return_date: document.getElementById('injuryExpectedReturn').value || null,
        actual_return_date: document.getElementById('injuryActualReturn').value || null,
        status: document.getElementById('injuryStatus').value
    };

    try {
        const url = id ? `${API_URL}/injuries/${id}` : `${API_URL}/injuries`;
        const method = id ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            closeInjuryModal();
            loadInjuries();
            showSuccess(id ? 'Blessure bijgewerkt' : 'Blessure toegevoegd');
        } else {
            const error = await response.json();
            showError(error.error || 'Er is een fout opgetreden');
        }
    } catch (error) {
        console.error('Error saving injury:', error);
        showError('Kon blessure niet opslaan');
    }
}

async function deleteInjury(id) {
    if (!confirm('Weet je zeker dat je deze blessure wilt verwijderen?')) return;

    try {
        const response = await fetch(`${API_URL}/injuries/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadInjuries();
            showSuccess('Blessure verwijderd');
        } else {
            showError('Kon blessure niet verwijderen');
        }
    } catch (error) {
        console.error('Error deleting injury:', error);
        showError('Kon blessure niet verwijderen');
    }
}

// ============ MATCH STATS ============
let currentMatchIdForStats = null;

async function openStatsModal(matchId, opponent) {
    currentMatchIdForStats = matchId;
    document.getElementById('statsModalTitle').textContent = `Statistieken - FC Pintalona vs ${opponent}`;
    document.getElementById('statsModal').classList.add('show');
    await loadMatchStats(matchId);
}

function closeStatsModal() {
    document.getElementById('statsModal').classList.remove('show');
    currentMatchIdForStats = null;
}

async function loadMatchStats(matchId) {
    try {
        const response = await fetch(`${API_URL}/matches/${matchId}/stats`);
        const data = await response.json();
        const stats = data.stats || [];

        const container = document.getElementById('match-stats-list');

        if (stats.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">Nog geen statistieken toegevoegd</p>';
            return;
        }

        container.innerHTML = stats.map(stat => `
            <div class="stat-item ${stat.man_of_the_match ? 'motm' : ''}">
                <div class="stat-jersey">${stat.jersey_number || '?'}</div>
                <div class="stat-player">${stat.player_name}</div>
                <div class="stat-value goals">⚽ ${stat.goals}</div>
                <div class="stat-value assists">🎯 ${stat.assists}</div>
                <div class="stat-value yellow">🟨 ${stat.yellow_cards}</div>
                <div class="stat-value red">🟥 ${stat.red_cards}</div>
                <div class="stat-value">${stat.minutes_played}'</div>
                <div class="stat-actions">
                    ${stat.man_of_the_match ? '<span class="stat-badge">⭐ MOTM</span>' : ''}
                    <button class="btn-edit" onclick="editPlayerStats(${stat.id})">Bewerken</button>
                    <button class="btn-delete" onclick="deletePlayerStats(${stat.id})">Verwijderen</button>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading match stats:', error);
        showError('Kon statistieken niet laden');
    }
}

async function openAddPlayerStatsModal() {
    document.getElementById('playerStatsModalTitle').textContent = 'Speler Statistieken Toevoegen';
    document.getElementById('playerStatsForm').reset();
    document.getElementById('currentStatsId').value = '';
    document.getElementById('currentMatchId').value = currentMatchIdForStats;

    // Load players for dropdown
    try {
        const players = await fetch(`${API_URL}/players?limit=100&active=true`).then(r => r.json());
        const playersList = players.data || players;

        document.getElementById('statsPlayerId').innerHTML =
            '<option value="">Selecteer speler</option>' +
            playersList.map(p =>
                `<option value="${p.id}">${p.name} (#${p.jersey_number || 'N/A'})</option>`
            ).join('');
    } catch (error) {
        console.error('Error loading players:', error);
    }

    document.getElementById('addPlayerStatsModal').classList.add('show');
}

function closeAddPlayerStatsModal() {
    document.getElementById('addPlayerStatsModal').classList.remove('show');
}

async function editPlayerStats(statsId) {
    try {
        const response = await fetch(`${API_URL}/matches/${currentMatchIdForStats}/stats`);
        const data = await response.json();
        const stats = data.stats || [];
        const stat = stats.find(s => s.id === statsId);

        if (!stat) {
            showError('Statistieken niet gevonden');
            return;
        }

        document.getElementById('playerStatsModalTitle').textContent = 'Speler Statistieken Bewerken';
        document.getElementById('currentStatsId').value = stat.id;
        document.getElementById('currentMatchId').value = currentMatchIdForStats;

        // Load players
        const players = await fetch(`${API_URL}/players?limit=100&active=true`).then(r => r.json());
        const playersList = players.data || players;

        document.getElementById('statsPlayerId').innerHTML =
            playersList.map(p =>
                `<option value="${p.id}" ${p.id === stat.player_id ? 'selected' : ''}>${p.name} (#${p.jersey_number || 'N/A'})</option>`
            ).join('');

        document.getElementById('statsGoals').value = stat.goals;
        document.getElementById('statsAssists').value = stat.assists;
        document.getElementById('statsYellowCards').value = stat.yellow_cards;
        document.getElementById('statsRedCards').value = stat.red_cards;
        document.getElementById('statsMinutes').value = stat.minutes_played;
        document.getElementById('statsManOfMatch').checked = stat.man_of_the_match;

        document.getElementById('addPlayerStatsModal').classList.add('show');
    } catch (error) {
        console.error('Error loading player stats:', error);
        showError('Kon statistieken niet laden');
    }
}

async function savePlayerStats(event) {
    event.preventDefault();

    const statsId = document.getElementById('currentStatsId').value;
    const matchId = document.getElementById('currentMatchId').value;

    const data = {
        player_id: parseInt(document.getElementById('statsPlayerId').value),
        goals: parseInt(document.getElementById('statsGoals').value) || 0,
        assists: parseInt(document.getElementById('statsAssists').value) || 0,
        yellow_cards: parseInt(document.getElementById('statsYellowCards').value) || 0,
        red_cards: parseInt(document.getElementById('statsRedCards').value) || 0,
        minutes_played: parseInt(document.getElementById('statsMinutes').value) || 0,
        man_of_the_match: document.getElementById('statsManOfMatch').checked
    };

    try {
        let response;
        if (statsId) {
            // Update existing stats
            response = await fetch(`${API_URL}/stats/${statsId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            // Create new stats
            response = await fetch(`${API_URL}/matches/${matchId}/stats`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }

        if (response.ok) {
            closeAddPlayerStatsModal();
            await loadMatchStats(matchId);
            showSuccess(statsId ? 'Statistieken bijgewerkt' : 'Statistieken toegevoegd');
        } else {
            const error = await response.json();
            showError(error.error || 'Er is een fout opgetreden');
        }
    } catch (error) {
        console.error('Error saving player stats:', error);
        showError('Kon statistieken niet opslaan');
    }
}

async function deletePlayerStats(statsId) {
    if (!confirm('Weet je zeker dat je deze statistieken wilt verwijderen?')) return;

    try {
        const response = await fetch(`${API_URL}/stats/${statsId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await loadMatchStats(currentMatchIdForStats);
            showSuccess('Statistieken verwijderd');
        } else {
            const error = await response.json();
            showError(error.error || 'Er is een fout opgetreden');
        }
    } catch (error) {
        console.error('Error deleting player stats:', error);
        showError('Kon statistieken niet verwijderen');
    }
}

// ============ UTILITY FUNCTIONS ============
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-BE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function showSuccess(message) {
    alert('✅ ' + message);
}

function showError(message) {
    alert('❌ ' + message);
}

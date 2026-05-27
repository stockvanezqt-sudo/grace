// Data Waifu & Series - Akan di-import dari data.js

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Loaded');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing app...');
    
    // Render HOME section by default
    showSection('home');
    
    // Setup navigation
    setupNavigation();
    
    // Setup search & filter
    setupSearch();
    setupFilter();
}

// ==================== NAVIGATION ====================
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('href').replace('#', '');
            showSection(section);
        });
    });
}

function showSection(section) {
    // Hide all sections
    document.querySelectorAll('section').forEach(s => {
        s.style.display = 'none';
    });
    
    // Show selected section
    const selectedSection = document.getElementById(section);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        
        // Render content based on section
        if (section === 'waifu') {
            renderWaifu(waifuData);
        } else if (section === 'series') {
            renderSeries(seriesData);
        } else if (section === 'ranking') {
            renderRanking();
        }
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[href="#${section}"]`).classList.add('active');
}

// ==================== SEARCH & FILTER ====================
function setupSearch() {
    const waifuSearch = document.getElementById('waifu-search');
    const seriesSearch = document.getElementById('series-search');
    
    if (waifuSearch) {
        waifuSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            console.log('Waifu Search:', searchTerm);
            
            if (searchTerm === '') {
                renderWaifu(waifuData);
            } else {
                const filtered = waifuData.filter(waifu => 
                    waifu.name.toLowerCase().includes(searchTerm) ||
                    waifu.series.toLowerCase().includes(searchTerm)
                );
                renderWaifu(filtered);
            }
        });
    }
    
    if (seriesSearch) {
        seriesSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            console.log('Series Search:', searchTerm);
            
            if (searchTerm === '') {
                renderSeries(seriesData);
            } else {
                const filtered = seriesData.filter(series => 
                    series.title.toLowerCase().includes(searchTerm) ||
                    series.description.toLowerCase().includes(searchTerm)
                );
                renderSeries(filtered);
            }
        });
    }
}

function setupFilter() {
    const seriesFilter = document.getElementById('series-filter');
    const genreFilter = document.getElementById('genre-filter');
    
    if (seriesFilter) {
        seriesFilter.addEventListener('change', function() {
            const selectedSeries = this.value;
            console.log('Filter by series:', selectedSeries);
            
            if (selectedSeries === 'semua') {
                renderWaifu(waifuData);
            } else {
                const filtered = waifuData.filter(waifu => 
                    waifu.series.toLowerCase() === selectedSeries.toLowerCase()
                );
                renderWaifu(filtered);
            }
        });
    }
    
    if (genreFilter) {
        genreFilter.addEventListener('change', function() {
            const selectedGenre = this.value;
            console.log('Filter by genre:', selectedGenre);
            
            if (selectedGenre === 'semua') {
                renderSeries(seriesData);
            } else {
                const filtered = seriesData.filter(series => 
                    series.genre.includes(selectedGenre)
                );
                renderSeries(filtered);
            }
        });
    }
}

// ==================== RENDER FUNCTIONS ====================
function renderWaifu(data) {
    const container = document.getElementById('waifu-container');
    if (!container) return;
    
    console.log('Rendering waifu:', data.length);
    
    if (data.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #00ffff; padding: 40px;">Tidak ada waifu ditemukan 😢</div>';
        return;
    }
    
    container.innerHTML = data.map(waifu => `
        <div class="waifu-card">
            <div class="card-image">
                <div style="font-size: 60px; display: flex; align-items: center; justify-content: center; height: 100%;">
                    ${waifu.emoji}
                </div>
            </div>
            <div class="card-content">
                <h3>${waifu.name}</h3>
                <p class="series-badge">${waifu.series}</p>
                <div class="details">
                    <p>👤 Usia: ${waifu.age}</p>
                    <p>📏 Tinggi: ${waifu.height}</p>
                    <p>💇 Rambut: ${waifu.hair}</p>
                    <p>👁️ Mata: ${waifu.eyes}</p>
                </div>
                <p class="personality">${waifu.personality}</p>
                <div class="rating-votes">
                    <span class="rating">⭐ ${waifu.rating}/5</span>
                    <span class="votes">${waifu.votes} votes</span>
                </div>
                <div class="card-actions">
                    <button class="btn-detail" onclick="showWaifuDetail(${waifuData.indexOf(waifu)})">
                        👁️ Detail
                    </button>
                    <button class="btn-vote" onclick="voteWaifu(${waifuData.indexOf(waifu)})">
                        💕 Vote
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderSeries(data) {
    const container = document.getElementById('series-container');
    if (!container) return;
    
    console.log('Rendering series:', data.length);
    
    if (data.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #00ffff; padding: 40px;">Tidak ada series ditemukan 😢</div>';
        return;
    }
    
    container.innerHTML = data.map(series => `
        <div class="series-card">
            <div class="card-image">
                <div style="font-size: 60px; display: flex; align-items: center; justify-content: center; height: 100%;">
                    ${series.emoji}
                </div>
            </div>
            <div class="card-content">
                <h3>${series.title}</h3>
                <p class="studio-badge">${series.studio}</p>
                <div class="details">
                    <p>📺 Episodes: ${series.episodes}</p>
                    <p>🎬 Status: ${series.status}</p>
                    <p>⭐ Rating: ${series.rating}</p>
                </div>
                <p class="description">${series.description.substring(0, 100)}...</p>
                <div class="card-actions">
                    <button class="btn-detail" onclick="showSeriesDetail(${seriesData.indexOf(series)})">
                        👁️ Detail
                    </button>
                    <button class="btn-vote" onclick="window.open('${series.malUrl}', '_blank')">
                        🔗 MAL
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderRanking() {
    const container = document.getElementById('ranking-container');
    if (!container) return;
    
    // Sort waifu by votes
    const sorted = [...waifuData].sort((a, b) => b.votes - a.votes).slice(0, 10);
    
    container.innerHTML = sorted.map((waifu, index) => {
        let medal = '';
        if (index === 0) medal = '🥇';
        else if (index === 1) medal = '🥈';
        else if (index === 2) medal = '🥉';
        else medal = `${index + 1}.`;
        
        return `
            <div class="ranking-item">
                <div class="rank-medal">${medal}</div>
                <div class="rank-info">
                    <h4>${waifu.name}</h4>
                    <p>${waifu.series}</p>
                </div>
                <div class="rank-stats">
                    <span class="votes">🗳️ ${waifu.votes}</span>
                    <span class="rating">⭐ ${waifu.rating}/5</span>
                </div>
                <button class="btn-vote" onclick="voteWaifu(${waifuData.indexOf(waifu)})">
                    💕
                </button>
            </div>
        `;
    }).join('');
}

// ==================== MODAL & DETAILS ====================
function showWaifuDetail(index) {
    const waifu = waifuData[index];
    const modal = document.getElementById('detail-modal');
    const content = document.getElementById('modal-content');
    
    content.innerHTML = `
        <div class="modal-header">
            <h2>${waifu.name}</h2>
            <button class="close-btn" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div style="font-size: 100px; text-align: center; margin: 20px 0;">
                ${waifu.emoji}
            </div>
            <div class="detail-grid">
                <div><strong>Series:</strong> ${waifu.series}</div>
                <div><strong>Usia:</strong> ${waifu.age}</div>
                <div><strong>Tinggi:</strong> ${waifu.height}</div>
                <div><strong>Rambut:</strong> ${waifu.hair}</div>
                <div><strong>Mata:</strong> ${waifu.eyes}</div>
                <div><strong>Keahlian:</strong> ${waifu.abilities}</div>
            </div>
            <div style="margin-top: 20px;">
                <h4>Kepribadian</h4>
                <p>${waifu.personality}</p>
                <h4>Keunikan</h4>
                <p>${waifu.uniqueness}</p>
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <p><strong>Rating:</strong> ⭐ ${waifu.rating}/5</p>
                <p><strong>Total Votes:</strong> 🗳️ ${waifu.votes}</p>
            </div>
            <button class="btn-vote" onclick="voteWaifu(${index}); closeModal();" style="width: 100%; margin-top: 20px;">
                💕 Vote untuk ${waifu.name}
            </button>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function showSeriesDetail(index) {
    const series = seriesData[index];
    const modal = document.getElementById('detail-modal');
    const content = document.getElementById('modal-content');
    
    content.innerHTML = `
        <div class="modal-header">
            <h2>${series.title}</h2>
            <button class="close-btn" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div style="font-size: 100px; text-align: center; margin: 20px 0;">
                ${series.emoji}
            </div>
            <div class="detail-grid">
                <div><strong>Studio:</strong> ${series.studio}</div>
                <div><strong>Director:</strong> ${series.director}</div>
                <div><strong>Episodes:</strong> ${series.episodes}</div>
                <div><strong>Status:</strong> ${series.status}</div>
                <div><strong>Rating:</strong> ⭐ ${series.rating}</div>
                <div><strong>Genre:</strong> ${series.genre.join(', ')}</div>
            </div>
            <div style="margin-top: 20px;">
                <h4>Sinopsis</h4>
                <p>${series.fullDescription}</p>
                <h4>Karakter Utama</h4>
                <p>${series.mainCharacters.join(', ')}</p>
                <h4>Rekomendasi</h4>
                <p>${series.recommendation}</p>
            </div>
            <a href="${series.malUrl}" target="_blank" class="btn-vote" style="display: inline-block; margin-top: 20px; text-decoration: none; width: auto; padding: 10px 20px;">
                🔗 Lihat di MyAnimeList
            </a>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('detail-modal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('detail-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// ==================== VOTING ====================
function voteWaifu(index) {
    waifuData[index].votes += 1;
    
    // Save to localStorage
    localStorage.setItem('waifuData', JSON.stringify(waifuData));
    
    alert(`Terima kasih! Anda telah vote untuk ${waifuData[index].name}! 💕`);
    
    // Refresh current section
    const waifu = document.getElementById('waifu-section');
    if (waifu && waifu.style.display !== 'none') {
        renderWaifu(waifuData);
    }
}
// ============================================================
// ui.js - Управление интерфейсом
// ============================================================

var GameUI = (function() {
    // DOM элементы
    var elements = {};

    function init() {
        console.log('GameUI.init() начат');
        
        // Проверяем, что document существует
        if (!document) {
            console.error('document не доступен!');
            return;
        }

        // Получаем элементы с проверкой
        elements.menu = document.getElementById('menu');
        elements.difficultyScreen = document.getElementById('difficulty-screen');
        elements.pauseMenu = document.getElementById('pause-menu');
        elements.gameContainer = document.getElementById('game-container');
        
        elements.startButton = document.getElementById('start-button');
        elements.difficultyButton = document.getElementById('difficulty-button');
        elements.exitButton = document.getElementById('exit-button');
        
        elements.diffEasy = document.getElementById('diff-easy');
        elements.diffNormal = document.getElementById('diff-normal');
        elements.diffHard = document.getElementById('diff-hard');
        elements.diffBack = document.getElementById('diff-back');
        
        elements.resumeButton = document.getElementById('resume-button');
        elements.pauseExitButton = document.getElementById('pause-exit-button');
        
        elements.ammoIndicator = document.getElementById('ammo-indicator');
        elements.waveIndicator = document.getElementById('wave-indicator');
        elements.killCounter = document.getElementById('kill-counter');
        elements.waveAnnounce = document.getElementById('wave-announce');
        elements.gameOverMessage = document.getElementById('game-over-message');
        elements.restartButton = document.getElementById('restart-button');
        
        elements.playerHpWrap = document.getElementById('player-healthbar-wrap');
        elements.playerHpFill = document.getElementById('player-healthbar-fill');
        elements.playerHpValue = document.getElementById('player-hp-value');
        
        elements.soundButton = document.getElementById('sound-button');
        elements.soundToggle = document.getElementById('sound-toggle');

        // Проверяем каждый критический элемент
        var missingElements = [];
        if (!elements.menu) missingElements.push('menu');
        if (!elements.startButton) missingElements.push('start-button');
        if (!elements.difficultyButton) missingElements.push('difficulty-button');
        if (!elements.exitButton) missingElements.push('exit-button');
        if (!elements.gameContainer) missingElements.push('game-container');

        if (missingElements.length > 0) {
            console.error('Не найдены элементы DOM:', missingElements.join(', '));
            return;
        }

        console.log('Все элементы DOM найдены, настраиваем слушатели...');
        setupMenuListeners();
        setupDifficultyListeners();
        setupPauseListeners();
        setupSoundListener();
        console.log('GameUI.init() завершен успешно');
    }

    function setupMenuListeners() {
        if (elements.startButton) {
            elements.startButton.onclick = function() {
                elements.menu.style.display = 'none';
                if (typeof GameCore !== 'undefined' && GameCore.startGame) {
                    GameCore.startGame();
                } else {
                    console.error('GameCore.startGame не найден');
                }
            };
        }
        
        if (elements.difficultyButton) {
            elements.difficultyButton.onclick = function() {
                elements.menu.style.display = 'none';
                elements.difficultyScreen.style.display = 'flex';
            };
        }
        
        if (elements.exitButton) {
            elements.exitButton.onclick = function() { 
                location.reload(); 
            };
        }
    }

    function setupDifficultyListeners() {
        if (elements.diffEasy) {
            elements.diffEasy.onclick = function() { 
                setDifficultyUI('easy'); 
            };
        }
        if (elements.diffNormal) {
            elements.diffNormal.onclick = function() { 
                setDifficultyUI('normal'); 
            };
        }
        if (elements.diffHard) {
            elements.diffHard.onclick = function() { 
                setDifficultyUI('hard'); 
            };
        }
        if (elements.diffBack) {
            elements.diffBack.onclick = function() {
                elements.difficultyScreen.style.display = 'none';
                elements.menu.style.display = 'flex';
            };
        }
    }

    function setDifficultyUI(level) {
        if (typeof GameConfig !== 'undefined' && GameConfig.setDifficulty) {
            GameConfig.setDifficulty(level);
        }
        var labels = { easy: 'Легко', normal: 'Нормально', hard: 'Сложно' };
        if (elements.difficultyButton) {
            elements.difficultyButton.textContent = 'Сложность: ' + labels[level];
        }
        elements.difficultyScreen.style.display = 'none';
        elements.menu.style.display = 'flex';
    }

    function setupPauseListeners() {
        if (elements.resumeButton) {
            elements.resumeButton.onclick = function() {
                if (typeof GameCore !== 'undefined' && GameCore.resumeGame) {
                    GameCore.resumeGame();
                }
            };
        }
        if (elements.pauseExitButton) {
            elements.pauseExitButton.onclick = function() { 
                location.reload(); 
            };
        }
        if (elements.restartButton) {
            elements.restartButton.onclick = function() { 
                location.reload(); 
            };
        }
    }

    function setupSoundListener() {
        if (elements.soundButton) {
            elements.soundButton.onclick = function() {
                if (typeof GameConfig !== 'undefined' && GameConfig.SOUND_CONFIG) {
                    GameConfig.SOUND_CONFIG.enabled = !GameConfig.SOUND_CONFIG.enabled;
                    elements.soundButton.textContent = GameConfig.SOUND_CONFIG.enabled ? '🔊' : '🔇';
                }
            };
        }
    }

    // Функция инициализации canvas (заменяет createPlayer)
    function initCanvas() {
        console.log('Инициализация canvas...');
        if (typeof GameCanvas !== 'undefined' && GameCanvas.init) {
            GameCanvas.init();
            GameCanvas.startRenderLoop();
            console.log('Canvas инициализирован');
        } else {
            console.error('GameCanvas не найден');
        }
    }

    // Функции обновления HUD
    function updateAmmo() {
        if (elements.ammoIndicator && typeof GameState !== 'undefined') {
            elements.ammoIndicator.textContent = 'Патроны: ' + (GameState.ammoCount ? GameState.ammoCount() : 999) + '/999';
        }
    }

    function updateWave() {
        if (elements.waveIndicator && typeof GameState !== 'undefined') {
            elements.waveIndicator.textContent = 'Волна: ' + (GameState.waveNumber ? GameState.waveNumber() : 1);
        }
    }

    function updateKills() {
        if (elements.killCounter && typeof GameState !== 'undefined') {
            elements.killCounter.textContent = 'Убито: ' + (GameState.totalKills ? GameState.totalKills() : 0);
        }
    }

    function updateHealth() {
        if (!elements.playerHpFill || !elements.playerHpValue) return;
        if (typeof GameState === 'undefined' || !GameState.player) return;
        
        var pct = Math.max(0, GameState.player().health);
        elements.playerHpFill.style.width = pct + '%';
        elements.playerHpValue.textContent = Math.ceil(pct);
        
        if (pct > 60) elements.playerHpFill.style.backgroundColor = '#2ecc40';
        else if (pct > 30) elements.playerHpFill.style.backgroundColor = '#ffdc00';
        else elements.playerHpFill.style.backgroundColor = '#ff4136';
    }

    function showWaveAnnounce(text) {
        if (!elements.waveAnnounce) return;
        
        elements.waveAnnounce.textContent = text;
        elements.waveAnnounce.style.display = 'block';
        
        setTimeout(function() {
            if (elements.waveAnnounce) {
                elements.waveAnnounce.style.display = 'none';
            }
        }, 2500);
    }

    function showGameOver() {
        var gameOverText = document.getElementById('game-over-text');
        if (gameOverText && typeof GameState !== 'undefined') {
            gameOverText.textContent = 'Игра закончена!\nВолна: ' + (GameState.waveNumber ? GameState.waveNumber() : 1) + 
                '\nУбито врагов: ' + (GameState.totalKills ? GameState.totalKills() : 0);
        }
        if (elements.gameOverMessage) {
            elements.gameOverMessage.style.display = 'flex';
        }
        if (elements.soundToggle) {
            elements.soundToggle.style.display = 'none';
        }
    }

    function showGameUI() {
        if (elements.gameContainer) elements.gameContainer.style.display = 'block';
        if (elements.ammoIndicator) elements.ammoIndicator.style.display = 'block';
        if (elements.waveIndicator) elements.waveIndicator.style.display = 'block';
        if (elements.killCounter) elements.killCounter.style.display = 'block';
        if (elements.playerHpWrap) elements.playerHpWrap.style.display = 'flex';
        if (elements.soundToggle) elements.soundToggle.style.display = 'block';
        
        // Инициализируем canvas
        initCanvas();
    }

    function hideAllMenus() {
        if (elements.menu) elements.menu.style.display = 'none';
        if (elements.difficultyScreen) elements.difficultyScreen.style.display = 'none';
        if (elements.pauseMenu) elements.pauseMenu.style.display = 'none';
    }

    function cleanup() {
        if (typeof GameCanvas !== 'undefined' && GameCanvas.stopRenderLoop) {
            GameCanvas.stopRenderLoop();
        }
    }

    // Публичный API
    return {
        init: init,
        elements: elements,
        updateAmmo: updateAmmo,
        updateWave: updateWave,
        updateKills: updateKills,
        updateHealth: updateHealth,
        showWaveAnnounce: showWaveAnnounce,
        showGameOver: showGameOver,
        showGameUI: showGameUI,
        hideAllMenus: hideAllMenus,
        cleanup: cleanup
    };
})();
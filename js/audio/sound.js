// ============================================================
// sound.js - Система звуков
// ============================================================

var GameSound = (function() {
    var sounds = {};
    var volume = 0.5;
    var muted = false;
    var initialized = false;
    
    var soundFiles = {
        shoot: 'assets/sounds/shoot.mp3',
        hit: 'assets/sounds/hit.mp3',
        enemyDeath: 'assets/sounds/enemyDeath.mp3',
        waveStart: 'assets/sounds/waveStart.mp3',
        playerHit: 'assets/sounds/hit.mp3',
        gameOver: 'assets/sounds/hit.mp3',
        click: 'assets/sounds/hit.mp3',
        expCollect: 'assets/sounds/hit.mp3'
    };
    
    function loadSound(name, src) {
        var audio = new Audio();
        audio.src = src;
        audio.preload = 'auto';
        audio.volume = volume;
        sounds[name] = audio;
    }
    
    function play(name) {
        if (muted || !sounds[name]) return;
        
        try {
            var sound = sounds[name].cloneNode();
            sound.volume = volume;
            sound.play().catch(function(e) {
                console.log('Sound play error:', e);
            });
        } catch(e) {
            console.log('Sound error:', e);
        }
    }
    
    function init() {
        if (initialized) return;
        console.log('[Sound] Загрузка звуков...');
        
        for (var name in soundFiles) {
            loadSound(name, soundFiles[name]);
        }
        
        initialized = true;
        console.log('[Sound] Звуки загружены');
    }
    
    return {
        init: init,
        play: play,
        playShoot: function() { play('shoot'); },
        playHit: function() { play('hit'); },
        playEnemyDeath: function() { play('enemyDeath'); },
        playWaveStart: function() { play('waveStart'); },
        playPlayerHit: function() { play('playerHit'); },
        playGameOver: function() { play('gameOver'); },
        playClick: function() { play('click'); },
        playExpCollect: function() { play('expCollect'); },
        setVolume: function(vol) {
            volume = Math.max(0, Math.min(1, vol));
            for (var name in sounds) {
                sounds[name].volume = volume;
            }
        },
        toggleMute: function() { 
            muted = !muted; 
            return muted;
        },
        isReady: function() { return initialized; }
    };
})();
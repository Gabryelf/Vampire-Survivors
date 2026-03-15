// ============================================================
// config.js - Конфигурация игры (глобальные переменные)
// ============================================================

var GameConfig = (function() {
    // Настройки сложности
    var DIFFICULTIES = {
        easy:   { enemySpeed: 1.4, enemyHealth: 60,  fireRate: 300, playerSpeed: 6, damagePerHit: 5  },
        normal: { enemySpeed: 1.9, enemyHealth: 100, fireRate: 500, playerSpeed: 5, damagePerHit: 10 },
        hard:   { enemySpeed: 2.5, enemyHealth: 150, fireRate: 800, playerSpeed: 4, damagePerHit: 20 },
    };

    // Роли врагов
    var ROLES = ['chaser', 'chaser', 'chaser', 'chaser',
                   'interceptor', 'interceptor', 'interceptor',
                   'flanker', 'flanker'];

    // Параметры игры
    var GAME_PARAMS = {
        MAX_AMMO: 999,
        PREDICT_FRAMES: 18,
        FLANK_OFFSET: 160,
        MIN_DIST: 28,
        SEP_FORCE: 1.0,
        BULLET_SPEED: 8,
        BULLET_DAMAGE: 20,
        PLAYER_SIZE: 20,
        ENEMY_SIZE: 20,
        BULLET_SIZE: 5,
        WAVE_ANNOUNCE_DURATION: 2500,
        SPAWN_DELAY: 600,
        WAVE_DELAY: 3000
    };

    // Текущая сложность
    var currentDifficulty = 'normal';

    return {
        DIFFICULTIES: DIFFICULTIES,
        ROLES: ROLES,
        GAME_PARAMS: GAME_PARAMS,
        currentDifficulty: currentDifficulty,
        
        getDifficulty: function() {
            return this.DIFFICULTIES[this.currentDifficulty];
        },
        
        setDifficulty: function(level) {
            this.currentDifficulty = level;
            // Исправляем скорость для easy, которая была потеряна
            if (level === 'easy' && !this.DIFFICULTIES.easy.enemySpeed) {
                this.DIFFICULTIES.easy.enemySpeed = 1.4;
            }
        }
    };
})();
// ============================================================
// upgrades.js - Список доступных улучшений
// ============================================================

var UpgradeDefinitions = (function() {
    
    // Базовые модификаторы (будут применяться к глобальным переменным)
    var modifiers = {
        damage: 1.0,
        fireRate: 1.0,
        speed: 0,
        maxHealth: 0,
        pickupRange: 0
    };
    
    // Список всех возможных улучшений
    var UPGRADES_LIST = [
        {
            id: 'damage_up',
            name: 'Острый клинок',
            desc: '+20% к урону',
            icon: 'damage',
            apply: function() {
                modifiers.damage += 0.2;
                // Сохраняем в глобальную конфигурацию
                if (typeof GameConfig !== 'undefined') {
                    GameConfig.setDamageBonus(modifiers.damage);
                }
            }
        },
        {
            id: 'fire_rate_up',
            name: 'Быстрая рука',
            desc: '+15% к скорости стрельбы',
            icon: 'firerate',
            apply: function() {
                modifiers.fireRate += 0.15;
                if (typeof GameConfig !== 'undefined') {
                    GameConfig.setFireRateBonus(modifiers.fireRate);
                }
            }
        },
        {
            id: 'speed_up',
            name: 'Быстрые ноги',
            desc: '+15 к скорости движения',
            icon: 'speed',
            apply: function() {
                modifiers.speed += 15;
                if (typeof GameConfig !== 'undefined') {
                    GameConfig.setSpeedBonus(modifiers.speed);
                }
            }
        },
        {
            id: 'health_up',
            name: 'Крепкое сердце',
            desc: '+20 к максимальному здоровью',
            icon: 'health',
            apply: function() {
                modifiers.maxHealth += 20;
                if (typeof GameState !== 'undefined') {
                    // Восстанавливаем здоровье при улучшении
                    var newHealth = Math.min(GameState.player().health + 20, 100 + modifiers.maxHealth);
                    GameState.player().health = newHealth;
                    GameState.setMaxHealth(100 + modifiers.maxHealth);
                    if (typeof GameUI !== 'undefined') GameUI.updateHealth();
                }
            }
        },
        {
            id: 'pickup_range_up',
            name: 'Магнит',
            desc: '+40 к радиусу сбора опыта',
            icon: 'range',
            apply: function() {
                modifiers.pickupRange += 40;
                if (typeof GameConfig !== 'undefined') {
                    GameConfig.setPickupRangeBonus(modifiers.pickupRange);
                }
            }
        }
    ];
    
    // Функция получения 3 случайных улучшений
    function getRandomUpgrades(count) {
        // Копируем список
        var available = [...UPGRADES_LIST];
        var result = [];
        
        for (var i = 0; i < count && available.length > 0; i++) {
            var randomIndex = Math.floor(Math.random() * available.length);
            result.push(available[randomIndex]);
            available.splice(randomIndex, 1);
        }
        
        return result;
    }
    
    return {
        getRandomUpgrades: getRandomUpgrades,
        UPGRADES_LIST: UPGRADES_LIST
    };
})();
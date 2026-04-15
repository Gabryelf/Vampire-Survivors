// ============================================================
// canvas.js - Управление Canvas и рендерингом
// ============================================================

var GameCanvas = (function () {
    // Приватные переменные
    var canvas = null;
    var ctx = null;
    var animationId = null;

    // Загруженные изображения
    var images = {
        player: null,
        playerGun: null,
        enemies: {
            chaser: null,
            interceptor: null,
            flanker: null
        },
        bullet: null,
        heart: null
    };

    // Флаг загрузки всех изображений
    var imagesLoaded = false;
    var imagesToLoad = 0;
    var imagesLoadedCount = 0;

    function init() {
        // Создаем canvas элемент
        canvas = document.createElement('canvas');
        canvas.id = 'game-canvas';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '1';

        ctx = canvas.getContext('2d');

        // Добавляем canvas в game-container
        var gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.appendChild(canvas);
        } else {
            console.error('game-container не найден');
            return;
        }

        loadAllImages();
        setupResizeHandler();
    }

    function setupResizeHandler() {
        window.addEventListener('resize', function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            GameState.updateWindowSize();
        });
    }

    function loadAllImages() {
        var assets = GameConfig.ASSETS.images;
        
        // Подсчитываем количество изображений для загрузки
        imagesToLoad = 1 + 1 + 3 + 1 + 1; // player + gun + 3 enemies + bullet + heart
        imagesLoadedCount = 0;
        
        // Загрузка изображения игрока
        images.player = new Image();
        images.player.onload = onImageLoaded;
        images.player.src = assets.player;
        
        // Загрузка изображения оружия
        images.playerGun = new Image();
        images.playerGun.onload = onImageLoaded;
        images.playerGun.src = assets.playerGun;
        
        // Загрузка изображений врагов
        images.enemies.chaser = new Image();
        images.enemies.chaser.onload = onImageLoaded;
        images.enemies.chaser.src = assets.enemies.chaser;
        
        images.enemies.interceptor = new Image();
        images.enemies.interceptor.onload = onImageLoaded;
        images.enemies.interceptor.src = assets.enemies.interceptor;
        
        images.enemies.flanker = new Image();
        images.enemies.flanker.onload = onImageLoaded;
        images.enemies.flanker.src = assets.enemies.flanker;
        
        // Загрузка изображения пули
        images.bullet = new Image();
        images.bullet.onload = onImageLoaded;
        images.bullet.src = assets.bullet;
        
        // Загрузка изображения сердца (для здоровья)
        images.heart = new Image();
        images.heart.onload = onImageLoaded;
        images.heart.src = assets.heart;
    }
    
    function onImageLoaded() {
        imagesLoadedCount++;
        if (imagesLoadedCount >= imagesToLoad) {
            imagesLoaded = true;
            GameLogger.info('Все изображения загружены');
        }
    }

    function render() {
        if (!ctx || !imagesLoaded) return;
        
        // Очищаем canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Отрисовываем фон (темный градиент)
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Отрисовываем врагов
        renderEnemies();
        
        // Отрисовываем пули
        renderBullets();
        
        // Отрисовываем игрока
        renderPlayer();
    }
    
    function renderPlayer() {
        var player = GameState.player();
        if (!player || !images.player) return;
        
        // Сохраняем контекст для трансформации
        ctx.save();
        
        // Перемещаемся в центр игрока
        ctx.translate(player.x + 10, player.y + 10);
        
        // Отрисовываем игрока
        ctx.drawImage(images.player, -10, -10, 20, 20);
        
        // Получаем угол поворота оружия из состояния
        var angle = player.gunAngle || 0;
        
        // Поворачиваем для оружия
        ctx.rotate(angle);
        
        // Отрисовываем оружие
        ctx.drawImage(images.playerGun, 5, -5, 10, 10);
        
        ctx.restore();
        
        // Отрисовываем полоску здоровья над игроком
        var healthPercent = player.health / 100;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(player.x, player.y - 8, 20, 4);
        ctx.fillStyle = healthPercent > 0.6 ? '#2ecc40' : (healthPercent > 0.3 ? '#ffdc00' : '#ff4136');
        ctx.fillRect(player.x, player.y - 8, 20 * healthPercent, 4);
    }
    
    function renderEnemies() {
        var enemies = GameState.enemies();
        var imagesMap = {
            'chaser': images.enemies.chaser,
            'interceptor': images.enemies.interceptor,
            'flanker': images.enemies.flanker
        };
        
        for (var i = 0; i < enemies.length; i++) {
            var e = enemies[i];
            var img = imagesMap[e.role] || images.enemies.chaser;
            
            if (img) {
                ctx.drawImage(img, e.posX, e.posY, 20, 20);
            } else {
                // Fallback: рисуем квадрат если изображение не загружено
                ctx.fillStyle = 'darkred';
                ctx.fillRect(e.posX, e.posY, 20, 20);
            }
            
            // Отрисовываем полоску здоровья
            var healthPercent = e.health / e.maxHealth;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(e.posX, e.posY - 5, 20, 3);
            ctx.fillStyle = '#ff4136';
            ctx.fillRect(e.posX, e.posY - 5, 20 * healthPercent, 3);
        }
    }

    function startRenderLoop() {
        if (animationId) cancelAnimationFrame(animationId);
        
        function renderLoop() {
            render();
            animationId = requestAnimationFrame(renderLoop);
        }
        
        renderLoop();
    }
    
    function stopRenderLoop() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }
    
    function renderBullets() {
        var bullets = GameState.bullets();
        
        for (var i = 0; i < bullets.length; i++) {
            var b = bullets[i];
            
            if (images.bullet) {
                ctx.drawImage(images.bullet, b.posX, b.posY, 5, 5);
            } else {
                ctx.fillStyle = 'yellow';
                ctx.fillRect(b.posX, b.posY, 5, 5);
            }
        }
    }

    function onImageLoaded() {
        imagesLoadedCount++;
        if (imagesLoadedCount >= imagesToLoad) {
            imagesLoaded = true;
            // Добавляем проверку на существование GameLogger
            if (typeof GameLogger !== 'undefined' && GameLogger.info) {
                GameLogger.info('Все изображения загружены');
            } else {
                console.log('Все изображения загружены');
            }
        }
    }

    return {
        init: init,
        render: render,
        startRenderLoop: startRenderLoop,
        stopRenderLoop: stopRenderLoop,
        getContext: function () { return ctx; },
        getCanvas: function () { return canvas; },
        isReady: function () { return imagesLoaded; }
    };
})();
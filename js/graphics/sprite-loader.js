// ===========================
// SPRITE LOADER - Загрузчик спрайтов (РАБОЧАЯ ВЕРСИЯ)
// ===========================

const SpriteLoader = {
    images: {},
    loaded: false,
    total: 0,
    count: 0,
    callbacks: [],
    
    load() {
        const assets = window.ASSETS.images;
        if (!assets) {
            console.error('[SpriteLoader] ASSETS не найден');
            return;
        }
        
        this.total = 2 + Object.keys(assets.enemies).length;
        this.count = 0;
        
        this._load('player', assets.player);
        this._load('playerGun', assets.playerGun);
        
        for (let type in assets.enemies) {
            this._load('enemy_' + type, assets.enemies[type]);
        }
        
        console.log('[SpriteLoader] Загрузка ' + this.total + ' спрайтов...');
    },
    
    _load(key, src) {
        const img = new Image();
        img.onload = () => {
            this.images[key] = img;
            this.count++;
            this._checkComplete();
        };
        img.onerror = () => {
            console.warn('[SpriteLoader] Не загружен: ' + src);
            this.count++;
            this._checkComplete();
        };
        img.src = src;
    },
    
    _checkComplete() {
        if (this.count >= this.total) {
            this.loaded = true;
            console.log('[SpriteLoader] Все спрайты загружены');
            this.callbacks.forEach(cb => cb());
            this.callbacks = [];
        }
    },
    
    get(key) {
        return this.images[key] || null;
    },
    
    onReady(callback) {
        if (this.loaded) callback();
        else this.callbacks.push(callback);
    }
};

window.SpriteLoader = SpriteLoader;

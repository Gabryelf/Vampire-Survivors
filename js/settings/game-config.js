const CONFIG = {
  // World
  WORLD_W: 4000,
  WORLD_H: 4000,
  TILE_SIZE: 64,

  // Player
  PLAYER_BASE_HP: 100,
  PLAYER_BASE_SPEED: 200,
  PLAYER_RADIUS: 14,
  PLAYER_IFRAMES: 800, // ms invincibility after hit

  // XP
  XP_LEVELS: (() => {
    const arr = [0];
    for (let i = 1; i <= 60; i++) {
      arr.push(arr[i - 1] + Math.floor(5 + i * 8 + i * i * 0.8));
    }
    return arr;
  })(),

  // Camera
  CAM_LERP: 0.12,

  // Spawn
  SPAWN_RADIUS_MIN: 600,
  SPAWN_RADIUS_MAX: 800,

  // Game duration (seconds) — 15 min
  GAME_DURATION: 900,

  // Tile colors
  TILE_COLORS: ['#1a2a14','#162211','#1e2e16','#182412','#1c2813'],
  TILE_DETAIL_COLORS: ['#0e1a0c','#122010','#0c1808'],

  // Enemy types
  ENEMY_TYPES: {
    BAT: {
      id: 'BAT', name: 'Летучая мышь', emoji: '🦇',
      hp: 18, speed: 130, damage: 8, xp: 2, radius: 10,
      color: '#6a0dad', colorInner: '#9030d0',
      scoreValue: 10, healDropChance: 0.03, magnetDropChance: 0.01
    },
    SKELETON: {
      id: 'SKELETON', name: 'Скелет', emoji: '💀',
      hp: 45, speed: 75, damage: 15, xp: 5, radius: 14,
      color: '#c8b87a', colorInner: '#ddd0a0',
      scoreValue: 20, healDropChance: 0.03, magnetDropChance: 0.01
    },
    ZOMBIE: {
      id: 'ZOMBIE', name: 'Зомби', emoji: '🧟',
      hp: 80, speed: 55, damage: 20, xp: 8, radius: 16,
      color: '#2d5a2d', colorInner: '#4a8a4a',
      scoreValue: 30, healDropChance: 0.03, magnetDropChance: 0.01
    },
    GHOST: {
      id: 'GHOST', name: 'Призрак', emoji: '👻',
      hp: 30, speed: 100, damage: 12, xp: 6, radius: 13,
      color: 'rgba(150,180,255,0.7)', colorInner: 'rgba(200,220,255,0.9)',
      scoreValue: 25, phasing: true, healDropChance: 0.03, magnetDropChance: 0.01
    },
    ORC: {
      id: 'ORC', name: 'Орк', emoji: '👹',
      hp: 200, speed: 50, damage: 30, xp: 20, radius: 22,
      color: '#2a5a10', colorInner: '#50a030',
      scoreValue: 80, healDropChance: 0.03, magnetDropChance: 0.01
    },
    VAMPIRE: {
      id: 'VAMPIRE', name: 'Вампир', emoji: '🧛',
      hp: 120, speed: 95, damage: 25, xp: 15, radius: 16,
      color: '#8b0000', colorInner: '#c0152a',
      scoreValue: 60, healDropChance: 0.03, magnetDropChance: 0.01
    },
    DEMON: {
      id: 'DEMON', name: 'Демон', emoji: '😈',
      hp: 350, speed: 70, damage: 40, xp: 40, radius: 24,
      color: '#8b0000', colorInner: '#ff2222',
      scoreValue: 150, isBoss: true, healDropChance: 0.03, magnetDropChance: 0.01
    },
    LICH: {
      id: 'LICH', name: 'Лич', emoji: '☠️',
      hp: 600, speed: 60, damage: 50, xp: 80, radius: 28,
      color: '#3a0070', colorInner: '#9000ff',
      scoreValue: 300, isBoss: true, healDropChance: 0.03, magnetDropChance: 0.01
    }
  },

  // Spawn waves — by minute
  SPAWN_WAVES: [
    { time: 0,   types: ['BAT'], rate: 1.8 },
    { time: 30,  types: ['BAT', 'SKELETON'], rate: 1.5 },
    { time: 60,  types: ['BAT', 'SKELETON', 'ZOMBIE'], rate: 1.2 },
    { time: 90,  types: ['SKELETON', 'ZOMBIE', 'GHOST'], rate: 1.0 },
    { time: 120, types: ['ZOMBIE', 'GHOST', 'ORC'], rate: 0.9 },
    { time: 180, types: ['GHOST', 'ORC', 'VAMPIRE'], rate: 0.75 },
    { time: 240, types: ['ORC', 'VAMPIRE', 'DEMON'], rate: 0.6 },
    { time: 360, types: ['VAMPIRE', 'DEMON', 'LICH'], rate: 0.5 },
    { time: 480, types: ['DEMON', 'LICH'], rate: 0.4 }
  ],

  // XP gem sizes
  XP_GEM_SIZES: {
    small:  { r: 5,  xp: 2,  color: '#5dade2' },
    medium: { r: 7,  xp: 6,  color: '#a855f7' },
    large:  { r: 10, xp: 15, color: '#f59e0b' }
  }
};
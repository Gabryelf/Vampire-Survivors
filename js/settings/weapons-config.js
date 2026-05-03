
// WEAPONS DATA
const WEAPONS_DATA = {
  SWORD_ARC: {
    id: 'SWORD_ARC', name: 'Удар мечом', icon: '⚔️',
    desc: 'Наносит урон веером перед персонажем',
    baseDamage: 30, baseCooldown: 0.9, baseRange: 100,
    arcAngle: Math.PI * 0.6, projectileCount: 1,
    rarity: 'common', maxLevel: 8,
    upgrades: [
      { dmg: 1.15, range: 1.1, desc: '+15% урон, +10% дальность' },
      { dmg: 1.2, cd: 0.9, desc: '+20% урон, -10% перезарядка' },
      { dmg: 1.2, arc: 1.2, desc: '+20% урон, +20% угол атаки' },
      { dmg: 1.3, count: 1, desc: '+30% урон, +1 удар' },
      { dmg: 1.2, range: 1.2, desc: '+20% урон, +20% дальность' },
      { dmg: 1.3, cd: 0.85, desc: '+30% урон, -15% перезарядка' },
      { dmg: 1.5, desc: '+50% урон (максимум!)' }
    ]
  },
  MAGIC_BOLT: {
    id: 'MAGIC_BOLT', name: 'Магический болт', icon: '🔮',
    desc: 'Запускает магические снаряды по случайным врагам',
    baseDamage: 18, baseCooldown: 1.4, baseRange: 350,
    projectileCount: 1, speed: 300, piercing: 1,
    rarity: 'common', maxLevel: 8,
    upgrades: [
      { dmg: 1.2, desc: '+20% урон' },
      { dmg: 1.1, count: 1, desc: '+10% урон, +1 снаряд' },
      { dmg: 1.2, cd: 0.9, desc: '+20% урон, -10% перезарядка' },
      { dmg: 1.1, piercing: 1, desc: '+10% урон, +1 пробитие' },
      { dmg: 1.3, count: 1, desc: '+30% урон, +1 снаряд' },
      { dmg: 1.2, cd: 0.85, desc: '+20% урон, -15% перезарядка' },
      { dmg: 1.5, desc: '+50% урон (максимум!)' }
    ]
  },
  HOLY_WATER: {
    id: 'HOLY_WATER', name: 'Святая вода', icon: '💧',
    desc: 'Бросает флакон, создающий лужу урона',
    baseDamage: 12, baseCooldown: 2.0, baseRange: 200,
    poolDuration: 3.0, poolRadius: 50, tickRate: 0.5,
    rarity: 'rare', maxLevel: 8,
    upgrades: [
      { dmg: 1.2, desc: '+20% урон лужи' },
      { dmg: 1.1, poolR: 1.2, desc: '+10% урон, +20% размер лужи' },
      { dmg: 1.2, cd: 0.9, desc: '+20% урон, -10% перезарядка' },
      { dmg: 1.1, poolDur: 1.3, desc: '+10% урон, +30% длительность' },
      { dmg: 1.3, count: 1, desc: '+30% урон, +1 бросок' },
      { dmg: 1.2, cd: 0.85, desc: '+20% урон, -15% перезарядка' },
      { dmg: 1.5, desc: '+50% урон (максимум!)' }
    ]
  },
  CROSS_BOOMERANG: {
    id: 'CROSS_BOOMERANG', name: 'Крест-бумеранг', icon: '✝️',
    desc: 'Летит прямо, отражается и возвращается',
    baseDamage: 22, baseCooldown: 1.6, baseRange: 300,
    speed: 260, rarity: 'rare', maxLevel: 8,
    upgrades: [
      { dmg: 1.25, desc: '+25% урон' },
      { dmg: 1.1, cd: 0.9, desc: '+10% урон, -10% перезарядка' },
      { dmg: 1.2, count: 1, desc: '+20% урон, +1 крест' },
      { dmg: 1.3, range: 1.2, desc: '+30% урон, +20% дальность' },
      { dmg: 1.2, cd: 0.85, desc: '+20% урон, -15% перезарядка' },
      { dmg: 1.2, count: 1, desc: '+20% урон, +1 крест' },
      { dmg: 1.5, desc: '+50% урон (максимум!)' }
    ]
  },
  LIGHTNING: {
    id: 'LIGHTNING', name: 'Молния', icon: '⚡',
    desc: 'Бьёт молнией по ближайшему врагу, цепляя соседей',
    baseDamage: 40, baseCooldown: 2.5, baseRange: 400,
    chainCount: 2, chainRange: 120,
    rarity: 'epic', maxLevel: 8,
    upgrades: [
      { dmg: 1.2, desc: '+20% урон' },
      { dmg: 1.1, chain: 1, desc: '+10% урон, +1 цепь' },
      { dmg: 1.3, cd: 0.9, desc: '+30% урон, -10% перезарядка' },
      { dmg: 1.2, chain: 1, chainR: 1.2, desc: '+20% урон, +1 цепь, +20% радиус цепи' },
      { dmg: 1.3, cd: 0.85, desc: '+30% урон, -15% перезарядка' },
      { dmg: 1.2, chain: 2, desc: '+20% урон, +2 цепи' },
      { dmg: 1.5, desc: '+50% урон (максимум!)' }
    ]
  },
  FIRE_WAND: {
    id: 'FIRE_WAND', name: 'Огненная палочка', icon: '🔥',
    desc: 'Стреляет огненным шаром, поджигающим врагов',
    baseDamage: 25, baseCooldown: 1.8, baseRange: 320,
    burnDamage: 5, burnDuration: 3.0, speed: 280,
    rarity: 'common', maxLevel: 8,
    upgrades: [
      { dmg: 1.2, desc: '+20% урон' },
      { dmg: 1.1, burnDmg: 1.3, desc: '+10% урон, +30% поджог' },
      { dmg: 1.2, cd: 0.9, desc: '+20% урон, -10% перезарядка' },
      { dmg: 1.1, burnDur: 1.4, count: 1, desc: '+10% урон, дольше поджог, +1 шар' },
      { dmg: 1.3, cd: 0.85, desc: '+30% урон, -15% перезарядка' },
      { dmg: 1.2, burnDmg: 1.5, desc: '+20% урон, +50% поджог' },
      { dmg: 1.5, desc: '+50% урон (максимум!)' }
    ]
  },
  GARLIC: {
    id: 'GARLIC', name: 'Чеснок', icon: '🧄',
    desc: 'Постоянный АоЕ урон вокруг персонажа',
    baseDamage: 6, baseCooldown: 0.5, baseRange: 90,
    rarity: 'rare', maxLevel: 8,
    upgrades: [
      { dmg: 1.3, desc: '+30% урон' },
      { dmg: 1.1, range: 1.2, desc: '+10% урон, +20% радиус' },
      { dmg: 1.3, cd: 0.85, desc: '+30% урон, -15% перезарядка' },
      { dmg: 1.2, range: 1.15, desc: '+20% урон, +15% радиус' },
      { dmg: 1.2, cd: 0.8, desc: '+20% урон, -20% перезарядка' },
      { dmg: 1.3, range: 1.2, desc: '+30% урон, +20% радиус' },
      { dmg: 1.5, desc: '+50% урон (максимум!)' }
    ]
  },
  SHADOW_BLADE: {
    id: 'SHADOW_BLADE', name: 'Теневой клинок', icon: '🗡️',
    desc: 'Высокоскоростные клинки в 8 направлениях',
    baseDamage: 14, baseCooldown: 1.1, baseRange: 200,
    projectileCount: 8, speed: 380, piercing: 99,
    rarity: 'epic', maxLevel: 8,
    upgrades: [
      { dmg: 1.2, desc: '+20% урон' },
      { dmg: 1.1, cd: 0.9, desc: '+10% урон, -10% перезарядка' },
      { dmg: 1.3, speed: 1.2, desc: '+30% урон, +20% скорость' },
      { dmg: 1.2, cd: 0.85, desc: '+20% урон, -15% перезарядка' },
      { dmg: 1.2, range: 1.2, desc: '+20% урон, +20% дальность' },
      { dmg: 1.3, cd: 0.8, desc: '+30% урон, -20% перезарядка' },
      { dmg: 1.5, desc: '+50% урон (максимум!)' }
    ]
  }
};

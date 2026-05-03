// PASSIVE UPGRADES DATA
const PASSIVES_DATA = {
  MAX_HP: {
    id: 'MAX_HP', name: 'Жизненная сила', icon: '❤️',
    desc: '+25% максимального HP',
    rarity: 'common', maxLevel: 5,
    apply: (player) => { player.maxHp = Math.round(player.maxHp * 1.25); player.hp = Math.min(player.hp + 25, player.maxHp); }
  },
  SPEED: {
    id: 'SPEED', name: 'Лёгкость', icon: '💨',
    desc: '+15% скорость передвижения',
    rarity: 'common', maxLevel: 5,
    apply: (player) => { player.speed *= 1.15; }
  },
  ARMOR: {
    id: 'ARMOR', name: 'Доспех', icon: '🛡️',
    desc: 'Уменьшает получаемый урон на 1',
    rarity: 'rare', maxLevel: 5,
    apply: (player) => { player.armor = (player.armor || 0) + 1; }
  },
  REGEN: {
    id: 'REGEN', name: 'Регенерация', icon: '💚',
    desc: '+0.5 HP/с регенерации',
    rarity: 'rare', maxLevel: 5,
    apply: (player) => { player.regen = (player.regen || 0) + 0.5; }
  },
  MAGNET: {
    id: 'MAGNET', name: 'Магнетизм', icon: '🧲',
    desc: '+50% радиус сбора опыта',
    rarity: 'common', maxLevel: 3,
    apply: (player) => { player.xpMagnetRadius = (player.xpMagnetRadius || 60) * 1.5; }
  },
  CRITICAL: {
    id: 'CRITICAL', name: 'Критический удар', icon: '💥',
    desc: '+10% шанс критического удара (2x урон)',
    rarity: 'rare', maxLevel: 5,
    apply: (player) => { player.critChance = (player.critChance || 0) + 10; }
  },
  XP_GAIN: {
    id: 'XP_GAIN', name: 'Мудрость', icon: '📚',
    desc: '+20% получаемый опыт',
    rarity: 'common', maxLevel: 5,
    apply: (player) => { player.xpMult = (player.xpMult || 1) * 1.2; }
  },
  COOLDOWN: {
    id: 'COOLDOWN', name: 'Быстрые руки', icon: '⏩',
    desc: '-10% перезарядка всего оружия',
    rarity: 'epic', maxLevel: 5,
    apply: (player) => { player.cdMult = (player.cdMult || 1) * 0.9; }
  }
};

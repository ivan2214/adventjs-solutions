export interface Challenge {
  day: number;
  title: string;
  emoji: string;
  difficulty: "Fácil" | "Medio" | "Difícil";
  solved: boolean;
  solution?: string;
  description?: string;
}

export const challenges: Challenge[] = [
  {
    day: 1,
    title: "¡Primer regalo repetido!",
    emoji: "🎁",
    difficulty: "Fácil",
    solved: true,
    description:
      "Encuentra el primer regalo que aparece dos veces en la lista.",
    solution: `function findFirstRepeated(gifts) {
  const seen = new Set()
  for (const gift of gifts) {
    if (seen.has(gift)) return gift
    seen.add(gift)
  }
  return -1
}`,
  },
  {
    day: 2,
    title: "Enmarcando nombres",
    emoji: "🖼️",
    difficulty: "Fácil",
    solved: true,
    description: "Crea un marco de asteriscos alrededor de los nombres.",
    solution: `function createFrame(names) {
  const maxLength = Math.max(...names.map(n => n.length))
  const border = '*'.repeat(maxLength + 4)
  const framedNames = names.map(n => \`* \${n.padEnd(maxLength)} *\`)
  return [border, ...framedNames, border].join('\\n')
}`,
  },
  {
    day: 3,
    title: "Organizando el inventario",
    emoji: "🏗️",
    difficulty: "Fácil",
    solved: true,
    description: "Organiza y agrupa el inventario de juguetes.",
    solution: `function organizeInventory(inventory) {
  return inventory.reduce((acc, { name, quantity, category }) => {
    acc[category] = acc[category] || {}
    acc[category][name] = (acc[category][name] || 0) + quantity
    return acc
  }, {})
}`,
  },
  {
    day: 4,
    title: "Decorando el árbol de Navidad",
    emoji: "🎄",
    difficulty: "Medio",
    solved: true,
    description: "Genera un árbol de Navidad con decoraciones.",
    solution: `function createChristmasTree(ornaments, height) {
  const tree = []
  let index = 0
  for (let i = 1; i <= height; i++) {
    let row = ''
    for (let j = 0; j < i; j++) {
      row += ornaments[index % ornaments.length]
      index++
    }
    tree.push(row.padStart(height - 1 + row.length / 2))
  }
  tree.push('|'.padStart(height))
  return tree.join('\\n')
}`,
  },
  {
    day: 5,
    title: "Emparejando botas",
    emoji: "👞",
    difficulty: "Fácil",
    solved: true,
    description: "Encuentra pares de botas del mismo tamaño.",
    solution: `function organizeShoes(shoes) {
  const pairs = {}
  let count = 0
  for (const { type, size } of shoes) {
    const opposite = type === 'I' ? 'R' : 'I'
    if (pairs[\`\${opposite}-\${size}\`] > 0) {
      pairs[\`\${opposite}-\${size}\`]--
      count++
    } else {
      pairs[\`\${type}-\${size}\`] = (pairs[\`\${type}-\${size}\`] || 0) + 1
    }
  }
  return count
}`,
  },
  {
    day: 6,
    title: "¿Regalo dentro de la caja?",
    emoji: "📦",
    difficulty: "Medio",
    solved: false,
  },
  {
    day: 7,
    title: "El ataque del Grinch",
    emoji: "👹",
    difficulty: "Medio",
    solved: false,
  },
  {
    day: 8,
    title: "La carrera de renos",
    emoji: "🦌",
    difficulty: "Fácil",
    solved: false,
  },
  {
    day: 9,
    title: "El tren mágico",
    emoji: "🚂",
    difficulty: "Medio",
    solved: false,
  },
  {
    day: 10,
    title: "El ensamblador élfico",
    emoji: "👩‍💻",
    difficulty: "Medio",
    solved: false,
  },
  {
    day: 11,
    title: "Nombres de archivos codificados",
    emoji: "🏴‍☠️",
    difficulty: "Fácil",
    solved: false,
  },
  {
    day: 12,
    title: "¿Cuánto cuesta el árbol?",
    emoji: "💵",
    difficulty: "Fácil",
    solved: false,
  },
  {
    day: 13,
    title: "¿El robot está de vuelta?",
    emoji: "🤖",
    difficulty: "Difícil",
    solved: false,
  },
  {
    day: 14,
    title: "Acomodando los renos",
    emoji: "🦌",
    difficulty: "Fácil",
    solved: false,
  },
  {
    day: 15,
    title: "Dibujando tablas",
    emoji: "✏️",
    difficulty: "Fácil",
    solved: false,
  },
  {
    day: 16,
    title: "Limpiando la nieve del camino",
    emoji: "❄️",
    difficulty: "Fácil",
    solved: false,
  },
  {
    day: 17,
    title: "Busca las bombas del Grinch",
    emoji: "💣",
    difficulty: "Medio",
    solved: false,
  },
  {
    day: 18,
    title: "La agenda mágica de Santa",
    emoji: "📇",
    difficulty: "Difícil",
    solved: false,
  },
  {
    day: 19,
    title: "Apila cajas mágicas",
    emoji: "📦",
    difficulty: "Difícil",
    solved: false,
  },
  {
    day: 20,
    title: "Regalos faltantes y duplicados",
    emoji: "🎁",
    difficulty: "Fácil",
    solved: false,
  },
  {
    day: 21,
    title: "Altura del árbol de Navidad",
    emoji: "🎄",
    difficulty: "Fácil",
    solved: false,
  },
  {
    day: 22,
    title: "Genera combinaciones de regalos",
    emoji: "🎁",
    difficulty: "Medio",
    solved: false,
  },
  {
    day: 23,
    title: "Encuentra los números perdidos",
    emoji: "🔢",
    difficulty: "Fácil",
    solved: false,
  },
  {
    day: 24,
    title: "Árboles espejos mágicos",
    emoji: "🪞",
    difficulty: "Medio",
    solved: false,
  },
  {
    day: 25,
    title: "Ejecuta el lenguaje mágico",
    emoji: "🪄",
    difficulty: "Medio",
    solved: false,
  },
];

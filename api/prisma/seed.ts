import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default organization
  const organization = await prisma.organization.upsert({
    where: { slug: 'lumo-default' },
    update: {},
    create: {
      name: 'Lumo Default',
      slug: 'lumo-default',
      email: 'admin@pitayacode.io',
    },
  });
  console.log('✅ Organization created:', organization.name);

  // Create admin user
  const hashedPassword = await bcrypt.hash('pitaya123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@pitayacode.io' },
    update: {},
    create: {
      email: 'admin@pitayacode.io',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'Lumo',
    },
  });
  console.log('✅ Admin user created:', adminUser.email);

  // Create membership
  await prisma.membership.upsert({
    where: {
      userId_tenant_id: {
        userId: adminUser.id,
        tenant_id: organization.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      tenant_id: organization.id,
    },
  });
  console.log('✅ Membership created');

  // Create sample phonemes for Spanish
  const phonemes = [
    { symbol: 'a', name: 'Vocal A', language: 'es', examples: JSON.stringify(['casa', 'mama', 'papa']) },
    { symbol: 'e', name: 'Vocal E', language: 'es', examples: JSON.stringify(['mesa', 'perro', 'leche']) },
    { symbol: 'i', name: 'Vocal I', language: 'es', examples: JSON.stringify(['silla', 'niño', 'piso']) },
    { symbol: 'o', name: 'Vocal O', language: 'es', examples: JSON.stringify(['oso', 'lobo', 'mono']) },
    { symbol: 'u', name: 'Vocal U', language: 'es', examples: JSON.stringify(['luna', 'uva', 'mundo']) },
    { symbol: 'p', name: 'Consonante P', language: 'es', examples: JSON.stringify(['papa', 'pelo', 'piso']) },
    { symbol: 'b', name: 'Consonante B', language: 'es', examples: JSON.stringify(['barco', 'bebé', 'boca']) },
    { symbol: 't', name: 'Consonante T', language: 'es', examples: JSON.stringify(['taza', 'tigre', 'topo']) },
    { symbol: 'd', name: 'Consonante D', language: 'es', examples: JSON.stringify(['dedo', 'dado', 'duna']) },
    { symbol: 'k', name: 'Consonante K', language: 'es', examples: JSON.stringify(['casa', 'queso', 'kilo']) },
  ];

  for (const phoneme of phonemes) {
    await prisma.phoneme.upsert({
      where: { symbol: phoneme.symbol },
      update: {},
      create: phoneme,
    });
  }
  console.log('✅ Phonemes created');

  // Create sample exercises
  const exercises = [
    {
      name: 'Vocales Básicas',
      description: 'Practica la pronunciación de las vocales A, E, I, O, U',
      difficulty: 'beginner',
      category: 'vowels',
      tenant_id: organization.id,
      content: JSON.stringify({
        instructions: 'Repite cada vocal después de Lumi',
        phonemes: ['a', 'e', 'i', 'o', 'u'],
      }),
    },
    {
      name: 'Sonidos de Animales',
      description: 'Aprende a pronunciar los nombres de animales',
      difficulty: 'beginner',
      category: 'words',
      tenant_id: organization.id,
      content: JSON.stringify({
        instructions: 'Di el nombre de cada animal',
        words: ['perro', 'gato', 'pájaro', 'pez', 'conejo'],
      }),
    },
    {
      name: 'Palabras con P',
      description: 'Practica palabras que empiezan con P',
      difficulty: 'intermediate',
      category: 'consonants',
      tenant_id: organization.id,
      content: JSON.stringify({
        instructions: 'Repite cada palabra que empieza con P',
        words: ['papa', 'pelo', 'piso', 'pato', 'puma'],
      }),
    },
  ];

  for (const exercise of exercises) {
    await prisma.speechExercise.create({
      data: exercise,
    });
  }
  console.log('✅ Exercises created');

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

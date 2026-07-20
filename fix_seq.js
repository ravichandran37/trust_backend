const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.$executeRawUnsafe(`SELECT setval('"GalleryItem_id_seq"', COALESCE((SELECT MAX(id) FROM "GalleryItem"), 1));`);
  console.log('Fixed GalleryItem seq');
}
main().catch(console.error).finally(() => prisma.$disconnect());
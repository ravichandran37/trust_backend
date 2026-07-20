const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 

async function main() { 
  // Add 'Stories & News' to 'about_us'
  await prisma.menuOption.create({
    data: { category: 'about_us', label: 'Stories & News', linkId: 'stories' }
  });
  
  // Optionally, we could remove the old 'stories_news' ones if we wanted, but the user can delete them in the admin panel if they are no longer needed.
  console.log('Added Stories & News to about_us');
} 

main().catch(console.error).finally(() => prisma.$disconnect());

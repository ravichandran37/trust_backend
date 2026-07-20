const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 

async function main() { 
  const count = await prisma.menuOption.count(); 
  if (count > 0) { 
    console.log('Already seeded'); 
    return; 
  } 
  
  await prisma.menuOption.createMany({ 
    data: [ 
      { category: 'about_us', label: 'Board Members', linkId: 'board-members' }, 
      { category: 'about_us', label: 'Overview', linkId: 'overview' }, 
      { category: 'about_us', label: 'Our Reports', linkId: 'our-reports' }, 
      { category: 'about_us', label: 'Our Initiatives', linkId: 'our-initiatives' }, 
      { category: 'our_work', label: 'Participatory Water Management', linkId: 'participatory-water-management' }, 
      { category: 'our_work', label: 'Disability', linkId: 'disability' }, 
      { category: 'our_work', label: 'Livelihood', linkId: 'livelihood' }, 
      { category: 'our_work', label: 'Education', linkId: 'education' }, 
      { category: 'get_involved', label: 'Become Volunteer', linkId: 'become-volunteer' }, 
      { category: 'get_involved', label: 'Partner With Us', linkId: 'partner-with-us' }, 
      { category: 'get_involved', label: 'Careers', linkId: 'careers' }, 
      { category: 'stories_news', label: 'Our Stories', linkId: 'our-stories' }, 
      { category: 'stories_news', label: 'Activity Report', linkId: 'activity-report' } 
    ]
  }); 
  console.log('Seeded menu options'); 
} 

main().catch(console.error).finally(() => prisma.$disconnect());

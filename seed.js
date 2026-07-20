const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SEED_DONATIONS = [
  {
    id: 'don_1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@gmail.com',
    phone: '9876543210',
    pan: 'ABCDE1234F',
    amount: 10000,
    frequency: 'one-time',
    paymentMethod: 'upi',
    date: '2026-07-02T10:15:30.000Z',
    campaignId: 'camp_education',
    campaignName: 'Vidya Scholarship (Education)',
  },
  {
    id: 'don_2',
    name: 'Priya Sharma',
    email: 'priya.sharma@yahoo.com',
    phone: '9823456789',
    pan: 'FGHIJ5678K',
    amount: 2500,
    frequency: 'monthly',
    paymentMethod: 'card',
    date: '2026-07-05T14:30:00.000Z',
    campaignId: 'camp_healthcare',
    campaignName: 'Rural Mobile Clinics (Healthcare)',
  },
  {
    id: 'don_3',
    name: 'Amit Patel',
    email: 'amit.patel@outlook.com',
    phone: '9812345670',
    pan: 'KLMNO9012P',
    amount: 5000,
    frequency: 'one-time',
    paymentMethod: 'netbank',
    date: '2026-07-06T18:45:00.000Z',
    campaignId: 'camp_livelihood',
    campaignName: 'Women Livelihood Center (Livelihood)',
  },
  {
    id: 'don_4',
    name: 'Sneha Reddy',
    email: 'sneha.r@gmail.com',
    phone: '9890123456',
    pan: '',
    amount: 1000,
    frequency: 'monthly',
    paymentMethod: 'upi',
    date: '2026-07-08T09:00:00.000Z',
    campaignId: 'camp_environment',
    campaignName: 'Green Villages (Solar Grid)',
  },
  {
    id: 'don_5',
    name: 'Vikram Singh',
    email: 'vikram.singh@gmail.com',
    phone: '9834567890',
    pan: 'PQRST3456U',
    amount: 25000,
    frequency: 'one-time',
    paymentMethod: 'netbank',
    date: '2026-07-09T11:20:00.000Z',
    campaignId: 'camp_general',
    campaignName: 'General Fund',
  },
  {
    id: 'don_6',
    name: 'Anjali Gupta',
    email: 'anjali.g@gmail.com',
    phone: '9765432109',
    pan: 'ASDGH7890J',
    amount: 1500,
    frequency: 'one-time',
    paymentMethod: 'upi',
    date: '2026-07-10T16:40:00.000Z',
    campaignId: 'camp_education',
    campaignName: 'Vidya Scholarship (Education)',
  }
];

const SEED_QUERIES = [
  {
    id: 'qry_1',
    name: 'Subhash Chandra',
    email: 's.chandra@tcs.com',
    subject: 'CSR Funding / Sponsorship Opportunities',
    message: 'Greetings. Our corporate CSR board is interested in sponsoring a new digital lab/computer center in a rural Tamil Nadu secondary school. Could you provide us with a detailed proposal and budget breakdown? We need to verify your Ministry of Corporate Affairs registration. Thank you.',
    date: '2026-07-08T11:05:00.000Z',
    status: 'Pending',
    category: 'CSR Sponsorship',
    reply: ''
  },
  {
    id: 'qry_2',
    name: 'Meera Nair',
    email: 'meera.nair@gmail.com',
    subject: 'Volunteering for Medical Clinics',
    message: 'Hello, I am a certified nurse practitioner based in Chennai. I would love to volunteer for your mobile medical clinics and weekend treatment camps. Please let me know the calendar of operations and the registration/onboarding process.',
    date: '2026-07-09T08:14:00.000Z',
    status: 'Replied',
    category: 'Volunteering',
    reply: 'Hello Meera, thank you for reaching out to us. We would be absolutely thrilled to have your expertise onboard. Our next mobile medical clinic is scheduled for July 18th in Kanchipuram district. I have emailed you our volunteer onboarding details and code of conduct. Looking forward to working together!'
  },
  {
    id: 'qry_3',
    name: 'Karthik Raja',
    email: 'karthik.raja@yahoo.co.in',
    subject: 'Tax Receipt Issue (80G Exemption)',
    message: 'Dear Sir, I completed a donation of Rs. 2,500 online on July 8th. I received the generic payment success notification, but I have not yet received the official Section 80G tax-deductible receipt. Can you check if my PAN ABCDE1234F is registered and resend the email? Thank you.',
    date: '2026-07-10T07:22:00.000Z',
    status: 'Pending',
    category: 'Tax Receipt',
    reply: ''
  },
  {
    id: 'qry_4',
    name: 'Lakshmi Prasad',
    email: 'lakshmi.p@live.in',
    subject: 'General School Kit Costs',
    message: 'How much does it cost to fully support study kits (bags, textbooks, stationery) for a classroom of 30 rural children? Do you support modular school grants where we can track the children progress?',
    date: '2026-07-11T05:30:00.000Z',
    status: 'Pending',
    category: 'General',
    reply: ''
  }
];

const SEED_CAMPAIGNS = [
  {
    id: 'camp_education',
    name: 'Vidya Scholarship (Education)',
    target: 500000,
    raised: 331500,
    category: 'Education',
    description: 'Providing textbooks, study materials, and school fees to children in need.'
  },
  {
    id: 'camp_healthcare',
    name: 'Rural Mobile Clinics (Healthcare)',
    target: 350000,
    raised: 212500,
    category: 'Healthcare',
    description: 'Running mobile diagnostic health checkups and distributing medicines.'
  },
  {
    id: 'camp_livelihood',
    name: 'Women Livelihood Center (Livelihood)',
    target: 250000,
    raised: 185000,
    category: 'Livelihood',
    description: 'Vocational training courses in tailoring, handicrafts, and basic technology.'
  },
  {
    id: 'camp_environment',
    name: 'Green Villages (Solar Grid)',
    target: 400000,
    raised: 121000,
    category: 'Environment',
    description: 'Installing solar street lamps and environmental support systems in grids.'
  },
  {
    id: 'camp_general',
    name: 'General Fund',
    target: 200000,
    raised: 125000,
    category: 'General',
    description: 'Flexible funds used to maintain office operations and urgent outreach.'
  }
];

const SEED_GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Media' },
  { id: 'education', label: 'Education' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'community', label: 'Community' },
  { id: 'environment', label: 'Environment' }
];

const SEED_GALLERY_ITEMS = [
  {
    id: 1,
    src: '/images/hero.png',
    category: 'education',
    title: 'Vidya Scholarship Distribution 2025',
    date: 'Jan 2026',
    description: 'Distribution of scholarships and textbooks to students at the regional community hall.'
  },
  {
    id: 2,
    src: '/images/medical.png',
    category: 'healthcare',
    title: 'Mobile Medical Van Diagnostics',
    date: 'Dec 2025',
    description: 'Arogya health outreach checking senior citizens in the interior villages.'
  },
  {
    id: 3,
    src: '/images/women.png',
    category: 'community',
    title: 'Tailoring & Craft Training Seminar',
    date: 'Nov 2025',
    description: 'Vocational training lab helping local women create artisan textiles.'
  },
  {
    id: 4,
    src: '/images/green.png',
    category: 'environment',
    title: 'Afforestation Drive & Tree Guard Fitment',
    date: 'Oct 2025',
    description: 'Youth volunteers securing native saplings to restore local water levels.'
  },
  {
    id: 5,
    src: '/images/hero.png',
    category: 'education',
    title: 'Rural Computer Center Opening',
    date: 'Sep 2025',
    description: 'First digital classroom set up with desktop systems in district high school.'
  },
  {
    id: 6,
    src: '/images/medical.png',
    category: 'healthcare',
    title: 'Free Cataract Detection Camps',
    date: 'Aug 2025',
    description: 'Doctors conducting high-precision ocular tests for rural farmers.'
  },
  {
    id: 7,
    src: '/images/women.png',
    category: 'community',
    title: 'Micro-Finance & Self-Help Group Meet',
    date: 'Jul 2025',
    description: 'Advisory panel training graduates on business budget sheets.'
  },
  {
    id: 8,
    src: '/images/green.png',
    category: 'environment',
    title: 'Solar Streetlight Commissioning',
    date: 'Jun 2025',
    description: 'First set of clean-energy solar lamp posts installed along main village road.'
  }
];

const SEED_SERVICES = [
  {
    id: 'vidya',
    category: 'education',
    title: 'Vidya Scholarship Program',
    shortDesc: 'Funding college and secondary school tuition fees for merit-based underprivileged rural students.',
    longDesc: 'The Vidya Scholarship Program identifies brilliant students from low-income agricultural families who cannot afford higher secondary or collegiate tuition. We pay direct collegiate fees, supply textbooks, and assign corporate mentors to help guide their career paths.',
    metric: '850+ Scholarships Awarded',
    image: '/images/hero.png',
    icon: 'BookOpen',
    subProjects: ['College Tuition Coverage', 'Textbook Distribution Camps', 'Digital Literacy Labs', '1-on-1 Mentorship Circles'],
    impactTestimony: '"Without Mother Teresa Home, I would have dropped out after 10th grade. Today, I am a junior software engineer." — Ramesh Kumar, Vidya Scholar 2021.'
  },
  {
    id: 'arogya',
    category: 'healthcare',
    title: 'Arogya Medical Camps',
    shortDesc: 'Conducting free primary diagnostic checkups, vision tests, and distributing life-saving medicines in remote clusters.',
    longDesc: 'Through Arogya Mobile clinics, we bring state-of-the-art diagnostic screening, general physician consults, and pediatric checkups to tribal and isolated hill stations where medical infrastructure is non-existent. Critical surgeries are sponsored via partner hospitals.',
    metric: '14,000+ Patients Treated',
    image: '/images/medical.png',
    icon: 'Activity',
    subProjects: ['Weekly General Health Clinics', 'Free Cataract Eye Surgeries', 'Pediatric Vaccination Support', 'Clean Sanitation & Hygiene Drives'],
    impactTestimony: '"The mobile clinic comes to our village every Tuesday. The free medicines have controlled my mother\'s hypertension." — M. Selvi, Beneficiary.'
  },
  {
    id: 'skill',
    category: 'livelihood',
    title: 'Women Skill Development',
    shortDesc: 'Vocational training in sewing, textile weaving, and computer basics to foster financial self-reliance.',
    longDesc: 'Our vocational schools provide women with structured certifications in professional sewing, fashion embroidery, and digital data entry. Graduates receive a free sewing machine or are placed in corporate craft units to immediately start earning.',
    metric: '420+ Women Certified',
    image: '/images/women.png',
    icon: 'Heart',
    subProjects: ['Tailoring & Sewing Certifications', 'Applique & Craft Design Workshops', 'Basic Computer & Accounting Literacy', 'Self-Help Group Financing Support'],
    impactTestimony: '"I bought my own sewing machine using the trust\'s micro-subsidy. I now support my two children\'s education." — Priya Devi, Boutique Owner.'
  },
  {
    id: 'green',
    category: 'environment',
    title: 'Green Village Drive',
    shortDesc: 'Promoting solar lighting, organic farming advice, and community reforestation for eco-resilience.',
    longDesc: 'The Green Village initiative focuses on environmental sustainability. We install solar-powered streetlights, facilitate water harvesting check-dams, conduct workshops on compost-based organic farming, and coordinate local reforestation programs.',
    metric: '2,500+ Saplings Planted',
    image: '/images/green.png',
    icon: 'Shield',
    subProjects: ['Solar Streetlight Installation', 'Reforestation & Tree Guards', 'Water Check-Dam Construction', 'Organic Composting Seminars'],
    impactTestimony: '"Our village streets are safe to walk at night now thanks to the solar streetlights. The youth also planted 300 neem trees." — Panchayat President.'
  }
];

async function main() {
  console.log('Seeding Database...');

  // 1. Seed Donations
  for (const don of SEED_DONATIONS) {
    await prisma.donation.create({
      data: {
        id: don.id,
        name: don.name,
        email: don.email,
        phone: don.phone,
        pan: don.pan,
        amount: don.amount,
        frequency: don.frequency,
        paymentMethod: don.paymentMethod,
        date: new Date(don.date),
        campaignId: don.campaignId,
        campaignName: don.campaignName
      }
    });
  }
  
  // 2. Seed Queries
  for (const qry of SEED_QUERIES) {
    await prisma.query.create({
      data: {
        id: qry.id,
        name: qry.name,
        email: qry.email,
        subject: qry.subject,
        message: qry.message,
        date: new Date(qry.date),
        status: qry.status,
        category: qry.category,
        reply: qry.reply
      }
    });
  }

  // 3. Seed Campaigns
  for (const camp of SEED_CAMPAIGNS) {
    await prisma.campaign.create({
      data: {
        id: camp.id,
        name: camp.name,
        target: camp.target,
        raised: camp.raised,
        category: camp.category,
        description: camp.description
      }
    });
  }

  // 4. Seed Gallery Categories
  for (const gc of SEED_GALLERY_CATEGORIES) {
    await prisma.galleryCategory.create({
      data: {
        id: gc.id,
        label: gc.label
      }
    });
  }

  // 5. Seed Gallery Items
  for (const gi of SEED_GALLERY_ITEMS) {
    await prisma.galleryItem.create({
      data: {
        id: gi.id,
        src: gi.src,
        category: gi.category,
        title: gi.title,
        date: gi.date,
        description: gi.description
      }
    });
  }

  // 6. Seed Services
  for (const svc of SEED_SERVICES) {
    await prisma.service.create({
      data: {
        id: svc.id,
        category: svc.category,
        title: svc.title,
        shortDesc: svc.shortDesc,
        longDesc: svc.longDesc,
        metric: svc.metric,
        image: svc.image,
        icon: svc.icon,
        subProjects: svc.subProjects,
        impactTestimony: svc.impactTestimony
      }
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

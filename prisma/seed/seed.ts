import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import users from './user.json' with { type: 'json' };
import posts from './posts.json' with { type: 'json' };
import tags from './tags.json' with { type: 'json' };
import postTags from './postTags.json' with { type: 'json' };
import pageViews from './pageViews.json' with { type: 'json' };
import mediaFiles from './mediaFiles.json' with { type: 'json' };
import subscribers from './subscriber.json' with { type: 'json' };

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seed...');

  // Delete existing records in reverse order of dependencies
  await prisma.pageView.deleteMany();
  await prisma.postTag.deleteMany();
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.subscriber.deleteMany();
  await prisma.mediaFile.deleteMany();
  await prisma.user.deleteMany();

  // Seed users
  console.log('Seeding users...');
  for (const user of users) {
    try {
      await prisma.user.create({
        data: user,
      });
    } catch (error) {
      console.error('Failed to create user:', user.email, error);
      throw error;
    }
  }
  console.log(`✓ Created ${users.length} users`);

  // Seed posts
  console.log('Seeding posts...');
  for (const post of posts) {
    await prisma.post.create({
      data: {
        ...post,
        status: post.status as any,
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
      },
    });
  }
  console.log(`✓ Created ${posts.length} posts`);

  // Seed tags
  console.log('Seeding tags...');
  for (const tag of tags) {
    await prisma.tag.create({
      data: tag,
    });
  }
  console.log(`✓ Created ${tags.length} tags`);

  // Seed post tags (relationships)
  console.log('Seeding post tags...');
  for (const postTag of postTags) {
    await prisma.postTag.create({
      data: postTag,
    });
  }
  console.log(`✓ Created ${postTags.length} post-tag relationships`);

  // Seed page views
  console.log('Seeding page views...');
  for (const pageView of pageViews) {
    await prisma.pageView.create({
      data: pageView,
    });
  }
  console.log(`✓ Created ${pageViews.length} page views`);

  // Seed media files
  console.log('Seeding media files...');
  for (const mediaFile of mediaFiles) {
    await prisma.mediaFile.create({
      data: mediaFile,
    });
  }
  console.log(`✓ Created ${mediaFiles.length} media files`);

  // Seed subscribers
  console.log('Seeding subscribers...');
  for (const subscriber of subscribers) {
    await prisma.subscriber.create({
      data: {
        ...subscriber,
        confirmedAt: subscriber.confirmedAt ? new Date(subscriber.confirmedAt) : null,
        unsubscribedAt: subscriber.unsubscribedAt ? new Date(subscriber.unsubscribedAt) : null,
      },
    });
  }
  console.log(`✓ Created ${subscribers.length} subscribers`);

  console.log('✓ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

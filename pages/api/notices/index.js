import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Urgent notices ordered first directly in Prisma query
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priority: 'desc' }, // 'URGENT' comes after 'NORMAL' in enum definition, so desc puts URGENT first
          { publishDate: 'desc' },
        ],
      });
      return res.status(200).json(notices);
    } catch (error) {
      console.error('Error fetching notices:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, body, category, priority, publishDate, image } = req.body;

      // Server-side validation
      if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Title is required and must be a string' });
      }
      if (!body || typeof body !== 'string') {
        return res.status(400).json({ error: 'Body is required and must be a string' });
      }
      
      const validCategories = ['EXAM', 'EVENT', 'GENERAL'];
      if (!validCategories.includes(category)) {
        return res.status(400).json({ error: 'Valid category is required (EXAM, EVENT, GENERAL)' });
      }

      const validPriorities = ['NORMAL', 'URGENT'];
      if (!validPriorities.includes(priority)) {
        return res.status(400).json({ error: 'Valid priority is required (NORMAL, URGENT)' });
      }

      if (!publishDate || isNaN(Date.parse(publishDate))) {
        return res.status(400).json({ error: 'Valid publish date is required' });
      }

      const notice = await prisma.notice.create({
        data: {
          title,
          body,
          category,
          priority,
          publishDate: new Date(publishDate),
          image: image || null,
        },
      });

      return res.status(201).json(notice);
    } catch (error) {
      console.error('Error creating notice:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

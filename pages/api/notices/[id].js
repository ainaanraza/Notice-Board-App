import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid notice ID' });
  }

  if (req.method === 'PUT') {
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

      // Check if notice exists
      const existingNotice = await prisma.notice.findUnique({ where: { id } });
      if (!existingNotice) {
        return res.status(404).json({ error: 'Notice not found' });
      }

      const notice = await prisma.notice.update({
        where: { id },
        data: {
          title,
          body,
          category,
          priority,
          publishDate: new Date(publishDate),
          image: image || null,
        },
      });

      return res.status(200).json(notice);
    } catch (error) {
      console.error('Error updating notice:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const existingNotice = await prisma.notice.findUnique({ where: { id } });
      if (!existingNotice) {
        return res.status(404).json({ error: 'Notice not found' });
      }

      await prisma.notice.delete({
        where: { id },
      });

      return res.status(200).json({ message: 'Notice deleted successfully' });
    } catch (error) {
      console.error('Error deleting notice:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

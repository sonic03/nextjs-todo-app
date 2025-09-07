import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const todos = await prisma.todo.findMany({ orderBy: { createdAt: "desc" } });
      return res.status(200).json(todos);
    }

    if (req.method === "POST") {
      const { title, description } = req.body;
      if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
      }

      const newTodo = await prisma.todo.create({
        data: { title, description }
      });

      return res.status(201).json(newTodo);
    }

    if (req.method === "PUT") {
      const { id, updates } = req.body;
      debugger;
      if (!id) return res.status(400).json({ error: "ID is required" });

      const updated = await prisma.todo.update({
        where: { id },
        data: updates
      });

      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: "ID is required" });

      await prisma.todo.delete({ where: { id } });
      return res.status(204).end();
    }

    res.setHeader("Allow", ["GET","POST","PUT","DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

import app from "./app";
import initializeDatabase from "./db";

const start = async () => {
  const controller = await initializeDatabase();

  app.get("/", (req, res, next) => res.send("ok"));

  // CREATE
  app.get("/articles/new", async (req, res, next) => {
    try {
      const { title , text ,img_path ,link } = req.query;
      const result = await controller.createArticle({ title , text ,img_path ,link });
      res.json({ success: true, result });
    } catch (e) {
      next(e);
    }
  });

  // READ
  app.get("/articles/get/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const article = await controller.getArticle(id);
      res.json({ success: true, result: article });
    } catch (e) {
      next(e);
    }
  });

  // DELETE
  app.get("/articles/delete/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await controller.deleteArticle(id);
      res.json({ success: true, result });
    } catch (e) {
      next(e);
    }
  });

  // UPDATE
  app.get("/articles/update/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title , text ,img_path ,link } = req.query;
      const result = await controller.updateArticle(id, { title , text ,img_path ,link });
      res.json({ success: true, result });
    } catch (e) {
      next(e);
    }
  });

  // LIST
  app.get("/articles/list", async (req, res, next) => {
    try {
      const { order } = req.query;
      const articles = await controller.getArticlesList(order);
      res.json({ success: true, result: articles });
    } catch (e) {
      next(e);
    }
  });

  // ERROR
  app.use((err, req, res, next) => {
    console.error(err)
    const message = err.message
    res.status(500).json({ success:false, message })
  })
  
  app.listen(8080, () => console.log("server listening on port 8080"));
};

start();

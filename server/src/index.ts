import express, { Request } from "express";
import { db, notes, pdfs, users } from "./db";
import { eq, lt, gte, ne } from "drizzle-orm";
import cors from "cors";

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(cors<Request>());

app.get("/", (req, res) => {
  res.send("Hello World from Express 1");
});

app.post("/createUser", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send("Bad Request: User name not provided");
  }

  const { name } = req.body;

  try {
    const result = await db.insert(users).values({ name });
  } catch (e) {
    return res.status(500).send(`Internal Server Error: ${e}`);
  }

  return res.status(200).send();
});

app.get("/getUsers", async (req, res) => {
  const result = await db.select().from(users);

  // console.log(`USERS: ${JSON.stringify(result)}`);

  res.status(200).json(result);
});

app.get("/getNotes", async (req: Request<{}, {}, { pdfId: string }>, res) => {
  const { pdfId } = req.query;

  if (!pdfId) {
    return res.status(400).send("Bad Request: pdfId not provided");
  }

  console.log(`FETCHING NOTES FOR PDF ID: ${pdfId}`);

  const result = await db
    .select()
    .from(notes)
    .where(eq(notes.pdfId, parseInt(pdfId as string)));

  return res.status(200).json(result);
});

app.get("/getPdf", async (req: Request<{}, {}, { pdfId: string }>, res) => {
  const { pdfId } = req.query;

  if (!pdfId) {
    return res.status(400).send("Bad Request: pdfId not provided");
  }

  console.log(`FETCHING PDF ID: ${pdfId}`);

  const result = await db
    .select()
    .from(pdfs)
    .where(eq(pdfs.id, parseInt(pdfId as string)));

  return res.status(200).json(result[0]);
});

app.get("/getPdfs", async (req: Request<{}, {}, { userId: string }>, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).send("Bad Request: userId not provided");
  }

  const result = await db
    .select()
    .from(pdfs)
    .where(eq(pdfs.pdfOwnerId, parseInt(userId as string)));

  return res.status(200).json(result);
});

// app.post(
//   "/createNote",
//   async (
//     req: Request<
//       {},
//       {},
//       { pdfId: string; chapter: string; header: string; body: string }
//     >,
//     res
//   ) => {
//     const { pdfId, chapter, header, body } = req.body;

//     if (!pdfId || !chapter || !header || !body) {
//       return res
//         .status(400)
//         .send("Bad Request, expected pdfId, chapter, header, body");
//     }

//     console.log(
//       `CREATING NOTE: pdfID: ${pdfId} | chapter: ${chapter} | header: ${header} | body: ${body}`
//     );

//     const result = await db.insert(notes).values({
//       chapter: chapter,
//       header: header,
//       body: body,
//       pdfId: parseInt(pdfId as string),
//     });

//     res.status(200).send();
//   }
// );

app.post(
  "/createQuestion",
  async (
    req: Request<
      {},
      {},
      { pdfId: string; chapter: string; header: string; question: string }
    >,
    res
  ) => {
    const { pdfId, chapter, header, question } = req.body;

    if (!pdfId || !chapter || !header || !question) {
      return res
        .status(400)
        .send("Bad Request, expected pdfId, chapter, header, question");
    }

    console.log(
      `CREATING NOTE: pdfID: ${pdfId} | chapter: ${chapter} | header: ${header} | body: ${question}`
    );

    const result = await db.insert(notes).values({
      chapter: chapter,
      header: header,
      question: question,
      pdfId: parseInt(pdfId as string),
    });

    res.status(200).send();
  }
);

app.post(
  "/answerQuestion",
  async (req: Request<{}, {}, { id: string; answer: string }>, res) => {
    const { id, answer } = req.body;

    if (!id || !answer) {
      return res.status(400).send("Bad Request, expected noteId, answer");
    }

    console.log(`MODIFYING NOTE: noteID: ${id} | ANSWER: ${answer}`);

    const result = await db
      .update(notes)
      .set({ answer: answer })
      .where(eq(notes.id, parseInt(id as string)));

    res.status(200).send();
  }
);

app.post("/deleteNote", async (req: Request<{}, {}, { id: string }>, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).send("Bad Request: expected note id");

  const result = await db
    .delete(notes)
    .where(eq(notes.id, parseInt(id as string)));

  return res.status(200).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

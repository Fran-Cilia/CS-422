/// AUTHORS: NA, FC, VD, RK, AP
/// LAST EDITED: 4-29-2024
/// DESCRIPTION: index.ts: Describes all of the get/post request routes allowable with this server.
import express, { Request } from "express";
import { db, notes, pdfs, users } from "./db";
import { eq, lt, gte, ne } from "drizzle-orm";
import cors from "cors";

// set up initial Express application and sets default server port to port 3000.
const app = express();
const port = process.env.SERVER_PORT || 3000;

//sets up boilerplate for the Express application to be able to parse JSON requests.
app.use(express.json());
app.use(cors<Request>());

//set up the "/getUsers" get request route
app.get("/getUsers", async (req, res) => {
  //get the users table from the database
  const result = await db.select().from(users);

  //return the result with status 200 as JSON
  res.status(200).json(result);
});

//set up the "/getNotes" get request route
app.get("/getNotes", async (req: Request<{}, {}, { pdfId: string }>, res) => {
  //unwraps the PDF ID value from the query structure
  const { pdfId } = req.query;

  //if the PDF ID is invalid (not provided) return status 400 and error out.
  if (!pdfId) {
    return res.status(400).send("Bad Request: pdfId not provided");
  }

  console.log(`FETCHING NOTES FOR PDF ID: ${pdfId}`);

  //select the notes related to the PDF ID from the notes database
  const result = await db
    .select()
    .from(notes)
    .where(eq(notes.pdfId, parseInt(pdfId as string)));

  //return result with status 200 as JSON
  return res.status(200).json(result);
});

//describes the "/getPDF" get request route
app.get("/getPdf", async (req: Request<{}, {}, { pdfId: string }>, res) => {
  //unwraps the PDF ID value from the query structure
  const { pdfId } = req.query;

  //if the PDF ID is invalid (not provided) return status 400 and error out.
  if (!pdfId) {
    return res.status(400).send("Bad Request: pdfId not provided");
  }

  console.log(`FETCHING PDF ID: ${pdfId}`);

  //get the PDF with the ID provided, taken from the pdfs database.
  const result = await db
    .select()
    .from(pdfs)
    .where(eq(pdfs.id, parseInt(pdfId as string)));

  //return result with status 200 as JSON
  return res.status(200).json(result[0]);
});

//describes the "/getPDFs" get request route
app.get("/getPdfs", async (req: Request<{}, {}, { userId: string }>, res) => {
  //unwrap the UserID field from the query datastructure
  const { userId } = req.query;

  //if no user ID is provided, error out with error 400
  if (!userId) {
    return res.status(400).send("Bad Request: userId not provided");
  }

  //return all PDFs with the owner ID specified
  const result = await db
    .select()
    .from(pdfs)
    .where(eq(pdfs.pdfOwnerId, parseInt(userId as string)));

  //return result with status 200 as JSON
  return res.status(200).json(result);
});

//describes the "/createQuestion" post request route
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
    //unwraps data from req datastructure
    const { pdfId, chapter, header, question } = req.body;

    //if any data is invalid or not provided, return status 400 with error message.
    if (!pdfId || !chapter || !header || !question) {
      return res
        .status(400)
        .send("Bad Request, expected pdfId, chapter, header, question");
    }

    console.log(
      `CREATING NOTE: pdfID: ${pdfId} | chapter: ${chapter} | header: ${header} | body: ${question}`
    );

    //insert the question details into the notes database
    const result = await db.insert(notes).values({
      chapter: chapter,
      header: header,
      question: question,
      pdfId: parseInt(pdfId as string),
    });

    //return status 200
    res.status(200).send();
  }
);

//describes the "/answerQuestion" post request route
app.post(
  "/answerQuestion",
  async (req: Request<{}, {}, { id: string; answer: string }>, res) => {
    //unwrap the question ID and answer text from the req structure
    const { id, answer } = req.body;

    //if either are invalid, return status 400 with error message
    if (!id || !answer) {
      return res.status(400).send("Bad Request, expected noteId, answer");
    }

    console.log(`MODIFYING NOTE: noteID: ${id} | ANSWER: ${answer}`);

    //update the notes database with the answer provided
    const result = await db
      .update(notes)
      .set({ answer: answer })
      .where(eq(notes.id, parseInt(id as string)));

    //return status 200
    res.status(200).send();
  }
);

//sets up server to listen on port 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

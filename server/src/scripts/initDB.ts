import { db, notes, pdfs, users } from "../db";

const PDFs = [
  {
    name: "Sommerville Chapter 6",
    author: "Sommerville",
    path: "sommerville.pdf",
  },
  {
    name: "ENGLISH FOR SCIENCE AND TECHNOLOGY",
    author: "Huckin & Olsen",
    path: "pg_par.pdf",
  },
];

(async () => {
  console.log("INITIALIZING DB");

  console.log("CREATING USERS");

  await db.transaction(async (tx) => {
    await db.insert(users).values({ name: "Tom Cat" });
    await db.insert(users).values({ name: "Jerry Mouse" });
    await db.insert(users).values({ name: "Spike Dog" });
  });

  console.log("CREATING PDFS FOR USERS");

  await db.transaction(async (tx) => {
    const userIds = await db.select({ id: users.id }).from(users);

    console.log(`USER IDS: ${userIds}`);

    await Promise.all(
      userIds.map(async (user_id) => {
        await Promise.all(
          PDFs.map(async (pdf) => {
            await db.insert(pdfs).values({
              name: pdf.name,
              author: pdf.author,
              path: pdf.path,
              pdfOwnerId: user_id.id,
            });
          })
        );
      })
    );
  });

  console.log("CREATING SAMPLE NOTES FOR PDFS");

  await db.transaction(async (tx) => {
    const pdfIds = await db.select({ id: pdfs.id }).from(pdfs);

    await Promise.all(
      pdfIds.map(async ({ id }) => {
        //give each pdf 3 notes
        await db.insert(notes).values({
          chapter: "Minim nulla elit reprehe",
          header: "Minim nulla elit reprehenderit eu anim in quis nulla.",
          body: "Id aute non voluptate. Cillum quis nulla labore pariatur. Qui ex consequat enim proident ipsum veniam officia sit est. Irure ad dolore nostrud sint veniam qui aute Lorem occaecat ad.",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Minim nulla elit reprehe",
          header: "Minim nulla elit reprehenderit eu anim in quis nulla.",
          body: "Id aute non voluptate. Cillum quis nulla labore pariatur. Qui ex consequat enim proident ipsum veniam officia sit est. Irure ad dolore nostrud sint veniam qui aute Lorem occaecat ad.",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Minim nulla elit reprehe",
          header: "Minim nulla elit reprehenderit eu anim in quis nulla.",
          body: "Id aute non voluptate. Cillum quis nulla labore pariatur. Qui ex consequat enim proident ipsum veniam officia sit est. Irure ad dolore nostrud sint veniam qui aute Lorem occaecat ad.",
          pdfId: id,
        });
      })
    );
  });

  console.log("DONE");
  process.exit();
})();

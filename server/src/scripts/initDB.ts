/// AUTHORS: NA, FC, VD, RK, AP
/// LAST EDITED: 4-29-2024
/// DESCRIPTION: initDB.ts: Script that runs to set up the default values in the database. Essentially, preloads data used for testing/demo.
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
    await db.insert(users).values({ name: "Tom Cat", pfpPath: "/tom.png" });
    await db
      .insert(users)
      .values({ name: "Jerry Mouse", pfpPath: "/jerry.png" });
    await db.insert(users).values({ name: "Spike Dog", pfpPath: "/spike.png" });
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
          question:
            "Id aute non voluptate. Cillum quis nulla labore pariatur. Qui ex consequat enim proident ipsum veniam officia sit est. Irure ad dolore nostrud sint veniam qui aute Lorem occaecat ad.",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Minim nulla elit reprehe",
          header: "Minim nulla elit reprehenderit eu anim in quis nulla.",
          question:
            "Id aute non voluptate. Cillum quis nulla labore pariatur. Qui ex consequat enim proident ipsum veniam officia sit est. Irure ad dolore nostrud sint veniam qui aute Lorem occaecat ad.",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Minim nulla elit reprehe",
          header: "Minim nulla elit reprehenderit eu anim in quis nulla.",
          question:
            "Id aute non voluptate. Cillum quis nulla labore pariatur. Qui ex consequat enim proident ipsum veniam officia sit est. Irure ad dolore nostrud sint veniam qui aute Lorem occaecat ad.",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2 Managing People",
          question:
            "Why should a project manager prioritize people over everything?",
          answer: 
            "It is more expensive in both money and productivity to recruit new engineers. A good project manager will focus on keeping engineers with the team and being productive in order to effectively complete tasks. On top of this, making sure people are working on tasks that they are effective at ensures high productivity.",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2 Managing People",
          question:
            "What factors influence how a manager works with their subordinates?",
          answer: 
            "1. Consistency- a good project manager should treat their employees in a predictable manner (treating everyone the same, ensure that nothing is unexpected) 2. Respect- a good project manager should respect the skills and differences in all of their employees. 3. Inclusion- everyone should feel able to contribute to the project 4. Honesty",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2.1 Motivating People",
          question:
            "Why should a project manager motivate people?",
          answer: 
            "An unmotivated engineer gets much less work done than a well motivated one. On top of this, unmotivated engineers will make more mistakes than normal. In order to have a productive team, everyone must be motivated to do their work.",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2.1 Motivating People",
          question:
            "How should a project manager motivate their employees?",
          answer: 
            "A manager should focus on an employees needs in order to determine how they should be motivated. Social needs should be met by giving them opportunities to meet with coworkers and other team members. Esteem needs should be met by showing people they are valued by their organization. \"self realization\" needs should be met by giving people responsibilities and providing opportunities for development.",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2.1 Motivating People",
          question:
            "Why should a project manager motivate people?",
          answer: 
            "An unmotivated engineer gets much less work done than a well motivated one. On top of this, unmotivated engineers will make more mistakes than normal. In order to have a productive team, everyone must be motivated to do their work.",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2.1 Motivating People",
          question:
            "How should a project manager motivate their employees?",
          answer: 
            "A manager should focus on an employees needs in order to determine how they should be motivated. Social needs should be met by giving them opportunities to meet with coworkers and other team members. Esteem needs should be met by showing people they are valued by their organization. \"self realization\" needs should be met by giving people responsibilities and providing opportunities for development.",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2.1 Motivating People",
          question:
            "What motivates people to work in an efficient manner?",
          answer: 
            "People tend to work in an efficient manner when their needs are met. A project manager should consider the needs of each person on their team in order to help them achieve satisfaction and therefore motivation.",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2.1 Motivating People",
          question:
            "What needs might a software engineer have in the corporate environment?",
          answer: 
            "Software engineers typically have most of their basic needs met. In a corporate environment, it is important to focus on social needs (interaction), esteem needs(being valued), and self-realization needs (feeling skilled).",
          pdfId: id,
        });
      })
    );
  });

  console.log("DONE");
  process.exit();
})();

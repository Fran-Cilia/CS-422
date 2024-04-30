/// AUTHORS: NA, FC, VD, RK, AP
/// LAST EDITED: 4-29-2024
/// DESCRIPTION: initDB.ts: Script that runs to set up the default values in the database. Essentially, preloads data used for testing/demo.
import { db, notes, pdfs, users } from "../db";
import { eq } from "drizzle-orm";

const PDFs = [
  {
    name: "Sommerville Chapter 5",
    author: "James Sommerville",
    path: "som5.pdf",
  },
  {
    name: "Sommerville Chapter 6",
    author: "James Sommerville",
    path: "som6.pdf",
  },
  {
    name: "Sommerville Chapter 7",
    author: "James Sommerville",
    path: "som7.pdf",
  },
  {
    name: "Sommerville Chapter 22",
    author: "James Sommerville",
    path: "som22.pdf",
  },
  {
    name: "ENGLISH FOR SCIENCEAND TECHNOLOGY",
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

    // console.log(`USER IDS: ${userIds}`);

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
    const pdfIds = await db
      .select({ id: pdfs.id, path: pdfs.path })
      .from(pdfs)
      .where(eq(pdfs.path, "som22.pdf"));

    await Promise.all(
      pdfIds.map(async ({ id }) => {
        //give each pdf 3 notes
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "Intro",
          question: "What are the principle tasks of project managers?",
          answer:
            "Ensure a project meets and overcomes constraints while delivering solutions.",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "Intro",
          question: "What are the principle tasks of project managers?",
          answer:
            "Ensure a project meets and overcomes constraints while delivering solutions.",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "Intro",
          question: "What are the goals for software projects?",
          answer:
            "Deliver software to customer on time, stay in budget, meet customer expectations, maintain well functioning team",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "Intro",
          question:
            "How is software engineering different from other fields of engineering?",
          answer:
            "The product is 'intangible', it cannot be held or directly observed. Often large projects are 'one off' and not maintained after development. Software processes are not standardized and are organization-specific",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "Intro",
          question: "What are the roles of a project manager?",
          answer:
            "1. Project planning (scheduling, estimating time, assigning tasks) 2. Risk management (assessing and monitoring) 3. People management (choosing people, establishing teamwork styles) 4. Reporting to clients/superiors 5. Writing proposals",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "Intro",
          question: "How does company size affect project management?",
          answer:
            "Small companies can do better with informal management, whereas larger organizations need management hierarchies and more complex bureaucracy.",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "Intro",
          question: "How do customers affect project management?",
          answer:
            "Internal customers (within the company) can often communicate informally, whereas external clients will often require specific modes of communication",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "Intro",
          question: "How does the software size affect project management?",
          answer:
            "Small systems are manageable for small teams allowing informal management, whereas larger systems will need more people requiring much more formal management",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "Intro",
          question: "How does system type affect project management?",
          answer:
            "A system designed for general usage may not need heavy documentation, whereas a system meant for high risk or safety-critical usage needs to be extensively documented. Documentation levels directly influence how formally a project must be managed.",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.1 Risk Management",
          question: "What are different risks a project may face?",
          answer:
            "Project risks affect project scheduling or resources, like the loss of a key team member. Product risks affect the quality of the delivered product, and business risks affect the organization developing the product as a whole.",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.1 Risk Management",
          question: "What is the process of risk management?",
          answer:
            "Risk management happens in stages: 1. Risk identification produces a list of potential risks 2. Risk analysis prioritizes risks based on severity 3. Risk planning figures out how to avoid key risks 4. Risk monitoring assesses how risks change over time",
          pdfId: id,
        });
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.1 Risk Management",
          question: "How does consequence analysis differ from risk analysis?",
          answer:
            "Consequence analysis focuses on the possible results of risk events occuring. Instead of focusing on what a risk is, it focuses on what a risk could cause.",
          pdfId: id,
        });
        ////////////////////////
        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.1.4 Risk identification",
          question: "How do you identify possible risks?",
          answer:
            "Risks can fall into six main categories: 1. Estimation risks (overestimating/underestimating time/labor costs) 2. Organizational risks (changes in organizational environment) 3. People risks (specifically developers) 4. Requirements risks (changes in customer requirements) 5. Technology risks (issues in software or hardware for development/delivery) 6. Tool risks (issues in the tooling used for development) To identify risks, consider each of these categories and possible issues that could arise in them.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.1.4 Risk identification",
          question: "What are examples of common project risks?",
          answer:
            "1. Overestimating or underestimating the time it takes for a tasks 2. Overestimating/underestimating defects or complexity 3. Organizational restructuring leading to a change in management 4. Lack of staff with required skills 5. Change to requirements requiring major reworks 6. Faults in reusable software components 7. Software tooling working together poorly",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.1.4 Risk identification",
          question: "Why use a risk management plan?",
          answer:
            "A risk management plan allows documentation of the risks analyzed and how they were planned for. It also helps to fight organizational risks, as more documentation means less of a chance of lost knowledge during an organization rework.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.1.2 Risk Analysis",
          question: "How do you analyze identified risks?",
          answer:
            "Once risks are identified, they must be analyzed based on past experience. Once you understand the severity of different risks, it is helpful to write out a priority list of different risks (sort based on highest priority to lowest).",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.1.2 Risk Analysis",
          question: "How do you judge the probability of a risk?",
          answer:
            "The probability of a risk should be judged based on circumstance and past experience. It is impossible to determine an exact prioritization, so the main focus is on creating a priority list based on relative judgments to other possible risks.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.1.2 Risk Analysis",
          question: "How should you prioritize certain risks?",
          answer:
            "High priority risks are the ones that should be planned around. Ideally, all high priority risks should have some sort of plan associated with them. Boehm recommends looking at specifically the 10 highest priority risks.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.1.3 Risk Planning",
          question: "How does the risk planning process work?",
          answer:
            "Boehm recommended that the 'top 10' risks should be planned around heavily. A project manager then develops strategies to mitigate these chosen risks. Create a series of 'what-if' questions for each risk and decide how you would handle each situation. Strategies fall into 3 main categories: 1. Avoidance strategies (avoid the risk ever occuring) 2. Minimization strategies (minimize consequences) 3. Contingency plans (pre-planning for the consequences of certain risks)",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.1.3 Risk Planning",
          question:
            "How should you decide what strategies to use to mitigate risk?",
          answer:
            "Strategies to mitigate risk should be chosen based on the type of risk. If it is extremely dangerous but possible to avoid, an avoidance plan should be created. If it is harder to avoid and less dangerous, a minimization plan could be chosen. If it cannot be fully avoided, contingency plans should be put in place.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.1.4 Risk Monitoring",
          question: "What are good ways to monitor risks?",
          answer:
            "You should regularly assess each of the identified risks to see if it is of a lower or higher priority than initially thought. Each key risk should be considered individually.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.1.4 Risk Monitoring",
          question: "How might the probability of a risk change?",
          answer:
            "The probability of a risk may change based on the consequences of other risks, or on general changes in the engineering environment over time. For example, if a key engineer leaves the team you may need to re-consider how other team members would be able to handle risk scenarios.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.1.4 Risk Monitoring",
          question: "Why should you continually monitor risk?",
          answer:
            "Continually monitoring risk is important because risk probabilities can change over time. If you only create a risk plan at the beginning of the project, you may be caught off guard when a new risk occurs that became possible throughout the project life cycle.",
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
          question: "Why should a project manager motivate people?",
          answer:
            "An unmotivated engineer gets much less work done than a well motivated one. On top of this, unmotivated engineers will make more mistakes than normal. In order to have a productive team, everyone must be motivated to do their work.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2.1 Motivating People",
          question: "How should a project manager motivate their employees?",
          answer:
            "A manager should focus on an employee's needs in order to determine how they should be motivated. Social needs should be met by giving them opportunities to meet with coworkers and other team members. Esteem needs should be met by showing people they are valued by their organization. 'Self realization' needs should be met by giving people responsibilities and providing opportunities for development.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2.1 Motivating People",
          question: "What motivates people to work in an efficient manner?",
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
            "Software engineers typically have most of their basic needs met. In a corporate environment, it is important to focus on social needs (interaction), esteem needs (being valued), and self-realization needs (feeling skilled).",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2.1 Motivating People",
          question:
            "What are possible classifications of workers and their needs?",
          answer:
            "People fall into different categories based on how they are motivated: 1. Task oriented workers are motivated by the work they do. Typically, they are motivated by the challenge of the work assigned. 2. Self oriented workers are motivated by their own personal success. They want to achieve their goals over everything, so typically look for ways to advance. 3. Interaction oriented workers are motivated by the actions of their coworkers. They will be best motivated by being on a productive team.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2.1 Motivating People",
          question: "What is the P-CMM model?",
          answer:
            "The People Capability Maturity Model is a framework for assessing how an organization manages the development of their staff. It allows for organizations to improve their people management processes by giving a rating on them.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.3 Teamwork",
          question: "Why is 4-6 people the optimal size for a team?",
          answer:
            "With small groups, communication problems are reduced. 4-6 people allows easy communication while still making sure that there is a good range of technical skills to be able to accomplish a variety of tasks.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.3 Teamwork",
          question: "What makes a cohesive group?",
          answer:
            "A cohesive group must have the right balance of technical skills, experience, and personalities. The key thing that makes a group cohesive is their ability to work as a single unit, rather than a bunch of individuals. People in a cohesive group prioritize the success of the group over their own successes.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.3 Teamwork",
          question: "What are the benefits of a cohesive group?",
          answer:
            "A cohesive group can establish its own quality standards which are more likely to be observed than externally imposed standards. Individuals in a cohesive group can also learn from each other and improve. On top of this, shared knowledge can be used by anyone in the group effectively. Continual improvement is also prioritized in a cohesive group.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.3 Teamwork",
          question: "How can project managers improve group cohesion?",
          answer:
            "A project manager could try to establish group identity by creating a group name, or running group activities. They could also plan social events for group members. Most importantly, a project manager should be inclusive in order to improve cohesion. Avoiding secrets allows for the group to interact freely.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.3 Teamwork",
          question: "What factors affect teamwork?",
          answer:
            "1. People in the group: a good mix is required in order to allow proper teamwork. 2. Group organization: Individuals should be allowed to contribute to the best of their abilities, and this should be promoted in the organization of the group. 3. Communication",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.3.1 Selecting Group Members",
          question: "How should group members be selected?",
          answer:
            "Group members should be selected to have a mix of personality types. Motivation oriented members will be able to lead the charge on development, self oriented members will focus on getting things done over controlling development, and interaction oriented members will enable good team communications.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.3.1 Selecting Group Members",
          question: "What problems can improper group selection lead to?",
          answer:
            "Improper group selection requires the project manager to take more control over the group, leading to less motivation and less productivity. It can cause issues in product quality and time efficiency.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.3.1 Selecting Group Members",
          question:
            "Why is technical knowledge not the only factor to selecting group members?",
          answer:
            "Too many engineers with a lot of technical knowledge can lead to a 'too many cooks in the kitchen' situation, where more time is spent fighting over motivations than actually accomplishing tasks.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2.3 Group Organization",
          question:
            "Why might a project manager not be the technical manager of a group?",
          answer:
            "Often a project manager will not be the most knowledgeable in the technology being used by a group. Or, the person who is most knowledgeable on a technology will be poorly suited to project management. In both of these cases, managerial and technical control tasks should be separated to two separate people.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2.3 Group Organization",
          question: "Why are informal groups helpful? Why are they harmful?",
          answer:
            "Informal groups can improve communication greatly. They also allow decisions to be made quickly. Informal groups are often used in 'agile' development. However, informal groups can become problematic when there is a lack of experienced or skilled engineers to help informally manage the team.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2.3 Group Organization",
          question: "When should a group hierarchy be used?",
          answer:
            "A group hierarchy should be used when clear organizational structure is necessary. It helps in large groups, or groups with a clear hierarchy of skill. They also work well when a problem can be broken into distinct subproblems assigned to groups.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2.3 Group Organization",
          question: "When can a group hierarchy cause harm?",
          answer:
            "Hierarchical organization inhibits communication between levels. Complex software development requires large amounts of communication, so hierarchy often inhibits proper software development.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2.3 Group Communications",
          question: "What affects group communication?",
          answer:
            "As a group gets bigger, the difficulty of communication grows. Group organization also affects communication--experienced members or managers tend to dominate communication over less experienced members. Informally structured groups tend to allow people to communicate more than formally structured groups. On top of this, different personality types and demographics can affect communication. The physical work environment can also lead to different communication styles- open plans encourage communication while closed off areas prevent it.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2.3 Group Communications",
          question: "What communication styles work well for project managers?",
          answer:
            "Project managers try to optimize their communication to work well for their time--emails and meetings take the least time and reach the most people. However, these communication styles can often let people fall through the cracks and keep certain team members out of the loop.",
          pdfId: id,
        });

        await db.insert(notes).values({
          chapter: "Chapter 22",
          header: "22.2.3 Group Communications",
          question: "What communication styles work well for team members?",
          answer:
            "Team members communicate best in a two-way manner, allowing for discussion both ways. Informal communications often work best for this, because meetings can be dominated by the larger personalities or more experienced members.",
          pdfId: id,
        });

        // await db.insert(notes).values({
        //   chapter: "Minim nulla elit reprehe",
        //   header: "Minim nulla elit reprehenderit eu anim in quis nulla.",
        //   question:
        //     "Id aute non voluptate. Cillum quis nulla labore pariatur. Qui ex consequat enim proident ipsum veniam officia sit est. Irure ad dolore nostrud sint veniam qui aute Lorem occaecat ad.",
        //   pdfId: id,
        // });
        // await db.insert(notes).values({
        //   chapter: "Minim nulla elit reprehe",
        //   header: "Minim nulla elit reprehenderit eu anim in quis nulla.",
        //   question:
        //     "Id aute non voluptate. Cillum quis nulla labore pariatur. Qui ex consequat enim proident ipsum veniam officia sit est. Irure ad dolore nostrud sint veniam qui aute Lorem occaecat ad.",
        //   pdfId: id,
        // });
      })
    );
  });

  console.log("DONE");
  process.exit();
})();

const { db } = require("@vercel/postgres");

async function createUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
        DROP TABLE IF EXISTS users;
        CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        pseudo VARCHAR(255) NOT NULL,
        score INTEGER,
        date DATE DEFAULT CURRENT_DATE NOT NULL,
        completed BOOLEAN DEFAULT FALSE
          );
    `;

    console.log(`✅ Created "users" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error(`Error creating "users" table:`, error);
    throw error;
  }
}

async function createQuestions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "questions" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS questions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        description TEXT NOT NULL,
        value INTEGER NOT NULL,
        active BOOLEAN DEFAULT TRUE
            );

    `;

    console.log(`✅ Created "questions" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error(`Error creating "questions" table:`, error);
    throw error;
  }
}

async function createOptions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "questions" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS options (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        description VARCHAR(10) NOT NULL
            );

    `;

    console.log(`✅ Created "options" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error(`Error creating "options" table:`, error);
    throw error;
  }
}

async function createAnswers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "questions" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS answers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        "userId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        "questionId" UUID NOT NULL REFERENCES questions(id),
        "optionId" UUID NOT NULL REFERENCES options(id),
        CONSTRAINT unique_user_question UNIQUE ("userId", "questionId")
            );

    `;

    console.log(`✅ Created "answers" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error(`Error creating "answers" table:`, error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await createUsers(client);
  await createQuestions(client);
  await createOptions(client);
  await createAnswers(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});

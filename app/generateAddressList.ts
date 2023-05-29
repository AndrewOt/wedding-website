import { createClient } from "@vercel/postgres"

async function getAddresses() {
  const client = createClient({
    connectionString:
      "postgres://default:lpYtZTy2UsW8@ep-silent-heart-345623.us-east-1.postgres.vercel-storage.com:5432/verceldb",
  });

  await client.connect();
  const results = await client.sql`SELECT * FROM Rsvps`;

  await client.end();
  return results.rows;
};

// output to text file
async function outputFile() {
  const addresses = await getAddresses();
  let fileString = ``;

  addresses.forEach((row) => {
    const { inviteename, address } = row;
    if (inviteename && address) {
      fileString += `${inviteename}
${address}

`;
    }
  });

  return fileString;
};

export async function generateAddresses() {
  const file = await outputFile();
  return file
};

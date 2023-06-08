import { getRsvps } from "./dbUtilities";

// output to text file
async function outputFile() {
  // const addresses = await getAddresses();
  const addresses = await getRsvps();
  let fileString = ``;

  addresses.forEach((invitee) => {
    const { inviteeName, address } = invitee;
    if (inviteeName && address) {
      fileString += `${inviteeName}
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

import { getRsvps } from "./dbUtilities";

// output to text file
async function outputFile(addressesOnly: boolean) {
  const addresses = await getRsvps();
  let fileString = ``;

  addresses.forEach((invitee) => {
    const { inviteeName, address } = invitee;
    if (inviteeName && !addressesOnly) {
      fileString += `${inviteeName}
`;
    } else if (inviteeName && address && addressesOnly) {
      fileString += `${inviteeName}
${address}

`;
    }
  });

  return fileString;
};

export async function generateAddresses() {
  return await outputFile(true);
};

export async function generateFullNameList() {
  return await outputFile(false);
};

import { getRsvps } from "./dbUtilities";

// output to text file
async function outputFile(addressesOnly: boolean) {
  const addresses = await getRsvps();
  let fileString = ``;

  if (addressesOnly) {
    fileString += `Name,Street Address,City State Zip
`;
  }

  addresses.forEach((invitee) => {
    const { inviteeName, address } = invitee;
    if (inviteeName && !addressesOnly) {
      fileString += `${inviteeName}
`;
    } else if (inviteeName && address && addressesOnly) {
      const [line1, line2] = address.replace(/,/gm, '').split('\n');
      fileString += `${inviteeName},${line1},${line2}
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

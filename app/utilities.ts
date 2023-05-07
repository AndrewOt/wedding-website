import { RSVP } from './routes/rsvps';
import { QueryResultRow, sql } from '@vercel/postgres';

// FYI, the config for this is a bit magical. Basically, they env vars are in
// the cloud and you need a local .env file w/those config values.
// In vercel's handly little postgres lib, they automatically query the correct
// .env variables so you don't have to worry about it.
// Remix does not allow .env variables in the client bundle but they can be
// accessed on the server. These functions are called in actions/loaders so
// we are fine.

export type RsvpPatch = {
  id: string;
  value: string;
  fieldName: string;
}

// The vercel api returns the keys in all lowercase, not 
const adapter = (rows: QueryResultRow[]): RSVP[] => {
  return rows.map((row) => ({
    id: row.id,
    inviteeName: row.inviteename,
    numberOfPeople: row.numberofpeople,
    isAttendingCeremony: row.isattendingceremony,
    isAttendingRehersal: row.isattendingrehersal,
    isAttendingReception: row.isattendingreception,
  }))
};

export const getRsvps = async (inviteeName?: string): Promise<RSVP[]> => {
  let rows;
  
  if (inviteeName !== undefined && inviteeName.length > 0) {
    rows = (await sql`SELECT * FROM Rsvps WHERE InviteeName=${inviteeName}`).rows;
  } else {
    rows = (await sql`SELECT * FROM Rsvps ORDER BY InviteeName ASC`).rows;
  }

  return adapter(rows);
}

export const addRsvp = async (rsvp: RSVP) => {
  const {
    id,
    inviteeName,
    numberOfPeople,
    isAttendingCeremony,
    isAttendingRehersal,
    isAttendingReception,
  } = rsvp;

  try {
    return await sql`INSERT INTO Rsvps (InviteeName, NumberOfPeople, isAttendingCeremony, isAttendingReception, isAttendingRehersal, id) VALUES (${inviteeName}, ${numberOfPeople}, ${isAttendingCeremony}, ${isAttendingReception}, ${isAttendingRehersal}, ${id});`
  } catch (e) {
    return e;
  }
};

// For some reason, the vercel sql api doesn't like us dynamically setting the column in the query 🤷🏻‍♂️
export const updateRsvp = async (rsvpUpdate: RsvpPatch) => {
  const { fieldName, id, value } = rsvpUpdate;
  try {
    switch (fieldName) {
      case 'inviteeName':
        return await sql`UPDATE Rsvps SET inviteename=${value} WHERE id=${id}`
      case 'numberOfPeople':
        return await sql`UPDATE Rsvps SET numberofpeople=${value} WHERE id=${id}`
      case 'isAttendingCeremony':
        return await sql`UPDATE Rsvps SET isattendingceremony=${value} WHERE id=${id}`
      case 'isAttendingRehersal':
        return await sql`UPDATE Rsvps SET isattendingrehersal=${value} WHERE id=${id}`
      case 'isAttendingReception':
        return await sql`UPDATE Rsvps SET isattendingreception=${value} WHERE id=${id}`
      default:
        throw new Error('Column missing!');
    }
  } catch (e) {
    return e;
  }
};

import { RSVP } from './routes/rsvps';
import { QueryResultRow, sql } from '@vercel/postgres';

// FYI, the config for this is a bit magical. Basically, they env vars are in
// the cloud and you need a local .env file w/those config values.
// In vercel's handly little postgres lib, they automatically query the correct
// .env variables so you don't have to worry about it.
// Remix does not allow .env variables in the client bundle but they can be
// accessed on the server. These functions are called in actions/loaders so
// we are fine.

// The vercel api returns the keys in all lowercase, not 
const adapter = (rows: QueryResultRow[]): RSVP[] => {
  return rows.map((row) => ({
    id: row.id,
    inviteeName: row.inviteename,
    numberOfPeople: row.numberofpeople,
    isAttendingCeremony: row.isattendingceremony,
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
    isAttendingReception,
  } = rsvp;

  try {
    return await sql`INSERT INTO Rsvps (InviteeName, NumberOfPeople, isAttendingCeremony, isAttendingReception, id) VALUES (${inviteeName}, ${numberOfPeople}, ${isAttendingCeremony}, ${isAttendingReception}, ${id});`
  } catch (e) {
    return e;
  }
};

// For some reason, the vercel sql api doesn't like us dynamically setting the column in the query 🤷🏻‍♂️
export const updateRsvp = async (rsvpUpdate: Map<string, string>) => {

  try {
    if (rsvpUpdate.has('inviteeName')) {
      return await sql`UPDATE Rsvps SET inviteename=${rsvpUpdate.get('inviteeName')?.toString()} WHERE id=${rsvpUpdate.get('id')?.toString()}`
    } else if (rsvpUpdate.has('isAttendingCeremony')) {
      return await sql`UPDATE Rsvps SET isattendingceremony=${rsvpUpdate.get('isAttendingCeremony')?.toString()} WHERE id=${rsvpUpdate.get('id')?.toString()}`
    } else if (rsvpUpdate.has('isAttendingReception')) {
      return await sql`UPDATE Rsvps SET isattendingreception=${rsvpUpdate.get('isAttendingReception')?.toString()} WHERE id=${rsvpUpdate.get('id')?.toString()}`
    } else if (rsvpUpdate.has('numberOfPeople')) {
      return await sql`UPDATE Rsvps SET numberofpeople=${rsvpUpdate.get('numberOfPeople')?.toString()} WHERE id=${rsvpUpdate.get('id')?.toString()}`
    } else {
      throw new Error('Valid field not present!');
    }
  } catch (e) {
    return e;
  }
};

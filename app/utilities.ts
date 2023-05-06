import { RSVP } from './routes/rsvps';
import { QueryResultRow, sql } from '@vercel/postgres';

// The vercel api returns the keys in all lowercase, not 
const adapter = (rows: QueryResultRow[]): RSVP[] => {
  return rows.map((row) => ({
    inviteeName: row.inviteename,
    numberOfPeople: row.numberofpeople,
    isAttendingCeremony: row.isattendingceremony,
    isAttendingReception: row.isattendingreception,
  }))
};

export const getRsvps = async (inviteeName?: string): Promise<RSVP[]> => {
  let rows;
  
  if (inviteeName !== undefined && inviteeName.length > 0) {
    // rows = (await client.sql`SELECT * FROM Rsvps WHERE InviteeName=${inviteeName}`).rows;
    rows = (await sql`SELECT * FROM Rsvps WHERE InviteeName=${inviteeName}`).rows;
  } else {
    // rows = (await client.sql`SELECT * FROM Rsvps ORDER BY InviteeName ASC`).rows;
    rows = (await sql`SELECT * FROM Rsvps ORDER BY InviteeName ASC`).rows;
  }

  return adapter(rows);
}

export const addRsvp = async (rsvp: RSVP) => {
  try {
    return await sql`INSERT INTO Rsvps (InviteeName, NumberOfPeople, isAttendingCeremony, isAttendingReception) VALUES (${rsvp.inviteeName}, ${rsvp.numberOfPeople}, ${rsvp.isAttendingCeremony}, ${rsvp.isAttendingReception});`
  } catch (e) {
    return e;
  }
};

import { json } from "@sveltejs/kit";
import { mysqlconnFn } from "$lib/db/mysql";

export async function POST({ request }) {
  const { dat } = await request.json();
  console.log('Dat',dat[0])
  let mysqlconn = await mysqlconnFn();
  let results = await mysqlconn
    .query(`UPDATE rooms SET room_number = '${dat[0].Name}', room_type = '${dat[0].Type}', rate_per_night = '${dat[0].Price}', status = '${dat[0].Status}' WHERE room_id = ${dat[0].ID};    `)
    .then(function ([rows, fields]) {
      //     console.log("Got this far!!");
      //     console.log(rows);
      return rows;
    });

  return json(results);
}
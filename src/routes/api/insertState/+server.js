import { json } from "@sveltejs/kit";
import { mysqlconnFn } from "$lib/db/mysql";

export async function POST({ request }) {
  const { dat } = await request.json();
  console.log(dat[0])
  let mysqlconn = await mysqlconnFn();
  let results = await mysqlconn
    .query(`INSERT INTO rooms (room_number, room_type, rate_per_night) VALUES ('${dat[0].Name}','${dat[0].Type}','${dat[0].Price}');`)
    .then(function ([rows, fields]) {
      //     console.log("Got this far!!");
      //     console.log(rows);
      return rows;
    });

  return json(results);
}
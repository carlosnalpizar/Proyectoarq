import { createPool } from "mysql2/promise";

export const database = new createPool({
    host:'localhost',
    port:3306,
    user:'root',
    password:'Golbarsa1',
    database:'mydb'
});


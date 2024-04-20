import { Router } from "express";
import { database } from "../db.js";

const router= Router();

router.get('/ping',async (req,res)=>{
    const [rows] = await database.query('SELECT 1+1 AS RESULT')
    console.log(rows)
    res.json(rows[0])
});

export default router; 
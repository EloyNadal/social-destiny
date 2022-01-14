import Database from "better-sqlite3/lib/database";
import { readdir } from 'fs/promises';

export default async function handler(req, res) {
    const { definition, id } = req.query;

    const directories = await readdir('./public/manifest/');

    if (!directories.length > 0){
        res.status(500).send({ message: 'No existe archivo manifest' });
    }

    const filePath = `./public/manifest/${directories[0]}/database.db`;

    const db = new Database(filePath, { readonly: true });

    const stmt = db.prepare(`SELECT * FROM ${definition} WHERE id = ?`);
    const result = stmt.get(id);
    db.close();

    res.status(200).json(result.json);
}
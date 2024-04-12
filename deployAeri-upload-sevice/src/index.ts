import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import path from "path";
import { generate } from "./utils";
import { getAllFiles } from "./files";
import { uploadFile } from "./aws";
import {createClient } from "redis";
const publisher = createClient();
publisher.connect();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/deploy", async (req, res) => {
    try {
        const repoUrl = req.body.repoUrl;
        const id = generate();
        await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));
        const files = getAllFiles(path.join(__dirname, `output/${id}`));

        files.forEach(async file =>{
            await uploadFile(file.slice(__dirname.length+1),file);
        })

        publisher.lPush("build-queue",id);
        
        res.json({ 
            id: id
        });
    } catch (error) {
        console.error("Error cloning repository:", error);
        res.status(500).json({ error: "Failed to clone repository" });
    }
});

app.listen(port);
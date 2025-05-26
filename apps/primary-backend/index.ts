import {prismaClient} from "@db/index"
import  express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { authMiddleware } from "./middleware";

const app = express();
dotenv.config()
app.use(express.json());
app.use(cors());


app.post('/projects', authMiddleware, async (req,res)=>{
    const {prompt} = req.body;
    const userId = req.userId!;
    const description = prompt.split("\n")[0]
    const project = await prismaClient.project.create({
        data : {description, userId},
    })
    res.json({projectId: project.id});
})

app.get("/projects",authMiddleware, async(req,res)=>{
    const userId = req.userId!;
    const project = await prismaClient.project.findFirst({
        where: { userId},
    });
    res.json(project)
})

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
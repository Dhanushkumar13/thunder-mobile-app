'use client'

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import {Textarea} from "./ui/textarea"
import axios from "axios";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { BACKEND_URL } from "@/config";

export function Prompt(){
  const [prompt, setPrompt] = useState("");
  const {getToken} = useAuth();

  return(
    <div className="">
      <Textarea placeholder="Create a chess application" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
      <div className="flex justify-end pt-2">
        <Button onClick={async ()=>{
          const token = await getToken();
          const res = await axios.post(`${BACKEND_URL}/projects`, {
            prompt: prompt,
          },{
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
          console.log(res.data)
        }}>
          <Send />
        </Button>
      </div>
    </div>
  )
}
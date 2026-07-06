import axios from 'axios'
import { BACKEND_URL } from '../config';
import { Button } from "@/components/ui/button"
import { Card } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useNavigate } from "react-router"

export default function Signup() {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function signup() {
      try{  await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password
        })

        navigate("/signin")

    }catch(e){
        alert("Error while sugnup !");
    }
    }

    return (
        <div className="p-4 ml-200 mt-10 items-center rounded-lg w-100 bg-gray-200 flex">
            <Card className=" flex-1 screen border-none">
                <div className="flex-1 justify-items-center">
                    <div>
                        <Label className="pb-3 " htmlFor="username">Username</Label>
                        <Input id="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <Label className="pb-3 pt-3" htmlFor="password">Password</Label>
                        <Input id="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="pt-5">
                        <Button className="text-white bg-black" variant={"outline"} onClick={signup}>

                            SignUp</Button>
                    </div>

                </div>
            </Card>

        </div>
    )
}


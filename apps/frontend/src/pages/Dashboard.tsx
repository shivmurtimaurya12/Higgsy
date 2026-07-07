import { BACKEND_URL } from '../config'
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { useState, useEffect } from "react";
import axios from 'axios'
import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

async function createAvatar({ name, url }: { name: string, url: string }) {
    const response = await axios.post(`${BACKEND_URL}/api/v1/avatar`, {
        name, image: url
    });

    return response.data;
}

async function getAvatars() {
    const response = await axios.get(`${BACKEND_URL}/api/v1/avatars`)
    return response.data.avatars;
}

export default function Dashboard() {
    const [name, setname] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    // const [avatars, setAvatars] = useState([]);

    // Access the client
    const queryClient = useQueryClient()

    const query = useQuery({ queryKey: ['avatars'], queryFn: getAvatars })

    const mutation = useMutation({
        mutationFn: createAvatar,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['avatars'] })
        },
    })



    // useEffect(() => {
    //     axios.get(`${BACKEND_URL}/api/v1/avatars`)
    //         .then((res) => setAvatars(res.data.avatars));
    // }, [])

    return (
        <>
            <div className=" flex justify-evenly flex-wrap bg-rose-200 border outline rounded-lg w-80 h-60 m-auto mt-5 p-5">
                <b>
                    Dashboard page
                </b>
                <Input placeholder="enter name" onChange={(e) => setname(e.target.value)} />
                <Input placeholder="enter url" onChange={(e) => setAvatarUrl(e.target.value)} />
                <div>
                    <Button variant={"outline"} className="bg-black text-white"
                        onClick={async () => {
                            await mutation.mutate({
                                name, url: avatarUrl
                            });
                            // axios.get(`${BACKEND_URL}/api/v1/avatars`)
                            //     .then((res) => setAvatars(res.data.avatars));
                        }}
                    >create Avatar</Button>
                </div>


            </div>
            <div className="w-100 h-100 m-auto">
                <div><b>Avatars</b></div>

                {/* {JSON.stringify(avatars)} */}
                {
                    query.data?.map((avatar) => <div>
                        {avatar.name}
                    </div>)
                }



            </div>
        </>
    )
}
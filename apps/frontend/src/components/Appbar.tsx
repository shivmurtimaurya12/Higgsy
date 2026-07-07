import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

import { Button } from '../components/ui/button'
export default function Appbar() {
    let navigate = useNavigate();
    return (

        <div className=" z-10 flex w-full justify-between bg-black text-white sticky top-0">
            <div className="cursor-pointer p-3 ps-4 text-xl text-yellow-500" onClick={() => navigate("/")}>Higgsy</div>

            <div className="flex">
                <div className="flex items-center p-3">
                    <p  className="cursor-default " onClick={() => navigate("/dashboard")} >Dashboard</p>
                </div>
                <div className="flex items-center p-3">
                    <Button variant={"outline"} onClick={() => navigate("/signup")} >Signup</Button>
                </div>
                <div className="flex items-center p-3 pe-4">
                    <Button variant={"outline"} onClick={() => navigate("/signin")}>Signin</Button>
                </div>
            </div>
        </div>
    )
}
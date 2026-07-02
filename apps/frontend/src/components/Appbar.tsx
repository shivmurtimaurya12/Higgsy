import { Button } from '../components/ui/button'
export default function Appbar() {
    return <>
        <div className="bg-black w-screen flex justify-between text-white ">
            <div className="p-2 text-xl ">Higgsy</div>
            <div className="flex">
                <div className="flex item-center p-2">
                    <Button variant={"outline"}  >Signup</Button>
                </div>
                <div className="flex item-center p-2">
                    <Button variant={"outline"} >Signin</Button>
                </div>
            </div>
        </div>
    </>
}
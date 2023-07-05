import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
const Navbar:FunctionComponent=()=>{


    return(
        <div className="flex flex-row w-full h-[70px] bg-red-400">
            <div className="flex flex-row w-1/2 items-center">
                <img className= "mr-8" src={"/images/champions.png"} alt="failed" width={"120px"}/>
                <Link className="text-lg mr-6" href="/create">Create</Link>
                <Link className="text-lg mr-6" href="/profile">Tournaments</Link>
            </div>
            <div className="flex flex-row-reverse w-1/2">
                <div className="my-4 mx-4">
                    <ConnectButton/>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
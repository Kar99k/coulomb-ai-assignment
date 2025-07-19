"use client"
import { Menu } from "lucide-react";
import Avatar from "../atoms/Avatar";

const Header: React.FC<{onMenuSelect:React.Dispatch<React.SetStateAction<boolean>>}> = ({onMenuSelect}) =>{

    return (
        <header className="w-full bg-foreground h-12 flex items-center justify-between md:justify-end p-3">
          <div className="cursor-pointer md:hidden" onClick={()=>onMenuSelect(prev=>!prev)}>
            <Menu/>
          </div>
         <Avatar initial="K"/>
      </header>)
}

export default Header;
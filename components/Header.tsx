import Avatar from "./Avatar";

const Header: React.FC<{}> = () =>{

    return (
        <header className="w-full bg-foreground h-12 flex items-center justify-end p-3">
         <Avatar initial="K"/>
      </header>)
}

export default Header;
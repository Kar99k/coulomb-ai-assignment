import { LoaderIcon } from "lucide-react";

const Spinner:React.FC<{}> = () => (
  <div className="flex justify-center items-center h-full">
    <LoaderIcon className="w-10 h-10 animate-spin text-black/70" />
  </div>
);

export default Spinner
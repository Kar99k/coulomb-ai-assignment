const Avatar: React.FC<{initial:string}> = ({initial})=>{

    return (
        <div className="w-6 h-6 rounded-full bg-avatar font-semibold text-xs flex justify-center items-center text-center leading-0">
            <div className="mb-.5 text-white">{initial}</div>
        </div>
    )
}

export default Avatar
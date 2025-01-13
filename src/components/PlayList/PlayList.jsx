import { useState } from "react"
import PlayerStore from "../../store/playerStore";

export default function PlayList(){
    const [newSource, setNewSource] = useState('');
    const {playlist, setSource, addSource} = PlayerStore();

    const handleAddSource = ()=>{
        if(newSource.trim()){
            addSource(newSource);
            setNewSource('');
        }
    }
    return(
        <div>
                <input 
                type="text" 
                value={newSource}
                onChange={(e)=> setNewSource(e.target.value)}
                placeholder="Add video"
                />
            <button type="submit" onClick={handleAddSource}>Add </button>
            <ul>
                {playlist.map((item,index)=>(
                <li key={index} onClick={()=> setSource(item)}>
                    {item}
                </li>
                ))}
            </ul>
        </div>
    )
}
import { useState } from "react"
import PlayerStore from "../../store/playerStore";
import css from "./PlayList.module.css"

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
        <div className={css.container}>
            <input 
                className={css.input}
                type="text" 
                value={newSource}
                onChange={(e)=> setNewSource(e.target.value)}
                placeholder="Add video"
                />
            <button className={css.button} type="submit" onClick={handleAddSource}>Add </button>
            <ul className={css.list}>
                {playlist.map((item,index)=>(
                <li className={css.item} key={index} onClick={()=> setSource(item)}>
                    {item}
                </li>
                ))}
            </ul>
        </div>
    )
}
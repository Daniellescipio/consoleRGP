import React, { useContext, useEffect } from "react"
import { PlayerContext } from "../logic/usePlayer"
import { TypingContext } from "../logic/useTyping"
function Option({img, alt, hover, clickFunction, setFoundItem}){
    const {player, setPlayer, playerActivity, setPlayerActivity} = useContext(PlayerContext)
    const {setText, typingFunction, typingBool} = useContext(TypingContext)
    useEffect(()=>{
        const imageContainers = document.getElementsByClassName("imageContainer")
        for(let i=0;i<imageContainers.length;i++){
            if(typingBool){
                imageContainers[i].removeEventListener("mouseEnter", handleHover)
                imageContainers[i].removeEventListener("mouseLeave", handleHover)
            }else{
                imageContainers[i].addEventListener("mouseEnter", ()=>handleHover(true))
                imageContainers[i].addEventListener("mouseLeave", ()=>handleHover(false))
            }
        }
    },[typingBool])
    const handleHover = (bool)=>{
        if (playerActivity === ""){
            if(bool){
                setText(hover)
            }else{
                setText("Select an option")
            }
        }
    }

    return(
        <div className = "imageContainer" onClick= {()=>clickFunction(typingFunction,player, setPlayer,playerActivity, setPlayerActivity, setFoundItem, alt==="pill" ? "medicine" : alt)} onMouseEnter={()=>handleHover(true)} onMouseLeave={()=>handleHover(false)}>
            <img src={img}  alt={alt}/>
        </div>
    )
}
//
//player, supply, setPlayerActivity, setPlayer,setFoundItem
export {Option}
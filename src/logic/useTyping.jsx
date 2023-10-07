import React, { useContext, useState } from "react";
import { PlayerContext } from "./usePlayer";

const TypingContext = React.createContext()


function TypingProvider(props){
    const [timeOutId , setTimeOutId] = useState()
    const {player, setPlayerActivity} = useContext(PlayerContext)
    const [intro, setIntro] = useState(true)
    const [text, setText] = useState("")
    const [introTracker, setIntroTracker]= useState(0)
    const [typingBool, setTypingBool] = useState(false)
    const introOptions = ["Welcome...","What's your name?",` welcome ${player.name}, to the Kingdom of Sciptopia! The ENTIRE Royal family is trapped in a tower (cause these villians were like 'why stop at a princess??').`, `They need YOUR help ${player.name}. Seriously, It HAS to be YOU ${player.name}. Some other people tried and ... NVM`, "Here's what you'll need to know...", `There are monsters running through the jungle, which you'll need to cross in order to save the royal family. Some monsters are super scary, some not so much. And of course there's the matter of the Dragon.... `, `Right now, all you have to protect you are your hands. Don't get me wrong, these hands are a formidable weapon, but you'll need stronger weapons to fight stronger monsters.`, `Every monster you defeat will surrender a weapon piece. Visit the weapons shop to put them together and you'll be ready to fight the big guys.`, `If you get beat up, you can collect medicine to heal yourself. If you lose too much energy from running away -_-, you can find food to increase stamina. Always remember its best to store food and medicine in your inventory when you don't need it!`,`When you're ready(And we I don't recommend trying it any sooner) Find and Fight the Dragon to save the royal family.`, `Can you defeat the monsters, collect the weapons, and save the Day???`]

    const typingFunction = (str="", bool, playerActivity)=>{
        str = typeof(str) === "string" ? str : str()
        const input=document.getElementById("name")
        const cont = document.getElementById("continue")
        const optionsDiv=document.getElementById("optionsDiv")
        input.style.display ="none"
        if(bool){
        clearTimeout(timeOutId)
          setText(prevText=> "_")
        }else{
          setText(prevText=> prevText + "_")
        }
        if(str.length){
            setTypingBool(true)
          cont.disabled = true
          const wordArray = str.split("")
          setTimeOutId(setTimeout(()=>{
            const letter = wordArray.shift()
            setText(prevIntro=> {
              const othArray = prevIntro.split("")
              othArray.pop()
              return othArray.join("") + letter
            })
            typingFunction(wordArray.join(""), false, playerActivity)
          },10))
          if(str.length===1 && (playerActivity==="complete"||playerActivity==="checking")){
            setPlayerActivity("")
          }
        }else{ 
            setTypingBool(false)
          if(introTracker===10){
              optionsDiv.style.display = "flex"
              cont.style.display = "none"
              setIntro(false)
          }else if(introTracker !==1){
              cont.disabled = false
          }else{
            if(intro){ input.style.display ="block"}
          }
    
        }
      }

    return(
        <TypingContext.Provider value ={{intro, setIntro, introTracker, setIntroTracker, introOptions, typingFunction, typingBool, setText, text}}>
            {props.children}
        </TypingContext.Provider>
    )
}

export {TypingProvider, TypingContext}
import React, { useContext, useState } from "react";
import { PlayerContext } from "./usePlayer";

const TypingContext = React.createContext()


function TypingProvider(props){
  //time between each letter
    const [timeOutId , setTimeOutId] = useState()
    //controls suggestion messages too many options, need to clean up...
    const {player, setPlayerActivity} = useContext(PlayerContext)
    const [intro, setIntro] = useState(true)
    //main text
    const [text, setText] = useState("")
    //additional suggestions
    const [addText, setAddText] = useState("")
    const [introTracker, setIntroTracker]= useState(14)
    //stops a user from selecting options during typing
    const [typingBool, setTypingBool] = useState(false)
    const introOptions = [`Please go away, we're waiting on a hero to arrive.`,`YOU'RE the hero??`,`............huh.`,`well, I guess you'll have to do. what's your name?`,` welcome ${player.name}, to the Kingdom of Sciptopia! The ENTIRE Royal family is trapped in a tower (cause these villians were like 'why stop at a princess??').`, `They need YOUR help ${player.name}. Seriously, It HAS to be YOU ${player.name}. Some other people tried and ... NVM`, `Here's what you'll need to know...`, `There are monsters running through the jungle, which you'll need to cross in order to save the royal family. Some monsters are super scary, some not so much. And of course there's the matter of the Dragon.... `, `Right now, all you have to protect you are your hands. Don't get me wrong, these hands are a formidable weapon, but you'll need stronger weapons to fight stronger monsters.`, `Every monster you defeat will surrender a weapon piece. Visit the weapons shop to put them together and you'll be ready to fight the big guys.`, `Wander the jungle to collect medicine and food to increase your life and stamina. It's best to store food and medicine in your inventory when you don't need it!`,`Seriously...don't be wasteful`,`When you're ready(And I don't recommend trying it any sooner) Find and Fight the Dragon to save the royal family.`, `Can you defeat the monsters, collect the weapons, and save the Day???`, `Select an option`]

    //recursive
    //this function accepts: func - a value that let us know what text to change
    const typingFunction = (func, str="", bool, playerActivity)=>{
        let textFunc = func === "text" ? setText : setAddText
        //Idk what this line of code does...so I'm going to comment it out and hope nothing breaks...
        //str = typeof(str) === "string" ? str : str()
        const input=document.getElementById("name")
        const cont = document.getElementById("continue")
        const optionsDiv=document.getElementById("optionsDiv")
        input.style.display ="none"
        //clears any previous text
        if(bool){
        clearTimeout(timeOutId)
          textFunc(prevText=> "_")
         //adds to previous text 
        }else{
          textFunc(prevText=> prevText + "_")
        }
        //the string is reduced each time the function runs so we keep checking if there is anything left to type out
        if(str.length){
          //let everyone know we are typing
            setTypingBool(true)
            //disable options
          cont.disabled = true
          //split the sentence into individual words
          const wordArray = str.split("")
          setTimeOutId(setTimeout(()=>{
            //take the first letter of the word(this removes it from the word too, so dog becomes og.)
            const letter = wordArray.shift()
            //set state
            textFunc(prevIntro=> {
              //take what was already there
              const othArray = prevIntro.split("")
              //and remove the trailing _
              othArray.pop()
              //add in the letter
              return othArray.join("") + letter
            })
            //call the function again minus the letter you already typed out/displayed
            typingFunction(func, wordArray.join(""), false, playerActivity)
          },10))
          //if we are on the last letter and our player is finished in the weapons shop or checking their inventory
          if(str.length===1 && (playerActivity==="complete"||playerActivity==="checking")){
            //changing activity calls this function again from a different component. This is to add helper text
            setPlayerActivity("ready")
          }
        //there are no letter left to type
        }else{ 
          //let everyone know we are done typing
            setTypingBool(false)
          //the introduction is over. hide the intro options and display game play options
          if(introTracker===introOptions.length-1){
              optionsDiv.style.display = "flex"
              cont.style.display = "none"
              setIntro(false)
              setPlayerActivity("ready")
          //a part of intro, gets the users name
          }else if(introOptions[introTracker].includes("name")){
            input.style.display ="block"
          //we are in the intro
          }else{
            //show intro option
            cont.disabled = false
          } 
        }
      }

    return(
        <TypingContext.Provider value ={{addText,setAddText, intro, setIntro, introTracker, setIntroTracker, introOptions, typingFunction, typingBool, setText, text}}>
            {props.children}
        </TypingContext.Provider>
    )
}

export {TypingProvider, TypingContext}
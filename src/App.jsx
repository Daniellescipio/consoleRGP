import { useContext, useEffect, useState } from 'react'
import { Option } from './options/option'
import crown from "./assets/crown.png"
import dragon from "./assets/dragon.png"
import food from "./assets/food.png"
import inventory from "./assets/inventory.png"
import pill from "./assets/pill.png"
import playerImg from "./assets/player.png"
import tree from "./assets/tree.png"
import { obj } from './logic/functions'
import { PlayerContext } from './logic/usePlayer'
import { TypingContext } from './logic/useTyping'
import { fightMonster, runFromMonster } from './data/monsters'
import { takeMeds, handleFood, findFood, findMeds } from './data/foodandMeds'

function App() {
  const {player, setPlayer, playerActivity, setPlayerActivity} = useContext(PlayerContext)
  const {text, intro, setIntro, introTracker, setIntroTracker, introOptions, typingFunction} = useContext(TypingContext)
  const [foundItem, setFoundItem] = useState("")
  const options = [{
    img:crown, 
    alt:"crown", 
    hover:"Rescue Royals", 
    function:obj.rescueRoyals
  }, {
    img:dragon, 
    alt:"dragon", 
    hover:"Fight Dragon", 
    function:obj.fightDragon
  },{
    img:food, 
    alt:"food", 
    hover:"Eat Food",
    function:findFood 
  },{
    img:inventory, 
    alt:"inventory", 
    hover:"Inventory",
    function:obj.checkInv
  },{
    img:pill, 
    alt:"pill", 
    hover:"Take medicine",
    function:findMeds
  },{
    img:playerImg, 
    alt:"player", 
    hover:"life/ stamina",
    function:obj.checkLife
  },{
    img:tree, 
    alt:"tree", 
    hover:"Wander",
    function:obj.wander
  }]
  useEffect(()=>{
    if(!intro){
      const optionsDiv = document.getElementById("optionsDiv")
      const encounterOptions = document.getElementById("encounterOptions")
      const foodOptions = document.getElementById("foodOptions")
      if(playerActivity === "encounter" ||playerActivity === "running"){
        encounterOptions.style.display = "flex"
        optionsDiv.style.display = "none"
      }else if(playerActivity === "foundFood"){
        foodOptions.style.display = "flex"
        optionsDiv.style.display = "none"
        encounterOptions.style.display = "none"
      }else{
        encounterOptions.style.display = "none"
        optionsDiv.style.display = "flex"
        foodOptions.style.display = "none"
      }
    }
  },[playerActivity, intro])

  const playGame = ()=>{
    const button=document.getElementById("playButton")
    const cont = document.getElementById("continue")
    const quit = document.getElementById("quit")
    button.remove()
    typingFunction(introOptions[introTracker], true)
    setIntroTracker(1)
    cont.style.display = "block"
    quit.style.display = "contents"
    setIntro(true)
  }
  const continueGame = ()=>{
    typingFunction(introOptions[introTracker], true)
    intro && setIntroTracker(prev=>prev+1)
  }
  const quitGame = ()=>{
    const button=document.getElementById("playButton")
    button.remove()
    typingFunction("Welcome...")
  }

  const handleChange = (e)=>{
    const{name, value} = e.target
    setPlayer(prev=>({...prev, [name]:value}))
  }
  return (
    <>
    <div id = "gameboard">
      <div className='buttonRow'>
        <button id = "quit" onClick={quitGame}> Quit </button>
        <button id = "continue" onClick={continueGame}> continue </button>
      </div> 
      <div id = "textbox">
        <button id = "playButton" onClick={playGame}> Play </button>
        <p> {text} </p>
        <div id = "name">
        <input
        name = "name"
        value = {player.name}
        onChange={handleChange}/>
        <button onClick={continueGame}>Enter</button>
        </div>
        <div id= "encounterOptions" className = "optionsRow">
          <button id = "run" onClick={()=>{typingFunction(runFromMonster(player, setPlayer, setPlayerActivity), true)}}>Run</button>
          <button id = "fight" onClick={ fightMonster}>Fight</button>
        </div>
        <div id= "foodOptions" className = "optionsRow">
          <button className="three" id = "inv" onClick={ ()=>{typingFunction(handleFood("inventory",foundItem, player, setPlayer, setPlayerActivity, setFoundItem), true)}}>Store It</button>
          <button className="three" id = "eat" onClick={ ()=>{typingFunction(handleFood("eat",foundItem, player, setPlayer, setPlayerActivity, setFoundItem), true)}}>Eat It</button>
          <button className="three" id = "leave" onClick={ ()=>{typingFunction(handleFood("leave",foundItem, player, setPlayer, setPlayerActivity, setFoundItem), true)}}>Leave It</button>
        </div>
        <div id= "medOptions" className = "optionsRow">
          <button id = "run" onClick={()=>{typingFunction(runFromMonster(player, setPlayer, setPlayerActivity), true)}}>Run</button>
          <button id = "fight" onClick={ fightMonster}>Fight</button>
        </div>
        <div id= "dragonOptions" className = "optionsRow">
          <button id = "run" onClick={()=>{typingFunction(runFromMonster(player, setPlayer, setPlayerActivity), true)}}>Run</button>
          <button id = "fight" onClick={ fightMonster}>Fight</button>
        </div>
      </div>
      <div id="optionsDiv">
        {options.map((option, i)=>{
        return <Option key = {i} img = {option.img} alt={option.alt} hover={option.hover} clickFunction={option.function} setFoundItem={setFoundItem}/>
        })}
      </div> 
    </div>
    </>
  )
}

export default App

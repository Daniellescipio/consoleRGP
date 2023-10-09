import { useContext, useEffect, useState } from 'react'
import { Option } from './options/option'
import crown from "./assets/crown.png"
import dragon from "./assets/dragon.png"
import food from "./assets/food.png"
import inventory from "./assets/inventory.png"
import pill from "./assets/pill.png"
import weaponImg from "./assets/weapons.png"
import tree from "./assets/tree.png"
import { obj } from './logic/functions'
import { PlayerContext } from './logic/usePlayer'
import { TypingContext } from './logic/useTyping'
import { fightMonster, runFromMonster, monsters } from './data/monsters'
import {handleSupply, checkSupplies } from './data/foodandMeds'
import { WeaponDiv, weapons } from './data/weapons'

function App() {
  const {player, setPlayer, playerActivity, setPlayerActivity} = useContext(PlayerContext)
  const {text, setText, setAddText, addText, intro, setIntro, introTracker, setIntroTracker, introOptions, typingFunction} = useContext(TypingContext)
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
    function:checkSupplies 
  },{
    img:inventory, 
    alt:"inventory", 
    hover:"Inventory",
    function:obj.checkInv
  },{
    img:pill, 
    alt:"pill", 
    hover:"Take medicine",
    function:checkSupplies
  },{
    img:weaponImg, 
    alt:"weaponShop", 
    hover:"Shop For Weapons",
    function:obj.weaponShop
  },{
    img:tree, 
    alt:"tree", 
    hover:"Wander",
    function:obj.wander
  }]
  useEffect(()=>{
    if(!intro){
      const gameOptions = document.getElementById("optionsDiv")
      const divsToFilter = document.getElementsByClassName("optionsRow")
      const imageContainers = document.getElementsByClassName("imageContainer")
      const arr = [...divsToFilter]
      if(playerActivity !== ""){
        arr.map(div=>div.getAttribute("id") === playerActivity ? div.style.display = "flex" : div.style.display = "none" )
      }else{
        arr.map(div=>div.style.display = "none" )
        gameOptions.style.display = "flex"
      }
    }
    setAddText("")
    console.log(playerActivity, player)
  },[playerActivity, intro])

  const playGame = ()=>{
    const button=document.getElementById("playButton")
    const cont = document.getElementById("continue")
    const quit = document.getElementById("quit")
    button.style.display="none"
    typingFunction("text", introOptions[introTracker], true)
    setIntroTracker(1)
    cont.style.display = "block"
    quit.style.display = "contents"
    setIntro(true)
  }
  const continueGame = ()=>{
    typingFunction("text", introOptions[introTracker], true)
    intro && setIntroTracker(prev=>prev+1)
  }
  const quitGame = ()=>{
    const cont = document.getElementById("continue")
    const quit = document.getElementById("quit")
    const button=document.getElementById("playButton")
    cont.style.display = "none"
    quit.style.display = "none"
    button.style.display = "block"
    setText("")
    setIntroTracker(0)
    setPlayer({
      name : "",
      life : 100,
      stamina:10,
      inventory : {
          weapons:[weapons.hands],
          backpack:{medicine:[], food:[]},
          pieces:[],
      },
      //game runs while this is true
      isAlive : true,
      //triggers monster fight
      attackingMonster : false,
      //triggers flee from monster fight
      isRunning : false,
      //allows player to/bars player from dragon fight
      haskey : false,
      //triggers dragon fight
      fightingDragon: false,
      //for shopping in and creating a weapon in the weapons shop
      inTheShop : {
          shopping:false,
          making:false
      },
      fighting:false,
      monsters:monsters,
      //All players start at level one
      level : 1
    })
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
        <p className="additionalText"> {addText} </p>
        <div id = "name">
        <input
        name = "name"
        value = {player.name}
        onChange={handleChange}/>
        <button onClick={continueGame}>Enter</button>
        </div>
        <div id= "encounter" className = "optionsRow">
          <button id = "run" onClick={()=>{typingFunction("text", runFromMonster(player, setPlayer, setPlayerActivity), true)}}>Run</button>
          <button id = "fight" onClick={()=>{typingFunction("text", fightMonster(player, setPlayer, setPlayerActivity), true)}}>Fight</button>
        </div>
        <div id= "foundSupplies" className = "optionsRow">
          <button className="mult" id = "inv" onClick={()=>handleSupply(typingFunction,"inventory",foundItem, player, setPlayer, setPlayerActivity, setFoundItem)}>Store It</button>
          <button className="mult" id = "consume" onClick={()=>handleSupply(typingFunction,"consume",foundItem, player, setPlayer, setPlayerActivity, setFoundItem)}>Eat/Use It</button>
          <button className="mult" id = "leave" onClick={()=>handleSupply(typingFunction,"leave",foundItem, player, setPlayer, setPlayerActivity, setFoundItem)}>Leave It</button>
        </div>
        {/* <div id= "medOptions" className = "optionsRow">
          <button id = "run" onClick={()=>{typingFunction(runFromMonster(player, setPlayer, setPlayerActivity), true)}}>Run</button>
          <button id = "fight" onClick={ fightMonster}>Fight</button>
        </div>
        <div id= "dragonOptions" className = "optionsRow">
          <button id = "run" onClick={()=>{typingFunction(runFromMonster(player, setPlayer, setPlayerActivity), true)}}>Run</button>
          <button id = "fight" onClick={ fightMonster}>Fight</button>
        </div> */}
        <div id= "chooseWeapon" className = "optionsRow" >
          <WeaponDiv/>
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

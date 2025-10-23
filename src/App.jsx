import { useContext, useEffect, useState } from 'react'
import { Option } from './option'
import crown from "./assets/crown.png"
import dragon from "./assets/dragon.png"
import food from "./assets/food.png"
import inventory from "./assets/inventory.png"
import pill from "./assets/pill.png"
import weaponImg from "./assets/weapons.png"
import tree from "./assets/tree.png"
import { FunctionContext } from './logic/functions'
import { PlayerContext } from './logic/usePlayer'
import { TypingContext } from './logic/useTyping'
import { fightMonster, runFromMonster, monsters } from './data/monsters'
import { WeaponDiv, weapons } from './data/weapons'

function App() {
  const [timeOutId , setTimeOutId] = useState()
  const {player, setPlayer, playerActivity, setPlayerActivity} = useContext(PlayerContext)
  const {text, setText, setAddText, addText, intro, setIntro, introTracker, setIntroTracker, introOptions, typingFunction} = useContext(TypingContext)
  const {wander, weaponShop, fightDragon, rescueRoyals, handleSupply, checkSupplies, checkInv} = useContext(FunctionContext)
  const [foundItem, setFoundItem] = useState("")
  const [displayInv, setDisplayInv] = useState("hide")
  const [detailedItem, setDetailedItem] = useState("")
  const options = [{
    img:crown, 
    alt:"crown", 
    hover:"Rescue Royals", 
    function:rescueRoyals
  }, {
    img:dragon, 
    alt:"dragon", 
    hover:"Fight Dragon", 
    function:fightDragon
  },{
    img:food, 
    alt:"food", 
    hover:"Eat Food",
    function:checkSupplies 
  },{
    img:inventory, 
    alt:"inventory", 
    hover:"Inventory",
    //necessary to avoid undefined yet truthy(?????) parameters
    function:()=>checkInv()
  },{
    img:pill, 
    alt:"pill", 
    hover:"Take medicine",
    function:checkSupplies
  },{
    img:weaponImg, 
    alt:"weaponShop", 
    hover:"Shop For Weapons",
    function:weaponShop
  },{
    img:tree, 
    alt:"tree", 
    hover:"Wander",
    function:wander
  }]
  useEffect(()=>{
    //if we are not in the intro...
    if(!intro){
      //gets all of the primary game options
      const gameOptions = document.getElementById("optionsDiv")
      //gets all of the secondary game options
      const divsToFilter = document.getElementsByClassName("optionsRow")
      const arr = [...divsToFilter]
      if(playerActivity === "checking"){
        //shows inventory table by changing state/className
        setDisplayInv("inv")
        //gets rid of any text that was present
        setText("")
        setAddText("")
      }else{
        //hides inventory table by changing state/className
        setDisplayInv("hide")
      }
      //the player is not on the main menu...doing nothing, idk how to describe it, but this was easier than a long chain of or statements
      if(playerActivity !== ""){
        //if the game is over because the player won, lost, or quit
        if(playerActivity === "won" || playerActivity === "lost"||playerActivity === "gameOver"){
          // more time if they win or lose to read win/loss message
          let timer = playerActivity === "gameOver" ? 20000 : 5000
          //add a timer to end the game and set the id to close the timer later
          setTimeOutId(setTimeout(quitGame, timer))
        }
        //shows or hides the seconddary options that coorespond to what the player is doing
        arr.map(div=>div.getAttribute("id") === playerActivity ? div.style.display = "flex" : div.style.display = "none" )  
      //if the player is not doing something...
      }else{
        //hide all secondary options
        arr.map(div=>div.style.display = "none" )
        //shows primary game options
        gameOptions.style.display = "flex"
        //this gets set true when they have beat all the monsters on their level and does not return to false until the make the weapon for the next level
        if(player.levelUp){
          setAddText("You should visit the weapons shop...")
        //if there are no more monsters and a player has high life/stamina
        }else if(player.monsters.length<0){
          if(player.life >90 && player.stamina > 9){
            setAddText("The Dragon is waiting...")
          }else{
           //if there are no more monsters and a player has low life/stamina
            setAddText("You look a little sluggish, maybe some food or medicine before you fight the Dragon?")
          }
        }else if(player.hasKey){
          setAddText("The royals are waiting...")
        }else if(playerActivity === ""){
          setAddText("Try wandering the jungle...")
        }else{
          setAddText("")
        }
      }
    }
  },[playerActivity, intro])
//play button function
  const playGame = ()=>{
    //if they just got done playing, clear previous timeouts
    timeOutId && clearTimeout(timeOutId)
    const button=document.getElementById("playButton")
    const cont = document.getElementById("continue")
    const quit = document.getElementById("quit")
    //hide play button
    button.style.display="none"
    //start introduction
    typingFunction("text", introOptions[introTracker], true)
    setIntroTracker(1)
    //show intro options
    cont.style.display = "block"
    quit.style.display = "contents"
    setIntro(true)
  }
  const continueGame = ()=>{
    //progresses through introduction on continue button click.
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
//set player name
  const handleChange = (e)=>{
    const{name, value} = e.target
    setPlayer(prev=>({...prev, [name]:value}))
  }

  const setAndDisplayDetails=(index, type)=>{
    const detailDiv = document.getElementById("details")
    //show details if we get valid info
    if(index||index>=0){
      //see if this is a food or medicine which is handled slightly differently from weapons and pieces
      const foodOrMeds = type.split(" ")[1]
      detailDiv.style.display = "block"
      //get item from inventory or backpack(which is just nested one level in inventory)
      !foodOrMeds ? setDetailedItem(player.inventory[type][index]):setDetailedItem(player.inventory.backpack[foodOrMeds][index])
      //hide details
    }else{
      detailDiv.style.display = "none"
      setDetailedItem()
    }
   
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
        <button id = "continueButton" onClick={continueGame}>continue</button>
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
          <button className="mult" id = "inv" onClick={()=>handleSupply("inventory",foundItem, setFoundItem)}>Store It</button>
          <button className="mult" id = "consume" onClick={()=>handleSupply("consume",foundItem, setFoundItem)}>Eat/Use It</button>
          <button className="mult" id = "leave" onClick={()=>handleSupply("leave",foundItem, setFoundItem)}>Leave It</button>
        </div>
        <div id= "chooseWeapon" className = "optionsRow" >
          <WeaponDiv/>
        </div>
        <table className = {displayInv}>
          <caption>Click and hold for details</caption>
          <thead>
            <tr>
              <th>Weapons</th>
              <th>Food</th>
              <th>Medicine</th>
              <th>Pieces</th>
            </tr>
          </thead>
          <tbody>
            {player.inventory.weapons.map((weapon,i)=>{
              return(
                <tr key = {i}>
                  {weapon.name?
                  <td 
                    onMouseDown={()=>setAndDisplayDetails(i, "weapons")} 
                    onMouseLeave={()=>setAndDisplayDetails()}>
                    {weapon.name}
                  </td>:<td></td>}
                  {player.inventory.backpack.food[i]?
                  <td 
                    onMouseDown={()=>setAndDisplayDetails(i, "backpack food")} 
                    onMouseLeave={()=>setAndDisplayDetails()}>
                    {player.inventory.backpack.food[i].name}
                  </td> :<td></td>}
                  {player.inventory.backpack.medicine[i]?
                  <td 
                    onMouseDown={()=>setAndDisplayDetails(i, "backpack medicine")} 
                    onMouseLeave={()=>setAndDisplayDetails()}
                    >
                    {player.inventory.backpack.medicine[i].name}
                  </td>:<td></td>}
                  {player.inventory.pieces[i]?<td 
                    onMouseDown={()=>setAndDisplayDetails(i, "pieces")} 
                    onMouseLeave={()=>setAndDisplayDetails()}>
                    {player.inventory.pieces[i].name}
                  </td>:<td></td>}
                </tr>
              )
            })}
              <tr>
                <td>Life:{player.life}</td>
                <td>Stamina:{player.stamina}</td>
                <td onClick={()=>checkInv("hide")}>Close inventory</td>
                </tr>
          </tbody>
        </table>
        <div id = "details">
          {detailedItem &&<>
          <p> {detailedItem.name}</p>
          <p>{(detailedItem.definition ?detailedItem.definition:detailedItem.Definition ?detailedItem.Definition:"")}</p>
          <p> {detailedItem.for?detailedItem.for:detailedItem.DamageLevel?`Level ${detailedItem.DamageLevel}`:`Qnty:${player.inventory.backpack[detailedItem.type].filter(supply=>supply.name===detailedItem.name).length}`}</p>
          </>}
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

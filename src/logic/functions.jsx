import {weaponPieces} from "../data/weapons"
import {supplies} from "../data/foodandMeds"
import {fireBreathingDragon} from "../data/monsters"
import React from "react"
import { useContext } from "react"
import { TypingContext } from "./useTyping"
import { PlayerContext } from "./usePlayer"
//Inventory
const FunctionContext = React.createContext()

function FunctionProvider(props){
    const {typingFunction} = useContext(TypingContext)
    const {setPlayer, setPlayerActivity, player, playerActivity} = useContext(PlayerContext)
    //displays player life, stamina, food, medicine, weapon pieces, and weapons
    const checkInv = (bool)=>{
        //because the inventory table is already built in App.jsx, we just change player activity so that App.jsx can hide the inventory based on what the player is doing, this makes it easier to hide the inventory table for other actions. 
        if(bool){
            setPlayerActivity("ready")
            typingFunction( "text", "Select an option", true)
        }else{
            setPlayerActivity("checking")
        }
    }

    //functions for food and Medicine 
    //if a player clicks the pill or burger. Their inventory will be checked for items. If they have food or meds in their inventory, they can choose to eat it, store it, or leave it, if they don't have that supply in their inventory, they will randomly scavenge a supply with the same choice
    const checkSupplies = (setFoundItem, supply)=>{
        //condtional value to send to our typing function
        let str
        //supply is equal to the string "medicine" or "food" so it will get that key/values pair from the player.inventory.backpack
        const inventory =player.inventory.backpack[supply]
        //conditional value to store the random item, if they have one or more in their inventory, we will randomly select one from their inventory, if not we will grab a random supply from our enviornment
        let randomSupply
        //if we have the any medicine/food in our  inventory
        if(inventory.length>0){
            //grab a random food or medicine from our inventory
            randomSupply = inventory[Math.floor(Math.random()*inventory.length)]

            //let the player know what they got out of their inventory and their current health or stamina. ask them if they want to store, leave or consume it.
            str = ` You pull a ${randomSupply.name} from your inventory. Your ${randomSupply.affectedObj.affected} is at ${player[randomSupply.affectedObj.affected]} out of ${randomSupply.affectedObj.value} Do you want to ${randomSupply.verb} it, ${player.name}?`
        //if the item is not in our inventory
        }else{
            //the supplies array has medicine and food objects, so we will filter out the appripriate supplies.
            const randomSupplies = supplies.filter(sply=>sply.type===supply && sply.found)
            //choose a random supply from our enviorment(which is really a data file)
            randomSupply = randomSupplies[Math.floor(Math.random()*randomSupplies.length)]
            //let them know what they found and ask what they want to do
            str =`You don't have any ${supply} in your inventory, but you look around and find a ${randomSupply.name}. Do you want to ${randomSupply.verb} it, ${player.name}?`
        }
        //changing player activity triggers a new function/ ux display
        setPlayerActivity("foundSupplies")
        //store what ever item the player has found for later interaction
        setFoundItem(randomSupply)
        //send our data to the player/typing function(this pust text on the page.)
        typingFunction( "text", str, true)
    }

    //This is for when a player is wandering through the forest and finds food instead of an enemy or nothing. Same choice to eat, leave, store. 
    const findSupplies = (setFoundItem, typeNeeded)=>{
        if(playerActivity === ""||playerActivity === "ready"){
            //changing player activity triggers a new function/ ux display
            setPlayerActivity("foundSupplies")
            //if a player doesn't *need* anything, we randomly decide if the item is a food or medicine. Otherwise we give them what they need
            const randomSupplies = Math.floor(Math.random()*2)
            let randomSupplyArray =
            //if they need food or they don't need anything and the random thingy says "food!"
            (typeNeeded==="food"||(!typeNeeded&&randomSupplies>0))? supplies.filter(supply=>supply.type==="food"):
             //if it's not food...well the only other option is medicine...so...
            supplies.filter(supply=>supply.type==="medicine")
            //choose one supply from that array at random
            let randomSupply=randomSupplyArray[Math.floor(Math.random()*randomSupplyArray.length)] 
            //store what ever item the player has found for later interaction
            setFoundItem(randomSupply)
            //text for the typing funtion
            return`you find a ${randomSupply.name}, your ${randomSupply.affectedObj.affected} is at ${player[randomSupply.affectedObj.affected]} out of ${randomSupply.affectedObj.value}, would you like to ${randomSupply.verb} it, ${player.name}?`
        }
    }
    //eating/using the supply gives a random chance of it hurting or helping. options to leave or store have little effect on player
    const handleSupply=(choice, supply, setFoundItem)=>{
        setPlayerActivity("")
        //condtional value to send to our typing function
        let str = ""
        //in most cases, our player has the choice to consume, leave, or store the item...
        //if they choose to use or eat the item...
        if(choice === "consume"){
            //if the supply is in our inventory array it will be filtered out, if it's not in our inventory, our inventory should not change/ be equal to newsupplyArray
            const newSupplyArray = player.inventory.backpack[supply.type].filter(item=>item.name !==supply.name)
            //replace whatever was in the inventory with the filtered array
            setPlayer(prevPlayer=>({...prevPlayer, inventory:{...prevPlayer.inventory, backpack:{...prevPlayer.inventory.backpack, [supply.type]:newSupplyArray}}}))
                //possible loss is the result after the negative effect of the item
                //if the life would be less than 0 after the negative effect the result is 0(to avoid negatives), other wise it is the result of the player's life/stamina minus the negative effect
                let possibleLoss = player[supply.affectedObj.affected] - supply.loss < 0 ? 0 : player[supply.affectedObj.affected] - supply.loss
                //possible gain is the result after the postive effect of the item
                //if the life would be more than 10/stamina or 100/life(to avoid greater than 100%) after the positive effect the result is 100/10, other wise it is the result of the player's life/stamina plus the positive effect
                let possibleGain = player[supply.affectedObj.affected] + supply.benefit > supply.affectedObj.value ? supply.affectedObj.value : player[supply.affectedObj.affected] + supply.benefit
                //if the players stamina or life is at 100%
                if(player[supply.affectedObj.affected] === supply.affectedObj.value){
                    console.log(player[supply.affectedObj.affected], supply.affectedObj.value)
                    //they lose life/stammina because well the didn't need it.
                    setPlayer(prev=>({...prev, [supply.affectedObj.affected]:possibleLoss}))
                    str = `You don't need it, but you decide to ${supply.verb} the ${supply.name} anyway. ${supply.bad}. You lose ${supply.loss} ${supply.affectedObj.affected} points and now have ${possibleLoss} out of ${supply.affectedObj.value}.`
                }else{
                    //otherwise there is a 2/5 chance for the item to be in their favor 
                    //the first condition is not in their favor
                    if(Math.round(Math.random()*(5))<2){
                        //set the player with the loss...
                        setPlayer(prev=>({...prev, [supply.affectedObj.affected]:possibleLoss}))
                        //if it is a medicen and their life would be less than 0 after the negative affect, the lose the game
                        if((player[supply.affectedObj.affected] - supply.loss)<=0 && supply.type==="medicine"){
                            let smartOrDumb
                            const val = supply.affectedObj.affected === "life" ? 85 : 8
                            if(player[supply.affectedObj.affected]<val){
                                smartOrDumb=`You're in need of a boost, ${player.name}, but ${supply.verb}ing the ${supply.name} was a bad idea.`
                            }else{
                                smartOrDumb=`Maybe you should have saved the ${supply.name} for later, ${player.name}, you didn't really need it.`
                            }
                            str=`${smartOrDumb} ${supply.bad} The pain is too much, you slowly wither away thinking about all the glory you could have won...
                            ${supply.bad} The pain is too much, you slowly wither away thinking about all the glory you could have won...`
                            setTimeout(setPlayerActivity("lost"),1000)
                            
                        //otherwise they still lose the points, but not the game
                        }else{
                            str = `You ${supply.verb} the ${supply.name}, ${supply.bad}. You lose ${supply.loss} ${supply.affectedObj.affected} points and now have ${possibleLoss} ${supply.affectedObj.affected} points out of ${supply.affectedObj.value}.`
                        }
                        //positive effect
                    }else{
                        setPlayer(prev=>({...prev, [supply.affectedObj.affected]:possibleGain}))
                        str = `You ${supply.verb} the ${supply.name}, ${supply.good}. You gain ${supply.benefit} ${supply.affectedObj.affected} points and now have ${possibleGain} ${supply.affectedObj.affected} points out of ${supply.affectedObj.value}.`
                    }
                }
        }else if(choice === "leave"){
            if(supply.found){
                str = `You're smarter than you let on, ${player.name}...`
            }else{
                str = `...you know you have an inventory right...we always get the bright ones...`
            }
            setPlayerActivity("ready")
        }else{
            setPlayer(prev=>({...prev, inventory:{...prev.inventory, backpack:{...prev.inventory.backpack, [supply.type]:[...prev.inventory.backpack[supply.type],supply]}}}))
            str = `Ok, it's in your inventory, ${player.name}!`
        }
        setFoundItem("")
        typingFunction("text", str, true)
    }

    //functions for weaopshop, choosing a weapon to make/fight with, and making/fighting with the weapon. Except the weapon shop, all of these things are done by clicking weapons.
    //opens/initiates the weapons shop
    const weaponShop = ()=>{
        setPlayerActivity("chooseWeapon")
        setPlayer(prev=>({...prev, inTheShop:{making:false, shopping:true}}))
        typingFunction("text", `Through the woods is a dilapilated shack. Inside a old man smiles, "I've been expecting you, ${player.name}." ...How does he know your name...?(Click a weapon)`, true)
    }

    const selectWeapon = (weapon)=>{
        //the shop is open and the user has the option to click a weapon to learn more/make it
        if(player.inTheShop.shopping || player.inTheShop.making ){
            if(player.inTheShop.shopping){
                //the weapon they clicked is already in their inventory
                if(player.inventory.weapons.findIndex(wpn=>wpn.name===weapon.name)>=0){
                    typingFunction("text",`you already have this weapon.`, true)
                //starts this function over but in the making section.
                }else{
                    typingFunction("text",`you need ${weapon.pieces.map((piece,i)=>`${i===weapon.pieces.length-1? " and":" "} ${piece.name}`)} to make a ${weapon.name}. Click the weapon again to make it.`, true)
                    setPlayer(prev=>({...prev, inTheShop:{shopping:false, making:true}}))
                }
            //making the weapon
            }else{
                //map over the pieces needed to make the weapon returning just their ids
                const neededPieces = weapon.pieces.map(piece=>piece.id)
                //using that id array, filter our all the pieces in the players inventory that do not match any of those ids.
                //this means those pieces are for another weapon and should remain
                const remaining = player.inventory.pieces.filter(piece=>!neededPieces.includes(piece.id))
                //using that ID array filter the pieces out of the player inventory that match the ids. These peices are needed to make the weapon.
                const removed = player.inventory.pieces.filter(piece=>neededPieces.includes(piece.id))
                //the players current weapons array looks something like this [1,x,x,x,x] for display purposes
                //we copy it to avoid manipulating state improperly
                const newWeapons = [...player.inventory.weapons]
                //the player level should be one less than the x we are trying to replace
                //so when we are level 1, we want to get rid of the second x and add a level 2 weapon before leveling up the player
                //this means the players level === the index of the weapon we need to replace.
                //so we use the assignment operator to replace the x with the weapon we just 'made' 
                newWeapons[player.level]=weapon
                if(removed.length === weapon.pieces.length){
                    setPlayer(prev=>({...prev, inTheShop:{shopping:false, making:false},inventory:{...prev.inventory, pieces:remaining, weapons:newWeapons}, level:prev.level+1}))
                   // setPlayer(prev=>({...prev, level:prev.level+1}))
                    setPlayerActivity("complete")
                    typingFunction("text",`The old man grumbles something before disapperaing into the back for a few hours. He returns with ${weapon.name}... It's beautiful`, true, "complete")
                }else{
                    typingFunction("text",`You don't have the pieces to make this weapon. Wander the jungle and fight monsters to gain pieces.`, true)
                }

            }
        //a fight
        }else{
            let playerDamage
            let oppDamage
            //additional text for user
            let butAlso = ""
            //this is set in the wander function so we know the monster we need for this functions
            const monster = player.fighting
            //we check to see if the monster is the dragon
            let dragon = monster.name === "the Fire Breathing Dragon" ? true:false
            //there are a few options attached to each weapon/monster for the attacks, counters, and phrases, so we'll randomly grab one for each action we will need
            const battleObject = {    
                //the hero's first move   
                heroAttack: weapon.attack[Math.floor(Math.random()*weapon.attack.length)],
                //the finishing phrase for the weapon
                heroCatchPhrase: weapon.catchPhrase[Math.floor(Math.random()*weapon.catchPhrase.length)],
                //the weapons finishing move
                heroFinishingMove: weapon.finishingMove[Math.floor(Math.random()*weapon.finishingMove.length)],
                //if the monster manages to dodge
                monsterDodge: monster.dodge[Math.floor(Math.random()*monster.dodge.length)],
                //if the monster gets hit
                monsterHit: monster.hit[Math.floor(Math.random()*monster.hit.length)],
                //monster attack(always atleast 1 per fight)
                monsterAttack: monster.attack[Math.floor(Math.random()*monster.attack.length)],
            }
            //if the weapon passed into the function is in the player inventory, i.e. they have the weapon they just clicked on
            if(player.inventory.weapons.findIndex(wpn=>wpn.name === weapon.name)>=0){
                //the weapon that was passed in has a higher level property than the monster. i.e. the player chose the weapon on the correct level
                if(weapon.DamageLevel > monster.level){
                    //the damage done by the player is a random number between the weapons damagelevel and the monster level... 
                    playerDamage = Math.floor((Math.random() * (((weapon.DamageLevel*10)-(monster.level*10)) + (monster.level*10))))
                }else if(weapon.DamageLevel === monster.level){
                    if(dragon){
                        playerDamage = 50
                        oppDamage = 0
                        butAlso = `You wave your wand and with all your might and shout ${weapon.catchPhrase}. This Dragon is no one-year-old cloaked in love. ${monster.name.toUpperCase()} ${battleObject.monsterHit}. ${monster.losePhrase} the dragon gasps as their eyes fall closed. \n Oh look, a Key!`
                    }else{
                        playerDamage = Math.floor((Math.random() * (((monster.level*10) - (monster.level*10)/2)) + (monster.level*10)/2))
                        oppDamage = Math.floor((Math.random() * ((((monster.level*10)/weapon.DamageLevel) - 5) + 5)))
                        butAlso = `They lose ${playerDamage} life points, but not before ${monster.name} ${battleObject.monsterAttack}. You lose ${oppDamage} life points.`
                    }

                }else{
                    playerDamage = Math.floor((Math.random() * monster.level))
                    oppDamage = (Math.floor((Math.random() * ((monster.level*20) - (monster.level*10)) + (monster.level*10)))+1)
                    butAlso = `but ${monster.name.toUpperCase()} is offended by your weak attack, they barely lose ${playerDamage} life points. In return, ${monster.name} ${battleObject.monsterAttack}. You lose ${oppDamage} life points.`
                }
                const newPlayerLife = player.life - oppDamage < 0 ? 0 : player.life - oppDamage
                const newMonsterLife = monster.life - playerDamage < 0 ? 0 : monster.life - playerDamage
                    if(newPlayerLife <= 0 ){
                        setPlayerActivity("gameOver")
                        setPlayer(prevPLayer=>({...prevPLayer, isAlive:false}))
                        typingFunction( "text",`You're on your last leg, but mama didn't raise a quitter. You ${battleObject.heroAttack}, ${monster.name}. ${monster.name.toUpperCase()} ${battleObject.monsterDodge}. Then, ${monster.name} ${monster.finishingMove} It's game over. ${monster.winPhrase} they sneer standing over you.`, true)
                    }else if(newMonsterLife > 0 ){
                        setPlayerActivity("encounter")
                        setPlayer(prevPLayer=>({...prevPLayer, fighting:{...prevPLayer.fighting, life: newMonsterLife}, life:newPlayerLife}))
                        if(dragon){
                            typingFunction ("text", butAlso, true)
                        }else{
                            typingFunction ("text", `You ${battleObject.heroAttack}, ${monster.name}. ${monster.name.toUpperCase()} ${battleObject.monsterHit}. ${butAlso} Your life is still at ${newPlayerLife} points and ${monster.name} has ${newMonsterLife} points left. Will you turn and run or continue to fight?`, true)
                        }
                    }else if(newMonsterLife <= 0 ){
                        let newWeaponPiece 
                        // weaponPieces.filter(piece=>piece.id===monster.prizeForDefeat)
                        for(const key in weaponPieces){
                            if(weaponPieces[key].id===monster.prizeForDefeat){
                                newWeaponPiece = weaponPieces[key]
                            }
                        }
                        const newMonsterArray = player.monsters.filter(monster=>monster.name !== player.fighting.name)
                        setPlayerActivity("complete")
                        setPlayer(prevPlayer=>({...prevPlayer, inventory:{...prevPlayer.inventory, pieces:[...prevPlayer.inventory.pieces, newWeaponPiece]}, fighting:false, monsters:newMonsterArray}))
                        if(dragon){
                            setPlayer(prevPlayer=>({...prevPlayer,hasKey:true }))
                            typingFunction ("text",butAlso, true, "complete")
                        }else{
                            typingFunction ("text",`You can sense this fight is coming to an end. "Any last Words?" you demand as you stand over ${monster.name}. "${monster.losePhrase}" they shout. You use ${weapon.name} to ${battleObject.heroFinishingMove} ${monster.name}, This fight is over. As the dust settles, you see a ${newWeaponPiece.name} lying on the ground. Maybe you can use it in the weapons shop...`, true, "complete")
                        }
                    }
            }else{
                setPlayerActivity("encounter")
                const damageTaken = 10 * monster.level
                const newPlayerLife = player.life - damageTaken <0 ? 0 : player.life-damageTaken
                setPlayer(prevPlayer=>({...prevPlayer, life:newPlayerLife}))
                if(newPlayerLife >0){
                    typingFunction ("text",`...did you make this weapon yet?? ${monster.name} ${battleObject.monsterAttack} while you fumble for a weapon you don't have. You lose ${damageTaken} life points, leaving your life at ${player.life -10} Do you want to run away so you can make that weapon, or fight with one you actually have?`, true)
                }else{
                    setPlayerActivity("gameOver")
                    setPlayer(prevPlayer=>({...prevPlayer, isAlive:false}))
                    typingFunction ("text",`You reach for ${weapon.name} as if you went to the weapon shop and made it...but you didn't...${monster.name} ${monster.finishingMove}. ${monster.winPhrase} they bellow as you die. You died reaching for a weapon you don't even have...`, true)
                }

            }
        }
    }

    const rescueRoyals = ()=>{
        if (playerActivity === ""){
            if(player.hasKey){
                setPlayerActivity("won")
                typingFunction ("text",`You did it! You saved the day...What...were you expecting a reward? LOL. GUARDS!`, true)
            }else{
                setPlayerActivity("checking")
                typingFunction ("text",`You Don't have the Key! Did you Fight the Dragon Yet?!?! Why are you here??? BE GONE!`, true, "checking")
            }
        }
    }

    const fightDragon = ()=>{
        if (playerActivity === "" || playerActivity === "dragon"){
            if(playerActivity !== "dragon"){
                setPlayerActivity("dragon")
                if(player.hasKey){
                    typingFunction ("text",'You already beat the dragon. The royal family is WAITING!', true, "complete")
                }else if(player.monsters.length<=0){
                    if(player.stamina >8 && player.life > 80){
                        typingFunction ("text",`Took you long enough...`, true)
                    }else{
                        typingFunction("text", `Are you sure you're ready for this? You have ${player.life} life points and ${player.stamina} stamina points....maybe go wander the jungle a little longer??`, true)
                    }
                    setPlayerActivity("encounter")
                    setPlayer(prevPlayer=>({...prevPlayer, fighting:fireBreathingDragon}))

                }else{
                    setPlayerActivity("encounter")
                    setPlayer(prevPlayer=>({...prevPlayer, fighting:fireBreathingDragon}))
                    typingFunction ("text",`You creep up to the cave where the dragon is hiding the key. Your strongest weapon is${player.inventory.weapons[player.inventory.weapons.length-1]} and as you hear the Dragon bellow you begin to wonder if it's enough... \n Are you sure you wan't to do this?`, true)
                }
            }else{


            }
        }
    }

    const wander = (setFoundItem)=>{
        if (playerActivity === ""|| playerActivity === "ready"||playerActivity === "chooseWeapon"){
            if(playerActivity === "chooseWeapon"){
                setPlayer((prevObj)=>{return{...prevObj,inTheShop:{shopping:false, making:false}}})
                setPlayerActivity("ready")
            }
            if(!player.monsters.length > 0 ||player.stamina<2 ||player.life<20){
                if(player.life<100){
                    typingFunction ("text","You turn to the woods in search of aid and " + findSupplies(setFoundItem, "meds"), true)
                }
                else if(player.stamina<10){
                    typingFunction ("text", "You turn to the woods in search of sustainance and " + findSupplies(setFoundItem, "food"), true)
                }else{
                    typingFunction("text", "it looks like you've fought all the monsters in the jungle, don't be chicken, it's time to fight the dragon or save the royal family!", true)
                }
            }else{
                //player has 50% chance of encounter a random monster, about 20% chance of finding nothing, and about a 30% chance of finding food or medicine .
                let randomNumber =  Math.floor((Math.random()*11)) 
                let enemies
                let randomEnemy
                
                if(randomNumber<6){
                    setPlayerActivity("encounter")
                    enemies = player.monsters.filter(monster=>monster.level === player.level)
                    //there is a small chance of encountering a high level monster...you should run. this will also happen if you have defeated the monsters on your level but have not leveled up.
                    if(enemies.length===0||(Math.floor(Math.random() * 10 )< 1)){
                        let toughGuys = player.monsters.filter(monster=>monster.level > player.level)
                        randomEnemy = toughGuys[Math.floor(Math.random() * toughGuys.length)]
                    }  else{
                        randomEnemy = enemies[Math.floor(Math.random() * enemies.length)]
                    }
                    setPlayer(prevPlayer=>({...prevPlayer, fighting:randomEnemy}))
                    typingFunction("text", `Oh no, ${randomEnemy.name} is blocking your way! ${randomEnemy.name} is a level ${randomEnemy.level} enemy with ${randomEnemy.life} life points. Think you can take 'em?`, true)
                }else  if(randomNumber >8){
                    setPlayerActivity("")
                    //20% chance of nothing
                    typingFunction("text","Nothing here, better continue on!", true)
                }else{
                    setPlayerActivity("")
                    typingFunction("text", findSupplies(setFoundItem), true)
                        
                }   
            }
        }
    }
    return(
        <FunctionContext.Provider value ={{wander, selectWeapon, weaponShop, fightDragon, rescueRoyals, handleSupply, checkSupplies, checkInv}}>
            {props.children}
        </FunctionContext.Provider>
    )
}

export {FunctionProvider, FunctionContext}
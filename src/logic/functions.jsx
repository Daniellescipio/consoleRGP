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
    const checkInv = ()=>{
        let inventory = player.inventory
        const weaponsCheck = inventory.weapons.length>0?inventory.weapons.map((weapon, i)=>`${i===inventory.weapons.length-1 &&i===inventory.weapons.length>1 ? `and ${weapon.name}.`:` ${weapon.name}`}`):"no weapons"
        const foodCheck=inventory.backpack.food.length>0?inventory.backpack.food.map((food, i)=>`${i===inventory.backpack.food.length-1 ? `and a ${food.name}.`:` a ${food.name}`}`):"no food"
        const medCheck = inventory.backpack.medicine.length>0?inventory.backpack.medicine.map((medicine, i)=>`${i===inventory.backpack.medicine.length-1 ? `and a ${medicine.name}.`:` a ${medicine.name}`}`):"no medicine"
        const pieceCheck = inventory.pieces.length>0?inventory.pieces.map((piece,i)=>`${i===inventory.pieces.length-1 ? `and a ${piece.name}.`:` a ${piece.name}`}`):"no weapon pieces"
        if(playerActivity === "fightMonster"){
            typingFunction ("addText", `Weapons: ${weaponsCheck} Food:${foodCheck} Medicine: ${medCheck}`, true)
        }else if(playerActivity === ""){
            setPlayerActivity("checking")
            typingFunction ("text", ` Weapons: ${weaponsCheck}, Food:${foodCheck}, Medicine: ${medCheck}, Weapons pieces: ${pieceCheck}, life: ${player.life}/100 stamina: ${player.stamina}/10. `, true, "checking")
        }
    }

    //functions for food and Medicine 
    //if a player clicks the pill or burger. Their inventory will be checked for items. If they have food or meds in their inventory, they can choose to eat it, store it, or leave it, if they don't have that supply in their inventory, they will randomly scavenge a supply with the same choice
    const checkSupplies = (setFoundItem, supply)=>{
        let str
        const inventory =player.inventory.backpack[supply]
        let randomSupply
        if(inventory.length>0){
            randomSupply = inventory[Math.floor(Math.random()*inventory.length)]
            const storeIt = document.getElementById("inv")
            storeIt.disabled = false
            str = ` You pull a ${randomSupply.name} from your inventory. Your ${randomSupply.affectedObj.affected} is at ${player[randomSupply.affectedObj.affected]} out of ${randomSupply.affectedObj.value} Do you want to ${randomSupply.verb} it, ${player.name}?`
        }else{
            const randomSupplies = supplies.filter(sply=>sply.type===supply && sply.found)
            randomSupply = randomSupplies[Math.floor(Math.random()*randomSupplies.length)]
            const storeIt = document.getElementById("inv")
            storeIt.disabled = true
            str =`You don't have any ${supply} in your inventory, but you look around and find a ${randomSupply.name}. Do you want to ${randomSupply.verb} it, ${player.name}?`
        }
        setPlayerActivity("foundSupplies")
        setFoundItem(randomSupply)
        typingFunction( "text", str, true)
    }
    //This is for when a player is wandering through the forest and finds food instead of an enemy or nothing. Same choice to eat, leave, store. 
    const findSupplies = (setFoundItem)=>{
        if(playerActivity === ""){
            setPlayerActivity("foundSupplies")
            let randomSupplyArray = Math.random()*2>0 ?supplies.filter(supply=>supply.type==="food"):supplies.filter(supply=>supply.type==="medicine")
            let randomFood=randomSupplyArray[Math.floor(Math.random()*randomSupplyArray.length)] 
            console.log(randomFood)
            setFoundItem(randomFood)
            return`you find a ${randomFood.name}, your ${randomFood.affectedObj.affected} is at ${player[randomFood.affectedObj.affected]} out of ${randomFood.affectedObj.value}, would you like to ${randomFood.verb} it, ${player.name}?`
        }
    }
    //eat/using the supply gives a random chance of it hurting or helping. options to leave or store have little effect on player
    const handleSupply=(choice, supply, setFoundItem)=>{
        setPlayerActivity("")
        let str = ""
        if(choice === "consume"){
            const newSupplyArray = player.inventory.backpack[supply.type].filter(item=>item.name !==randomSupply.name)
            setPlayer(prevPlayer=>({...prevPlayer, inventory:{...prevPlayer.inventory, backpack:{...prevPlayer.inventory.backpack, [supply.type]:newSupplyArray}}}))
                let possibleLoss = player[supply.affectedObj.affected] - supply.loss < 0 ? 0 : player[supply.affectedObj.affected] - supply.loss
                let possibleGain = player[supply.affectedObj.affected] + supply.benefit > supply.affectedObj.value ? supply.affectedObj.value : player[supply.affectedObj.affected] + supply.benefit
                if(player[supply.affectedObj.affected] === supply.affectedObj.value){
                    setPlayer(prev=>({...prev, stamina:possibleLoss}))
                    str = `You don't need it, but you decide to ${supply.verb} the ${supply.name} anyway. ${supply.bad}. You lose ${supply.loss} ${supply.affectedObj.affected} points and now have ${possibleLoss} out of ${supply.affectedObj.value}.`
                }else{
                    if(Math.floor(Math.random()*(supply.affectedObj.value+1))>player[supply.affectedObj.affected]){
                        setPlayer(prev=>({...prev, [supply.affectedObj.affected]:possibleLoss}))
                        if((player.life - supply.loss)<=0 && supply.type==="medicine"){
                            let smartOrDumb
                            if(player.life<85){
                                smartOrDumb=`You're in need of a boost, ${player.name}, but ${supply.verb}ing the ${supply.name} was a bad idea.`
                            }else{
                                smartOrDumb=`Maybe you should have saved the ${supply.name} for later, ${player.name}, you didn't really need it.`
                            }
                            str=`${smartOrDumb} ${supply.bad} The pain is too much, you slowly wither away thinking about all the glory you could have won...
                            ${supply.bad} The pain is too much, you slowly wither away thinking about all the glory you could have won...`
                            setPlayerActivity("lost")
                        }else{
                            str = `You ${supply.verb} the ${supply.name}, ${supply.bad}. You lose ${supply.loss} ${supply.affectedObj.affected} points and now have ${possibleLoss} ${supply.affectedObj.affected} points out of ${supply.affectedObj.value}.`
                        }
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
        if(player.inTheShop.shopping || player.inTheShop.making ){
            if(player.inTheShop.shopping){
                if(player.inventory.weapons.findIndex(wpn=>wpn.name===weapon.name)>=0){
                    typingFunction("text",`you already have this weapon.`, true)
                }else{
                    setPlayer(prev=>({...prev, inTheShop:{shopping:false, making:true}}))
                    typingFunction("text",`you need ${weapon.pieces.map((piece,i)=>`${i===weapon.pieces.length-1? " and":" "} ${piece.name}`)} to make a ${weapon.name}. Click the weapon again to make it.`, true)
                }
            }else{
                const num = player.inventory.pieces.reduce((final, piece)=>{weapon.pieces.forEach(wpnPiece=>wpnPiece.id === piece.id && final++)}, 0)
                const arr = player.inventory.pieces.reduce((final, piece)=>{weapon.pieces.forEach(wpnPiece=>wpnPiece.id !== piece.id && final.push(piece))}, [])
                if(num === weapon.pieces.length){
                    setPlayer(prev=>({...prev, inTheShop:{shopping:false, making:false},inventory:{...prev.inventory, pieces:arr, weapons:[...prev.inventory.weapons, weapon]}}))
                    setPlayer(prev=>({...prev, level:prev.level+1}))
                    setPlayerActivity("complete")
                    typingFunction("text",`The old man grumbles something before disapperaing into the back for a few hours. He returns with ${weapon.name}... It's beautiful`, true, "complete")
                }else{
                    typingFunction("text",`You don't have the pieces to make this weapon. Wander the jungle and fight monsters to gain pieces.`, true)
                }

            }
        }else{
            let playerDamage
            let oppDamage
            let butAlso = ""
            const monster = player.fighting
            let dragon = monster.name === "the Fire Breathing Dragon" ? true:false
            const battleObject = {       
                heroAttack: weapon.attack[Math.floor(Math.random()*weapon.attack.length)],
                heroCatchPhrase: weapon.catchPhrase[Math.floor(Math.random()*weapon.catchPhrase.length)],
                heroFinishingMove: weapon.finishingMove[Math.floor(Math.random()*weapon.finishingMove.length)],
                monsterDodge: monster.dodge[Math.floor(Math.random()*monster.dodge.length)],
                monsterHit: monster.hit[Math.floor(Math.random()*monster.hit.length)],
                monsterAttack: monster.attack[Math.floor(Math.random()*monster.attack.length)],
            }
            if(player.inventory.weapons.findIndex(wpn=>wpn.name === weapon.name)>=0){
                if(weapon.DamageLevel > monster.level){
                    playerDamage = Math.floor((Math.random() * (((weapon.DamageLevel*10)-(monster.level*10)) + (monster.level*10))))
                }else if(weapon.DamageLevel === monster.level){
                    if(dragon){
                        playerDamage = 50
                        oppDamage = 0
                        butAlso = `You wave your wand and with all your might shout ${weapon.catchPhrase}. This Dragon is no one-year-old cloaked in love. ${monster.name.toUpperCase()} ${battleObject.monsterHit}. ${monster.losePhrase} the dragon gasps as their eyes fall closed. \n Oh look, a Key!`
                    }else{
                        playerDamage = Math.floor((Math.random() * (((monster.level*10) - (monster.level*10)/2)) + (monster.level*10)/2))
                        oppDamage = Math.floor((Math.random() * ((((monster.level*10)/weapon.DamageLevel) - 5) + 5)))
                        butAlso = `They lose ${playerDamage} life points, but not before ${monster.name} ${battleObject.monsterAttack}. You lose ${oppDamage} life points.`
                    }

                }else{
                    playerDamage = Math.floor((Math.random() * monster.level))
                    oppDamage = Math.floor((Math.random() * ((monster.level*20) - (monster.level*10)) + (monster.level*10)))
                    butAlso = `${monster.name.toUpperCase()} is offended by your weak attack, they barely lose ${playerDamage} life points. In return, ${monster.name} ${battleObject.monsterAttack}. You lose ${oppDamage} life points.`
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
                            typingFunction ("text",`You can sense this fight is coming to an end. "Any last Words?" you demand as you stand over ${monster.name}. "${monster.losePhrase}" they shout. You use ${weapon.name} to ${battleObject.heroFinishingMove} ${monster.name}, This fight is over. As the dust settles, you see a ${newWeaponPiece.name} lying on the ground.`, true, "complete")
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
            console.log(player.hasKey)
            if(player.hasKey){
                setPlayerActivity("won")
                typingFunction ("text",`You did it! You saved the day...What...were you expecting a reward? LOL. GAURD!`, true)
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
                    typingFunction ("text",`You creep up to the cave where the dragon is hiding the jey. Your strongest weapon is${player.inventory.weapons[player.inventory.weapons.length-1]} and as you hear the Dragon bellow you begin to wonder if it's enough... \n Are you sure you wan't to do this?`, true)
                }
            }else{


            }
        }
    }

    const wander = (setFoundItem)=>{
        if (playerActivity === ""|| playerActivity === "ready"){
            if(!player.monsters.length > 0 ||player.stamina<2 ||player.life<20){
                if(player.life<100){
                    typingFunction ("text","You turn to the woods in search of aid and " + findSupplies(setFoundItem), true)
                }
                else if(player.stamina<10){
                    typingFunction ("text", "You turn to the woods in search of sustainance and " + findSupplies(setFoundItem), true)
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
                    //a random enemy is selected and displayed from the previously create enemy array
                    randomEnemy = enemies[Math.floor(Math.random() * enemies.length)]  
                    //small chance of encountering a high level monster...you should run.
                    console.log(randomEnemy)
                    if((Math.floor(Math.random() * 10 )< 1)){
                        let toughGuys = player.monsters.filter(monster=>monster.level > player.level)
                        randomEnemy = toughGuys[Math.floor(Math.random() * toughGuys.length)]
                    }  else{
                        randomEnemy = enemies[Math.floor(Math.random() * enemies.length)]
                    }
                    setPlayer(prevPlayer=>({...prevPlayer, fighting:randomEnemy}))
                    typingFunction("text", `Oh no, ${randomEnemy.name} is blocking your way! ${randomEnemy.name} is a level ${randomEnemy.level} enemy with ${randomEnemy.life} life points. Think you can take 'em?`, true)
                }else  if(randomNumber >8){
                    setPlayerActivity("")
                    console.log("nothing")
                    //20% chance of nothing
                    typingFunction("text","Nothing here, better continue on!", true)
                }else{
                    console.log("supplies")
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
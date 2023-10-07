import { useContext } from "react"
import { monsters, levels } from "../data/monsters"
import { weaponPieces, weapons } from "../data/weapons"
import {findFood, findMeds, foodOptions, medOptions } from "../data/foodandMeds"
import { fireBreathingDragon } from "../data/monsters"
const checkInv = (typingFunction, player, setPlayer,playerActivity, setPlayerActivity,)=>{
    setPlayerActivity("checking")
    let inventory = player.inventory
    const weaponsCheck = inventory.weapons.length>0?inventory.weapons.map(weapon=>weapon.name):"no weapons"
    const foodCheck=inventory.backpack.food.length>0?inventory.backpack.food.map(food=>food):"no food"
    const medCheck = inventory.backpack.medicine.length>0?inventory.backpack.medicine.map(medicine=>medicine):"no medicine"
    const pieceCheck = inventory.pieces.length>0?inventory.pieces.map((piece,i)=>` a ${piece.name}${i===inventory.pieces.length-1 ? ".":","}`):"no weapon pieces"
    typingFunction (`${<break/>} Weapons: ${weaponsCheck}, ${<break/>}Food:${foodCheck},${<break/>} Medicine: ${medCheck}, ${<break/>}Weapons pieces: ${pieceCheck},${<break/>} life: ${player.life}/100 stamina: ${player.stamina}/10. `, false, "checking")
}
const weaponShop = (typingFunction, player, setPlayer,playerActivity, setPlayerActivity)=>{
    setPlayerActivity("chooseWeapon")
    setPlayer(prev=>({...prev, inTheShop:{making:false, shopping:true}}))
    typingFunction(`You make your way through the woods to an old dilapilated shack. Inside is a gruff older man, a fire blazing behind him. "What do you want!?" He shouts.`, true)
}
const selectWeapon = (weapon, player, setPlayer, setPlayerActivity, typingFunction)=>{
    if(player.inTheShop.shopping || player.inTheShop.making ){
        if(player.inTheShop.shopping){
            if(player.inventory.weapons.findIndex(wpn=>wpn.name===weapon.name)>=0){
                typingFunction(`you already have this weapon.`, true)
            }else{
                setPlayer(prev=>({...prev, inTheShop:{shopping:false, making:true}}))
                typingFunction(`you need ${weapon.pieces.map((piece,i)=>`${i===weapon.pieces.length-1? " and":" "} ${piece.name}`)} to make a ${weapon.name}. Click the weapon again to make it.`, true)
            }
        }else{
            let anyOthers = []
            let enough = player.inventory.pieces.filter(piece=>{weapon.pieces.name === piece.name?piece:anyOthers.push(piece)})
            if(enough.length === weapon.pieces.length){
                setPlayer(prev=>({...prev, inventory:{...prev.inventory, pieces:anyOthers, weapons:[...prev.inventory.weapons, weapon]}}))
                setPlayerActivity("completed")
                typingFunction(`The old man grumbles something before disapperaing into the back for a few hours. He ruturns with ${weapon.name} It's beautiful`, true, "completed")
            }else{
                typingFunction(`You don't have the pieces to make this weapon. Wander the jungle and fight monsters to gain pieces.`, true)
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
                    butAlso = `You wave your wand and with all your might shout a killing spell. This Dragon is no one-year-old cloaked in love. The ${monster.name} ${battleObject.monsterHit}. ${monster.losePhrase} the dragon gasps as their eyes fall closed. \n Oh look, a Key!`
                }else{
                    playerDamage = Math.floor((Math.random() * (((monster.level*10) - (monster.level*10)/2)) + (monster.level*10)/2))
                    oppDamage = Math.floor((Math.random() * ((((monster.level*10)/weapon.DamageLevel) - 5) + 5)))
                    butAlso = `They lose ${playerDamage} life points, but not before ${monster.name} ${battleObject.monsterAttack}. You lose ${oppDamage} life points.`
                }

            }else{
                playerDamage = Math.floor((Math.random() * monster.level))
                oppDamage = Math.floor((Math.random() * ((monster.level*20) - (monster.level*10)) + (monster.level*10)))
                butAlso = `the ${monster.name} is offended by your weak attack, the barely lose ${playerDamage} life points. In return, ${monster.name} ${battleObject.monsterAttack}. You lose ${oppDamage} life points.`
            }
            const newPlayerLife = player.life - oppDamage < 0 ? 0 : player.life - oppDamage
            const newMonsterLife = monster.life - playerDamage < 0 ? 0 : monster.life - playerDamage
            console.log(monster, monster.prizeForDefeat)
                if(newPlayerLife <= 0 ){
                    console.log("1")
                    setPlayerActivity("gameOver")
                    setPlayer(prevPLayer=>({...prevPLayer, isAlive:false}))
                    typingFunction( `You're on your last leg, but mama didn't raise a quitter. You ${battleObject.heroAttack}, ${monster.name}. The ${monster.name} ${battleObject.monsterDodge}. Then, ${monster.name} ${monster.finishingMove} It's game over. ${monster.winPhrase} they sneer standing over you.`, true)
                }else if(newMonsterLife > 0 ){
                    console.log("2")
                    setPlayerActivity("encounter")
                    setPlayer(prevPLayer=>({...prevPLayer, fighting:{...prevPLayer.fighting, life: newMonsterLife}, life:newPlayerLife}))
                    if(dragon){
                        typingFunction (butAlso, true)
                    }else{
                        typingFunction (`You ${battleObject.heroAttack}, ${monster.name}. The ${monster.name} ${battleObject.monsterHit}. \n ${butAlso} \n Your life is still at ${newPlayerLife} points and ${monster.name} has ${newMonsterLife} points left. Will you turn and run or continue to fight?`, true)
                    }
                }else if(newMonsterLife <= 0 ){
                    console.log("3")
                    let newWeaponPiece 
                    // weaponPieces.filter(piece=>piece.id===monster.prizeForDefeat)
                    for(const key in weaponPieces){
                        if(weaponPieces[key].id===monster.prizeForDefeat){
                            newWeaponPiece = weaponPieces[key]
                        }else{
                            console.log(weaponPieces[key].id, monster.prizeForDefeat)
                          //  typingFunction('error in function around line 100')
                        }
                    }
                    const newMonsterArray = player.monsters.filter(monster=>monster.name !== player.fighting.name)
                    setPlayerActivity("complete")
                    setPlayer(prevPlayer=>({...prevPlayer, inventory:{...prevPlayer.inventory, pieces:[...prevPlayer.inventory.pieces, newWeaponPiece]}, fighting:false, monsters:newMonsterArray}))
                    typingFunction (`You can sense this fight is coming to an end. "Any last Words?" you demand as you stand over ${monster.name}. "${monster.losePhrase}" they shout. You use ${weapon.name} to ${battleObject.heroFinishingMove} ${monster.name}, This fight is over. As the dust settles, you see a ${newWeaponPiece.name} lying on the ground.`, true, "complete")
                    if(dragon){
                        setPlayer(prevPlayer=>({...prevPlayer,hasKey:true }))
                    }
                }
        }else{
            setPlayerActivity("encounter")
            const damageTaken = 10*monster.level
            const newPlayerLife = player.life - damageTaken <0 ? 0 : player.life-damageTaken
            setPlayer(prevPlayer=>({...prevPlayer, life:newPlayerLife}))
            if(newPlayerLife >0){
                typingFunction (`...did you make this weapon yet?? ${monster.name} ${battleObject.monsterAttack} while you fumble for a weapon you don't have. You lose ${damageTaken} life points, leaving your life at ${player.life -10} Do you want to run away so you can make that weapon, or fight with one you actually have?`, true)
            }else{
                setPlayer(prevPlayer=>({...prevPlayer, isAlive:false}))
                typingFunction (`You reach for ${weapon.name} as if you went to the weapon shop and made it...but you didn't...${monster.name} ${monster.finishingMove}. ${monster.winPhrase} they bellow as you die. You died reaching for a weapon you don't even have...`, true)
            }

        }
    }
}
const rescueRoyals = (typingFunction, player, setPlayer,playerActivity, setPlayerActivity)=>{
    if (playerActivity === ""){
        if(player.hasKey){
            setPlayerActivity("complete")
            typingFunction (`You did it! You saved the day`, true, "complete")
        }else{
            setPlayerActivity("checking")
            typingFunction (`You Don't have the Key! Did you Fight the Dragon Yet?!?! Why are you here??? BE GONE!`, true, "checking")
        }
    }
}
const fightDragon = (typingFunction, player, setPlayer,playerActivity, setPlayerActivity, setFoundItem)=>{
    if (playerActivity === "" || playerActivity === "dragon"){
        if(playerActivity !== "dragon"){
            setPlayerActivity("dragon")
            if(player.hasKey){
                typingFunction ('You already beat the dragon. The royal family is WAITING!', true, "complete")
            }else if(player.monsters.length<=0){
                if(player.stamina >8 && player.life > 80){
                    typingFunction (`Took you long enough...`, true)
                }else{
                    typingFunction( `Are you sure you're ready for this? You have ${player.life} life points and ${player.stamina} stamina points....maybe go wander the jungle a little longer??`, true)
                }
                setPlayerActivity("encounter")
                setPlayer(prevPlayer=>({...prevPlayer, fighting:fireBreathingDragon}))

            }else{
                setPlayerActivity("encounter")
                setPlayer(prevPlayer=>({...prevPlayer, fighting:fireBreathingDragon}))
                typingFunction (`You creep up to the cave where the dragon is hiding the jey. Your strongest weapon is${player.weapons[player.weapons.length-1]} and as you hear the Dragon bellow you begin to wonder if it's enough... \n Are you sure you wan't to do this?`, true)
            }
        }else{


        }
    }
}
const wander = (typingFunction, player, setPlayer,playerActivity, setPlayerActivity, setFoundItem)=>{
    if (playerActivity === ""){
        if(!player.monsters.length > 0 ||player.stamina<2 ||player.life<20){
            if(player.life<100){
                typingFunction ("You turn to the woods in search of aid and " + findMeds(player,setPlayer, setPlayerActivity, setFoundItem), true)
            }
            else if(player.stamina<10){
                typingFunction ("You turn to the woods in search of sustainance and " + findFood(player,setPlayer, setPlayerActivity, setFoundItem), true)
            }else{
                typingFunction("it looks like you've fought all the monsters in the jungle, don't be chicken, it's time to fight the dragon or save the royal family!", true)
            }
        }else{
            //player has 50% chance of encounter a random monster, about 20% chance of finding nothing, and about a 30% chance of finding food or medicine .
            let randomNumber =  Math.floor((Math.random()*11)) 
            let enemies
            let randomEnemy
            if(randomNumber  ){
                setPlayerActivity("encounter")
                enemies = player.monsters.filter(monster=>monster.level === player.level)
                let randomToughGuy = player.monsters.find(monster=>monster.level > player.level)
                enemies.push(randomToughGuy)
                //a random enemy is selected and displayed from the previously create enemy array
                randomEnemy = enemies[Math.floor(Math.random() * enemies.length)]    
                setPlayer(prevPlayer=>({...prevPlayer, fighting:randomEnemy}))
                typingFunction(`Oh no, ${randomEnemy.name} is blocking your way! ${randomEnemy.name} is a level ${randomEnemy.level} enemy with ${randomEnemy.life} life points. Think you can take 'em?`, true)
            }else  if(randomNumber > 7){
                setPlayerActivity("")
                //20% chance of nothing
                typingFunction("Nothing here, better continue on!", true)
            }else{
                //another random number to choose between food and medicine triggers this is 50/50
                if(Math.floor(Math.random() * 11)<6){ 
                    setPlayerActivity("foundSupplies")
                    let randomFood = foodOptions[Math.floor(Math.random()*foodOptions.length)] 
                    setFoundItem(randomFood)
                    typingFunction (`you find a ${randomFood.name}, your stamina is at ${player.stamina} out of 10, do you want to eat it?`, true)
                }else{
                    setPlayerActivity("foundSupplies")
                    let randomMed = medOptions[Math.floor(Math.random()*medOptions.length)] 
                    setFoundItem(randomMed)
                    typingFunction (`you find a ${randomMed.name}, your life is at ${player.life} out of 10o, do you want to use it?`, true)
                }
            }   
        }
    }
}
const obj = {checkInv, rescueRoyals, fightDragon, wander, weaponShop, selectWeapon}

export {obj}
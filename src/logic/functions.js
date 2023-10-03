import { useContext } from "react"
import { monsters, levels } from "../data/monsters"
import { weaponPieces, weapons } from "../data/weapons"
import {findFood, findMeds } from "../data/foodandMeds"

const checkInv = (player)=>{
    let inventory = player.inventory
    const weaponsCheck = inventory.weapons.length>0?inventory.weapons.map(weapon=>weapon.name):"no weapons"
    const foodCheck=inventory.backpack.food.length>0?inventory.backpack.food.map(food=>food):"no food"
    const medCheck = inventory.backpack.medicine.length>0?inventory.backpack.medicine.map(medicine=>medicine):"no medicine"
    const pieceCheck = inventory.pieces.length>0?inventory.pieces.map(piece=>piece.name):"no weapon pieces"
    return `You have ${weaponsCheck},${foodCheck},${medCheck}, and ${pieceCheck} `
}
const checkLife = (player)=>{
    return `You have ${player.life} out of 100 life points and ${player.stamina} out of 10 stamina points.`
}
const rescueRoyals = (player)=>{
    if(player.hasKey){
        return `You did it! You saved the day`
    }else{
        return `You Don't have the Key! Did you Fight the Dragon Yet?!?! Why are you here??? BE GONE!`
    }
}
const fightDragon = (player, setPlayer, setPlayerActivity, playerActivity)=>{
    if(playerActivity !== "dragon"){
        setPlayerActivity("dragon")
        if(player.hasKey){
            return 'You already beat the dragon. The royal family is WAITING!'
        }else if(monsters.length<=0){
            if(player.stamina >8 && player.life > 80){
                return `Took you long enough...`
            }else{
                return `Are you sure you're ready for this? You have ${player.life} life points and ${player.stamina} stamina points....maybe go wander the jungle a little longer??`
            }

        }else{
            return `So you're a brave one huh...`
        }
    }else{


    }
}
const wander = (player, setPlayer, setPlayerActivity, setFoundItem)=>{
        if(!monsters.length > 0 ||player.stamina<2 ||player.life<20){
            if(player.life<100){
                return "You turn to the woods in search of aid and " + findMeds(player,setPlayer, setPlayerActivity, setFoundItem)
            }
            else if(player.stamina<10){
                return "You turn to the woods in search of sustainance and " + findFood(player,setPlayer, setPlayerActivity, setFoundItem)
            }else{
                return("it looks like you've fought all the monsters in the jungle, don't be chicken, it's time to fight the dragon or save the royal family!")
            }
        }else{
            //player has 50% chance of encounter a random monster, about 20% chance of finding nothing, and about a 30% chance of finding food or medicine .
            let randomNumber =  Math.floor((Math.random()*11)) 
            let enemies
            let randomEnemy
            if(randomNumber < 6 ){
                setPlayerActivity("encounter")
                //players level is evaluated and if there are monsters on the same level, they are put into an array, if there are no more players on the player level, all remaining monsters are entered into array(this means that the player has the ability to level up but has not.)
                if(player.level === 1){ 
                    if(levels.levelOne.length>0){
                        //random chance to get a monster of a higher level
                    enemies =[...levels.levelOne, levels.levelTwo[levels.levelTwo.length-1]]
                    }else{
                        enemies = monsters
                    }
                }else if(player.level===2){
                    if(levels.levelTwo.length>0){
                        enemies =[...levels.levelTwo, levels.levelThree[levels.levelThree.length-1]]
                    }else{
                        enemies = monsters
                    }
                }else if(player.level ===3){
                    if(levels.levelThree.length>0){
                        enemies =[...levels.levelThree, levels.levelFour[levels.levelFour.length-1]]
                    }else{
                        enemies = monsters
                    }
                }else if(player.level === 4){
                    if(levels.levelFour.length >0){
                    enemies = levels.levelFour
                    }else{
                        enemies = monsters
                    }
                }
                //a random enemy is selected and displayed from the previously create enemy array
                randomEnemy = enemies[Math.floor(Math.random() * enemies.length)]    
                return`Oh no, ${randomEnemy.name} is blocking your way! ${randomEnemy.name} is a level ${randomEnemy.level} enemy with ${randomEnemy.life} life points. Think you can take 'em?`
            }else  if(randomNumber > 7){
                //20% chance of nothing
                return"Nothing here, better continue on!"
            }else{
                //another random number to choose between food and medicine triggers this is 50/50
                if(Math.floor(Math.random() * 11)<6){ 
                   return findFood(player, setPlayer, setPlayerActivity, setFoundItem)
                }else{
                   return findMeds(player,setPlayer, setPlayerActivity, setFoundItem)
                }
            }   
        }
}
const obj = {checkInv, checkLife, rescueRoyals, fightDragon, wander}

export {obj}
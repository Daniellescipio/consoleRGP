import React, { useEffect, useState } from "react";
import { weaponPieces, weapons } from "../data/weapons";
import { monsters } from "../data/monsters";

const PlayerContext = React.createContext()


function PlayerProvider(props){
    const [playerActivity, setPlayerActivity] =useState("") 
    const [player, setPlayer] = useState({
        name : "Danielle",
        life : 100,
        stamina:10,
        inventory : {
            weapons:[weapons.hands, "not acquired","not acquired","not acquired","not acquired"],
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
        hasKey : false,
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
        level : 1, 
        levelUp:false
    })

    useEffect(()=>{
        //the idea here is to let the game know the player is ready to level up if they haven't gon to the weapons shop yet.
        //get all the weapons 
        let weaponsArr = [weapons.axe, weapons.sword, weapons.laserGun, weapons.magicWand]
        //find the weapon one level higher than our players current level
        let nextWeapon = weaponsArr.find((weapon)=>weapon.DamageLevel>player.level)
        //check to see if the player has the pieces for that weapon
        //reducer counts each peice the player has that is necessary to build the next weapon
        const pieceCheck = nextWeapon.pieces.reduce((final, piece)=>{
            player.inventory.pieces.forEach(invPiece=>invPiece.id===piece.id && final ++)
            return final
        }, 0)
        //if they have all the peices, i.e. reducer equals the number of pieces
        if(pieceCheck === nextWeapon.pieces.length){
            //set their levelup property to true, but don'e actually level them up. That can only be done in the weapons shop
            setPlayer(prev=>({...prev, levelUp:true}))
        }else{
            //just incase it was still true from the last time they were supposed to level up
            setPlayer(prev=>({...prev, levelUp:false}))
        }
        //this should run everytime they get a new weapons piece
    }, [player.inventory.pieces])

    return(
        <PlayerContext.Provider value ={{player, setPlayer, playerActivity, setPlayerActivity}}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export {PlayerProvider, PlayerContext}
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
        let weaponsArr = [weapons.axe, weapons.sword, weapons.laserGun, weapons.magicWand]
        let nextWeapon = weaponsArr.find((weapon)=>weapon.DamageLevel>player.level)
        const pieceCheck = nextWeapon.pieces.reduce((final, piece)=>{
            player.inventory.pieces.forEach(invPiece=>invPiece.id===piece.id && final ++)
            return final
        }, 0)
        if(pieceCheck === nextWeapon.pieces.length){
            setPlayer(prev=>({...prev, levelUp:true}))
        }else{
            setPlayer(prev=>({...prev, levelUp:false}))
        }
    }, [player.inventory.pieces])

    return(
        <PlayerContext.Provider value ={{player, setPlayer, playerActivity, setPlayerActivity}}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export {PlayerProvider, PlayerContext}
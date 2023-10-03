import React, { useState } from "react";

const PlayerContext = React.createContext()


function PlayerProvider(props){
    const [playerActivity, setPlayerActivity] =useState("") 
    const [player, setPlayer] = useState({
        name : "Danielle",
        life : 100,
        stamina:10,
        inventory : {
            weapons:[],
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
        //All players start at level one
        level : 1
      })
    return(
        <PlayerContext.Provider value ={{player, setPlayer, playerActivity, setPlayerActivity}}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export {PlayerProvider, PlayerContext}
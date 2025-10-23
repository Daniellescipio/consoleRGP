import handsimg from "../assets/hands.png"
import axeimg from "../assets/axe.png"
import lasrgun from "../assets/lasrgun.png"
import wand from "../assets/wand.png"
import swordimg from "../assets/sword.png"
import keyimg from "../assets/key.png"
import { PlayerContext } from "../logic/usePlayer"
import { useContext} from "react"
import { TypingContext } from "../logic/useTyping"
import { FunctionContext } from "../logic/functions"
const weaponPieces = {
    wood: {
        id:1,
        name : 'piece of wood',
        for:"Axe",
        description: 'a piece of wood, good for carving into weapons',
    },
    metal:{
        id:2,
        name : 'piece of metal',
        for:"Axe",
        description: 'a piece of metal, good for molding into a weapon'
    }, 
    blade:{
        id:3,
        name : 'blade',
        for:"Sword",
        description: 'the pointy part of a sword'
    },
    pommel:{
        id:4,
        name : 'pommel',
        for:"Sword",
        description: `so you don't cut yourself holding a sword`
    },
    crossgaurd:{
        id:5,
        name : 'crossgaurd',
        for:"Sword",
        description: `idk, but the Searches said you need one to make a sword`
    },
    action:{
        id:6,
        name : 'action',
        for:"Laser Gun",
        description: 'The part that make the gun GO'
    },
    stock: {
        id:7,
        name : 'stock',
        for:"Laser Gun",
        description:`the handle of your gun`
    },
    barrel:{
        id:8,
        name : 'barrel',
        for:"Laser Gun",
        description: 'Where the laser will come from'
    },
    laser: {
        id:9,
        name : 'laser',
        for:"Laser Gun",
        description:`a laser, because this isn't just any gun...`
    },
    holly: {
        id:10,
        name : 'holly',
        for:"Magic Wand",
        description:`the difference between stick and wand...`
    },
    pheonixFeather: {
        id:11,
        name : 'pheonix Feather',
        for:"Magic Wand",
        description:`Magic bird feather for the magic core of your magic wand`
    },
    garrickOllivander:{
        id:12,
        name : 'Garrick Ollivander',
        for:"Magic Wand",
        description: "Unless you know how to make wands your gonna need this dude."
    },
    magic:{
        id:13,
        name : 'magic',
        for:"Magic Wand",
        description: `A little pixie dust so you can work the wand when you need to`
    } ,
    key:{
        id:14,
        name : "a key",
        defintion : "It's no weapon, but it'll get you the girl!(and the rest of her family)",
    }
}

const weapons ={
    hands:{
        name: "these hands",
        Definition : "When you have nothing else, you have these hands",
        DamageLevel :  1,
        catchPhrase:["Catch these!", "You don't want these hands", "Don't make me smack you", "Why I outta","This the strong hand"] ,
        attack:["smack", "punch", "slap", "molly wop", "hit", "bash"],
        finishingMove:["backhand", "Sucker punch", "knockout"],
        pieces: [],
        img:handsimg
    },
    axe:{
        name : "your axe",
        Definition : "A sturdy blunt handle and a sharp blade, the possiblities are endless.",
        DamageLevel :  2,
        catchPhrase:["This axe was made for swinging, and that's just what I'm gonna do!","It's time to cut you down to size", "How much villian could a hero chuck if a hero could chuck villians",],
        attack:["chop", "slash", "cut", "tear at"],
        finishingMove:["chop parts off of", "removes the head of", "cracks the skull of","cuts up"],
        pieces: [weaponPieces.wood, weaponPieces.metal],
        img:axeimg
    },
    sword: {
        name : "your sword",
        Definition : "A finely crafted metal blade",
        DamageLevel :  3,
        catchPhrase: ["Hatori Hanzo himself would be proud of this bad boy", "get the point yet?", "Stick em with the pointy end", "*fancy blade swing*"],
        attack:["slice", "cut", "scissor", "slash", "pierce"],
        finishingMove:["behead", "pierce the heart of", "cut from navel to nose"],
        pieces: [weaponPieces.blade, weaponPieces.pommel,weaponPieces.crossgaurd ],
        img:swordimg
    },
    laserGun:{
        name : "your laser gun",
        Definition : "Half gun, half laser",
        DamageLevel :  4,
        catchPhrase:["Say hello to my not so little friend", "It shoot's lasers!", "Gun meet laser"],
        attack:["shoot", "pierce", "hit"],
        finishingMove:["put a hole through", "obiliterate", "melt", "disenegrate", "blast"],
        pieces: [weaponPieces.action, weaponPieces.stock, weaponPieces.barrel, weaponPieces.laser ],
        img:lasrgun
    } ,
    magicWand:{
        name : "your magic wand",
        Definition : "A magic piece of wood used to channel magic",
        DamageLevel :  5,
        catchPhrase:"AVADA KEDAVRA!",
        attack:["cast an attack spell", "cast a poison spell", "shrink", "slow down", "throw"],
        finishingMove:["cast a death spell on", "dissappear", "eviscerate", "decimate",],
        pieces: [weaponPieces.holly, weaponPieces.pheonixFeather, weaponPieces.garrickOllivander, weaponPieces.magic ],
        img:wand
    }
}
function WeaponDiv({}){
    const {player, playerActivity, setPlayer, setPlayerActivity} = useContext(PlayerContext)
    const {typingFunction, setAddText} = useContext(TypingContext)
    const {selectWeapon} = useContext(FunctionContext)

    const handleHover = (bool, weapon)=>{
        if(bool){
            setAddText(`${weapon.Definition}`)
        }else{
            setAddText("")
        }
    }
    const weaponsArray = [weapons.axe,weapons.hands,weapons.sword,weapons.magicWand, weapons.laserGun]
    const images = weaponsArray.map((weapon, i)=><img onMouseEnter={()=>handleHover(true, weapon)} onMouseLeave={()=>handleHover(false, weapon)} onClick = {()=>selectWeapon(weapon)}className = "mult" src = {weapon.img} alt={weapon.name} key = {i}/>)
    return(
       <>
       {images}
       </>
    )
}
export {weaponPieces, weapons, WeaponDiv}
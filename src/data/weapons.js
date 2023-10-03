const weaponPieces = {
    wood: {
        name : 'piece of wood',
        description: 'a piece of wood, good for carving into weapons',
    },
    metal:{
        name : 'piece of metal',
        description: 'a piece of metal, good for molding into a weapon'
    }, 
    blade:{
        name : 'blade',
        description: 'the pointy part of a sword'
    },
    pommel:{
        name : 'pommel',
        description: `so you don't cut yourself holding a sword`
    },
    crossgaurd:{
        name : 'crossgaurd',
        description: `idk, but the Searches said you need one to make a sword`
    },
    action:{
        name : 'action',
        description: 'The part that make the gun GO'
    },
    stock: {
        name : 'stock',
        description:`the handle of your gun`
    },
    barrel:{
        name : 'barrel',
        description: 'Where the laser will come from'
    },
    laser: {
        name : 'laser',
        description:`a laser, because this isn't just any gun...`
    },
    holly: {
        name : 'holly',
        description:`the difference between stick and wand...`
    },
    pheonixFeather: {
        name : 'pheonix Feather',
        description:`Magic bird feather for the magic core of your magic wand`
    },
    garrickOllivander:{
        name : 'Garrick Ollivander',
        description: "Unless you know how to make wands your gonna need this dude."
    },
    magic:{
        name : 'magic',
        description: `A little pixie dust so you can work the wand when you need to`
    },
}

const weapons ={
    hands:{
        name: "these hands",
        Definition : "When you have nothing else, you have these hands",
        DamageLevel :  1,
        catchPhrase:["Catch these!", "You don't want these hands", "Don't make me smack you", "Why I outta","This the strong hand"] ,
        attack:["smack", "punch", "slap", "molly wop", "hit", "bash"],
        finishingMove:["backhand", "Sucker punch", "knockout"],
    },
    axe:{
        name : "your axe",
        Definition : "A sturdy blunt handle and a sharp blade, the possiblities are endless.",
        DamageLevel :  2,
        catchPhrase:["This axe was made for swinging, and that's just what I'm gonna do!","It's time to cut you down to size", "How much villian could a hero chuck if a hero could chuck villians",],
        attack:["chop", "slash", "cut", "tear at"],
        finishingMove:["chop parts off of", "removes the head of", "cracks the skull of","cuts up"],
        pieces: [weaponPieces.wood, weaponPieces.metal]
    },
    sword: {
        name : "your sword",
        Definition : "A finely crafted metal blade",
        DamageLevel :  3,
        catchPhrase: ["Hatori Hanzo himself would be proud of this bad boy", "get the point yet?", "Stick em with the pointy end", "*fancy blade swing*"],
        attack:["slice", "cut", "scissor", "slash", "pierce"],
        finishingMove:["behead", "pierce the heart of", "cut from navel to nose"],
        pieces: [weaponPieces.blade, weaponPieces.pommel,weaponPieces.crossgaurd ]
    },
    laserGun:{
        name : "your laser gun",
        Definition : "Half gun, half laser",
        DamageLevel :  4,
        catchPhrase:["Say hello to my not so little friend", "It shoot's lasers!", "Gun meet laser"],
        attack:["shoot", "pierce", "hit"],
        finishingMove:["put a hole through", "obiliterate", "melt", "disenegrate", "blast"],
        pieces: [weaponPieces.action, weaponPieces.stock, weaponPieces.barrel, weaponPieces.laser ]
    } ,
    magicWand:{
        name : "your magic wand",
        Definition : "A magic piece of wood used to channel magic",
        DamageLevel :  5,
        catchPhrase:"AVADA KEDAVRA!",
        attack:["cast an attack spell", "cast a poison spell", "shrink", "slow down", "throw"],
        finishingMove:["cast a death spell on", "dissappear", "eviscerate", "decimate",],
        pieces: [weaponPieces.holly, weaponPieces.pheonixFeather, weaponPieces.garrickOllivander, weaponPieces.magic ]
    } ,
    key:{
        name : "a key",
        defintion : "It's no weapon, but it'll get you the girl!(and the rest of her family)",
        DamageLevel : null
    }
}
export {weaponPieces, weapons}
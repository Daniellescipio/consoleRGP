import { weaponPieces, weapons } from "./weapons"
const levels = {
    levelOne : [],
    levelTwo : [],
    levelThree : [],
    levelFour : []
    
}
const monsters = []
const fireBreathingDragon= {
    name : "the Fire Breathing Dragon",
    life : 50,
    level : 5,
    dodge:["soars into the air", "flaps its wings, knocking your weapong out of your hand", "breathes fire", "turns it's scaly back to you", "runs"],
    hit:["crashes to the floor", "roars in pain", "hisses", "cries"],
    attack:["swats you acroos the room with it's tail", "releases a fireball", "creates a wind storm with it's wings", "bites you"],
    finishingMove:"unlatches it's jaws and releases an inferno",
    winphrase:"RAH RAH, I'M A DUNGEON DRAGON!",
    losePhrase: "You're power is too great for me!",
    prizeForDefeat: 13,   
}
const banditOne ={
    name : "the bandit",
    life : 10,
    level : 1,
    dodge:["bobs and weaves", "steals your eyeglasses", "dodges"],
    hit:["howls in pain", "grabs their bloody nose", "clutches their black eye", "holds a broken tooth in their palm"],
    attack:["throws an uppercut", "punches you", "blacks your eye", "throws dirt in your face"],
    finishingMove:"Kicks you in the face",
    winPhrase:"You're TOO LATE",
    losePhrase:"Aww man!",
    prizeForDefeat : 1,

}
const bully ={
    name : "the sciptopia bully",
    life : 10,
    level : 1,
    dodge:["bobs and weaves", "jumps out of the way", "insults you", "gets some friends to help"],
    hit:["cries in pain", "whines", "stomps their feet in frustration"],
    attack:["throws an uppercut", "pulls your hair", "bites you","stomps on your toe",],
    finishingMove:"Kicks you in the face",
    winPhrase:"Give me your lunch money",
    losePhrase:"I'm telling my mom",
    prizeForDefeat : 2,
}
const bigFoot ={
    name : "Big Foot",
    life : 20,
    level : 2,
    dodge:["jumps, causing an earthquake", "blocks with his foot", "disappears into a ball of fur", "get advice from a yeti"],
    hit:["stoms his big feet in frustration", "clutches his big toe", "Yells, 'MY FOOT!"],
    attack:["swats at you, turns out his hands are big too", "Kicks you", "Stomps on you", "makes you smell his feet", "Karate kicks you"],
    finishingMove:"steps on you",
    winPhrase:"FE FI FO FUM ",
    losePhrase:"This is why no one believes in me!",
    prizeForDefeat : 3,
}
const cyclops ={
    name : "the cyclops",
    life : 20,
    level : 2,
    dodge:["SEEs it coming and steps out of the way", "throws sand in your eye", "covers his eye", "moves...his eye out of the way"],
    hit:["clutches his eye", "cries...out of his eye", "falls dow...on his eye"],
    attack:["Takes a chomp out of you", "blinks", "Looks into the future", "winks"],
    finishingMove:"Eats you",
    winPhrase:"EYE got my EYE on you!",
    losePhrase:"EYE don't SEE the point in continuing!",
    prizeForDefeat : 4,
}
const batMan ={
    name : "BatMan",
    life : 20,
    level : 2,
    dodge:["disappears into the darkness","thorws up his cloak", "hops into the batmobile", "flies away"],
    hit:["growls in pain", "runs from bats", "trips over his cape", ],
    attack:["throws a bat dagger at you", "punches you", "breaks your leg", "blows you up"],
    finishingMove:"Karate chops you in the throat",
    winPhrase:"I'm Batman",
    losePhrase:"I'm Batman",
    prizeForDefeat : 5,
}    
const evilKnight={
    name : "the Evil Knight",
    life : 30,
    level : 3,
    dodge:["blocks with his sheild", "parlay", "fades(its a sword fighting term, look it up)", "deflects"],
    hit:["panics as his armor is pierced", "drops his sword", "get a chip in his chainmail", "dents his shield"],
    attack:["clips you with his sword", "throws his shield at you", "stabs you"],
    finishingMove:"stabs you with his sword",
    winPhrase:"That will be SIR knight to you!",
    losePhrase:"wait! I'm a good knight now!!",
    prizeForDefeat : 6,
}
const vampire={
    name : "the Vampire",
    life : 30,
    level : 3,
    dodge:["turns into a bat", "hypnotizes you", "uses their vampire speed to move at the last moment", "flies away"],
    hit:["flashes his fangs", "bleeds...if they had blood", "clutches at thier undead heart", "hisses"],
    attack:["nips at your wrist, drawing blood", "bites your neck", "puts you under a spell that makes you hit yourself", "throws you with their vampire strength"],
    finishingMove:"sinks his fangs into your neck",
    winPhrase: "*Something about drinking your blood*",
    losePhrase: "Can't I have just a SIP!",
    prizeForDefeat : 7,
}
const werewolf={
    name : "the werewolf",
    life : 30,
    level : 3,
    dodge:["scampers away", "runs", "turns into a person, confusing you", "lunges at you"],
    hit:["howls in pain", "barks angrily", "whimpers", "gives you puppy dog eyes"],
    attack:["scratches you with his claws", "bites you", "throws you across the room", "takes a chunk out of your arm"],
    finishingMove:"bites you, now you're a werewolf",
    winPhrase:"Looks like it's a full moon",
    losePhrase:"AOoooooooooooo",
    prizeForDefeat : 8,
}
const ninja={
    name : "the ninja",
    life : 30,
    level : 3,
    dodge:["vanishes stealthily", "does a back flip", "vanisishes into the darkness"],
    hit:["silently cries out", "flies through the air", "doubles over in pain"],
    attack:["throws a ninja star", "karate chops you", "uses preying mantis style"],
    finishingMove:"You blink so you miss it...",
    winPhrase:"Nothing. They are to stealthy for words",
    losePhrase:"FUCK",
    prizeForDefeat : 9,
}    
const teminator={
    name : "The Terminator",
    life : 40,
    level : 4,
    dodge:["blocks with a robot arm", "activates robotic force feild", " enters the following code into his database: if(robot){var heroMisses= true"],
    hit:["mechancically reels", "short circuits", "reboots", "temporaily shuts down"],
    attack:["swings with his robot arm", "shoots you with their arm cannon", "blast lasers from their eyes", "takes you to the future"],
    finishingMove:"Shoots at you with an arm cannon",
    winPhrase:"You're about to be terminated",
    losePhrase:"I'll be back",
    prizeForDefeat : 10,   
}
const hades={
    name : "Hades",
    life : 40,
    level : 4,
    dodge:["Disappears in a puff of smoke", "goes to hell", "hides behind a hellhound", "complains to Zues that fighting you isn't fair, Zues intervenes"],
    hit:["eyes blaze with fire", "rolls their eyes", "sets hell more on fire", "explodes", "combusts"],
    attack:["shoots fire balls at you", "sends you to hell", "sticks the hell hounds on you"],
    finishingMove:"opens a pit to hell beneath your feet",
    winPhrase:"I'm fired up now!!",
    losePhrase:"I left hell for THIS?!",
    prizeForDefeat : 11,    
}
const wickedWitch={
    name : "The Wicked Witch of Sciptopia",
    life : 40,
    level : 4,
    dodge:["takes off on her broom cackling", "cast a defense spell", "hides behind her black cat", "blinds you"],
    hit:["falls off of her broom","drops her wand", "turns green", "kicks her cat"],
    attack:["hits you with her broom", "turns you green", "makes you ugly", "cast a spell"],
    finishingMove:"turns you into a frog",
    winPhrase:"Now I've got you, my pretty",
    losePhrase:"I'm meeelllltttttinnnngggg",
    prizeForDefeat : 12,    
}
const vader={
    name : "Velociraptor",
    life : 40,
    level : 4,
    dodge:["parries", "jumps", "runs", "scampers", "scurries"],
    hit:["growls", "hisses", "snarls", "roars...a dinosaur roar."],
    attack:["swings his light saber", "bites your [insert favorite body part] off", "scratches you", "bites your arm", "removes an eye"],
    finishingMove:"Eats you",
    winPhrase:"RAWWWRRRRRRRR",
    losePhrase:"raaaawwwwwrrrrr",
    prizeForDefeat : 13,
}

monsters.push(banditOne, bully, bigFoot, batMan, cyclops, evilKnight, vampire, werewolf,ninja,teminator,hades,vader, wickedWitch)
levels.levelOne = monsters.filter(monster=>monster.level === 1)
levels.levelTwo = monsters.filter(monster=>monster.level === 2)
levels.levelThree = monsters.filter(monster=>monster.level === 3)
levels.levelFour = monsters.filter(monster=>monster.level === 4)

function fightMonster(player, setPlayer, setPlayerActivity){
    setPlayerActivity("chooseWeapon")
    return 'Choose Your weapon'
}
function runFromMonster(player, setPlayer, setPlayerActivity){
    let stamLoss=Math.floor(((Math.random()*(15-5))+5)/player.stamina)
    let random = Math.floor(Math.random()* player.stamina)
    if(random< 3 || player.stamina <5){
        setPlayer(prev=>({...prev, stamina:prev.stamina - stamLoss < 0 ? 0 : prev.stamina - stamLoss}))
        player.stamina = player.stamina - stamLoss
        if(player.stamina <5){
            setPlayerActivity("encounter")
            return `Your stamina is low, you stumble and fall costing you ${stamLoss} points. Will you keep running or stand and fight!`
        }else{
            if(player.fighting.level>player.level){
                setPlayerActivity("")
                return `Good choice, you're not quite ready to fight the ${player.fighting.name}.`
            }else{
                setPlayerActivity("encounter")
                return `You ran as fast as you could, but being a coward is tiring. So you only make it a few steps before you're exhausted, you lose ${stamLoss} stamina point(s). Will you keep running or stand and fight!`
            }
        }
    }else{
        if(player.fighting.level===player.level){
            setPlayerActivity("encounter")
            return `You ran as fast as you could, but being a coward is tiring. So you only make it a few steps before you're exhausted, you lose ${stamLoss} stamina point(s). Will you keep running or stand and fight!`
        }else{
            setPlayerActivity("")
            return "You got Away!"
        }

    }
}


export {monsters, levels, fightMonster, runFromMonster, fireBreathingDragon}
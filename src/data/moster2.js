const Monster = class{
    constructor(name, level, dodge, hit, attack, finishingMove, winPhrase, losePhrase, prizeForDefeat) {
        //string
        this.name = name;
        //number: 1-5
        this.level = level;
        //boolean: sets up life or stamina object
        this.life = level*10; 
        //[strings] :possibilities for monster to dodge
        this.dodge = dodge;
        //[strings] :possibilities for monster to take a hit
        this.hit = hit;
        //[strings] :possibilities for monster to attack player
        this.attack = attack;
        //string: what the monster does if they win
        this.finishingMove = finishingMove;
        //string: what the monster says if they win
        this.winPhrase = winPhrase;
        //string: what the monster says if they lose
        this.losePhrase = losePhrase;
        //the weapons peice recieved for defeating the monster
        this.prizeForDefeat = prizeForDefeat;
    }
}

const levels = {
    levelOne : [
        new Monster("the bandit",1,["bobs and weaves", "steals your eyeglasses", "dodges"],["howls in pain", "grabs their bloody nose", "clutches their black eye", "holds a broken tooth in their palm"],["throws an uppercut", "punches you", "blacks your eye", "throws dirt in your face"],"Kicks you in the face","You're TOO LATE","Aww man!",1),
        new Monster( "the sciptopia bully",1,["bobs and weaves", "jumps out of the way", "insults you", "gets some friends to help"],["cries in pain", "whines", "stomps their feet in frustration"],["throws an uppercut", "pulls your hair", "bites you","stomps on your toe",],"Bites your shin","Give me your lunch money","I'm telling my mom", 2)
    ],
    levelTwo : [
        new Monster("Big Foot",2,["jumps, causing an earthquake", "blocks with his foot", "disappears into a ball of fur", "get advice from a yeti"],["stoms his big feet in frustration", "clutches his big toe", "Yells, 'MY FOOT!"],["swats at you, turns out his hands are big too", "Kicks you", "Stomps on you", "makes you smell his feet", "Karate kicks you"],"steps on you","FE FI FO FUM ","This is why no one believes in me!", 3),
        new Monster("the cyclops",2,["SEEs it coming and steps out of the way", "throws sand in your eye", "covers his eye", "moves...his eye out of the way"],["clutches his eye", "cries...out of his eye", "falls dow...on his eye"],["Takes a chomp out of you", "blinks", "Looks into the future", "winks"],"Eats you","EYE got my EYE on you!","EYE don't SEE the point in continuing!", 4),
        new Monster("BatMan",2,["disappears into the darkness","thorws up his cloak", "hops into the batmobile", "flies away"],["growls in pain", "runs from bats", "trips over his cape", ],["throws a bat dagger at you", "punches you", "breaks your leg", "blows you up"],"Karate chops you in the throat","I'm Batman","I'm Batman", 5)
    ],
    levelThree : [
        new Monster("the Evil Knight", 3,["blocks with his sheild", "parlay", "fades(its a sword fighting term, look it up)", "deflects"],["panics as his armor is pierced", "drops his sword", "get a chip in his chainmail", "dents his shield"],["clips you with his sword", "throws his shield at you", "stabs you"],"stabs you with his sword","That will be SIR knight to you!","wait! I'm a good knight now!!",6),
        new Monster("the Vampire",3,["turns into a bat", "hypnotizes you", "uses their vampire speed to move at the last moment", "flies away"],["flashes his fangs", "bleeds...if they had blood", "clutches at thier undead heart", "hisses"],["nips at your wrist, drawing blood", "bites your neck", "puts you under a spell that makes you hit yourself", "throws you with their vampire strength"],"sinks his fangs into your neck", "*Something about drinking your blood*", "Can't I have just a SIP!",7),
        new Monster( "the werewolf",3,["scampers away", "runs", "turns into a person, confusing you", "lunges at you"],["howls in pain", "barks angrily", "whimpers", "gives you puppy dog eyes"],["scratches you with his claws", "bites you", "throws you across the room", "takes a chunk out of your arm"],"bites you, now you're a werewolf","Looks like it's a full moon","AOoooooooooooo", 8),
        new Monster()
    ],
    levelFour : [
        new Monster(),
        new Monster(),
        new Monster(),
        new Monster()
    ]
}  

const ninja={
     "the ninja",3,["vanishes stealthily", "does a back flip", "vanisishes into the darkness"],
    hit:["silently cries out", "flies through the air", "doubles over in pain"],
    attack:["throws a ninja star", "karate chops you", "uses preying mantis style"],
    finishingMove:"You blink so you miss it...",
    winPhrase:"Nothing. They are to stealthy for words",
    losePhrase:"FUCK",
    prizeForDefeat : 9,
}    
const teminator={
     "The Terminator",4,["blocks with a robot arm", "activates robotic force feild", " enters the following code into his database: if(robot){var heroMisses= true"],
    hit:["mechancically reels", "short circuits", "reboots", "temporaily shuts down"],
    attack:["swings with his robot arm", "shoots you with their arm cannon", "blast lasers from their eyes", "takes you to the future"],
    finishingMove:"Shoots at you with an arm cannon",
    winPhrase:"You're about to be terminated",
    losePhrase:"I'll be back",
    prizeForDefeat : 10,   
}
const hades={
     "Hades",4,["Disappears in a puff of smoke", "goes to hell", "hides behind a hellhound", "complains to Zues that fighting you isn't fair, Zues intervenes"],
    hit:["eyes blaze with fire", "rolls their eyes", "sets hell more on fire", "explodes", "combusts"],
    attack:["shoots fire balls at you", "sends you to hell", "sticks the hell hounds on you"],
    finishingMove:"opens a pit to hell beneath your feet",
    winPhrase:"I'm fired up now!!",
    losePhrase:"I left hell for THIS?!",
    prizeForDefeat : 11,    
}
const wickedWitch={
     "The Wicked Witch of Sciptopia",4,["takes off on her broom cackling", "cast a defense spell", "hides behind her black cat", "blinds you"],
    hit:["falls off of her broom","drops her wand", "turns green", "kicks her cat"],
    attack:["hits you with her broom", "turns you green", "makes you ugly", "cast a spell"],
    finishingMove:"turns you into a frog",
    winPhrase:"Now I've got you, my pretty",
    losePhrase:"I'm meeelllltttttinnnngggg",
    prizeForDefeat : 12,    
}
const vader={
     "Velociraptor",4,["parries", "jumps", "runs", "scampers", "scurries"],
    hit:["growls", "hisses", "snarls", "roars...a dinosaur roar."],
    attack:["swings his light saber", "bites your [insert favorite body part] off", "scratches you", "bites your arm", "removes an eye"],
    finishingMove:"Eats you",
    winPhrase:"RAWWWRRRRRRRR",
    losePhrase:"raaaawwwwwrrrrr",
    prizeForDefeat : 13,
}
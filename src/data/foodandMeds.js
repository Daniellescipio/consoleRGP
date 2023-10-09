const foodOptions=[
    {
        type: "food",
        name:"bowl of ramen",
        benefit:2,
        loss:3,
        good:"Instant ramen gives you a small but instant energy boost.",
        bad:"Who eats instant ramen if they don't HAVE to?",
        qnty:0
    },
    {
        type: "food",
        name:"cup of coffee",
        benefit:4,
        loss:4,
        good:"What a blast of energy! Hury up and fight something before it wears off!",
        bad:"The caffine makes you jittery and gives you a panic attack, you spend hours running from your shadow.",
        qnty:0
    },
    {
        type: "food",
        name:"sandwhich",
        benefit:6,
        loss:3,
        good:"Just what you needed, the perfect bite to keep you going!",
        bad:"You feel bloated and weighed down, you look for a tree to sleep under.",
        qnty:0
    },
    {
        type: "food",
        name:"three-course-dinner",
        benefit:8,
        loss:8,
        good:"A nutrious and delicous smootie. Yum!",
        bad:"Gluttony is a sin, heathens are generally an exhausted bunch...",
        qnty:0
    },
    {
        type: "food",
        name:"protien Bar",
        benefit:10,
        loss:0,
        good:"Just what you needed a blast of protien to energize you!",
        bad:"But I guess there's not much bad that can come from a protien bar...if you don't mind being wasteful",
        qnty:0
    }
]
const medOptions=[
    {
        type: "medicine",
        name:"bandaid",
        benefit:10,
        loss:0,
        good:"I mean...it's a bandaid...it doesn't do much but scrapes you together enough to keep pushing.",
        bad:"Well that was wasteful",
        qnty:0
    },
    {
        type: "medicine",
        name:"tylenol",
        benefit:20,
        loss:20,
        good:"The pain in your body suddenly(in 20 minutes) fades and you walk a little lighter.",
        bad:"The unneccessary medicine rips wholes into your stomach",
        qnty:0
    },
    {
        type: "medicine",
        name:"holistic diet",
        benefit:30,
        loss:10,
        good:`Wow everything is so clean and fresh. You feel like a new person. Now to keep it up...`,
        bad:"You spend hours huntng for the right ingrideints and preparing food and you don't feel any better for it at the end of the day.",
        qnty:0
    },
    {
        type: "medicine",
        name:"doctor",
        benefit:40,
        loss:40,
        good:"Just what the doctor ordered. This guy will have you up and ready to go in no time!",
        bad:"The doctor suspects you're faking and draws blood to teach you a lesson. He took too much and now there are two of everything in front of you.",
        qnty:0
    },
    {
        type: "medicine",
        name:"nurse",
        benefit:50,
        loss:20,
        good:"The true backbones of the medical field, you feel better than you've felt in days!! Any dragons around?",
        bad:"You get bad from visiting the Dr's office for no reason.",
        qnty:0
    }
]
const foundSpply = class{
    constructor(type, name, benefit, loss, good, bad) {
        this.type = type;
        this.name = name;
        this.benefit = benefit;
        this.loss = loss;
        this.good = good;
        this.bad = bad;
        this.found = true;
    }
}
const foundSuppiles = [
    new foundSpply("food", "wild berry", 3, 3, "Wow, wild strawberries, what a find!", "don't you know not to eat wild berries???"), 
    new foundSpply("food", "wild mushroom", 1, 8, "Well, you're not sure you feel more energized, but you definitely feel something...at least they weren't poisonous", "wild mushrooms are super posionous, why would you eat that???"), 
    new foundSpply("food", "pile of garbage", 2, 8, "Gross, I guess something is better than nothing!", "gross, you can't stop vomitting."), 
    new foundSpply("food", "pig roasting over a fire", 10, 10, "Finders keepers losers weepers, what a find!", "The owner caught you touching their pig and chased you away."),
    new foundSpply("med", "berries", 10, 10, "Wow, wild strawberries, what a find!", "don't you know not to eat wild berries???"), 
    new foundSpply("medicine", "lake", 20, 40, "Just what you needed, the refreshing drink rejuvenates you.", "You get a virus from drinking contaminated water."),
    new foundSpply("medicine", "man claiming to be a doctor", 50, 50, "He patches you up and you feel better than ever.", "He steals your liver."), 
    new foundSpply("medicine", "puddle of mud", 10, 30, "The mud seals your wounds and your able to move a little easier.", "You get an infection from putting dirt in your wounds."), 
    new foundSpply("medicine", "needle and thread", 30, 40, "You manage to close the worst of your wounds, good job doc!", "You're not a doctor. You make matters much worse.")
]
const checkSupplies = (typingFunction, player , setPlayer,playerActivity, setPlayerActivity, setFoundItem, supply)=>{
    const inventory =player.inventory.backpack[supply]
    const supplyObj = supply === "food"? {type:"stamina", verb:"eat", value:"10"} : {type:"life", verb:"use", value:"100"}
    if(inventory.length>0){
        const randomSupply = inventory[Math.floor(Math.random()*inventory.length)]
        const newSupplyArray = inventory.filter(item=>item.name !==randomSupply.name)
        setPlayer(prevPlayer=>({...prevPlayer, inventory:{...prevPlayer.inventory, backpack:{...prevPlayer.inventory.backpack, [supply]:newSupplyArray}}}))
        setPlayerActivity("foundSupplies")
        setFoundItem(randomSupply)
        const storeIt = document.getElementById("inv")
        storeIt.disabled = false
        typingFunction("addText", ` You pull a ${randomSupply.name} from your inventory. Your ${supplyObj.type} is at ${player[supplyObj.type]} out of ${supplyObj.value} Do you want to ${supplyObj.verb} it?`, true)
    }else{
        setPlayerActivity("foundSupplies")
        const randomSupplies = foundSuppiles.filter(sply=>sply.type===supply)
        const randomSupply = randomSupplies[Math.floor(Math.random()*randomSupplies.length)]
        setFoundItem(randomSupply)
        const storeIt = document.getElementById("inv")
        storeIt.disabled = true
        typingFunction( "addText", `You don't have any ${supply} your inventory, but you look around and find a ${randomSupply.name}. Do you want to ${supplyObj.verb} it`, true)
    }
}

const findFood=(player, setPlayer,playerActivity, setPlayerActivity, setFoundItem, bool)=>{
    if(playerActivity=== ""){
        setPlayerActivity("foundSupplies")
        let randomFood = foodOptions[Math.floor(Math.random()*foodOptions.length)] 
        setFoundItem(randomFood)
        return`you find a ${randomFood.name}, your stamina is at ${player.stamina} out of 10, what would you like to do?`
    }
}
const findMeds = (player, setPlayer,playerActivity, setPlayerActivity, setFoundItem)=>{
    if(playerActivity=== ""){
        setPlayerActivity("foundSupplies")
        let randomMed = medOptions[Math.floor(Math.random()*medOptions.length)] 
        setFoundItem(randomMed)
        return`you find a ${randomMed.name}, your life is at ${player.life} out of 10, What would you like to do?`
    }
}
const handleSupply=(typingFunction, choice, supply, player,setPlayer, setPlayerActivity)=>{
    setPlayerActivity("")
    if(choice === "consume"){
        if(supply.type==="food"){
            let possibleLoss = player.stamina - supply.loss < 0 ? 0 : player.stamina - supply.loss
            let possibleGain = player.stamina + supply.benefit > 10 ? 10 : player.stamina + supply.benefit
            if(player.stamina ===10){
                setPlayer(prev=>({...prev, stamina:possibleLoss}))
                typingFunction ("text", `You feel well rested, but decide to eat anyway. ${supply.bad}. You lose ${supply.loss} stamina points and now have ${possibleLoss} stamina points out of 10.`, true)
            }else{
                if(supply.found){
                    if(Math.floor(Math.random()*101)>player.life){
                        setPlayer(prev=>({...prev, stamina:possibleLoss}))
                        typingFunction("text", `You're desperate. You eat the ${supply.name}, ${supply.bad}. You lose ${supply.loss} stamina points and now have ${possibleLoss} stamina points out of 10.`,true)
                    }else{
                        setPlayer(prev=>({...prev, stamina:possibleGain}))
                        typingFunction("text", `You're desperate. You eat the ${supply.name}, ${supply.benefit}. You gain ${supply.benefit} stamina points and now have ${possibleGain} stamina points out of 10.`,true)
                    }
                }else{
                    if(Math.floor(Math.random()*101)>player.life){
                        setPlayer(prev=>({...prev, stamina:possibleLoss}))
                        typingFunction("text", `You eat the ${supply.name}, ${supply.bad}. You lose ${supply.loss} stamina points and now have ${possibleLoss} stamina points out of 10.`,true)
                    }else{
                        setPlayer(prev=>({...prev, stamina:possibleGain}))
                        typingFunction ("text", `You eat the ${supply.name} ${supply.good}. You gain ${supply.benefit} stamina points. Your new stamina is ${possibleGain} out of 10`, true)
                    }

                }
            }
        }else{
            let possibleLoss = player.life - supply.loss < 0 ? 0 : player.life - supply.loss
            let possibleGain = player.life + supply.benefit > 100 ? 100 : player.life + supply.benefit
            if(player.life ===100){
                setPlayer(prev=>({...prev, life:possibleLoss}))
                typingFunction ("text", `You feel healthy, but decide to use the ${supply.name} anyway. ${supply.bad}. You lose ${supply.loss} life points and now have ${possibleLoss} life points out of 100.`, true)
            }else{
                if(supply.found){
                    if(Math.floor(Math.random()*101)>player.life){
                        setPlayer(prev=>({...prev, life:possibleLoss}))
                        typingFunction("text", `You're desperate. You use the ${supply.name}, ${supply.bad}. You lose ${supply.loss} life points and now have ${possibleLoss} life points out of 100.`,true)
                    }else{
                        setPlayer(prev=>({...prev, life:possibleGain}))
                        typingFunction("text", `You're desperate. You eat the ${supply.name}, ${supply.benefit}. You gain ${supply.benefit} stamina points and now have ${possibleGain} stamina points out of 10.`,true)
                    }
                }else{
                    if(Math.floor(Math.random()*101)>player.life){
                        setPlayer(prev=>({...prev, life:possibleLoss}))
                        typingFunction("text", ` You use the ${supply.name}, ${supply.bad}. You lose ${supply.loss} life points and now have ${possibleLoss} life points out of 100.`,true)
                    }else{
                        setPlayer(prev=>({...prev, life:player.life}))
                        typingFunction ("text", `You use the ${supply.name} ${supply.good}. You gain ${supply.benefit} life points. Your new life is ${possibleGain} out of 100`, true)
                    }

                }
            }
        }
    }else if(choice === "leave"){
        if(supply.found){
            typingFunction("text", `You're smarter than you let on...`, true)
        }else{
            typingFunction("text", `...you know you have an inventory right...we always get the bright ones...`, true)
        }
    }else{
        if(supply.found){
            setPlayerActivity("foundSupplies")
            typingFunction("addText", `I don't think that's a good idea...`, true)
        }else{
            setPlayer(prev=>({...prev, inventory:{...prev.inventory, backpack:{...prev.inventory.backpack, [supply.type]:[...prev.inventory.backpack[supply.type],supply]}}}))
            typingFunction("text", `Ok, it's in your inventory!`, true)
        }
    }
}
export{foodOptions, medOptions, findFood, findMeds, handleSupply, checkSupplies}
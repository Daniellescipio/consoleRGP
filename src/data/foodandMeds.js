const foodOptions=[
    {
        name:"bowl of ramen",
        nutritionalValue:2,
        loss:3,
        yum:"Instant ramen gives you a small but instant energy boost.",
        yuck:"Who eats instant ramen if they don't HAVE to?",
        qnty:0
    },
    {
        name:"cup of coffee",
        nutritionalValue:4,
        loss:4,
        yum:"What a blast of energy! Hury up and fight something before it wears off!",
        yuck:"The caffine makes you jittery and gives you a panic attack, you spend hours running from your shadow.",
        qnty:0
    },
    {
        name:"sandwhich",
        nutritionalValue:6,
        loss:3,
        yum:"Just what you needed, the perfect bite to keep you going!",
        yuck:"You feel bloated and weighed down, you look for a tree to sleep under.",
        qnty:0
    },
    {
        name:"three-course-dinner",
        nutritionalValue:8,
        loss:8,
        yum:"A nutrious and delicous smootie. Yum!",
        yuck:"Gluttony is a sin, heathens are generally an exhausted bunch...",
        qnty:0
    },
    {
        name:"protien Bar",
        nutritionalValue:10,
        loss:0,
        yum:"Just what you needed a blast of protien to energize you!",
        yuck:"But I guess there's not much bad that can come from a protien bar...if you don't mind being wasteful",
        qnty:0
    }
]
const medOptions=[
    {
        name:"bandaid",
        healthValue:10,
        loss:0,
        healed:"I mean...it's a bandaid...it doesn't do much but scrapes you together enough to keep pushing.",
        sick:"Well that was wasteful",
        qnty:0
    },
    {
        name:"tylenol",
        healthValue:20,
        loss:20,
        healed:"The pain in your body suddenly(in 20 minutes) fades and you walk a little lighter.",
        sick:"The unneccessary medicine rips wholes into your stomach",
        qnty:0
    },
    {
        name:"holistic diet",
        healthValue:30,
        loss:10,
        healed:`Wow everything is so clean and fresh. You feel like a new person. Now to keep it up...`,
        sick:"You spend hours huntng for the right ingrideints and preparing food and you don't feel any better for it at the end of the day.",
        qnty:0
    },
    {
        name:"doctor",
        healthValue:40,
        loss:40,
        healed:"Just what the doctor ordered. This guy will have you up and ready to go in no time!",
        sick:"The doctor suspects you're faking and draws blood to teach you a lesson. He took too much and now there are two of everything in front of you.",
        qnty:0
    },
    {
        name:"nurse",
        healthValue:50,
        loss:20,
        healed:"The true backbones of the medical field, you feel better than you've felt in days!! Any dragons around?",
        sick:"You get sick from visiting the Dr's office for no reason.",
        qnty:0
    }
]

const findFood=(player, setPlayer, setPlayerActivity, setFoundItem)=>{
    setPlayerActivity("foundFood")
    let randomFood = foodOptions[Math.floor(Math.random()*foodOptions.length)] 
    setFoundItem(randomFood)
    return `you find a ${randomFood.name}, your stamina is at ${player.stamina} out of 10, do you want to eat it?`

}
const findMeds = (player, setPlayer, setPlayerActivity, setFoundItem)=>{
    setPlayerActivity("foundMeds")
    let randomMed = medOptions[Math.floor(Math.random()*medOptions.length)] 
    setFoundItem(randomMed)
    return `you find a ${randomMed.name}, your life is at ${player.life} out of 10o, do you want to use it?`
}
const handleFood=(choice, food, player,setPlayer, setPlayerActivity)=>{
    setPlayerActivity("")
    if(choice === "eat"){
        if(player.stamina ===10){
            setPlayer(prev=>({...prev, stamina:prev.stamina - food.loss < 0 ? 0 : prev.stamina - food.loss}))
            player.stamina = player.stamina - food.loss < 0 ? 0 : player.stamina - food.loss
            return `You feel well rested, but decide to eat anyway. ${food.yuck}. You lose ${food.loss} stamina points and now have ${player.stamina} stamina points out of 10.`
        }else{
            setPlayer(prev=>({...prev, stamina:prev.stamina + food.nutritionalValue > 10 ? 10 : prev.stamina + food.nutritionalValue}))
            player.stamina = player.stamina + food.nutritionalValue > 10 ? 10 : player.stamina + food.nutritionalValue
            return `You eat the ${food.name} ${food.yum}. You gain ${food.nutritionalValue} stamina points. Your new stamina is ${player.stamina} out of 10`
        }
    }else if(choice === "leave"){
        return`...you know you have an inventory right...we always get the bright ones...`
    }else{
        setPlayer(prev=>({...prev, inventory:{...prev.inventory, food:[...prev.inventory.food, food]}}))
        return`Ok, it's in your inventory!`
    }



}
const takeMeds = (med, player, setPlayer, setPlayerActivity)=>{
    setPlayerActivity("")
    if(player.stamina ===100){
        setPlayer(prev=>({...prev, life:prev.life - randomMed.loss > 100 ? 100 : prev.life - randomMed.loss}))
        player.life = player.life + randomMed.healthValue > 100 ? 100 : player.life + randomMed.healthValue
        return `Your perfectly healthy, but you use the ${med.name} ${med.sick} You lose ${med.loss} life points and now have ${player.life} life points out of 100.`
    }else{
        setPlayer(prev=>({...prev, life:prev.life + randomMed.healthValue > 100 ? 100 : prev.life + randomMed.healthValue}))
        player.life = player.life + randomMed.healthValue > 100 ? 100 : player.life + randomMed.healthValue
        return `You use the ${med.name} ${med.healed}. You gain ${randomMed.healthValue} life points. Your new life is ${player.life} out of 100`
    }
}
export{foodOptions, medOptions, findFood, findMeds, handleFood, takeMeds}
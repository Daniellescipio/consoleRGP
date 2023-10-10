const supply = class{
    constructor(type, affectedObj, name, benefit, loss, verb, good, bad, found) {
        this.type = type;
        this.name = name;
        this.benefit = benefit;
        this.loss = loss;
        this.verb = verb;
        this.good = good;
        this.bad = bad;
        this.qnty = 0;
        this.affectedObj = affectedObj ?{affected:"life", value:100}:{affected:"stamina", value:10};
        this.found = found;
    }
}
const supplies = [
    new supply("food", false, "wild berry", 3, 3,"eat", "Wow, wild strawberries, what a find!", "Don't you know not to eat wild berries???",true), 
    new supply("food", false, "wild mushroom", 1, 8,"eat", "Well, you're not sure you feel more energized, but you definitely feel something...at least they weren't poisonous", "Wild mushrooms are super posionous, why would you eat that???",true), 
    new supply("food", false, "pile of garbage", 2, 8,"eat", "Gross, I guess something is better than nothing!", "You can't stop vomitting.",true), 
    new supply("food", false, "pig roasting over a fire",10, 10,"eat",  "Finders keepers losers weepers, what a find!", "The owner caught you touching their pig and chased you away.",true),
    new supply("medicine",true, "lake", 20, 40,"drink", "Just what you needed, the refreshing drink rejuvenates you.", "You get a virus from drinking contaminated water.",true),
    new supply("medicine",true, "man claiming to be a doctor","trust", 50, 50, "He patches you up and you feel better than ever.", "He steals your liver.",true), 
    new supply("medicine",true, "puddle of mud", 10, 30, "use", "The mud seals your wounds and your able to move a little easier.", "You get an infection from putting dirt in your wounds.",true), 
    new supply("medicine",true, "needle and thread", 30, 40, "use","You manage to close the worst of your wounds, good job doc!", "You're not a doctor. You make matters much worse.",true),

    new supply("food", false, "beehive", 7, 9,"smoke", "You smoke out the Bees and steal their delicious honey, the boost of energy is immediate.", "You have no clue what you're doing. You make the bees angry and spend hours running away.",false),
    new supply("food", false, "cup o' coffe", 4, 4, "drink","What a blast of energy! Hury up and fight something before it wears off!", "You feel jittery and spend over an hour pacing, thinking about everything you have to do.",false),
    new supply("food", false, "sandwhich", 6, 3,"eat", "Just what you needed, the perfect bite to keep you going!", "You feel bloated and weighed down, you look for a tree to sleep under.",false),
    new supply("food", false, "three course dinner", 8, 8, "eat","You can't decide which course was your favorite, but each one left you feeling better than the last.", "Gluttony is a sin, heathens are generally an exhausted bunch...",false),
    new supply("food", false, "wild boar", 8, 8, "eat","Catching the boar is hard, but the energy is you lost is quickly replaced with bacon.", "You spend hours chasing the pig, it is much faster than you thought.",false),
    new supply("medicine",true, "bandaid", 10, 5, "use","I mean...it's a bandaid...it doesn't do much but scrapes you together enough to keep pushing.", "You put the bandaid on wrong and the adhesive rips hair out when you try and fix it. Now it's not sticky anymore...",false),
    new supply("medicine",true, "typlenol", 20, 20, "take", "A few minutes pass and you can feel the medicine working(20 minutes faster than the leading brand), you feel much better. ", "You didn't eat first, The medicine rips wholes into your stomach.",false),
    new supply("medicine",true, "holistic diet", 30, 60, "eat", "Wow everything is so clean and fresh. You feel like a new person. Now to keep it up...", "You're in the jungle...most of those ingredients were poisonous...",false),
    new supply("medicine",true, "doctor", 30, 40, "trust", "Just what the doctor ordered. This guy will have you up and ready to go in no time!", "It's a student doctor...an he's either a bad student, or a bad doctor. He takes too much blood and now there are two of everything in front of you.",false),
    new supply("medicine",true, "nurse", 50, 40, "tust", "The true backbones of the medical field, you feel better than you've felt in days!! Any dragons around?", "The nurse forgot to wash her hands after her last aptient, you get sick with whatever they had.",false),
]
export{supplies}
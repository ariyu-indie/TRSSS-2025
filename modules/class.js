import { random, generatePhonemes, generateGroups, generateRand as gr } from "./basics.js"

const reactions = [
    "i barely noticed a touch on my {area}.",
    "a faint sensation brushed my {area}.",
    "something nudged my {area}.",
    "my {area} tingled for a moment.",
    "i felt a tiny flick on my {area}.",
    "i got flicked in {area}, it's not rough.",
    "that was a soft bump on my {area}.",
    "i got tapped in my {area}, a bit weird.",
    "something poked my {area}, but it's okay.",
    "huh? my {area} feels odd.",
    "my {area} stings slightly.",
    "i got hurt in my {area}, just a little.",
    "my {area} feels irritated.",
    "ow... that's a dull pain in my {area}.",
    "ugh, there's some pressure in my {area}.",
    "i got damaged in {area}, and it's a little painful.",
    "my {area} aches now...",
    "ow! my {area} hurts more than i expected!",
    "my {area} is throbbing badly.",
    "ow ow OW! my {area} really hurts!",
    "AGH! my {area} is in serious pain!",
    "i can't move my {area}—too much pain!",
    "AUUGH! my {area} feels crushed!",
    "my {area} is screaming in agony!",
    "I THINK SOMETHING'S WRONG WITH MY {area}!!",
    "MY {area} IS BURNING! IT'S SO BAD!",
    "I CAN'T TAKE THIS PAIN IN MY {area}!!",
    "AUAAGH! MY {area} IS IN EXTREME AGONY!!",
    "EVERYTHING HURTS!! MY {area} IS DESTROYED!",
    "I'M LOSING CONSCIOUSNESS—MY {area}!!",
    "i think my {area} just gave out..."
]

function check(a, b){
    const truth = {
        "MALE": "FEMALE",
        "FEMALE": "MALE"
    }
    if (truth[a] == b){
        return true
    }
}

export default class trissaeths{
    constructor(name, age, str, int, agi) {
        this.name = name
        this.state = "alive"
        this.location = ""
        this.memory = [
            {
                "name": "birthday",
                "content": "my birthday is",
                "strength": 28000
            }
        ]
        this.parent = {
            "mother": null,
            "father": null
        }
        this.body = {
            "head": {
                "health": 100,
                "tolerance": 10+gr(0,20),
                "intact": true
            },
            "neck": {
                "health": 100,
                "tolerance": 10+gr(0, 50),
                "intact": true
            },
            "torso": {
                "health": 100,
                "tolerance": 30+gr(0, 70),
                "intact": true
            },
            "left_arm": {
                "health": 100,
                "tolerance": 50+gr(0, 50),
                "intact": true
            },
            "right_arm": {
                "health": 100,
                "tolerance": 50+gr(0, 50),
                "intact": true
            },
            "chest": {
                "health": 100,
                "tolerance": 50+gr(0, 60),
                "intact": true
            },
            "hips": {
                "health": 100,
                "tolerance": 40+gr(0, 30),
                "intact": true
            },
            "genitalia": {
                "health": 100,
                "tolerance": 5+gr(0,10),
                "intact": true
            },
            "left_leg": {
                "health": 100,
                "tolerance": 30+gr(0,30),
                "intact": true
            },
            "right_leg": {
                "health": 100,
                "tolerance": 30+gr(0, 30),
                "intact": true
            }
        }
        this.ancestors = {
            "greatGrandma": "god",
            "greatGrandpa": "god",
            "grandma": "god",
            "grandpa": "god",
            "parentA": "god",
            "parentB": "god"
        }
        this.fertile = false
        this.fertileAge = Math.round(gr(13, 18))
        this.language = ""
        this.gender = random(["MALE", "FEMALE"])
        this.age = age
        this.heatRes = 30
        this.traits = {
            "str": str,
            "int": int,
            "agi": agi
        }
    }
    checkself(){
        if (this.state === "alive"){
            if (this.body["head"]["health"] <= 0){
                this.state = "dead"
            }
        }
        if (this.age >= this.fertileAge){
            this.fertile = true
        }
    }
    reprod(other){
        if (this.fertile === true && other.fertile === true){
        if (check(this.gender, other.gender)){
            if (this.body["genitalia"]["health"] >= 50 && other.body["genitalia"]["health"] >= 50){
                let n = new trissaeths(other.name + this.name, 0, 0, 0, 0)
                let str = parseFloat((this.traits["str"] + other.traits["str"]).toFixed(2))
                let int = parseFloat((this.traits["int"] + other.traits["int"]).toFixed(2))
                let agi = parseFloat((this.traits["agi"] + other.traits["agi"]).toFixed(2))
                let parentA = this.name
                let parentB = other.name
                let language = random([this.language, other.language])
                n.traits["str"] = str - parseFloat((Math.random()*str+1).toFixed(2))
                n.traits["int"] = int - parseFloat((Math.random()*int+1).toFixed(2))
                n.traits["agi"] = agi - parseFloat((Math.random()*agi+1).toFixed(2))
                n.language = language
                n.ancestors = []
                n.ancestors.push({
                    "greatGrandma": [
                        `${parentA}'s mother ${this.ancestors["grandma"]}`,
                        `${parentB}'s mother ${other.ancestors["grandma"]}`
                    ],
                    "greatGrandpa": [
                        `${parentA}'s mother ${this.ancestors["grandpa"]}`,
                        `${parentB}'s mother ${other.ancestors["grandpa"]}`
                    ],
                    "grandma": [
                        `${parentA}'s mother ${this.parent["mother"]}`,
                        `${parentB}'s mother ${other.parent["mother"]}`
                    ],
                    "grandpa": [
                        `${parentA}'s father ${this.parent["father"]}`,
                        `${parentB}'s father ${other.parent["father"]}`
                    ],
                    "parentA": parentA, 
                    "parentB": parentB
                })
                if (this.gender === "MALE"){
                    n.parent["father"] = parentA
                } else {
                    n.parent["mother"] = parentA
                }
                if (other.gender === "MALE"){
                    n.parent["father"] = parentB
                } else {
                    n.parent["mother"] = parentB
                }
                return n
            } else {
                return
            }
        } else {
            return
        }
        }
    }
    damage(area, num){
        if (this.body[area]["intact"] === true){
            if (this.body[area]["health"]){
                this.body[area]["health"] -= num
                if (this.body[area]["health"] <= 0){
                    this.body[area]["health"] = 0
                }
            }
            let reaction = Math.floor((num / this.body[area]["tolerance"])*reactions.length)
            if (reaction > +reactions.length-1){
                reaction = +reactions.length-1
            }
            if (reaction < 0){
                reaction = 0
            }
            let res = reactions[reaction].replace("{area}", area)
            this.memory.push(
                {
                "name": `pain in my ${area}`,
                "content": res,
                "strength": Math.round(reaction / (reactions.length/5))
                }
            )
            if (this.body[area]["health"] <= 0){
                this.body[area]["intact"] = false
                this.memory.push(
                    {
                    "name": `MY ${area} FELL OFF!`,
                    "content": res + " AND IT FELL OFF!",
                    "strength": reaction * 8
                    }
                )
            }
            if (this.body["head"]["health"] <= 0){
                this.state = "dead"
            }
        }
    }
}   

export class language{
    constructor(){
        this.phonemes = generatePhonemes()
    }
}

export class country{
    constructor(name, lname, origin){
        this.name = name
        this.age = 0
        this.language = {
            "name": lname,
            "emerged": 0,
            "origin": origin
        }
    }
}
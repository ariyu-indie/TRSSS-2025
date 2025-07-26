import { random, generatePhonemes, generateGroups, generateRand as gr, generateText as gt} from "./basics.js"

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

const reactionTALK = [
    "I talked to {other}, it was boring.",
    "I tried talking to {other}, but we didn't have much to say.",
    "I spoke to {other}, but it felt awkward.",
    "I had a short chat with {other}. It was fine.",
    "I talked with {other}. Not bad, not great.",
    "I had a decent conversation with {other}.",
    "I enjoyed talking with {other}. It felt natural.",
    "Me and {other} had a really good talk. I felt heard.",
    "Talking to {other} was exciting—we laughed and shared stories.",
    "Me and {other} talked together, it was AWESOME!"
]
export function Getmood(mood){
    if (mood<1.0){return "😡"}
    if (mood<2.0){return "😭"}
    if (mood<3.0){return "😢"}
    if (mood<4.0){return "😔"}
    if (mood<5.0){return "😐"}
    if (mood<8.0){return "😊"}
    return "😁"
}
export function check(a, b){
    const truth = {
        "MALE": "FEMALE",
        "FEMALE": "MALE"
    }
    if (truth[a] == b){
        return true
    }
}

export default function main(){
    return "ver@0.1"
}

export class trissaeths{
    constructor(name, age, str, int, agi) {
        this.name = name
        this.state = "alive"
        this.mood = 5.0
        this.location
        this.birthday = 0
        this.memory = [
        ]
        this.parent = {
            "mother": "god",
            "father": "god"
        }
        this.viruses = []
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
            "hip": {
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
            "grandma": [
            ],
            "grandpa": [
            ],
            "mother": "god",
            "father": "god"
        }
        this.children = []
        this.impow = gr(0.1, 5) //means immunity power
        this.gender = random(["MALE", "FEMALE"])
        this.willpower = gr(0, 1)
        this.fertile = false
        this.fertileAge = Math.round(gr(13, 18))
        this.fertileEx = Math.round(gr(this.fertileAge, 80))
        this.language = ""
        this.groups = {
            "in": false,
            "groups": []
        }
        this.color = ""
        this.age = age
        this.heatRes = 30
        this.relationship = []
        this.traits = {
            "str": str,
            "int": int,
            "agi": agi
        }
    }
    checkself(){
        if (this.state === "alive"){
            if (this.body["head"]["health"] <= 0){
                console.log(this.name + " just died!")
                this.state = "dead"
            }
        }
        if (this.age >= this.fertileAge){
            this.fertile = true
        }
        if (this.age >= this.fertileEx){
            this.fertile = false
        }
        if (this.mood > 10){
            this.mood = 10
        } else if (this.mood < 0){
            this.mood = 0
        }
        if (this.groups["in"] = true){
            if (this.groups["groups"].length <= 0){
                this.groups["in"] = false
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
            this.mood -= 1.0
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
    know(other){
        for (let i in this.relationship){
            if (other in this.relationship[i]["target"]){
                return true
            }
        }
        return false
    }
    talk(other){
        if (this.location.id === other.location.id){
            let a = gr(0, 10)
            let b = a / reactionTALK.length
            let intensity = Math.floor(b*9)
            let res = reactionTALK[intensity]
            res = res.replace("{other}", this.name)
            if (this.mood < 2.0){
                let act = random(["attack", "no"])
                if (act === "attack"){
                    other.damage("head", gr(0, 20))
                }
                other.mood -= (gr(-2, 2)-other.willpower)
                if (other.know(this)){
                    other.memory.push({
                        "name": "i got yelled at.",
                        "content": `${this.name} yelled at me...`,
                        "subject": this.name,
                        "strength": gr(10, 20)
                    })
                } else {
                    other.memory.push({
                        "name": "i got yelled at.",
                        "content": `someone yelled at me...`,
                        "subject": this.name,
                        "strength": gr(10, 20)
                    })
                }
                if (this.know(other)){
                    this.memory.push({
                        "name": `i yelled at ${other.name}`,
                        "content": `i yelled at ${other.name} for talking
                        to me.`,
                        "subject": other.name,
                        "strength": gr(20, 30)
                    })
                } else {
                    this.memory.push({
                        "name": "i yelled at someone",
                        "content": `i yelled at someone I don't know.`,
                        "subject": other.name,
                        "strength": gr(10, 20)
                    })
                }
            } else {
            if (intensity > 5){
                this.mood += 0.8
            }
            if (intensity < 5){
                this.mood -= 0.1
            }
            other.memory.push(
                {
                    "name": `talk with ${this.name}`,
                    "content": `${res}`,
                    "strength": intensity
                }
            )
            }
        }
    }
}   

const virusesR = [
    "this virus doesn't do anything to the {area}",
    "this virus causes minor damages to the {area}",
    "this virus can cause mild damages to the {area}",
    "this virus always cause {area} damage",
    "this virus causes extreme damage to the {area}",
    "this virus can destroy the infected's {area}"
]

const damage = [
    "this virus may cause little to no harm",
    "this virus cause mild to minor harm",
    "this virus causes mild harm",
    "this virus causes harm",
    "this virus causes extreme harm",
    "this virus may cause death"
]

function generateHarm(a){
    let reac = Math.floor((a / 10) * (damage.length))
    console.log(reac)
    let k = damage[reac]
    return k
}

function generateViDesc(a){
    let k = ""
    let descRes = 0
    let ko
    let p 
    let ou
    let n = 1
    let yoc = 8
    for (let i in a){
        ko = a[i]
        p = 10
        ou = ko / p
        descRes = Math.floor(ou * virusesR.length)
        if (descRes <= 0){
            descRes = 0
        }
        if (n < yoc){
            k += virusesR[descRes] + ", "
        } else if (n >= yoc){
            k += virusesR[descRes] + "."
        }
        k = k.replace("{area}", i)
        n++
    }
    return k
}

export class virus{
    constructor (){
        this.name = "unknown",
        this.attacks = {
            "head": gr(-5, 10),
            "neck": gr(-5, 10),
            "left_arm": gr(-5, 10),
            "right_arm": gr(-5, 10),
            "hip": gr(-5, 10),
            "genitalia": gr(-5, 10),
            "left_leg": gr(-5, 10),
            "right_leg": gr(-5, 10),
        }
        let tempo = 0
        let n = 0
        for (let o in this.attacks){
            tempo += this.attacks[o]
            if (this.attacks[o] < 0){
                this.attacks[o] = 0
            }
            n++
        }
        this.severity = tempo / n
        this.damage = generateHarm(this.severity)
        this.desc = generateViDesc(this.attacks)
        this.virusLife = gr(0, 100)
        this.behavior = {
            "AIRBORNE": random([true, false]),
        }
    }
}

export class location{
    constructor(){
        this.id = Math.round(Math.random()*999999999)
        this.name = "unknown"
        this.resources = []
        this.connections = []
        this.visited = false
    }
}

export class language{
    constructor(alphabet){
        this.phonemes = generatePhonemes(alphabet)
        this.groups = generateGroups(this.phonemes)
        this.name = gt(this.groups)
    }
}

export class group{
    constructor(name){
        this.name = name
        this.age = 0
        this.members = []
    }
}

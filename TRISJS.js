import { random, ascii, generateRand as gr, generatePhonemes as gp, generateGroups as ggr, generateText as gt} from "./modules/basics.js"
import trissaeths from "./modules/class.js"
import { getplots, landtype } from "./modules/plots.js"

let population = []
const al = ascii
console.log(al)
function header(txt){
    document.getElementById("header").innerText = txt
}
let LANDLIMIT = 2
const world = {
    "population": 200,
    "size": 80
}
const base_group = gp(al)
const languages = []
const plots = getplots
const assignments = landtype
let date = {
    "day": 0,
    "year": 0,
    "month": 0
}
const dayInYear = 365
const monthInYear = 12
const lands = [
    
]

let alllogs = []

function log(txt){
    alllogs.push(txt)
    document.getElementById("weg").innerHTML += txt + "<br>"
}

function generateWorld(){
    let temp
    let chose
    for (let m=0;m<LANDLIMIT;m++){
        chose = random(plots)
        temp = -10+Math.random()*chose.temp
        for (let i in assignments){
            if (temp <= assignments[i]){
                chose.name = i
            } else if (temp >= assignments[i]){
                break
            }
        }
        let UID = `${Math.round(gr(0, 10000000))}`
        if (m == 0){
            UID = "0"
        }
        console.log(UID)
        lands[UID] = {
                "name": chose.name,
                "temp": temp
        }
    }
}

function update(){
    population = population.filter(p => p && p.state === "alive")
    population = population.filter(p => p.state !== "dead")
    date["day"] += 1
    if (date["day"] >= 30){
        date["day"] = 0
        date["month"] += 1
    }
}

function DEBUGnpcRep(){
    for (let key in population){
        console.log(key)
            if (population[+key+1]){
                console.log(population[+key+1])
                let mmm = reproduce(population[key],population[+key+1])
                if (mmm != undefined){
                    population.push(mmm)
                }
            }
    }
}

function main(){
    console.log("game started")
    header("starting...")
    header("world generation...")
    generateWorld()
    header("generating base people...")
    let beginning = "0"
    for (let k=0;k<100;k++){
        let gender = random(["MALE", "FEMALE"])
        let ou = new trissaeths(gt(base_group), 0, gr(0, 10), gr(0, 10), gr(0, 10))
        ou.location = {
            "name": lands[beginning]["name"],
            "temp": lands[beginning]["temp"],
            "id": beginning
        }
        ou.body["head"]["health"] = 1
        ou.checkself()
        log(ou.name + " is born - " + date["year"])
        population.push(ou)
    }
    for (let i in population){
        population[i].location
    }
}

const truth = {
    "MALE": "FEMALE",
    "FEMALE": "MALE"
}

function reproduce(a, b){
    let res
    if (truth[a.gender] === b.gender){
        res = a.reprod(b)
        log(a.name+ " and " +b.name+ " had a child!")
        return res
    }
}
main()
let player = new trissaeths(gt(base_group), 20, 10, 10, 10)
console.log(player)
for (let i in population){
    if (population[+i+1]){
        population.push(reproduce(population[i], population[+i+1]))
    }
}
update()
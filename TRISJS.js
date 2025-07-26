import { generateColorHex as gch, random, ascii, generateRand as gr, generatePhonemes as gp, generateGroups as ggr, generateText as gt, rdict} from "./modules/basics.js"
import { Getmood, group, language, trissaeths, check, virus, location } from "./modules/class.js"
import { getplots, landtype } from "./modules/plots.js"
import { configuration } from "/rudiments/config/configs.js"

// above are basic stuffzz
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const $ = (id) => document.getElementById(id)
function ver(){
    return `
    buildNUM: 1.0.2 <br>
    change-log:- <br> 
    -  added birth mechanism <br>
    -  better UI <br>
    -  viruses <br>
    -  languages <br>
    -  lands <br>
    - - lands connections
    `
}

//_________
let name = "the chosen one"
let player = new trissaeths(name, 20, 10, 10, 10)
//_________

let population = []
const al = ascii
function header(txt){
    document.getElementById("loading").innerText = txt
}
let LANDLIMIT = 200
const world = {
    "population": 200,
    "size": 80
}
const languages = []
const plots = getplots
const assignments = landtype
let date = {
    "day": 1,
    "year": 1,
    "month": 1
}
const dayInYear = 365
const monthInYear = 12
const lands = [
    
]
let viruses = []
let alllogs = []
let groups = [] //can also be countries, kingdoms etc
function log(txt){
    alllogs.push(txt)
    document.getElementById("weg").innerHTML += txt + "<br>"
}

function generateWorld(){
    languages.push(new language(al))
    let chose
    for (let m=0;m<LANDLIMIT;m++){
        chose = new location()
        chose.name = gt(languages[0].groups)
        lands.push(chose)
    }
}

function generateConnection(){
    let connectable = lands.filter(l => l.connections.length < 4);
    for (let land of connectable) {
        while (land.connections.length < 4) {
            let potential = lands.filter(other =>
                other.id !== land.id &&
                other.connections.length < 4 &&
                !land.connections.includes(other)
            );
            if (potential.length === 0) break;
            let partner = random(potential);
            land.connections.push(partner);
            partner.connections.push(land);
        }
    }
}

function recuUp(num = 1){
    for(let i=0;i<num;i++){
        update()
    }
}

//____________
let popups = document.getElementsByClassName("popup")
function popup(txt){
    document.getElementById("popupWindow").innerHTML += `
        <div class="popup">
            ${txt}
        </div>
    `
    popups = document.getElementsByClassName("popup")
    Array.from(popups).forEach(e => {
        e.addEventListener("click", 
        ()=>{
            e.classList.remove("popup")
            e.innerHTML = ""
        })
    })
}
//____________

function carea(a, b){
    let r = a.filter(e => e.location.name === b.location.name)
    return random(r)
}

function showA(){
    let o = document.getElementById("weg")
    o.innerHTML = ""
    let k = player.location.connections
    $("move1").innerText = k[0] ? ` [move to ${k[0].name}] `: "[dead-end]"
    $("move2").innerText = k[1] ? ` [move to ${k[1].name}] `: "[dead-end]"
    $("move3").innerText = k[2] ? ` [move to ${k[2].name}] `: "[dead-end]"
    $("move4").innerText = k[3] ? ` [move to ${k[3].name}] `: "[dead-end]"
    if (k[0] && k[0].visited === true){
        $("move1").innerHTML = k[0] ? ` [move to <span class="visited">${k[0].name}</span>] `: "[dead-end]"
    }
    if (k[0] && k[1].visited === true){
        $("move2").innerHTML = k[1] ? ` [move to <span class="visited">${k[1].name}</span>] `: "[dead-end]"
    }
    if (k[0] && k[2].visited === true){
        $("move3").innerHTML = k[2] ? ` [move to <span class="visited">${k[2].name}</span>] `: "[dead-end]"
    }   
    if (k[0] && k[3].visited === true){
        $("move4").innerHTML = k[3] ? ` [move to <span class="visited">${k[3].name}</span>] `: "[dead-end]"
    }   
    if(k[0]){$("move1").onclick = () => {player.location = k[0];k[0].visited = true; update()}}
    if(k[1]){$("move2").onclick = () => {player.location = k[1];k[1].visited = true; update()}}
    if(k[2]){$("move3").onclick = () => {player.location = k[2];k[2].visited = true; update()}}
    if(k[3]){$("move4").onclick = () => {player.location = k[3];k[3].visited = true; update()}}
    for (let i in population){
        if (population[i].location.id === player.location.id){
        let mem = ""
        let gro = ""
        for (let oi in population[i].memory){
            mem += population[i].memory[oi]["content"] +"<br>"
        }
        for (let oi in population[i].groups["groups"]){
            gro += population[i].groups["groups"][oi].name+"<br>"
        }
        o.innerHTML += `
        <div style="color:${population[i].color}"class="item">
        name: ${population[i].name}<br>
        mood: ${Getmood(population[i].mood)}<br>
        age: ${Math.floor(population[i].age)} (real)<br>
        gender: ${population[i].gender}<br>
        birthdate: ${population[i].birthday} (est.)<br>
        ancestry:----------------:<pre class="mono">
|------------+
|            |
|       +----+----+
|       |         |
|      ( )---+---( ) (${population[i].parent["mother"]} + ${population[i].parent["father"]})
|            |
|           ( ) (${population[i].name})
|________________________|
        </pre>
        memory:----------------:<br>
        ${mem}
        groups:----------------:<br>
        ${gro}
        </div>
        `
        }
    }
}

function update(){
    population = population.filter(p => p && p.state === "alive") //checks if exists and alive
    population = population.filter(p => p.state !== "dead")
    showA()
    $("loca").innerText = `you are currently at ${player.location.name}`
    date["day"] += 1
    if (date["day"] > 30){
        date["day"] = 0
        date["month"] += 1
    } //uses a calendar close to real world
    if (date["month"] > 12){
        date["year"] += 1
        date["month"] = 1
    }
    for (let k in population){
        let action = random([
            "idle", 
            "sit",
            "declaregroups",
            "befriend",
            "look-around",
            "changeloc", 
            "invite",
            "talk",
            "tell"
        ])
        if (population[k].age > 12){
            if (action === "changeloc"){
                let des = random(population[k].location.connections)
                population[k].location = des
            }
            if (action === "declaregroups"){
                if (population[k].willpower > 0.90){
                    let res = new group(gt(population[k].language.groups))
                    groups.push(res)
                    population[k].groups["groups"].push(res)
                    res.members.push(population[k])
                    population[k].willpower -= 5.0
                    population[k].memory.push({
                        "name": "i established a group",
                        "content": `i established ${res.name}`,
                        "strength": 20*365
                    })
                    if (population[k].groups["groups"].length > 0){
                        population[k].groups["in"] = true
                    }
                }
            }
            if (action === "invite"){
                if (population[k].groups["in"] = true){
                    let gro = random(population[k].groups["groups"])
                    if (gro){
                        let victim = carea(population, population[k])
                        let choice = random(["no", "sure"])
                        if (choice === "sure"){
                            gro.members.push(victim)
                            population[k].memory.push({
                                "name": "new member to my group "+gro.name,
                                "content": victim.name+" joined my group!",
                                "strength": gr(10, 30)
                            })
                        }
                    }
                }
            }
        }
        if (action === "talk"){
            let inarea = population.filter(e => e.location.name === population[k].location.name)
            let target = random(inarea)
            if (target.name !== population[k].name){
                population[k].talk(target)
            }
        }
        /*
        if (action === "befriend"){
            let victim = carea(population, population[k])
            let choice = random(["yes", "no"])
        }
        */
        population[k].mood += gr(0, population[k].willpower)
        population[k].willpower += 0.001
        population[k].mood -= 0.1
    }
    for (let i in population){
        population[i].age += 0.002739
        population[i].memory = population[i].memory.filter(e => e["strength"] > 0);
        for (let ore in population[i].memory){
            population[i].memory[ore]["strength"] -= 1;
        }
        for (let a in population[i].viruses){
            population[i].viruses = population[i].viruses.filter(e => e.alive !== false)
            if (population[i].viruses[a]){
                population[i].viruses[a]["time"] -= 1
                for (let b in population[i].viruses[a]["virus"].attacks){
                    population[i].body[b]["health"] -= population[i].viruses[a]["virus"].attacks[b]
                }
                if (population[i].viruses[a]["time"] <= 0){
                    population[i].viruses[a]["time"] = 0
                    population[i].viruses[a]["alive"] = false
                }
            }
        }
        for (let a in population[i].body){
            population[i].body[a]["health"] += population[i].impow //immunity power
            if (population[i].body[a]["health"] > 100){
                population[i].body[a]["health"] = 100
            }
        }
    }
    document.getElementById("dates").innerHTML = `${date["year"]}/${date["day"]}/${date["month"]}`
    for (let i in population){
        population[i].checkself()
    }
}

function DEBUGnpcRep(){
    for (let key in population){
            if (population[+key+1]){
                let mmm = reproduce(population[key],population[+key+1])
                if (mmm != undefined){
                    population.push(mmm)
                }
            }
    }
    //these are for testing reproduction
}

document.getElementById("move").addEventListener("click", ()=>{
    update()
})

async function main(){
    console.log("game started")
    header("starting...")
    await sleep(0)
    header(`
    ✔️ starting...
    world generation...
    `)
    generateWorld()
    await sleep(0)
    header(`
    ✔️ starting...
    ✔️ world generation...
    connecting_lands`)
    generateConnection()
    await sleep(0)
    let beginning = 0
    player.location = lands[0]
    player.name = gt(languages[0].groups)
    lands[0].visited = true
    for (let k=0;k<configuration["POPULATION_LIMIT"];k++){
        let gender = random(["MALE", "FEMALE"])
        let ou = new trissaeths(gt(languages[0].groups), 0, gr(0, 10), gr(0, 10), gr(0, 10))
        let loc = random(lands)
        ou.location = loc
        ou.language = languages[0]
        ou.color = gch()
        ou.age = gr(7, 20)
        ou.birthday = `${Math.floor(date["year"]-ou.age)}/${Math.floor(date["day"])}/${date["month"]}`
        ou.checkself()
        log(`<u>${ou.name}</u> is born at - ${date["year"]-ou.age}/${date["day"]}/${date["month"]}`)
        population.push(ou)
        // is a random BS, it's just what the current shi is referencing.
        update()
        header(`
        ✔️ starting...
        ✔️ world generation...
        ✔️ connecting_lands 
        generating base people...${configuration["POPULATION_LIMIT"]}/${k}
        `)
        await sleep(0)
    }
    for (let i in population){
        population[i].checkself() //di ko alam kung ano to. (doubt fixed)
        header(`
        ✔️ starting...
        ✔️ world generation...
        ✔️ connecting_lands 
        ✔️ generating base people
        checking state... ${i}`)
        await sleep(0)
    }
    await sleep(1)
    for (let i=0;i<1*365;i++){
        update()
        header(`
        ✔️ starting...
        ✔️ world generation...
        ✔️ connecting_lands 
        ✔️ generating base people
        ✔️ checking state... 
        aging them up for a bit... ${cdate()}`)
        await sleep(0)
    }
    await sleep(1)
    popup(`you, ${player.name} are to build a life
    you may find satisfying, but beware the dangers!
    this world is not as you expect it!`)
    popup(`${Math.round(10000/365)} years later, after the creation of calendars, you were birthed.`)
    popup(`TRSSS@${ver()}`)
    header("done!")
    popup(`
    thank you SO much for playing!
    i'll make sure to update the game as much as i could!
    thank you!
    `)
    await sleep(1)
    $("loading").style.display = "none"
    console.log(population)
}
const truth = {
    "MALE": "FEMALE",
    "FEMALE": "MALE"
}

function infect(vi, target){
    target.viruses.push({
        "virus": vi,
        "time": vi.virusLife,
        "alive": true
    })
}

function cdate(){
    return `${date["year"]}/${date["day"]}/${date["month"]}`
}

//____________
function reproduce(a, b) {
    if (a.fertile && b.fertile){
        if (check(a.gender, b.gender)){
            let result = new trissaeths("",0,0,0,0)
            let lang = random([a.language, b.language])
            let name = gt(lang.groups)
            let str = (a.traits["str"] + b.traits["str"]) / 2 + gr(-1, 1)
            let int = (a.traits["int"] + b.traits["int"]) / 2 + gr(-1, 1)
            let agi = (a.traits["agi"] + b.traits["agi"]) / 2 + gr(-1, 1)
            let mom = a.gender === "FEMALE" ? a: b
            let dad = a.gender === "MALE" ? a: b
            let ancestors = {
                "grandpa": [
                    a.parent["father"],
                    b.parent["father"]
                ],
                "grandma": [
                    a.parent["mother"],
                    b.parent["mother"]
                ],
                "mother": mom,
                "father": dad
                }
            result.parent["mother"] = mom
            result.parent["father"] = dad
            result.name = name
            result.language = lang
            result.traits["str"] = str
            result.traits["int"] = int
            result.color = gch()
            result.traits["agi"] = agi
            a.memory.push(
                {
                    "name": `i gave birth to ${result.name}`,
                    "content": `my child is born at ${cdate()}`,
                    "strength": 50
                }
            )
            a.children.push(result)
            b.children.push(result)
            return result
        } else {
            return null
        }
    } else {
        return null
    }
}
//____________

//_____________
document.getElementById("notice").style.display = "none"
if (configuration["NOTICE"] === true){
    document.getElementById("notice").style.display = "flex"
}
//_____________

//_____________
/*
format = `
        <div class="item">
        name: ${population[i].name}<br>
        age: ${Math.round(population[i].age)}<br>
        gender: ${population[i].gender}<br>
        birthdate: ${population[i].birthday}<br>
        <span class="mono">
        ancestry:----------------:<br
            |<br>
            |_${population[i].ancestors["grandma"][0]} <br>
            |.|_${population[i].ancestors["grandma"][1]} <br>
            |_${population[i].ancestors["grandpa"]} <br>
            |.|_${population[i].ancestors["grandpa"]} <br>
            |...|__${population[i].ancestors["mother"]} <br>
            |___${population[i].ancestors["father"]} <br>
            |.....|____${population[i].name}
        </span>
        </div>
        `
*//*
legacy = `
        <div class="item">
        name: ${population[i].name}<br>
        age: ${Math.round(population[i].age)}<br>
        gender: ${population[i].gender}<br>
        birthdate: ${population[i].birthday}<br>
        </div>
        `
*/
//_____________


main()

export const vowel = [
    "a", "e", "i", "o",
    "u", "ly", "ao", "ae",
    "ai", "au", "à", "á",
    "â", "ä", "ã", "å", "ā"
]
export const ascii = [
    "b", "c", "d", "f",
    "g", "h", "j", "k",
    "l", "m", "n", "p",
    "q", "r", "s", "t",
    "v", "w", "x", "y", 
    "z", "ß", "ç", "ñ", 
    "'", "-"
]

export function generateColorHex() {
    return "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0");
}

export function generateRand(a, b){
    let c = b - a
    let k = parseFloat((a+Math.random()*c).toFixed(2))
    return k
}
export function generateText(groups){
    let leni = Math.round(2+Math.random()*2)
    let a = ""
    for(let i=0;i<leni;i++){
        a += random(groups) + random(vowel)
    }
    return a
}
export function generatePhonemes(text){
    let a = text.length
    let res = []
    for (let okf=0;okf<30;okf++){
        let k = text[Math.floor(generateRand(0, a))]
        if (!res.includes(k)){
            res.push(k)
        }
    }
    return res
}

export function rdict(dict){
    let stop = Math.floor(Math.random()*Object.keys(dict).length)
    let n = -1
    for (let i in dict){
        n++
        if (n>=stop){
            return dict[i]
        }
    }
}

export function generateGroups(list){
    let a = list.length
    let b = []
    let c = ""
    let n = Math.floor(10+Math.random()*20)
    let e;
    for (let dkd=0;dkd<n;dkd++){
        c = ""
        for (let cod=0;cod<1;cod++){
            e = list[Math.floor(Math.random()*a)] + vowel[Math.floor(Math.random()*vowel.length)]
            c += e
        }
        b.push(c)
    }
    return b
}

export function random(list) {
    let len = list.length
    let choice = Math.floor(Math.random() * len)
    return list[choice]
}

export default function ver(){
    return "@1.0.1"
}
    

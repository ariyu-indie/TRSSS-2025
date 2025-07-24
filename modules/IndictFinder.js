export default function find(list, item){
    for (let i=0;i<list.length;i++){
        if (list[i] === item){
            return item
        }
    }
    return
}
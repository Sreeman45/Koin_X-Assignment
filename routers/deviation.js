let object={
    a:"oiin",
    m:'kkkk',
    bat:{
        sreeman:'njnjn',
        raju:'jnjnknk'
    }
}
function deepCopy(...obj){
       obj.bat.sreeman='yes'
       return obj
}
console.log(deepCopy(object))


function init(){
    if (localStorage.length==0){
        localStorage.setItem("hscore", 0)
        localStorage.setItem("htime", 0)
        localStorage.setItem("hperformance", 0)

        localStorage.setItem("save", JSON.stringify({
            op:{
                add:true,
                sub: true,
                mul: true,
                div: true
            },
            fnl: 10,
            snl: 10,
            mode: "timer",
            prefrences: {
                s: 100,
                t: {
                    h: 0,
                    m: 0,
                    s: 10
                }
            }
        }))
    }
}



function TimeATMS(d){
    let hours = d[0]

    let extraMinutes = hours*60
    let minutes = extraMinutes + d[1]

    let extraSeconds = minutes*60
    let seconds = extraSeconds + d[2]

    let extraMilliseconds = seconds * 100
    let milliseconds = extraMilliseconds + d[3]

    let time = milliseconds

    return time
}

init()

let dataa = {
    limit1: 10,
    limit2: 10,
    operators: ["+", "X", "/", "-"],
    gap:1,
    debug: false,
    mode: "timer",
    timerLimit: [0,0,10,0],
    scoreLimit: 100
}


let save = {
    op:{
        add:true,
        sub: true,
        mul: true,
        div: true
    },
    fnl: 10,
    snl: 10,
    mode: "timer",
    prefrences: {
        s: 100,
        t: {
            h: 0,
            m: 0,
            s: 10
        }
    }
}

function setDATA(){
    let assumedDATA = JSON.parse(localStorage.getItem("save"))
    console.log(assumedDATA);

    dataa.limit1 = Number(assumedDATA.fnl)
    dataa.limit2 = Number(assumedDATA.snl)

    dataa.mode = assumedDATA.mode

    dataa.timerLimit = [assumedDATA.prefrences.t.h, assumedDATA.prefrences.t.m,assumedDATA.prefrences.t.s,0]
    dataa.scoreLimit = assumedDATA.prefrences.s

    let ar = []

    if (assumedDATA.op.add){
        ar.push("+")
    }
    if (assumedDATA.op.sub){
        ar.push("-")
    }
    if (assumedDATA.op.mul){
        ar.push("X")
    }
    if (assumedDATA.op.div){
        ar.push("/")
    }


    dataa.operators = ar

    console.log(dataa)

}
setDATA()

let ops= {
    plus: JSON.parse(localStorage.getItem("save")).op.add,
    minus: JSON.parse(localStorage.getItem("save")).op.sub,
    multiply: JSON.parse(localStorage.getItem("save")).op.mul,
    divide: JSON.parse(localStorage.getItem("save")).op.div,
}
let scoreBoard = document.querySelector("span.scoreb")
let timerBoard = document.querySelector("span.timerd")

function removeDuplicates(arr) {
    let unique = [];
    arr.forEach(element => {
        if (!unique.includes(element)) {
            unique.push(element);
        }
    });
    return unique;
}

function removeElem(arr, val){
    for( var i = 0; i < arr.length; i++){ 
    
        if ( arr[i] === val) { 
    
            arr.splice(i, 1); 
        }
    
    }

    return arr
}

function start(dt){
    document.querySelector(".startup").style.display="none"
    document.querySelector(".layer").style.display="none"
    randomQuestionGenerator(dataa)
    startTimer([0,0,0,0],dt)

    
    



}


function stopa(d, t){
    document.querySelector(".layer").style.display="block"
    document.querySelector(".layer").style.zIndex="8"
    document.querySelector(".win").style.display="flex"
    let j = document.querySelector(".win h2")
    if(t=="timer"){
        j.innerHTML = `You won with score of ${d}!`
        let t = TimeATMS(dataa.timerLimit)
        let p = (d/t)*100
        if(d>localStorage.getItem("hscore")){
            localStorage.setItem("hscore", d)
        }
        if(p>localStorage.getItem("hperformance")){
            localStorage.setItem("hperformance", p)
        }

        console.log(p);
    }else if(t="score"){
        j.innerHTML = `You completed the score limit in <br/>${d[0]}h ${d[1]}m ${d[2]}s ${d[3]}ms! <br/> ${d[0]}:${d[1]}:${d[2]}.${d[3]}`

        if(TimeATMS(d)>localStorage.getItem("htime")){
            localStorage.setItem("htime", TimeATMS(d))
        }
        let p = (dataa.scoreLimit / TimeATMS(d))*100
        if(p>localStorage.getItem("hperformance")){
            localStorage.setItem("hperformance", p)
        }
        console.log(p);
    }
    
}
function displayRadioValue(name) {
    var ele = document.getElementsByName(name);
      
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked){
            return i
        }
        
    }
}
function randomQuestionGenerator(dt){
    let data = {}
    let num1 = Math.floor(Math.random()*(dt.limit1-1)+1)
    let num2 = Math.floor(Math.random()*(dt.limit2-1)+1)

    let list = [1,2,3,4]
    let userShow = false
    let btnQuery = Math.floor(Math.random()*4)

    let opt = dt.operators[Math.floor(Math.random()*dt.operators.length)]

    let q = document.querySelector("div.input div.question p")

    let easteregg = Math.floor(Math.random()*1000)
    let pi = "3.141592653589"


    data.easteregg = easteregg

    

    data.question = `${num1} ${opt} ${num2} =`
    if(opt=='+'){
        data.answer = num1 + num2
    }else if(opt=='-'){
        data.answer = num1 - num2
    }else if(opt=='X'){
        data.answer = num1 * num2
    }else if(opt=='/'){
        data.answer = num1 / num2
    }else{
        data.answer = "Not Defined"
    }

    let btnList = document.querySelectorAll("button#choice")

    for (let i = 0; i < btnList.length; i++) {
        const element = btnList[i];
        element.innerHTML = data.answer + list[i] * dt.gap
        if(element.getAttribute("data-order")==btnQuery){
            element.innerHTML = data.answer
        }
        
        function a(){
            if(element.innerHTML == data.answer){
                scoreBoard.innerHTML = Number(scoreBoard.innerHTML) + 10
            } 
            else if(element.innerHTML != data.answer){
                scoreBoard.innerHTML = Number(scoreBoard.innerHTML) - 5
            }
            randomQuestionGenerator(dt)
        }

        element.onclick = a
        
    }

    q.innerHTML = data.question

    if(easteregg==378){

		for (let i = 0; i < btnList.length; i++) {
        	const element = btnList[i];

        	element.innerHTML = pi
        	q.innerHTML = "You won an 1 in 1000 Easter Egg <br> &#8508; = "

        	element.onclick = function(){
        		scoreBoard.innerHTML = Number(scoreBoard.innerHTML) + 10000
        		randomQuestionGenerator(dt)
        	}
        }

    	return
    }

    if(dt.debug){
    	console.log(data)
    }

}

function Timer(intialValue){

    let i = intialValue

    this.hour = i[0]
    this.minute = i[1]
    this.second = i[2]
    this.millisecond = i[3]

}
function startTimer(intialValue, dt){
    let i = 0;
    let timerData;

    let inter = setInterval(()=>{

        if(i==0){
            timerData = new Timer(intialValue)
            i=1
        }else{
            timerData = new Timer([timerData.hour, timerData.minute, timerData.second, timerData.millisecond])
        }

        timerData.millisecond += 1
        if(timerData.millisecond>=100){
            timerData.millisecond = 0
            timerData.second += 1
        }
        if(timerData.second>=60){
            timerData.second = 0
            timerData.minute+=1
        }
        if(timerData.minute>=60){
            timerData.minute = 0
            timerData.hour+=1
        }


        timerBoard.innerHTML = 
        `${timerData.hour.toLocaleString('en-US', {
            minimumIntegerDigits: 2, useGrouping:false
        })}:${timerData.minute.toLocaleString('en-US', {
            minimumIntegerDigits: 2, useGrouping:false
        })}:${timerData.second.toLocaleString('en-US', {
            minimumIntegerDigits: 2, useGrouping:false
        })}.${timerData.millisecond.toLocaleString('en-US', {
            minimumIntegerDigits: 2, useGrouping:false
        })}`

        let s = Number(document.querySelector("span.scoreb").innerHTML)

        if( timerData.millisecond == dt.timerLimit[3] && 
            timerData.second == dt.timerLimit[2] &&
            timerData.minute == dt.timerLimit[1] && 
            timerData.hour == dt.timerLimit[0] &&
            dt.mode == "timer"){

            clearInterval(inter)
            stopa(s, "timer")

        }
        else if (dt.mode == "score" && s==dt.scoreLimit){
            let l = [timerData.hour, timerData.minute, timerData.second, timerData.millisecond]
            clearInterval(inter)
            stopa(l, "score")
        }    



    }, 10)
}



window.onload = function(){
    scoreBoard.innerHTML = 0
    randomQuestionGenerator(dataa)
}


// startTimer([0,0,0,0])

let operations = document.getElementsByName('operator')
console.log(operations)

for (var i = operations.length - 1; i >= 0; i--) {
    operations[i].addEventListener("input", function(e){
        // e.target.getAttribute("data-option") 
        // e.target.checked

        switch (e.target.getAttribute("data-option")) {
            case "1":
                ops.plus = e.target.checked
                break;
            case "2":
                ops.minus = e.target.checked
                break;
            case "3":
                ops.multiply = e.target.checked
                break;
            case "4":
                ops.divide = e.target.checked
                break;
            default:
                console.error("Unknown Operator");
        }

        if (!ops.plus){
            dataa.operators = removeElem(dataa.operators, "+")
            save.op.add = false
        }else{
            dataa.operators.push("+")
            save.op.add = true
        }

        if (!ops.minus){
            dataa.operators = removeElem(dataa.operators, "-")
            save.op.sub = false
        }else{
            dataa.operators.push("-")
            save.op.sub = true
        }

        if (!ops.multiply){
            dataa.operators = removeElem(dataa.operators, "X")
            save.op.mul = false
        }else{
            dataa.operators.push("X")
            save.op.mul = true
        }

        if (!ops.divide){
            dataa.operators = removeElem(dataa.operators, "/")
            save.op.div = false
        }else{
            dataa.operators.push("/")
            save.op.div = true
        }

        dataa.operators = removeDuplicates(dataa.operators)
        if (dataa.operators.length==0){
            document.querySelector(".continue").setAttribute("disabled", true)
        }else{
            document.querySelector(".continue").removeAttribute("disabled")
        }


    })

}

let l1 = document.querySelector("#l1")
l1.addEventListener("input", function(e){
    dataa.limit1 = e.target.value
    save.fnl = Number(e.target.value)
})

let l2 = document.querySelector("#l2")
l2.addEventListener("input", function(e){
    dataa.limit2 = e.target.value
    save.snl = Number(e.target.value)
})

document.querySelector(".continue").addEventListener("click", function(){
    start(dataa)
})



let mode = document.getElementsByName("mode")
console.log(mode)

for (var i = mode.length - 1; i >= 0; i--) {
    mode[i].addEventListener("input", function(e){
        let modeValue = displayRadioValue("mode")
        
        switch (modeValue) {
            case 0:
                dataa.mode = "timer"
                save.mode = "timer"
                break;
            case 1:
                dataa.mode = "score"
                save.mode = "score"
                break;
        
            default:
                break;
        }
    
    })
}

let scoreset = document.querySelector("#s1")
scoreset.addEventListener("input", (e)=>{
    dataa.scoreLimit= Number(e.target.value)
    save.prefrences.s = Number(e.target.value)
})

let timerset = document.getElementsByName("setTimer")



for (let index = 0; index < timerset.length; index++) {
    const element = timerset[index];
    
    element.addEventListener("input", (e)=>{
        dataa.timerLimit[Number(e.target.getAttribute("data-index"))] = Number(e.target.value)

        if(e.target.getAttribute("data-index")=="0"){
            save.prefrences.t.h = Number(e.target.value)
        }else if(e.target.getAttribute("data-index")=="1"){
            save.prefrences.t.m = Number(e.target.value)
        }else if(e.target.getAttribute("data-index")=="2"){
            save.prefrences.t.s = Number(e.target.value)
        }
    })
}

document.body.addEventListener("unload", function(){
    localStorage.setItem("save", JSON.stringify({
        op:{
            add:save.op.add,
            sub: save.op.sub,
            mul: save.op.mul,
            div: save.op.div
        },
        fnl: save.fnl,
        snl: save.snl,
        mode: save.mode,
        prefrences: {
            s: save.prefrences.s,
            t: {
                h: save.prefrences.t.h,
                m: save.prefrences.t.m,
                s: save.prefrences.t.s
            }
        }
    }))
})

setInterval(() => {
    localStorage.setItem("save", JSON.stringify({
        op:{
            add:save.op.add,
            sub: save.op.sub,
            mul: save.op.mul,
            div: save.op.div
        },
        fnl: save.fnl,
        snl: save.snl,
        mode: save.mode,
        prefrences: {
            s: save.prefrences.s,
            t: {
                h: save.prefrences.t.h,
                m: save.prefrences.t.m,
                s: save.prefrences.t.s
            }
        }
    }))
}, 100);

let d = JSON.parse(localStorage.getItem("save"))
save.op.add = d.op.add
save.op.sub = d.op.sub
save.op.mul = d.op.mul
save.op.div = d.op.div
save.fnl = d.fnl
save.snl = d.snl
save.mode = d.mode
save.prefrences.s = d.prefrences.s
save.prefrences.t.h = d.prefrences.t.h
save.prefrences.t.m = d.prefrences.t.m
save.prefrences.t.s = d.prefrences.t.s


document.querySelector("#c1").checked = save.op.add
document.querySelector("#c2").checked = save.op.sub
document.querySelector("#c3").checked = save.op.mul
document.querySelector("#c4").checked = save.op.div

document.querySelector("#l1").value = save.fnl
document.querySelector("#l2").value = save.snl

document.querySelector("#t1").value = save.prefrences.t.h
document.querySelector("#t2").value = save.prefrences.t.m
document.querySelector("#t3").value = save.prefrences.t.s
document.querySelector("#s1").value = save.prefrences.s

if(save.mode=="timer"){
    document.querySelector("#r1").checked = true
    document.querySelector("#r2").checked = false
}
if(save.mode=="score"){
    document.querySelector("#r2").checked = true
    document.querySelector("#r1").checked = false
}


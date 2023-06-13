let col,row

let maxX=3
let maxY=3
let variablechange
let directionchange
const puzzleboard=document.getElementById('puzzle')
swapped=false
let swapx,swapy
let fromindex
let toindex
let temp

let randomized=false

const randombutton=document.getElementById('pleaserandom')
const randombutton2=document.getElementById('randomalso')

one=document.createElement('img')
one.src='files/1.png'
two=document.createElement('img')
two.src='files/2.png'
three=document.createElement('img')
three.src='files/3.png'
four=document.createElement('img')
four.src='files/4.png'
five=document.createElement('img')
five.src='files/5.png'
six=document.createElement('img')
six.src='files/6.png'
seven=document.createElement('img')
seven.src='files/7.png'
eight=document.createElement('img')
eight.src='files/8.png'
empty=document.createElement('img')
empty.src='files/empty.png'

numberarray=[one,two,three,four,five,six,seven,eight,empty]
let array=[[1,1,numberarray[0]],[1,2,numberarray[1]],[1,3,numberarray[2]],[2,1,numberarray[3]],[2,2,numberarray[4]],[2,3,numberarray[5]],[3,1,numberarray[6]],[3,2,numberarray[7]],[3,3,numberarray[8]]]


function main(){

    gameloop()
    requestAnimationFrame(main)
}

window.requestAnimationFrame(main)

window.addEventListener('mousedown',clicked)

function clicked(event) {
    const puzzleRect = puzzleboard.getBoundingClientRect();
    const cellWidth = puzzleRect.width / 3;
    const cellHeight = puzzleRect.height / 3;
    if(event.clientX>puzzleRect.left && event.clientX<puzzleRect.left+puzzleRect.width && event.clientY>puzzleRect.top && event.clientY<puzzleRect.top+puzzleRect.height ){
        swapped=false
        const offsetX = event.clientX - puzzleRect.left;
        const offsetY = event.clientY - puzzleRect.top;
        col = Math.floor(offsetX / cellWidth) + 1;
        row = Math.floor(offsetY / cellHeight) + 1;
  }
  if(!swapped){
    swap()
  }
  if(event.target==randombutton || event.target==randomalso ){
    console.log('hello')
    if(!randomized){
        for(let i=0;i<70;i++){
            randomizer()
        }
          
        randomized=true
      }
  }
  
  
}




function gameloop(){
    puzzleboard.innerHTML = '';
    for(let i=0;i<9;i++){
        const wordelement = document.createElement('div')
        wordelement.style.gridColumnStart=array[i][1]
        wordelement.style.gridRowStart=array[i][0]
        array[i][2].classList.add('puzzle-image')
        wordelement.appendChild(array[i][2])
        wordelement.classList.add('puzzle-cell')
        puzzleboard.appendChild(wordelement)
        
    }
}

function swap(){
    for(let i=0;i<9;i++){
        if(array[i][2]==empty){
            swapx=array[i][0]
            swapy=array[i][1]
            toindex=i
        }
    }
    if((row-swapx)+(col-swapy)==1 || (row-swapx)+(col-swapy)==-1){
        array.forEach((combo)=>{
            if(combo[0]==row && combo[1]==col){
                fromindex=array.indexOf(combo)
            }
        })
        actuallyswap(fromindex,toindex)
    }
    swapped=true
}

function actuallyswap(index1,index2){
        temp=array[index1][2]
        array[index1][2]=array[index2][2]
        array[index2][2]=temp
}

let startx,starty,startindex,tocol,torow,endindex

function randomizer(){
    variablechange=Math.floor(Math.random()*2)+1
    directionchange=Math.floor(Math.random()*2)+1
    for(let i=0;i<9;i++){
        if(array[i][2]==empty){
            startx=array[i][0]
            starty=array[i][1]
            startindex=i
        }
    }

    if(variablechange==1){
        if(directionchange==1){
            torow=startx+1
            tocol=starty
        }
        if(directionchange==2){
            torow=startx-1
            tocol=starty
        }
    }
    if(variablechange==2){
        if(directionchange==1){
            tocol=starty+1
            torow=startx
        }
        if(directionchange==2){
            tocol=starty-1
            torow=startx
        }
    }
    if(torow>maxX || tocol>maxY){
        randomizer()
    }
    else{
        for(let j=0;j<9;j++){
            if(array[j][0]==torow && array[j][1]==tocol){
                endindex=j
            }
        }
       
        actuallyswap(startindex,endindex)
        return
    }
    
  
}

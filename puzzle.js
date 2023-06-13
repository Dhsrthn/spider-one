const puzzleboard=document.getElementById('puzzle')
swapped=false
let swapx,swapy
let fromindex
let toindex
let temp

const randombutton=document.getElementById('pleaserandom')

let cellHeight,cellWidth

function gameloop(){
    puzzleboard.innerHTML = '';
    for(let i=0;i<9;i++){
        const wordelement = document.createElement('div')
        wordelement.style.gridColumnStart=array[i][1]
        wordelement.style.gridRowStart=array[i][0]
        array[i][2][0].classList.add('puzzle-image')
        wordelement.appendChild(array[i][2][0])
        wordelement.classList.add('puzzle-cell')
        puzzleboard.appendChild(wordelement)
        
    }
}

let startingnow=true
let numberpuzzle=true
let gridrows=3
let gridcolumns=3
let arrayofnumbers=[]
let arrayforpuzzle=[]
let starting
let totalboxes
let fontsize
let swaprow,swapcol

const noinpuzzles=document.getElementsByClassName('puzzle-number')
function main(){
    const puzzleRect = puzzleboard.getBoundingClientRect();
    cellWidth = puzzleRect.width / gridcolumns;
    cellHeight = puzzleRect.height / gridrows;
    if(numberpuzzle==true){
        if(startingnow){
            numberpuzzleshow()
        }
        displaypuzzlenumber()
        
    }
    //gameloop()
    requestAnimationFrame(main)
}

window.requestAnimationFrame(main)

function numberpuzzleshow(){
    starting=0
    totalboxes=gridcolumns*gridrows
    //number of colmuns is x
    //number of rows is y
    puzzleboard.style.gridTemplateColumns = `repeat(${gridcolumns}, 1fr)`;
    puzzleboard.style.gridTemplateRows = `repeat(${gridrows}, 1fr)`;
    for(let i=0;i<totalboxes;i++){
        if(i==(totalboxes)-1){
            arrayofnumbers[i]=' '
        }
        else{
            arrayofnumbers[i]=i+1
        }
    }
    for(let i=1;i<gridrows+1;i++){
        for(let j=1;j<gridcolumns+1;j++){
            arrayforpuzzle[starting]=[i,j,arrayofnumbers[starting]]
            starting++
        }
    }
    displaypuzzlenumber()
    startingnow=false
}

function displaypuzzlenumber(){
    puzzleboard.style.backgroundImage = "url('files/puzzleback.jpg')"
    puzzleboard.innerHTML = '';
    for(let i=0;i<totalboxes;i++){
        const wordelement = document.createElement('div')
        wordelement.style.gridColumnStart=arrayforpuzzle[i][1]
        wordelement.style.gridRowStart=arrayforpuzzle[i][0]
        wordelement.innerHTML=arrayforpuzzle[i][2]
        wordelement.classList.add('puzzle-number')
        
        puzzleboard.appendChild(wordelement)
    }
    fontsize=Math.min(cellHeight/3,cellWidth/3)
    for (let i = 0; i < noinpuzzles.length; i++) {
        noinpuzzles[i].style.fontSize = fontsize+'px';
    }
    
    
}

window.addEventListener('mousedown',clicked)

function clicked(event) {
    const puzzleRect = puzzleboard.getBoundingClientRect();
    if(event.clientX>puzzleRect.left && event.clientX<puzzleRect.left+puzzleRect.width && event.clientY>puzzleRect.top && event.clientY<puzzleRect.top+puzzleRect.height ){
        swapped=false
        const offsetX = event.clientX - puzzleRect.left;
        const offsetY = event.clientY - puzzleRect.top;
        col = Math.floor(offsetX / cellWidth) + 1;
        row = Math.floor(offsetY / cellHeight) + 1;
        if(!swapped){
            swap()
          }
  }
  
  if(event.target==randombutton ){
        actualrandomizer()
  } 
}

function swap(){
    if(!numberpuzzle){
        
    }
    if(numberpuzzle){
        for(let i=0;i<totalboxes;i++){
            if(arrayforpuzzle[i][2]==' '){
                swaprow=arrayforpuzzle[i][0]
                swapcol=arrayforpuzzle[i][1]
                toindex=i
            }
        }
        if(((row==swaprow+1 || row==swaprow-1) && col==swapcol) || (row==swaprow && (col==swapcol+1 || col==swapcol-1) )){
            arrayforpuzzle.forEach((combo)=>{
                if(combo[0]==row && combo[1]==col){
                    fromindex=arrayforpuzzle.indexOf(combo)
                }
            })
            actuallyswap(fromindex,toindex)
        }

    }
    
}

function actuallyswap(index1,index2){
    if(numberpuzzle){
        temp=arrayforpuzzle[index1][2]
        arrayforpuzzle[index1][2]=arrayforpuzzle[index2][2]
        arrayforpuzzle[index2][2]=temp

    }
    if(!numberpuzzle){
        
    }   
    
}

let tempnumberarray=[]
let len
let tempindex
let checkingarray=[]
let numberofinverse

function actualrandomizer(){
    if(!numberpuzzle){
        
    }
    if(numberpuzzle){
        checkingarray=[]
        for(let i=0;i<totalboxes;i++){
            tempnumberarray[i]=arrayofnumbers[i]
        }
        for(let i=0;i<totalboxes;i++){
            len=tempnumberarray.length
            tempindex=Math.floor(Math.random()*len)
            arrayforpuzzle[i][2]=tempnumberarray[tempindex]
            tempnumberarray.splice(tempindex,1)
        }
       
        for(let i=0;i<totalboxes;i++){
            checkingarray[i]=arrayforpuzzle[i][2]
        }
        numberofinverse=numberofinversions(checkingarray)
        if(numberofinverse%2!==0){
            actualrandomizer()
        }
        else{
            console.log(arrayforpuzzle)
            console.log(checkingarray)
            console.log(numberofinverse)
            return
        }
        
    }
   
}
let ninverse
let splicingindex

function numberofinversions(anyarray){
    ninverse=0
        for(let i=0;i<anyarray.length;i++){
            if(anyarray[i]==0){
                splicingindex=i
            }
        }
        anyarray.splice(splicingindex,1)
        for(let i=0;i<anyarray.length;i++){
                for(let j=i+1;j<anyarray.length;j++){
                   
                        if(anyarray[i]>anyarray[j]){
                            ninverse+=1
                        }
                    
                   
                }
        }
    return ninverse
}
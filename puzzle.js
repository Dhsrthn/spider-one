const puzzleboard=document.getElementById('puzzle')
swapped=false
let fromindex
let toindex
let temp
let winarray=[]

const randombutton=document.getElementById('pleaserandom')
const solvebutton=document.getElementById('pleasesolve')
let cellHeight,cellWidth
let startingnow=true
let numberpuzzle=true
let imagepuzzletrue=false
let gridlength=3
let arrayofnumbers=[]
let arrayforpuzzle=[]
let starting
let totalboxes
let fontsize
let swaprow,swapcol
const noinpuzzles=document.getElementsByClassName('puzzle-number')
let randomized=false

function main(){
    const puzzleRect = puzzleboard.getBoundingClientRect();
    cellWidth = puzzleRect.width / gridlength;
    cellHeight = puzzleRect.height / gridlength;

    if(numberpuzzle==true){
        if(startingnow){
            randomized=false
            numberpuzzleshow()
        }
        displaypuzzlenumber()    

        
    }

    if(imagepuzzletrue){
        
        if(startingnow){
            randomized=false
            imagepuzzle()
        }
        displayimagepuzzle()
    }

    requestAnimationFrame(main)
}

window.requestAnimationFrame(main)

function numberpuzzleshow(){
    starting=0
    totalboxes=gridlength**2
    puzzleboard.style.gridTemplateColumns = `repeat(${gridlength}, 1fr)`;
    puzzleboard.style.gridTemplateRows = `repeat(${gridlength}, 1fr)`;
    for(let i=0;i<totalboxes;i++){
        if(i==(totalboxes)-1){
            arrayofnumbers[i]=' '
        }
        else{
            arrayofnumbers[i]=i+1
        }
    }
    for(let i=1;i<gridlength+1;i++){
        for(let j=1;j<gridlength+1;j++){
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
        wordelement.style.border='0.1vmin solid black'
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
    if(event.clientX>puzzleRect.left && event.clientX<puzzleRect.left+puzzleRect.width && event.clientY>puzzleRect.top && event.clientY<puzzleRect.top+puzzleRect.height){
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
  if(event.target==solvebutton){
    if(numberpuzzle){
        solvenumberpuzzle()
    }
  }
}

function swap(){
    if(!numberpuzzle){
        for(let i=0;i<totalboxes;i++){
            if(arrayforimage[i][2][1]==0){
                swaprow=arrayforimage[i][0]
                swapcol=arrayforimage[i][1]
                toindex=i

            }
        }
        if(((row==swaprow+1 || row==swaprow-1) && col==swapcol) || (row==swaprow && (col==swapcol+1 || col==swapcol-1) )){
            arrayforimage.forEach((combo)=>{
                if(combo[0]==row && combo[1]==col){
                    fromindex=arrayforimage.indexOf(combo)
                }
            })
            actuallyswap(fromindex,toindex)
        }
        
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

let temparray=[]


function actuallyswap(index1,index2){
    if(numberpuzzle){
        temp=arrayforpuzzle[index1][2]
        arrayforpuzzle[index1][2]=arrayforpuzzle[index2][2]
        arrayforpuzzle[index2][2]=temp
        console.log(winarray,arrayofnumbers)
        for(let i=0;i<totalboxes;i++){
            console.log(arrayforpuzzle[i][2])
            winarray[i]=arrayforpuzzle[i][2]
        }
        if(checkwin(winarray,arrayofnumbers)){
            displaypuzzlenumber()
            if(confirm("Congrats! You've solved the puzzle, Try again")){
                startingnow=0
            }
        }
    }
    if(!numberpuzzle){
        temparray=arrayforimage[index1][2]
        arrayforimage[index1][2]=arrayforimage[index2][2]
        arrayforimage[index2][2]=temparray

        for(let i=0;i<totalboxes;i++){
            winarray[i]=arrayforimage[i][2][1]
        }
        if(checkwin(winarray,referencearray)){
            displayimagepuzzle()
            if(confirm("Congrats! You've solved the puzzle, Try again")){
                startingnow=0
            }
        }
    }   
}

let tempnumberarray=[]
let len
let tempindex
let checkingarray=[]
let numberofinverse
let posforeven
let tempimagearray=[]


function actualrandomizer(){

    if(!numberpuzzle){
        checkingarray=[]
        for(let i=0;i<totalboxes;i++){
            tempimagearray[i]=arrayforimage[i][2]
        }
        for(let i=0;i<totalboxes;i++){
            len=tempimagearray.length
            tempindex=Math.floor(Math.random()*len)
            arrayforimage[i][2]=tempimagearray[tempindex]
            tempimagearray.splice(tempindex,1)
        }
        for(let i=0;i<totalboxes;i++){
            checkingarray[i]=arrayforimage[i][2][1]
        }
        numberofinverse=numberofinversions(checkingarray)
        if(gridlength%2!==0){
            if(numberofinverse%2!==0){
                actualrandomizer()
            }
            else{
                return
            }
        }
        if(gridlength%2==0){
            for(let i=0;i<totalboxes;i++){
                if(arrayforimage[i][2][1]==0){
                    posforeven=gridlength-arrayforimage[i][0]+1
                }
            }
            if((numberofinverse+posforeven)%2==0){
                actualrandomizer()
            }
            else{
                return
            }
        }
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
        if(gridlength%2!==0){
            if(numberofinverse%2!==0){
                actualrandomizer()
            }
            else{
                return
            }
        }
        if(gridlength%2==0){
            for(let i=0;i<totalboxes;i++){
                if(arrayforpuzzle[i][2]==' '){
                    posforeven=gridlength-arrayforpuzzle[i][0]+1  
                }
            }
            if((numberofinverse+posforeven)%2==0){
                actualrandomizer()
            }
            else{
                return
            }
        }
    }
   randomized=true
   console.log(winarray)
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

let initialindex
let inir
let inic
let possibilities=[]
let actualpossible=[]
let checkings=[]
let temporary
let numbersinverse=[]
let reference=[]
let movement=[]
let firstsolve=1

function solvenumberpuzzle(){
    actualpossible=[]
        for(let i=0;i<totalboxes;i++){
            if(arrayforpuzzle[i][2]==' '){
                initialindex=i
                inir=arrayforpuzzle[i][1]
                inic=arrayforpuzzle[i][0]
            }
        }
        possibilities[0]=[inic+1,inir]
        possibilities[1]=[inic-1,inir]
        possibilities[2]=[inic,inir+1]
        possibilities[3]=[inic,inir-1]

        for(let i=0;i<totalboxes;i++){
            for(let j=0;j<4;j++){
               if(arrayforpuzzle[i][0]==possibilities[j][0] && arrayforpuzzle[i][1]==possibilities[j][1]){
                    actualpossible.push(i)
               }
            }
        }
        for(i=0;i<actualpossible.length;i++){
            checkings.push([])
            reference.push([])
        }

        for(let i=0;i<actualpossible.length;i++){
            for(let j=0;j<totalboxes;j++){
                checkings[i].push([arrayforpuzzle[j][2]])
            }
        }
        for(let i=0;i<actualpossible.length;i++){
            temporary=checkings[i][initialindex]
            checkings[i][initialindex]=checkings[i][actualpossible[i]]
            checkings[i][actualpossible[i]]=temporary
        }
        for(let i=0;i<checkings.length;i++){
            numbersinverse[i]=numberofinversions(checkings[i])
            reference[i]=[i,numbersinverse[i],actualpossible[i]]
            
        }
        reference.sort((a,b)=> b[0]-a[0])

        if(firstsolve==1){
            actuallyswap(initialindex,actualpossible[0])
            movement.push([initialindex,actualpossible[0]])
            firstsolve=0
        }
        
        if(movement.includes([initialindex,actualpossible[0]])){
            actuallyswap(initialindex,actuallyswap[1])
            movement.push([initialindex,actualpossible[1]])
        }
        else{
            actuallyswap(initialindex,actualpossible[0])
            movement.push([initialindex,actualpossible[0]])
        }
        
}

let imagearray=[]
let originaldimension
let remainder
let floorvalue
let arrayforimage=[]
let imagesrc
let referencearray=[]

function imagepuzzle(){

    starting=0
    const puzzleRect = puzzleboard.getBoundingClientRect();
    totalboxes=gridlength**2
    puzzleboard.style.gridTemplateColumns = `repeat(${gridlength}, 1fr)`;
    puzzleboard.style.gridTemplateRows = `repeat(${gridlength}, 1fr)`;
   
    puzzleboard.style.background='none';
    for(let i=0;i<totalboxes;i++){
        imagearray.push([])
    }

    for(let i=0;i<totalboxes;i++){
    
        if(i!=totalboxes-1){
            imagearray[i]=document.createElement('div')
            imagearray[i].style.backgroundImage=`url(${imagesrc})`
            imagearray[i].style.backgroundSize= `${puzzleRect.width}px ${puzzleRect.height}px`
            remainder=(i%gridlength)
            floorvalue=Math.floor(i/gridlength)
            imagearray[i].style.backgroundPosition=100/(gridlength-1)*(remainder)+'% '+100/(gridlength-1)*(floorvalue)+'%' 
            imagearray[i].style.backgroundRepeat = "no-repeat";
            referencearray[i]=i+1
        }
        else{
            imagearray[i]=document.createElement('div')
            imagearray[i].style.backgroundImage="url('files/empty.png')"
            referencearray[i]=0
        }
        

    }
    
    for(let i=1;i<gridlength+1;i++){
        for(let j=1;j<gridlength+1;j++){
            if(!(i==gridlength && j==gridlength)){
                arrayforimage[starting]=[i,j,[imagearray[starting],starting+1]]
            }
            else{
                arrayforimage[starting]=[i,j,[imagearray[starting],0]]
            }
            starting=starting+1
        }

    }

    displayimagepuzzle()
    startingnow=false
    
}

function displayimagepuzzle(){
    puzzleboard.innerHTML='';
    for(let i=0;i<totalboxes;i++){
        arrayforimage[i][2][0].style.gridColumnStart=arrayforimage[i][1]
        arrayforimage[i][2][0].style.gridRowStart=arrayforimage[i][0]
        puzzleboard.appendChild(arrayforimage[i][2][0])
    }
}

const imageupload=document.getElementById('imageInput')
const Urlinput = document.getElementById('linkInput')

imageupload.addEventListener('change',function(){
    const file=this.files[0]
    const reader=new FileReader()
    
    reader.onload=function(e){
        imagesrc=e.target.result   
        console.log(imagesrc)
        startingnow=true
        numberpuzzle=false
        imagepuzzletrue=true
    }
    
    reader.readAsDataURL(file)

    
})

Urlinput.addEventListener('change',function(){

    imagesrc=this.value
    startingnow=true
    numberpuzzle=false
    imagepuzzletrue=true
 
})

const enterbutton=document.getElementById('enter')
const gridinputtag=document.getElementById('gridinput')

enterbutton.addEventListener('click',function(){
    const inputValue = gridinputtag.value
    gridlength=Number(inputValue)
    startingnow=true
    if(numberpuzzle){
        arrayforpuzzle=[]
        arrayofnumbers=[]
        starting=0
    }
    if(imagepuzzle){
        arrayforimage=[]
        imagearray=[]
        starting=0
    }
})
   
function checkwin(array1,array2){
    if(array1.length==0){
        return false
    }
    for(let i=0;i<array1.length;i++){
        if(array1[i]!==array2[i]){
            return false
        }
    }
    return true
}
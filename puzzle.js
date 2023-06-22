const puzzleboard=document.getElementById('puzzle')
swapped=false
let fromindex
let toindex
let temp
let winarray=[]
const randombutton=document.getElementById('pleaserandom')
const solvebutton=document.getElementById('pleasesolve')
const savebutton=document.getElementById('savestate')
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

    if(numberpuzzle){
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
    totalboxes=gridlength**2
    const puzzleRect = puzzleboard.getBoundingClientRect();
    puzzleboard.innerHTML = '';
    puzzleboard.style.background='none'
    puzzleboard.style.boxShadow='0 10px 10px rgba(0,0,0,0.3)'
    puzzleboard.style.gridTemplateColumns = `repeat(${gridlength}, 1fr)`;
    puzzleboard.style.gridTemplateRows = `repeat(${gridlength}, 1fr)`;
    for(let i=0;i<totalboxes;i++){
        const wordelement = document.createElement('div')
        wordelement.style.gridColumnStart=arrayforpuzzle[i][1]
        wordelement.style.gridRowStart=arrayforpuzzle[i][0]
        wordelement.style.backgroundSizee= `${puzzleRect.width}px ${puzzleRect.height}px`
        wordelement.style.border='0.25vmin solid black'
        wordelement.innerHTML=arrayforpuzzle[i][2]
        wordelement.classList.add('puzzle-number')
        wordelement.classList.add('puzzle-cell')
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
  if(event.target==savebutton){
    savestate()
  }
  
  if(event.target==solvebutton){
    if(numberpuzzle){
       // solvenumberpuzzle()
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
        winarray=[]
        temp=arrayforpuzzle[index1][2]
        arrayforpuzzle[index1][2]=arrayforpuzzle[index2][2]
        arrayforpuzzle[index2][2]=temp
        for(let i=0;i<totalboxes;i++){
            winarray[i]=arrayforpuzzle[i][2]
        }
        if(checkwin(winarray,arrayofnumbers)){
            displaypuzzlenumber()
            if(confirm("Congrats! You've solved the puzzle, Play again")){
                startingnow=0
            }
        }

    }
    if(!numberpuzzle){
        winarray=[]
        temparray=arrayforimage[index1][2]
        arrayforimage[index1][2]=arrayforimage[index2][2]
        arrayforimage[index2][2]=temparray

        for(let i=0;i<totalboxes;i++){
            winarray[i]=arrayforimage[i][2][1]
        }
        if(checkwin(winarray,referencearray)){
            displayimagepuzzle()
            if(confirm("Congrats! You've solved the puzzle, Play again")){
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


let imagearray=[]
let originaldimension
let remainder
let floorvalue
let arrayforimage=[]
let imagesrc
let referencearray=[]

function imagepuzzle(){
    arrayforimage=[]
    imagearray=[]
    starting=0
    const puzzleRect = puzzleboard.getBoundingClientRect();
    totalboxes=gridlength**2
    puzzleboard.style.gridTemplateColumns = `repeat(${gridlength}, 1fr)`;
    puzzleboard.style.gridTemplateRows = `repeat(${gridlength}, 1fr)`;
    
    puzzleboard.style.backgroundImage='none';
    for(let i=0;i<totalboxes;i++){
        imagearray.push([])
    }

    for(let i=0;i<totalboxes;i++){
    
        if(i!=totalboxes-1){
           
            imagearray[i]=document.createElement('div')
            imagearray[i].classList.add('puzzleimages')
            imagearray[i].style.backgroundImage=`url(${imagesrc})`
            imagearray[i].style.backgroundSize= `${puzzleRect.width}px ${puzzleRect.height}px`
            imagearray[i].style.border='0.25vmin solid black'
            imagearray[i].innerHTML=`${i+1}`
            imagearray[i].style.fontSize=`${puzzleRect.width/15}px`
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
    if(loaded){
        for (let i=0;i<totalboxes;i++){
            if(updateindexarray[i]!==0){
                arrayforimage[i][2]=[imagearray[updateindexarray[i]-1],updateindexarray[i]]
            }
            else{
                arrayforimage[i][2]=[imagearray[totalboxes-1],0]
            }
        }
        loaded=false
    }

    displayimagepuzzle()
    startingnow=false
}

function displayimagepuzzle(){
    const puzzleRect = puzzleboard.getBoundingClientRect();
    puzzleboard.innerHTML='';
    puzzleboard.style.boxShadow='0 10px 10px rgba(0,0,0,0.3)'
    puzzleboard.style.backgroundImage=`url(${imagesrc})`
    puzzleboard.style.backgroundSize= `${puzzleRect.width}px ${puzzleRect.height}px`
    for(let i=0;i<totalboxes;i++){
        imagearray[i].style.fontSize=`${puzzleRect.width/15}px`
    }
    for(let i=0;i<totalboxes;i++){

        arrayforimage[i][2][0].style.backgroundSize= `${puzzleRect.width}px ${puzzleRect.height}px`
        arrayforimage[i][2][0].style.gridColumnStart=arrayforimage[i][1]
        arrayforimage[i][2][0].style.gridRowStart=arrayforimage[i][0]

       
        if(arrayforimage[i][2][1]==0){
            arrayforimage[i][2][0].style.background='rgba(0,0,0,0.70)'
            arrayforimage[i][2][0].style.border='0.3vmin solid red'
        }
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
        startingnow=true
        numberpuzzle=false
        imagepuzzletrue=true
        loaded=false
    }
    
    reader.readAsDataURL(file)

    
})

Urlinput.addEventListener('change',function(){
    imagesrc=this.value
    startingnow=true
    numberpuzzle=false
    imagepuzzletrue=true
    loaded=false
})

const enterbutton=document.getElementById('enter')
const gridinputtag=document.getElementById('gridinput')

enterbutton.addEventListener('click',function(){
    const inputValue = gridinputtag.value
    if(Number(inputValue)>2){
        gridlength=Number(inputValue)
        startingnow=true
        if(numberpuzzle){
            arrayforpuzzle=[]
            arrayofnumbers=[]
            starting=0
            startingnow=true
        }
        if(imagepuzzletrue){
            startingnow=true
            starting=0
        }
    }
    else[
        alert('Enter value more than 2')
    ]
    
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

function solvepuzzle(){
 //to be filled soon ;-;
}

let tempsavearray=[]
let tempindexarray=[]

function savestate(){
    if(numberpuzzle){
        tempsavearray=[]
        tempsavearray.push(0)
        tempsavearray.push(arrayofnumbers)
        tempsavearray.push(arrayforpuzzle)
        tempsavearray.push(gridlength)
        savedarray.push(tempsavearray)
        localStorage.setItem(hai,JSON.stringify(savedarray))
    }
    
    else{
        tempsavearray=[]
        tempsavearray.push(1)
        tempsavearray.push(btoa(imagesrc))
        for(let i=0;i<totalboxes;i++){
            tempindexarray[i]=arrayforimage[i][2][1]
        }
        tempsavearray.push(tempindexarray)
        tempsavearray.push(gridlength)
        savedarray.push(tempsavearray)
        localStorage.setItem(hai,JSON.stringify(savedarray))
    }
    alert('Saved currrent state')
}

let updateindexarray=[]

let displaysave=[]

function displaysaved(){
   
    getsavedarray()
    document.getElementById('sidenav').innerHTML=''
    displaysave=[]
    const linkelement=document.createElement('a')
    linkelement.href="javascript:void(0)"
    const timesSymbol = document.createTextNode('\u00D7');
    linkelement.appendChild(timesSymbol);
    linkelement.onclick=function(){
         closeNav()
    }
    linkelement.classList.add('closebtn')
    document.getElementById('sidenav').appendChild(linkelement)
    const defaultelement=document.createElement('div')
    defaultelement.classList.add('navitems')
    defaultelement.innerText='Default 3*3'
    defaultelement.addEventListener('click',function(){
        startingnow=true
        arrayforpuzzle=[]
        arrayofnumbers=[]
        gridlength=3
        numberpuzzle=true
        imagepuzzletrue=false
        closeNav()
    })
    document.getElementById('sidenav').appendChild(defaultelement)
    if(savedarray.length==0){
    const text=document.createElement('div')
    text.innerHTML='Your saved puzzles appear here'
    text.classList.add('navitems')
    document.getElementById('sidenav').appendChild(text)
    }
    if(savedarray.length!=0){
        for (let i=0;i<savedarray.length;i++){
            displaysave.push([])
            displaysave[i]=document.createElement('div')
            displaysave[i].classList.add('navitems')
            displaysave[i].style.border='0.1vmin solid black'
            if(savedarray[i][0]==0){
                displaysave[i].innerHTML=`Save ${i+1} (Number ${savedarray[i][3]}*${savedarray[i][3]}) `
            }
            else{
                displaysave[i].innerHTML=`Save ${i+1} (Image ${savedarray[i][3]}*${savedarray[i][3]})`
            }
          
            document.getElementById('sidenav').appendChild(displaysave[i])
            displaysave[i].addEventListener('click',function(){
                
                if(savedarray[i][0]==0){
                    arrayofnumbers=savedarray[i][1]
                    arrayforpuzzle=savedarray[i][2]
                    gridlength=savedarray[i][3]
                    numberpuzzle=true
                    imagepuzzletrue=false
                    startingnow=false
                    closeNav()
                }
                if(savedarray[i][0]==1){
                    updateindexarray=[]
                    imagesrc=atob(savedarray[i][1])
                    updateindexarray=savedarray[i][2]
                    gridlength=savedarray[i][3]
                    numberpuzzle=false
                    imagepuzzletrue=true
                    startingnow=false
                    loaded=true
                    imagepuzzle()
                    closeNav()
                }
            })
        }
    }
}

let loaded=false

function openNav(){
    document.getElementById('sidenav').style.width='70vmin'
    displaysaved()
}

function closeNav(){
    document.getElementById("sidenav").innerHTML=''
    sidenav.style.width = "0";
}

let val1
const hai='stringtosave'
let savedarray=[]

function getsavedarray(){
    
    val1= localStorage.getItem(hai)
    if(val1==null){
        savedarray=[]
    }
    else{
        savedarray=JSON.parse(val1)
    }

}

let priorityarray=[]

function solvefunction(){
    priorityarray=[]
}

class gridstate{
    constructor(puzzlestate,gridlen,called,moves) {
        this.arraygame=puzzlestate
        this.gridlen=gridlen
        this.goalstate=[]
        this.setgoalstate=0
        this.gridsize=gridlen*gridlen
        this.called=called
        this.moves=moves
    }

    solve(){
        this.requiredinfo=[]
        if(this.setgoalstate==0){
            this.starting=1
            for(let i=1;i<this.gridlen+1;i++){
                for(let j=1;j<this.gridlen+1;j++){
                    if(!(i==this.gridlen && j==this.gridlen)){
                        this.goalstate.push([i,j,this.starting])
                        this.starting++
                    }else{
                        this.goalstate.push([i,j,0])
                    }
                }
            }
        }
        this.hamilton()
        this.requiredinfo.push([this.arraygame],this.hamiltonval,this.moves)
        priorityarray.push(this.requiredinfo)
        this.generatenew()
    }
    
    hamilton(){
        this.hamiltonval=0
        for(let i=0;i<this.gridsize;i++){
            if(this.arraygame[i][2]!==this.goalstate[i][2]){
                this.hamiltonval++
            }
        }
        this.hamiltonval=this.hamiltonval+this.called
    }
    
    possibleways(){
        this.possibledirections=[]
        for(let i=0;i<this.gridsize;i++){
            if(this.arraygame[i][2]==0){
                this.emptypos=i
            }
        }
        if(this.arraygame[this.emptypos][0]+1<=this.gridlen){
            this.possibledirections.push([this.arraygame[this.emptypos][0]+1,this.arraygame[this.emptypos]][1])
        }
        if(this.arraygame[this.emptypos][0]-1<=this.gridlen){
            this.possibledirections.push([this.arraygame[this.emptypos][0]-1,this.arraygame[this.emptypos][1]])  
        }
        if(this.arraygame[this.emptypos][1]+1<=this.gridlen){
            this.possibledirections.push([this.arraygame[this.emptypos][0],this.arraygame[this.emptypos][1]+1])  
        }
        if(this.arraygame[this.emptypos][1]-1<=thss.gridlen){
            this.possibledirections.push([this.arraygame[this.emptypos][0],this.arraygame[this.emptypos][1]-1])  
        }
    }
    generatenew(){
        for(let i=0;i<this.possibledirections;i++){
            this.temppassarray=this.arraygame
            for(let j=0;j<this.gridsize;j++){
                if(this.possibledirections[i][0]==this.temppassarray[j][0] && this.possibledirections[i][1]==this.temppassarray[j][1]){
                    this.swapper(i,this.emptypos,this.temppassarray)
                    this.moves.push(i,this.emptypos)
                    new gridstate(this.temppassarray,this.gridlen,this.called+1,this.moves)
                }
               
            }
            
        }
    }
    swapper(index1,index2,array){
        this.temp=array(index1)
        array(index1)=array(index2)
        array(index2)=this.temp
    }
}
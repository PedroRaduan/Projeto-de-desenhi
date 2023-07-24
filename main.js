const opcoes = ['line', 'rain', 'beach', 'grass', 'smiley_face', 'hurricane', 'stitches', 'chandelier'];

var indiceAleatorio = Math.floor(Math.random() * opcoes.length);
var Desenhar = opcoes[indiceAleatorio];
document.getElementById('tem').innerHTML = Desenhar;

var segundos = 0;
var pont = 0;
function atualizarSegundos() {
    segundos++;
    document.getElementById('tempo').innerHTML = 'Tempo ' + segundos + ' s';
}

// Executa a função 'atualizarSegundos' a cada 1000 milissegundos (1 segundo)
const intervalo = setInterval(atualizarSegundos, 1000);


function setup(){
    canvas = createCanvas(600, 600);   
    background('white')
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
    canvas.position(650, 250);
}


function limpar(){
    background('white');
}

function draw(){
    strokeWeight(10);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY); 
    }
}

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}


function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById('des').innerHTML =  results[0].label;
        document.getElementById('pre').innerHTML = Math.round(results[0].confidence * 100) + '%';
        
        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);

        if(Desenhar == document.getElementById('des').innerHTML){
             indiceAleatorio = Math.floor(Math.random() * opcoes.length);
             Desenhar = opcoes[indiceAleatorio];
             document.getElementById('tem').innerHTML = Desenhar;
             console.log('oi');
             pont ++;
             document.getElementById('pont').innerHTML = 'pontuação ' + pont;
        }
    }
}

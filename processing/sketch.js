let fontHora;
let fontData;
let imgOvni;
let imgVaca;
let posicaoVaca = 0;
let ondulacao = 0;
let particulas = [];

function preload() {
    fontData = loadFont('Exo2-VariableFont_wght.ttf');
    fontHora = loadFont('Square.ttf');
    imgOvni = loadImage('ovni.svg');
    imgVaca = loadImage('vaca.svg');
}

function setup() {
    var myCanvas = createCanvas(450, 450);
    myCanvas.parent("p5Canvas");
    pixelDensity(2);
    
    // Criar partículas iniciais
    for (let i = 0; i < 15; i++) {
        let y = random(200, 450);
        let larguraRaio = map(y, 150, 450, 80, 260);
        let centroX = 290;
        
        particulas.push({
            x: random(centroX - larguraRaio/2, centroX + larguraRaio/2),
            y: y,
            tamanho: random(2, 5),
            velocidade: random(1, 3)
        });
    }
}

function draw() {
    background(180, 140, 220);
    
    // Data REAL
    fill('#242C3D');
    textFont(fontData);
    textSize(28);
    textAlign(LEFT, TOP);
    
    let diasSemana = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let diaSemana = diasSemana[day() % 7];
    let mes = meses[month() - 1];
    let dia = day();
    
    let dataTexto = diaSemana + ' ' + mes + ' ' + dia;
    
    text(dataTexto, 30, 30);
    
    // Hora REAL
    fill('#242C3D');
    textFont(fontHora);
    textSize(65);
    textAlign(LEFT, TOP);
    
    let h = hour();
    let m = minute();
    let horaTexto = nf(h, 2) + ':' + nf(m, 2);
    
    text(horaTexto, 30, 55);
    
    // --- BOLINHAS BRANCAS ---
    fill(255);
    noStroke();
    
    circle(215, 200, 15);
    circle(210, 220, 10);
    circle(167, 380, 15);
    circle(160, 410, 10);
    
    circle(353, 170, 10);
    circle(380, 260, 15);
    circle(420, 420, 10);
    
    // --- ANIMAÇÃO DA VACA ---
    posicaoVaca += 0.01;
    let offsetY = sin(posicaoVaca) * 60;
    let vacaY = 320 + offsetY;
    
    // --- COR DO RAIO ---
    let vermelho = color(255, 106, 106);
    let amarelo = color(255, 217, 102);
    let verde = color(107, 227, 140);
    
    let corRaio;
    let t = map(offsetY, -60, 60, 0, 1);
    
    if (t < 0.5) {
        corRaio = lerpColor(vermelho, amarelo, t * 2);
    } else {
        corRaio = lerpColor(amarelo, verde, (t - 0.5) * 2);
    }
    
    // --- ONDULAÇÃO ---
    ondulacao += 0.02;
    let onda1 = sin(ondulacao) * 4;
    let onda2 = sin(ondulacao + PI) * 4;
    
    // --- RAIO DE ABDUÇÃO ---
    fill(corRaio);
    noStroke();
    beginShape();
    vertex(240 + onda1, 150);
    vertex(340 + onda2, 150);
    vertex(420, 450);
    vertex(160, 450);
    endShape(CLOSE);
    
    // --- BRILHO NAS BORDAS ---
    fill(red(corRaio), green(corRaio), blue(corRaio), 100);
    beginShape();
    vertex(240 + onda1, 150);
    vertex(230 + onda1, 150);
    vertex(150, 450);
    vertex(160, 450);
    endShape(CLOSE);
    
    beginShape();
    vertex(340 + onda2, 150);
    vertex(350 + onda2, 150);
    vertex(430, 450);
    vertex(420, 450);
    endShape(CLOSE);
    
    // --- PARTÍCULAS SUBINDO ---
    fill(255, 255, 255, 200);
    noStroke();
    for (let p of particulas) {
        circle(p.x, p.y, p.tamanho);
        
        // Subir partícula
        p.y -= p.velocidade;
        
        // Se sair do topo, recriar embaixo ESPALHADO
        if (p.y < 150) {
            p.y = 450;
            // Espalhar bem embaixo (largura total da base do raio)
            p.x = random(180, 400);
        }
    }
    
    // OVNI
    imageMode(CENTER);
    image(imgOvni, 290, 100, 260, 130);
    
    // VACA
    image(imgVaca, 286, vacaY, 150, 150);
    
    // --- STRESS LEVEL ---
    push();
    translate(412, 350);
    rotate(radians(75));
    fill('#242C3D');
    textFont(fontHora);
    textSize(18);
    textAlign(CENTER);
    text('STRESS LEVEL', 0, 0);
    pop();
}
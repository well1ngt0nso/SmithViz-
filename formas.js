// ===========  FUNC CÍRCULOS ===========


function generateCircle2(cx, cy, r, con, point, svg_) {
    // 1) Cria o elemento
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    // 2) Dá um id (pode gerar automático se quiser)
    const id = `ec-${point.length}`; // gera automático 
    circle.setAttribute("id", id);

    // 3) Atributos visuais — valores dentro do tamanho do SVG
    circle.setAttribute("cx", cx); // centro X
    circle.setAttribute("cy", cy); // centro Y
    circle.setAttribute("r", r); // raio
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", con); // contorno para ficar evidente
    //circle.setAttribute("stroke-dasharray", "150 628.32"); // contorno para ficar evidente  

    circle.setAttribute("stroke-width", 1);

    // 4) Adiciona ao SVG
    svg_.appendChild(circle);

    // 5) Guarda o id
    point.push(id);

}


// ===========  FUNC CÍRCULOS ===========

function generateCircle(cx, cy, r, con, point, svg_, espessura = 0.5) {
    // 1) Cria o elemento
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    // 2) Dá um id (pode gerar automático se quiser)
    const id = `ec-${point.length}`; // gera automático 
    circle.setAttribute("id", id);

    // 3) Atributos visuais — valores dentro do tamanho do SVG
    circle.setAttribute("cx", cx); // centro X
    circle.setAttribute("cy", cy); // centro Y
    circle.setAttribute("r", r); // raio
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", con); // contorno para ficar evidente
    circle.setAttribute("stroke-width", espessura);

    // 4) ADICIONA AO LOCAL CORRETO (Compatível com antes e depois do svg-pan-zoom)
    const viewport = svg_.querySelector('.svg-pan-zoom_viewport');
    
    if (viewport) {
        // Se o svg-pan-zoom já foi inicializado (ex: cliques posteriores), 
        // joga direto no grupo que se movimenta.
        viewport.appendChild(circle);
    } else {
        // Se ainda está rodando antes do svg-pan-zoom, joga no SVG raiz.
        // A biblioteca vai absorver tudo isso automaticamente quando iniciar.
        svg_.appendChild(circle);
    }

    // 5) Guarda o id
    point.push(id);
    return id;
}






// =========== FUNC QUADRADOS =============

function generateSquare(cx, cy, point, svg_) {
    const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    const id = `eq-${point.length}`;
    square.setAttribute("id", id);

    const size = 40; // Tamanho do lado do quadrado

    // Para centralizar o quadrado no ponto (cx, cy)
    square.setAttribute("x", cx - size / 2);
    square.setAttribute("y", cy - size / 2);
    square.setAttribute("width", size);
    square.setAttribute("height", size);
    square.setAttribute("rx", 10);
    square.setAttribute("ry", 10);
    square.setAttribute("fill", "none");
    square.setAttribute("stroke", "black");
    square.setAttribute("stroke-width", 1);

    svg_.appendChild(square);
    point.push(id);
}



// =========== FUNC POLYGONOS=============

function generatePolygon(cx, cy, point, svg_) {
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

    const id = `ep-${point.length}`;
    polygon.setAttribute("id", id);

    const size = 40; // tamanho do quadrado
    const half = size / 2;

    // Pontos do quadrado (x1,y1 x2,y2 ...)
    const points = [
        [cx - half, cy - half], // canto superior esquerdo
        [cx + half, cy - 9], // canto superior direito
        [cx + half, cy + half], // canto inferior direito
        [cx - half, cy + half] // canto inferior esquerdo
    ];

    // Transformando em string "x1,y1 x2,y2 x3,y3 x4,y4"
    const pointsStr = points.map(p => p.join(",")).join(" ");
    polygon.setAttribute("points", pointsStr);

    polygon.setAttribute("fill", "none");
    polygon.setAttribute("stroke", "blue");
    polygon.setAttribute("stroke-width", 1);

    svg_.appendChild(polygon);
    point.push(id);
}


// =========== FUNC TEXT =============

function generateTexto(x, y, ids_, svg_) {
    const textt = document.createElementNS("http://www.w3.org/2000/svg", "text");

    const id = `et-${ids_.length}`;
    textt.setAttribute("id", id);

    const font_size = 40; // tamanho do texto

    textt.setAttribute("x", x);
    textt.setAttribute("y", y);

    //polygon.setAttribute("fill", "none");
    textt.setAttribute("font-size", "40");
    //polygon.setAttribute("stroke-width", 1);
    //textt.textContent = "testedsasad";

    svg_.appendChild(textt);
    ids_.push(id);
}

//generateTexto(30, 30, ids_texto);
//generateTexto(60, 30, ids_texto);



// ===========  FUNC ARC ===========

function generate_arcle(cx, cy, cx2, cy2,  p, cor, ids_, inverter, svg_) {
    // 1) Cria o elemento
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    // 2) Dá um id (pode gerar automático se quiser)
    const id = `ec-${ids_.length}`; // gera automático 
    path.setAttribute("id", id);

    // 3) Atributos visuais — valores dentro do tamanho do SVG
    //path.setAttribute( "d",`M  550 0 A ${generate_p(1)} ${generate_p(1)} 0 0 0 950 400` );
    path.setAttribute( "d",`M  ${cx}  ${cy} A ${p} ${p} 0 0 ${inverter} ${cx2} ${cy2}` );

    //path.setAttribute("stroke-dasharray", "150 40.32"); // contorno para ficar evidente  

    path.setAttribute("fill", "none");  
    path.setAttribute("stroke", cor);
    path.setAttribute("stroke-width", 0.5);
    



    // 4) Adiciona ao SVG
    svg_.appendChild(path);

    // 5) Guarda o id
    ids_.push(id);

}

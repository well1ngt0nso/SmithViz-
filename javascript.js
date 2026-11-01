
// roda quando o DOM estiver pronto (porque usamos "defer" no <script>)
document.addEventListener('DOMContentLoaded', () => {
    const ZR0 = document.getElementById('resistencia1');
    const ZC0 = document.getElementById('reatancia1');
    
    const ZR2 = document.getElementById('resistencia2');
    const ZC2 = document.getElementById('reatancia2');
    const btnGerar= document.getElementById('btn-gerar');

    /*   cria SVG   */
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');


   /* ───────────
    2. Desenhar
    ─────────── */

    var ids_points = []; //neurônios
    // O "banco" de dados na memória do navegador (Array de objetos)
    let listaDePontos = [
        {
            id: "1", 
            name: "z0",// Identificador único para não misturar
            re: 0.88,
            im: 0.47,
            re_n: 0,
            im_n: 0,
            especificacoes: {
                cor: "blue",
                ativo: true,
                raio: 2,
            }
        }
];


// 1. Adicionando um ponto novo criado pelo usuário
//adicionarPonto(1.2, 0.5, 1.2, 0.5, { cor: "blue", ativo: "true", raio: 2 }, listaDePontos);

// 2. Pegando as características do ponto recém-criado (vamos supor que conhecemos o ID ou pegamos o último)
let ultimoPonto = listaDePontos[listaDePontos.length - 1];
pegarPontoPorId(ultimoPonto.id, listaDePontos);

// 3. Apagando aquele ponto específico
apagarPonto(ultimoPonto.id, listaDePontos);




    desenharRede(svg, svgNS);




    /*  
     Botão "Adicionar ponto"
     */
    btnGerar.addEventListener('click', () => {

        // ───────────
       //  1. Coletar dados
       //  ─────────── 
        //const entradas = parseInt(entradasInp.value, 10) || 0;
        //const saidas   = parseInt(saidasInp.value,   10) || 0;
        const ZR2_= parseInt(ZR2.value, 10) || 0;
        const ZC2_= parseInt(ZC2.value, 10) || 0;
        const ZR0_= parseInt(ZR0.value, 10) || 0;

        plot_point("zt", ZR2_, ZC2_, ZR0_, ids_points, svg, "gray", listaDePontos);
       
    }); 
/*
// Substitua a função salvarArquivoJson antiga por esta que fala com o Python:
async function salvarNoServidorPython(dadosObj) {
    try {
        let resposta = await fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosObj, null, 4)
        });

        if (resposta.ok) {
            console.log("Sucesso! O points.json foi atualizado direto na pasta.");
        } else {
            console.error("Erro ao salvar no servidor Python.");
        }
    } catch (erro) {
        console.error("Erro de conexão com o servidor:", erro);
    }
}

// 1. Função para carregar e mexer no JSON
async function atualizarJson() {
    try {
        // Puxa o seu arquivo .json
        let resposta = await fetch('points.json');
        let dados = await resposta.json();

        // 2. Modifica ou adiciona o que você quiser
        dados.suaNovaChave = "Valor novo adicionado pelo JS!";
        dados.ultimaAtualizacao = new Date().toLocaleDateString();

        console.log("Dados atualizados na memória:", dados);

        // 3. Em vez de chamar a função de download, chama a que envia pro Python salvar na pasta:
        await salvarNoServidorPython(dados);

    } catch (erro) {
        console.error("Erro ao ler o JSON:", erro);
    }
}

atualizarJson();
 
*/
});

function desenharRede(svg, svgNS) {


    const wrapper = document.getElementById('network-wrapper');
    wrapper.innerHTML = '';

    /* ─── dimensões do SVG ─── */
    const wSVG = 1200
    const hSVG = 1000
    //console.log(svg);

    svg.setAttribute('width', wSVG);
    svg.setAttribute('height', hSVG);

    svg.style.border = '1px solid #ccc';
    wrapper.appendChild(svg);

    const gerar = document.getElementById('generate');

    // dimensão div pai
    gerar.style.height = (hSVG + 200) + "px";


    var ids = []; //neurônios
    const ids_img = []; 


    //Plota os circulos das partes reais
    function plot_circles_r(){ //plotagem de circulos reais

        var colors = "blue";
        generateArrow(200, y_center, 900, y_center, r = 0); // gerar eixo x
        generateArrow(x_center, 690,x_center, 2, r = 0); //gerar eixo y
        generateCircle(x_center, y_center, px_raio, "black", ids , svg); //gerar contorno circle == 1
        generateCircle(x_center, y_center, 5, "gray", ids , svg); //MARCAÇÃO CENTRLAL


        generateCircle(generate_x(0.1),  y_center, generate_r(0.1),  colors, ids, svg);
        generateCircle(generate_x(0.2),  y_center, generate_r(0.2),  colors, ids, svg);
        generateCircle(generate_x(0.3),  y_center, generate_r(0.3),  colors, ids, svg);
        generateCircle(generate_x(0.4),  y_center, generate_r(0.4),  colors, ids, svg);
        generateCircle(generate_x(0.5),  y_center, generate_r(0.5),  colors, ids, svg);
        generateCircle(generate_x(0.6),  y_center, generate_r(0.6),  colors, ids, svg);
        generateCircle(generate_x(0.7),  y_center, generate_r(0.7),  colors, ids, svg);
        generateCircle(generate_x(0.8),  y_center, generate_r(0.8),  colors, ids, svg);
        generateCircle(generate_x(0.9),  y_center, generate_r(0.9),  colors, ids, svg);
        generateCircle(generate_x(1,0),  y_center, generate_r(1.0),  colors, ids, svg);
        generateCircle(generate_x(1.2),  y_center, generate_r(1.2),  colors, ids, svg);
        generateCircle(generate_x(1.4),  y_center, generate_r(1.4),  colors, ids, svg);
        generateCircle(generate_x(1.6),  y_center, generate_r(1.6),  colors, ids, svg);
        generateCircle(generate_x(1.8),  y_center, generate_r(1.8),  colors, ids, svg); 
        generateCircle(generate_x(2.0),  y_center, generate_r(2.0),  colors, ids, svg); 
        generateCircle(generate_x(3.0),  y_center, generate_r(3.0),  colors, ids, svg); 
        generateCircle(generate_x(5.0),  y_center, generate_r(5.0),  colors, ids, svg);
        generateCircle(generate_x(11.0), y_center, generate_r(11.0), colors, ids, svg); 

    }
    plot_circles_r();

    function plot_circles_x(){
    
    //generateCircle(generate_x2(1), y_center - generate_p(1), generate_p(1), colors_x, ids); 
    //generateCircle(generate_x2(3), y_center - generate_p(3), generate_p(3), colors_x, ids); 
    //generateCircle(generate_x2(2), y_center - generate_p(2), generate_p(2), colors_x, ids); 
    //generateCircle(generate_x2(1.5), y_center - generate_p(1.5), generate_p(1.5), colors_x, ids); 
    //generateCircle(generate_x2(0.5), y_center - generate_p(0.5), generate_p(0.5), colors_x, ids); 



    }
    plot_circles_x();

    //Plota os arcos das partes imaginarias
    function plot_arc_x(){

    for(var i = 0.2; i <= 2; i+= 0.2){

       var point1 =  point_initial_arc(i * 50, 50);
     generate_arcle(point1.re*px_raio +x_center,  point1.im * px_raio +y_center, px_raio + x_center, y_center, generate_p(i ), "red",ids_img, 0, svg )
       generate_arcle(point1.re*px_raio +x_center,  -point1.im * px_raio +y_center, px_raio + x_center, y_center, generate_p(i ), "red",ids_img, 1, svg)
       
    }
    

    //generate_arcle(550, -px_raio + y_center, px_raio + x_center, y_center, generate_p(1), "red",ids, 0)
    //generate_arcle(550, px_raio + y_center, px_raio + x_center, y_center, generate_p(1), "red",ids, 1)

    var point1 =  point_initial_arc(150, 50);
    generate_arcle(point1.re*px_raio +x_center,  point1.im * px_raio +y_center, px_raio + x_center, y_center, generate_p(3), "red",ids_img, 0, svg)
    generate_arcle(point1.re*px_raio +x_center,  -point1.im * px_raio +y_center, px_raio + x_center, y_center, generate_p(3), "red",ids_img, 1,svg)

    var point2=  point_initial_arc(200, 50);
    generate_arcle(point2.re*px_raio +x_center,  point2.im * px_raio +y_center, px_raio + x_center, y_center, generate_p(4), "red",ids_img, 0, svg)
    generate_arcle(point2.re*px_raio +x_center,  -point2.im * px_raio +y_center, px_raio + x_center, y_center, generate_p(4), "red",ids_img, 1, svg)
    }
    plot_arc_x();


    // Função para criar o marcador, com refX = largura do marcador (10)
    function createArrowMarker() {
        const defs = document.createElementNS(svgNS, 'defs');
        const marker = document.createElementNS(svgNS, 'marker');
        marker.setAttribute('id', 'arrowhead');
        marker.setAttribute('markerWidth', 10);
        marker.setAttribute('markerHeight', 10);
        marker.setAttribute('refX', 10); // importante!
        marker.setAttribute('refY', 5);
        marker.setAttribute('orient', 'auto');
        marker.setAttribute('markerUnits', 'strokeWidth');
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', 'M0,0 L10,5 L0,10 Z');
        path.setAttribute('fill', 'black');
        marker.appendChild(path);
        defs.appendChild(marker);
        svg.appendChild(defs);
    }



    createArrowMarker();
    // Função para gerar linha:
    function generateArrow(x1, y1, x2, y2, r = 20) {
        const line = document.createElementNS(svgNS, 'line');
        x1 += r;
        x2 -= r;
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', 0.5);
        line.setAttribute('marker-end', 'url(#arrowhead)');
        svg.appendChild(line);
    }



    function plot_test(){
        plot_point(100, 50, 50, ids, svg, "green", listaDePontos);  //ponto teste
        plot_point(150, 150, 50, ids, svg, "green", listaDePontos); //ponto teste

        generateCircle(x_center, y_center, 143, "green", ids, svg); // circulo teste//


    }
   // plot_test()

    // seu SVG já criado e adicionado ao DOM
    svgPanZoom(svg, {
        zoomEnabled: true,
        controlIconsEnabled: false,
        fit: false,
        center: false,
        minZoom: 0.5,
        maxZoom: 3
    });

}



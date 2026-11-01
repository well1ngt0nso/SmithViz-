
function adicionarPonto(id, name_, reVal, imVal, renVal = 0, imnVal = 0, specsDoUsuario, lista1) {
    let novoPonto = {
        id: id,
        name: name_, // Gera um ID único baseado no tempo atual
        re: reVal,
        im: imVal,
        re_n: renVal,
        im_n: imnVal,
        especificacoes: specsDoUsuario // Aqui entra qualquer objeto com características livres
    };

    lista1.push(novoPonto);
    console.log("Ponto adicionado com sucesso!", novoPonto);
}



function pegarPontoPorId(idDesejado, lista) {
    // O .find() varre a lista e acha exatamente o objeto com aquele ID
    let pontoEncontrado = lista.find(p => p.id === idDesejado);
    
    if (pontoEncontrado) {
        console.log("Encontrou o ponto:", pontoEncontrado);
        console.log("Características:", pontoEncontrado.especificacoes);
        return pontoEncontrado;
    } else {
        console.log("Ponto não encontrado.");
    }
}


function apagarPonto(idParaApagar, lista) {
    // O .filter() cria uma nova lista mantendo apenas os pontos que NÃO têm esse ID
    listaDePontos = lista.filter(p => p.id !== idParaApagar);
    
    console.log("Ponto apagado. Lista atualizada:", listaDePontos);
}





function plot_point(name_, R, X, Z_0, ids_, svg_, cor, lista){
        console.log('Entrada: ')
        const Zl = math.complex(R, X) ;    
        const Z0 = math.complex(Z_0,0) ; 

        const zl = math.divide(Zl, Z0)
        console.log(Zl);
        const z0 = math.complex(1,0) ; 


        console.log('Entrada normalizada: ')

        console.log(zl)

        var a = math.divide(math.subtract(zl, z0), math.add(zl, z0));
        console.log('Coeficiente de reflexão: ')
        a =   math.conj(a);                     // Complex 2 - 3i

        console.log(a);

        var id_ = generateCircle(a.re*px_raio +x_center, a.im * px_raio +y_center, 5, cor, ids_, svg_, 1); 
        adicionarPonto(id_, name_, R, X, math.re(zl), math.im(zl), { cor: cor, ativo: "true", raio: 2 }, lista);
        

        return a;
        
}




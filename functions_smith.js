function plot_point(R, X, Z_0, ids_, svg_, cor){
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

        generateCircle(a.re*px_raio +x_center, a.im * px_raio +y_center, 5, cor, ids_, svg_, 1); 

        return a;
        
}




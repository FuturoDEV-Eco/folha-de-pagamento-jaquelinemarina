function calcularINSS(salarioBruto) {
    const tetoINSS = 908.85
    let INSS = 0

    if (salarioBruto <= 1412) {
        INSS = salarioBruto * 0.075
    } else if (salarioBruto >= 1412.01 && salarioBruto <= 2666.68) {
        INSS = salarioBruto * 0.09
    } else if (salarioBruto >= 2666.69 && salarioBruto <= 4000.03) {
        INSS = salarioBruto * 0.12
    } else {
        INSS = salarioBruto * 0.14
    }
        
    if (INSS >= tetoINSS) INSS = tetoINSS
    
    return Number(INSS).toFixed(2)
}

module.exports = calcularINSS
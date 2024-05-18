function calcularIR(salarioBruto) {
    let IR = 0

    if (salarioBruto <= 2112.00) {
        IR = 0
    } else if (salarioBruto >= 2112.01 && salarioBruto <= 2826.65) {
        IR = salarioBruto * 0.075 - 158.40
    } else if (salarioBruto >= 2826.66 && salarioBruto <= 3751.05) {
        IR = salarioBruto * 0.15 - 370.40
    } else if (salarioBruto >= 3751.06 && salarioBruto <= 4664.68) {
        IR = salarioBruto * 0.225 - 651.73
    } else {
        IR = salarioBruto * 0.275 - 884.96
    }

    return IR
}

module.exports = calcularIR
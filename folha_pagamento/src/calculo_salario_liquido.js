
const calcularINSS = require('./calculo_inss')
const calcularIR = require('./calculo_imposto_renda')

function calcularSalarioLiquido(salarioBruto) {

  const valorINSS = calcularINSS(salarioBruto)
  const valorIR = calcularIR(salarioBruto)
  const outrosDescontos = 0

  const salarioLiquido = Number(salarioBruto - valorINSS - valorIR - outrosDescontos).toFixed(2)

  return salarioLiquido
}

module.exports = calcularSalarioLiquido
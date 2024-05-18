const readline = require('readline')
const calcularINSS = require('./calculo_inss')
const calcularIR = require('./calculo_imposto_renda')
const calcularSalarioLiquido = require('./calculo_salario_liquido')

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


let nome = ""
input.question("Digite seu nome:", (nomeDigitado) => {
    nome = nomeDigitado

    let CPF = 0
    input.question("Digite seu CPF:", (cpfDigitado) => {
        CPF = cpfDigitado

        let mes = 0
        input.question("Digite o mês do pagamento:", (mesDigitado) => {
            mes = mesDigitado

            let salarioBruto = 0
            input.question("Digite o seu salário bruto:", (salarioBrutoDigitado) => {
                salarioBruto = salarioBrutoDigitado

                const INSS = calcularINSS(salarioBruto)
                const IR = calcularIR(salarioBruto)
                const salarioLiquido = calcularSalarioLiquido(salarioBruto)

                console.log('\n--- Folha de Pagamento ---')
                console.log(`Nome: ${nome}`)
                console.log(`CPF: ${CPF}`)
                console.log(`Mês do Pagamento: ${mes}`)
                console.log(`Salário Bruto: R$${salarioBruto}`)
                console.log(`INSS: R$${INSS}`)
                console.log(`Imposto de Renda: R$${IR}`)
                console.log(`Outros Descontos: R$0,00`)
                console.log(`--------------------------`)
                console.log(`Salário Líquido: R$${salarioLiquido}`)

                input.close()
            })
        })
    })
})
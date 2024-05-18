const readline = require('readline')
const fs = require('fs')
const PDFDocument = require('pdfkit')

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
            mes = Number(mesDigitado)

            let salarioBruto = 0
            input.question("Digite o seu salário bruto:", (salarioBrutoDigitado) => {
                salarioBruto = Number(salarioBrutoDigitado).toFixed(2)

                const INSS = calcularINSS(salarioBruto)
                const IR = calcularIR(salarioBruto)
                const salarioLiquido = calcularSalarioLiquido(salarioBruto)

                console.log('\n\n--- Folha de Pagamento ---')
                console.log(`Nome: ${nome}`)
                console.log(`CPF: ${CPF}`)
                console.log(`Mês do Pagamento: ${mes}`)
                console.log(`Salário Bruto: R$${salarioBruto}`)
                console.log(`INSS: R$ ${INSS}`)
                console.log(`Imposto de Renda: R$${IR}`)
                console.log(`Outros Descontos: R$0,00`)
                console.log(`--------------------------`)
                console.log(`Salário Líquido: R$${salarioLiquido}`)
                console.log('\n')

                // Pergunta se o usuário deseja gerar o PDF
                input.question("Deseja emitir o PDF do seu holerite?  S/N ->  ", (answer) => {
                    if (answer === 'S' || answer === 's') {
                        gerarPDF()
                    } else if (answer === 'N' || answer === 'n') {
                        console.log('Progama finalizado.')
                    } else (console.log('Resposta inválida. Programa finalizado.'))

                    input.close()
                })

                // Função para gerar o PDF
                function gerarPDF() {
                    const doc = new PDFDocument()
                    doc.pipe(fs.createWriteStream(`${nome}_holerite.pdf`))
                    doc.fontSize(20)
                    doc.font('Helvetica-Bold')

                    doc.text(`Holerite - mês ${mes}`).fontSize(16)
                    doc.text(`--------------------------------------------`)
                    doc.text('\n')
                    doc.text(`Data de Geração: ${new Date().toLocaleDateString()}`)
                    doc.text('\n')
                    doc.text(`Nome: ${nome}`)
                    doc.text(`CPF: ${formatarCPF(CPF)}`)
                    doc.text(`Salário Bruto: R$${salarioBruto}`)
                    doc.text('\n')
                    doc.text(`Descontos:`)
                    doc.text(`INSS: R$${INSS}`)
                    doc.text(`Imposto de Renda: R$${IR}`)
                    doc.text(`Outros Descontos: R$0,00`)
                    doc.text('\n')
                    doc.text(`--------------------------------------------`)
                    doc.text('\n')
                    doc.text(`Salário Líquido: R$${salarioLiquido}`)
                    doc.end()

                    console.log('\n')
                    console.log('PDF gerado com sucesso!')
                    console.log('Programa finalizado.')
                }
            })
        })
    })
})

// Função para formatar o CPF
function formatarCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
} module.exports = formatarCPF
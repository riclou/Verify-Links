#!/usr/bin/env node
import takeArquive from "./index.js";
import fs from "fs"
import chalk from "chalk";
import validacaoLink from "./http-validacao.js";


const caminho = process.argv;

async function imprimeLista(valida, resultado, nome = ""){

    if(valida){
        console.log(chalk.magenta("Lista validada: "),
        chalk.bgBlueBright(nome),
        await validacaoLink(resultado))
    }
    else{
        console.log(chalk.magenta("Lista de links: "),
        chalk.bgBlueBright(nome),
        resultado)
    }

}

async function processArquive(route){
    const routeCorrect = route[2]
    const valida = route[3] === "valida"

    try{
        fs.lstatSync(routeCorrect)

    } catch(erro){
        if(erro.code ==="ENOENT"){
            console.log(chalk.yellow("Arquivo ou diretório não encontrado"))
            return
    
        }
    }

    if(fs.lstatSync(routeCorrect).isFile()) {
        const result =  await takeArquive(route[2])
        imprimeLista(valida, result)
    }
    else if(fs.lstatSync(routeCorrect).isDirectory()){
        const arquivos = await fs.promises.readdir(routeCorrect)
        arquivos.forEach(async (caminho) => {
            const list = await takeArquive(`${routeCorrect}/${caminho}`)
            imprimeLista(valida, list, caminho)
        })
    }
}

processArquive(caminho)
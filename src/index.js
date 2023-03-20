import fs from "fs"
import chalk from "chalk";

function extraiLinks(text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...text.matchAll(regex)]
    const result = capturas.map(capturas => ({
        [capturas[1]]: capturas[2]
    }))
    return result.length !== 0 ? result : chalk.red("Não há links")
}

function error(erro) {
    throw new Error(chalk.red(erro.code, "Arquivo não encontrado"))
}

async function takeArquive(route) {
    try {
        const enconding = "utf-8";
        const text = await fs.promises.readFile(route, enconding)
        return extraiLinks(text)
    }
    catch (erro) {
        error(erro)
    }
    finally {
        console.log(chalk.yellow("Operação concluída"))
    }
}

export default takeArquive
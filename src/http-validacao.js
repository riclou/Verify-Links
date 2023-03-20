import chalk from "chalk"

function arrayLinks(arrLink){
    return arrLink.map((objArr) => Object.values(objArr).join())
}

async function validacao(arrURL){
    const arrStatus = await Promise.all(
        arrURL.map(async (url) => {
        try{
        const res = await fetch(url)
        return res.status
        }
        catch(erro){
         return arrumaErro(erro)
        }
    })
    )
    return arrStatus
}

function arrumaErro(erro){
    if(erro.cause.code === "ENOTFOUND"){
        return "Link não encontrado"
    }
    else{
        return "Ocorreu algum erro"
    }
}

async function validacaoLink(link){
    const links = arrayLinks(link)
    const status = await validacao(links)
    
    return link.map((obj, indice) => ({
        ...obj,
        status: status [indice]
    }))
}

export default validacaoLink

// [gatinho salsicha](http://gatinhosalsicha.com.br/)
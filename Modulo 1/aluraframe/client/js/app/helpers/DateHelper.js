class DateHelper{

    constructor(){
        throw new Error("DateHelper não pode ser instanciado");
    }

    static dataParaTexto(data){
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
        //data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
    }

   static textoParaData(texto){

       if(!/\d{4}-\d{2}-\d{2}/.test(texto))
            throw new Error("Data em um formato invalido yyyy-mm-dd");

        return new Date(...texto.split('-').map((item,indice) => item - indice % 2));
        //percorre o array e devolve o item, e pega a posição (indice) que estou passando
    }

}
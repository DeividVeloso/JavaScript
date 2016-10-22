class NegociacaoController {

        constructor(){
        
        let $ = document.querySelector.bind(document);
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
            
        };

    adiciona(event){
        event.preventDefault();

        //Esta dando erro por que meu model recebe data 
        //e a controller esta passando string, não reconhece o método getTime()
        //console.log(typeof(this._inputData.value));
        // let negociacao = new Negociacao(
        //     this._inputData.value,
        //     this._inputQuantidade.value,
        //     this._inputValor.value
        // );

        //Para concerter uma data elegantemente, 
        //o Date funcina fazendo um join de elementos por virgula(2016,03,30)
        //Para fazer isso usar o split ou replace
        //console.log(new Date(this._inputData.value.split('-')));
        //dessa forma ele converte corretamente;
        //console.log(trataData(this._inputData.value));

       // let novaData = trataData(this._inputData.value);
        //console.log(new Date(novaData));
        //console.log(negociacao);

        //Para passar os parametros no construtor 
        //do método dinamicamento com ... cada ponto representa um parametro que será criado no split
        //  let data = new Date(...
        //         this._inputData.value
        //         .split('-')
        //         //percorre o array e devolve o item, e pega a posição (indice) que estou passando
        //         .map((item,indice) => item - indice % 2)
        //     );
         
         

         let negociacao = new Negociacao(
                DateHelper.textoParaData(this._inputData.value),
                this._inputQuantidade.value,
                this._inputValor.value
         );

         console.log(negociacao);
         console.log(DateHelper.dataParaTexto(negociacao.data))
         //let diaMesAno = negociacao.data.getDate() + "/" + (negociacao.data.getMonth() + 1) + "/" + negociacao.data.getFullYear();
         //console.log(diaMesAno);
    };

   
    
};

// function trataData(data){

//         var dataAlt = [data.split('-')];
//         if(dataAlt[1] == 1){
//             dataAlt[1] = 0;
//         }else{
//             dataAlt[1] = dataAlt[1] - 1;
//         };
//             data = dataAlt;
//     return dataAlt;
// };
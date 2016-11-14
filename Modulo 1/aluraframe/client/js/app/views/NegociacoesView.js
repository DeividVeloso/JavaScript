class NegociacoesView{

    constructor(elemento)
    {
        this._elemento = elemento;
    }

    _template(model){
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
                
                <tbody>
                   ${model.negociacoes.map((n) => {
                       return `
                            <tr>
                                <td>${DateHelper.dataParaTexto(n.data)}</td>
                                <td>${n.quantidade}</td>
                                <td>${n.valor}</td>
                                <td>${n.volume}</td>
                            <tr>
                       `
                   }).join('')}
                </tbody>
                
                <tfoot>
                    <td colspan="3"> </td>
                    
                    <td>${model.negociacoes.reduce((total, n) => total += n.volume, 0.0)}</td>
                </tfoot>
            </table>
             `;
     }
     //    Função reduce (variavel para armazenar o valor, variavel de acesso ao array) => total recebe a soma do volume, e inicia com o valor 0.0
     //A cada iteração ele vai somando na variavel tomal 
     //   <td>${model.negociacoes.reduce((total, n) => total += n.volume, 0.0)}</td>
    update(model){
        this._elemento.innerHTML = this._template(model);
    }

}
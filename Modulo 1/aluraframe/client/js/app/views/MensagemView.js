class MensagemView extends View{
    constructor(elemento){
        //Chama o construtor do pai View
        super(elemento);
    }

    template(model) {
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`;
    }
}
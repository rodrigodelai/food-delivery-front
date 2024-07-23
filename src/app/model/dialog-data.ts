export interface DialogData {
    title: string,
    message: string,
    confirmMsg: string,
    cancelMsg?: string
}

export const DIALOG_DATA: { [key: string]: DialogData } = {
    SEND_ORDER: { 
        title: 'Confirmar envio', message: 'Após conferir o endereço e os itens escolhidos, deseja prosseguir?', confirmMsg: 'Sim', cancelMsg: 'Não'
    },
    EMPTY_BAG: { 
        title: 'Confirmar remoção', message: 'Todos os itens serão removidos da sacola. Deseja prosseguir?', confirmMsg: 'Sim', cancelMsg: 'Não'
    },
    DELETE_ITEM: { 
        title: 'Confirmar remoção', message: 'O item será removido da sacola. Deseja prosseguir?', confirmMsg: 'Sim', cancelMsg: 'Não' 
    },
    UNAVAILABLE: {
        title: 'Servidor indisponível', message: 'Houve um problema na comunicação com o servidor. Tente novamente mais tarde. Se o problema persistir, contate o suporte.', confirmMsg: 'Ok'
    }
}
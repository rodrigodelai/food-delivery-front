export interface DialogData {
    title: string,
    message: string,
    confirmMsg: string,
    cancelMsg: string
    confirmFunctionName: string,
    cancelFunctionName: string
}

export const DialogDataOptions = {
    SEND_ORDER: { 
        title: 'Confirmar envio', message: 'Tem certeza que deseja enviar o pedido?', confirmMsg: 'Sim', cancelMsg: 'Não', confirmFunctionName: 'sendOrder', cancelFunctionName: '' 
    },
    EMPTY_BAG: { 
        title: 'Confirmar deleção', message: 'Tem certeza que deseja esvaziar a sacola?', confirmMsg: 'Sim', cancelMsg: 'Não', confirmFunctionName: 'emptyBag', cancelFunctionName: ''
    },
    DELETE_ITEM: { 
        title: 'Confirmar remoção', message: 'Tem certeza que deseja remover o item da sacola?', confirmMsg: 'Sim', cancelMsg: 'Não', confirmFunctionName: 'deleteItem', cancelFunctionName: '' 
    }
}
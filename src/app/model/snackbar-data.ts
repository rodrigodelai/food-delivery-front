export interface SnackbarData {
    message: string,
    action: string,
    config?: any
}

export const SNACKBAR_DATA: { [key: string]: SnackbarData } = {
    EMPTY_BAG: { 
        message: 'Sua sacola está vazia.', action: '✖', config: { duration: 7000 }
    },
    SENDING: {
        message: 'Seu pedido está sendo processado. Por favor, aguarde.', action: '✖', config: { duration: 7000 }
    },
    SUCCESS: {
        message: 'Seu pedido foi enviado com sucesso!', action: '✖', config: { duration: 7000 }
    },
    UNAVAILABLE: {
        message: 'Recurso indisponível.', action: '✖', config: { duration: 3000 }
    }
}
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const reactSwal = withReactContent(Swal)

export const sweetAlertOptions = {
    confirmButtonColor: '#0e7490',
    cancelButtonColor: '#d33',
}

export const showSwalLoading = (message = 'Por favor, aguarde...'): void => {
    reactSwal.fire({
        title: message,
        allowEscapeKey: false,
        allowOutsideClick: false,
    })
    reactSwal.showLoading(null)
}

export const showSwalSuccess = (message: string): void => {
    reactSwal.fire({
        title: 'Sucesso!',
        icon: 'success',
        text: message,
        confirmButtonColor: sweetAlertOptions.confirmButtonColor,
    })
}

export const showSwalError = (message: string): void => {
    reactSwal.fire({
        title: 'Oops!',
        icon: 'error',
        text: message,
        confirmButtonColor: sweetAlertOptions.confirmButtonColor,
    })
}

export const showSwalWarning = (message: string): void => {
    reactSwal.fire({
        title: 'Alerta!',
        icon: 'warning',
        text: message,
        confirmButtonColor: sweetAlertOptions.confirmButtonColor,
    })
}

export const closeSwal = (): void => {
    reactSwal.close()
}

export default reactSwal

import Drawer from '@/components/shared/Drawer';

interface DrawerCarFormProps {
    open: boolean;
    onClose: () => void;
}

function DrawerCarForm({ open, onClose }: DrawerCarFormProps): JSX.Element {
    return (
        <Drawer
            onClose={onClose}
            open={open}
            title='Cadastro de carro'
        >
            <form>

            </form>
        </Drawer>
    )
}

export default DrawerCarForm;
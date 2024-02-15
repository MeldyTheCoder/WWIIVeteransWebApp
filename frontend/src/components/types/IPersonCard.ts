import IPerson from "../../interfaces/IPerson"


interface IPersonCardProps extends IPerson {
    id?: number,
    onError?: () => void
    onDelete?: () => void
    onEdit?: () => void
}


const enum CardColorVariants {
    DARK = 'dark',
    DANGER = 'danger',
    WARNING = 'warning',
    LIGHT = 'light'
}


export default IPersonCardProps
export type {IPerson, CardColorVariants}

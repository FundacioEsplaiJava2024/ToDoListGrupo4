
export interface ElementProps {
    title: string
}

export function Elemento({title} : ElementProps) {
    return <li>{title}</li>
}
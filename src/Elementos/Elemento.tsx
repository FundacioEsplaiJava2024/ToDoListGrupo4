
export interface ElementProps {
    id: number;
    title: string
}

export function Elemento({title} : ElementProps) {
    return <li>{title}</li>
}
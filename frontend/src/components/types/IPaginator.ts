interface IPaginatorProps {
    elements: any[]
    currentPage?: number
    elementsPerPage?: number
    resetKey?: any
    onPageChange: (elements: any[], page: number) => void 
}

export default IPaginatorProps;
import React from "react";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";


interface ITooltipButtonProps {
    icon?: React.ReactElement | string
    children: string
    type?: "submit"
    variant: 
    'warning' 
    | 'danger'
    | 'warning'
    | 'success'
    | 'info'
    | 'secondary' 
    | 'outline-danger' 
    | 'outline-warning'
    | 'outline-success'
    | 'outline-info'
    | 'outline-secondary'
    tooltipText: string
    tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right'
    onClick?: () => any | void
}


const TooltipButton = ({
    icon,
    variant,
    tooltipText,
    tooltipPlacement,
    onClick,
    children,
    type
}: ITooltipButtonProps) => {

    const tooltip = (
        <Tooltip>
            {tooltipText}
        </Tooltip>
    )

    return (
        <React.Fragment>
            <OverlayTrigger overlay={tooltip} placement={tooltipPlacement || 'bottom'}>
                <Button type={type} onClick={onClick} variant={variant}>{!!icon && icon} {children}</Button>
            </OverlayTrigger>
        </React.Fragment>
    )
}

export default TooltipButton
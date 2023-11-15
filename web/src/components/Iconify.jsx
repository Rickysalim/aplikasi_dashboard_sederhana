import { Icon } from '@iconify/react'

const Iconify = ({icon, width, height, ...other}) => (
    <Icon icon={icon} width={width} height={height} {...other}/>
)

export default Iconify
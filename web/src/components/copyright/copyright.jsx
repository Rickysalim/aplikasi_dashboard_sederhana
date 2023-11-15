import React from 'react'
import { Typography, Link } from '@mui/material'

const Copyright = (props) => (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        Clothes Dashboard
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
)

export default Copyright
import type { SxProps, Theme } from "@mui/material";

export const schemaStyles = {
    container: {
        m: 0,
        p: 0,
        fontFamily: 'monospace',
        fontSize: '0.875rem',
        lineHeight: 1.5,
    } as SxProps<Theme>,
    
    key: {
        color: 'primary.main',
    } as SxProps<Theme>,
    
    value: {
        color: 'text.secondary',
    } as SxProps<Theme>,
    
    type: {
        color: 'info.main',
    } as SxProps<Theme>,
    
    indent: {
        display: 'inline-block',
        width: '20px',
    } as SxProps<Theme>,
    
    name: {
        color: 'text.primary',
        fontWeight: 500,
    } as SxProps<Theme>,
    
    required: {
        color: 'error.main',
        fontSize: '0.75rem',
        ml: 1,
    } as SxProps<Theme>,
}; 
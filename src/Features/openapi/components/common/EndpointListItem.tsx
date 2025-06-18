import { ListItem, ListItemButton, Stack, Typography, Chip, alpha } from "@mui/material";
import { MethodChip } from "./MethodChip";
import type { ParsedEndpoint } from "../../types";

interface EndpointListItemProps {
    endpoint: ParsedEndpoint;
    isSelected: boolean;
    onClick: (endpoint: ParsedEndpoint) => void;
}

export const EndpointListItem: React.FC<EndpointListItemProps> = ({
    endpoint,
    isSelected,
    onClick
}) => {
    const tags = endpoint.operation.tags || [];

    return (
        <ListItem 
            disablePadding 
            divider
            sx={{
                '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04)
                }
            }}
        >
            <ListItemButton
                selected={isSelected}
                onClick={() => onClick(endpoint)}
                sx={{
                    py: 1.25,
                    px: 1.75,
                    '&.Mui-selected': {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                        '&:hover': {
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12)
                        }
                    }
                }}
            >
                <Stack spacing={0.75} sx={{ width: '100%' }}>
                    <Stack 
                        direction="row" 
                        spacing={1} 
                        alignItems="center"
                        sx={{ minHeight: 24 }}
                    >
                        <MethodChip method={endpoint.method} />
                        <Typography
                            variant="body2"
                            component="span"
                            sx={{
                                fontFamily: 'monospace',
                                wordBreak: 'break-all',
                                color: 'text.primary',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                                lineHeight: 1.4,
                                flex: 1,
                                minWidth: 0
                            }}
                        >
                            {endpoint.path}
                        </Typography>
                    </Stack>
                    
                    {(endpoint.operation.summary || tags.length > 0) && (
                        <Stack 
                            direction="row" 
                            spacing={1} 
                            alignItems="center"
                            sx={{ 
                                minHeight: 20,
                                flexWrap: 'wrap',
                                gap: 0.5,
                                pl: 0.5
                            }}
                        >
                            {endpoint.operation.summary && (
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        fontSize: '0.75rem',
                                        lineHeight: 1.4,
                                        flex: 1,
                                        minWidth: 0,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {endpoint.operation.summary}
                                </Typography>
                            )}
                            {tags.length > 0 && (
                                <Stack 
                                    direction="row" 
                                    spacing={0.5}
                                    sx={{ 
                                        flexWrap: 'wrap',
                                        gap: 0.5,
                                        ml: 'auto'
                                    }}
                                >
                                    {tags.map(tag => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                height: 20,
                                                fontSize: '0.6875rem',
                                                fontWeight: 500,
                                                '& .MuiChip-label': {
                                                    px: 0.75,
                                                    py: 0.25
                                                },
                                                borderColor: (theme) => alpha(theme.palette.divider, 0.8),
                                                bgcolor: (theme) => alpha(theme.palette.background.paper, 0.6),
                                                '&:hover': {
                                                    borderColor: 'primary.main',
                                                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04)
                                                }
                                            }}
                                        />
                                    ))}
                                </Stack>
                            )}
                        </Stack>
                    )}
                </Stack>
            </ListItemButton>
        </ListItem>
    );
}; 
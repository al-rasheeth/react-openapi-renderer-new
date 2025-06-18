import { Box, Typography, Paper, Chip, Stack, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { alpha, useTheme } from '@mui/material';
import type { OpenAPIV3 } from 'openapi-types';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import LinkIcon from '@mui/icons-material/Link';
import { useState } from 'react';

interface ApiInfoDisplayProps {
    apiInfo: {
        title: string;
        version: string;
        description?: string;
        servers?: OpenAPIV3.ServerObject[];
        contact?: OpenAPIV3.ContactObject;
        license?: OpenAPIV3.LicenseObject;
        securitySchemes?: Record<string, OpenAPIV3.SecuritySchemeObject | OpenAPIV3.ReferenceObject>;
    };
}

export const ApiInfoDisplay: React.FC<ApiInfoDisplayProps> = ({ apiInfo }) => {
    const theme = useTheme();
    const [isServerDialogOpen, setIsServerDialogOpen] = useState(false);
    const { title, version, description, servers, contact, license, securitySchemes } = apiInfo;

    const handleServerDialogOpen = () => {
        setIsServerDialogOpen(true);
    };

    const handleServerDialogClose = () => {
        setIsServerDialogOpen(false);
    };

    return (
        <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    borderRadius: 2
                }}
            >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h4" color="primary">
                        {title}
                    </Typography>
                    <Chip
                        label={`v${version}`}
                        size="small"
                        color="primary"
                        sx={{
                            height: 24,
                            '& .MuiChip-label': {
                                px: 1,
                                fontSize: '0.75rem',
                                fontWeight: 600
                            }
                        }}
                    />
                    {servers && servers.length > 0 && (
                        <Tooltip title="View Available Servers">
                            <IconButton
                                size="small"
                                onClick={handleServerDialogOpen}
                                sx={{
                                    color: theme.palette.primary.main,
                                    '&:hover': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.1)
                                    }
                                }}
                            >
                                <LinkIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
                {description && (
                    <Box sx={{ mt: 2 }}>
                        <MarkdownRenderer content={description} />
                    </Box>
                )}
            </Paper>

            {contact && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" color="text.primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <InfoIcon fontSize="small" />
                        Contact Information
                    </Typography>
                    <Box sx={{ pl: 2 }}>
                        {contact.name && (
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Name: {contact.name}
                            </Typography>
                        )}
                        {contact.email && (
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Email: {contact.email}
                            </Typography>
                        )}
                        {contact.url && (
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                URL: {contact.url}
                            </Typography>
                        )}
                    </Box>
                </Box>
            )}

            {license && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" color="text.primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CodeIcon fontSize="small" />
                        License
                    </Typography>
                    <Box sx={{ pl: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {license.name}
                        </Typography>
                        {license.url && (
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                URL: {license.url}
                            </Typography>
                        )}
                    </Box>
                </Box>
            )}

            {securitySchemes && Object.keys(securitySchemes).length > 0 && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" color="text.primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SecurityIcon fontSize="small" />
                        Security Schemes
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, pl: 2 }}>
                        {Object.entries(securitySchemes).map(([name, scheme]) => {
                            if ('$ref' in scheme) return null;
                            return (
                                <Chip
                                    key={name}
                                    label={`${name} (${scheme.type})`}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        borderColor: theme.palette.secondary.main,
                                        color: theme.palette.secondary.main,
                                        '&:hover': {
                                            bgcolor: alpha(theme.palette.secondary.main, 0.1)
                                        }
                                    }}
                                />
                            );
                        })}
                    </Stack>
                </Box>
            )}

            <Dialog
                open={isServerDialogOpen}
                onClose={handleServerDialogClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <LinkIcon color="primary" />
                        <Typography variant="h6">Available Servers</Typography>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        {servers?.map((server, index) => (
                            <Paper
                                key={index}
                                elevation={0}
                                sx={{
                                    p: 2,
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: 1,
                                    '&:hover': {
                                        borderColor: theme.palette.primary.main,
                                        bgcolor: alpha(theme.palette.primary.main, 0.02)
                                    }
                                }}
                            >
                                <Typography variant="subtitle1" color="primary" gutterBottom>
                                    {server.url}
                                </Typography>
                                {server.description && (
                                    <Typography variant="body2" color="text.secondary">
                                        {server.description}
                                    </Typography>
                                )}
                                {server.variables && Object.keys(server.variables).length > 0 && (
                                    <Box sx={{ mt: 1 }}>
                                        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                            Variables:
                                        </Typography>
                                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                                            {Object.entries(server.variables).map(([name, variable]) => (
                                                <Chip
                                                    key={name}
                                                    label={`${name}: ${variable.default}`}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{
                                                        height: 20,
                                                        '& .MuiChip-label': {
                                                            px: 1,
                                                            fontSize: '0.75rem'
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </Stack>
                                    </Box>
                                )}
                            </Paper>
                        ))}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleServerDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}; 
import { Box, Paper, useTheme } from '@mui/material';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import type { ReactNode } from 'react';

interface SplitPaneLayoutProps {
    leftPanel: ReactNode;
    rightPanel: ReactNode;
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
}

export const SplitPaneLayout: React.FC<SplitPaneLayoutProps> = ({
    leftPanel,
    rightPanel,
    defaultSize = 30,
    minSize = 20,
    maxSize = 40
}) => {
    const theme = useTheme();

    return (
        <Box 
            sx={{ 
                height: '100vh',
                overflow: 'hidden',
                bgcolor: theme.palette.background.default,
                display: 'flex',
                flexDirection: 'column',
                '& .resize-handle': {
                    width: '4px',
                    background: theme.palette.divider,
                    cursor: 'col-resize',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    '&:hover': {
                        background: theme.palette.primary.main,
                        width: '6px'
                    },
                    '&:active': {
                        background: theme.palette.primary.dark,
                        width: '6px'
                    }
                }
            }}
        >
            <PanelGroup direction="horizontal">
                <Panel 
                    defaultSize={defaultSize} 
                    minSize={minSize} 
                    maxSize={maxSize}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            height: '100%',
                            borderRight: 1,
                            borderColor: 'divider',
                            bgcolor: theme.palette.background.paper,
                            transition: theme.transitions.create(['border-color', 'background-color']),
                            overflow: 'auto'
                        }}
                    >
                        {leftPanel}
                    </Paper>
                </Panel>
                <PanelResizeHandle className="resize-handle" />
                <Panel>
                    <Paper
                        elevation={0}
                        sx={{
                            height: '100%',
                            bgcolor: theme.palette.background.paper,
                            transition: theme.transitions.create('background-color'),
                            overflow: 'auto'
                        }}
                    >
                        {rightPanel}
                    </Paper>
                </Panel>
            </PanelGroup>
        </Box>
    );
}; 
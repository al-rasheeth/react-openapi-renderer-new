import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  ContentCopy as ContentCopyIcon,
  PlayArrow as PlayArrowIcon,
} from '@mui/icons-material';

export interface ExampleViewerProps {
  example?: any;
  examples?: Record<string, any>;
  contentType: string;
}

export const ExampleViewer: React.FC<ExampleViewerProps> = ({
  example,
  examples,
  contentType,
}) => {
  const [selectedExample, setSelectedExample] = useState(0);
  const [copied, setCopied] = useState(false);

  const exampleEntries = examples 
    ? Object.entries(examples).map(([key, value]) => ({ key, value }))
    : example 
    ? [{ key: 'default', value: example }]
    : [];

  if (exampleEntries.length === 0) return null;

  const currentExample = exampleEntries[selectedExample];

  const formatExample = (value: any) => {
    try {
      if (contentType.includes('json')) {
        return JSON.stringify(value, null, 2);
      }
      return JSON.stringify(value, null, 2);
    } catch (error) {
      return String(value);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatExample(currentExample.value));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy example:', error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedExample(newValue);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          Examples
        </Typography>
        
        <Box display="flex" gap={1}>
          <Tooltip title="Try this example">
            <IconButton size="small" color="primary">
              <PlayArrowIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={copied ? 'Copied!' : 'Copy example'}>
            <IconButton onClick={handleCopy} size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {exampleEntries.length > 1 && (
        <Tabs
          value={selectedExample}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 2 }}
        >
          {exampleEntries.map((entry, index) => (
            <Tab
              key={entry.key}
              label={
                <Chip
                  label={entry.key}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              }
            />
          ))}
        </Tabs>
      )}

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          backgroundColor: 'grey.50',
          maxHeight: '400px',
          overflow: 'auto',
        }}
      >
        <Typography
          component="pre"
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            lineHeight: 1.4,
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {formatExample(currentExample.value)}
        </Typography>
      </Paper>
    </Box>
  );
};
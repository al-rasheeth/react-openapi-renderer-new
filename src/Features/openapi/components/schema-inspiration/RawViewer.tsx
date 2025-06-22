import React from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ContentCopy as ContentCopyIcon,
} from '@mui/icons-material';
import type { OpenAPISchema } from './SchemaRenderer';

export interface RawViewerProps {
  schema?: OpenAPISchema;
  contentType: string;
  example?: any;
}

export const RawViewer: React.FC<RawViewerProps> = ({
  schema,
  contentType,
  example,
}) => {
  const [copied, setCopied] = React.useState(false);

  const formatContent = () => {
    const content = schema || example;
    if (!content) return 'No content available';

    try {
      if (contentType.includes('json')) {
        return JSON.stringify(content, null, 2);
      } else if (contentType.includes('xml')) {
        // Simple XML formatting for demo purposes
        return `<?xml version="1.0" encoding="UTF-8"?>
<root>
  ${JSON.stringify(content, null, 2).replace(/[{}]/g, '').replace(/"/g, '')}
</root>`;
      } else {
        return JSON.stringify(content, null, 2);
      }
    } catch (error) {
      return String(content);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatContent());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const getLanguage = () => {
    if (contentType.includes('json')) return 'json';
    if (contentType.includes('xml')) return 'xml';
    if (contentType.includes('yaml')) return 'yaml';
    return 'text';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle2" color="text.secondary">
          Raw {getLanguage().toUpperCase()} View
        </Typography>
        
        <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
          <IconButton onClick={handleCopy} size="small">
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          backgroundColor: 'grey.50',
          maxHeight: '500px',
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
          {formatContent()}
        </Typography>
      </Paper>
    </Box>
  );
};
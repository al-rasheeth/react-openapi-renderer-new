import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Code as CodeIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { SchemaProperty } from './SchemaProperty';
import { RawViewer } from './RawViewer';
import { ExampleViewer } from './ExampleViewer';

export interface OpenAPISchema {
  type?: string;
  properties?: Record<string, any>;
  items?: any;
  required?: string[];
  example?: any;
  examples?: Record<string, any>;
  description?: string;
  format?: string;
  enum?: any[];
  allOf?: any[];
  oneOf?: any[];
  anyOf?: any[];
  additionalProperties?: boolean | any;
  title?: string;
  $ref?: string;
}

export interface ContentTypeSchema {
  schema?: OpenAPISchema;
  example?: any;
  examples?: Record<string, any>;
  encoding?: Record<string, any>;
}

export interface SchemaRendererProps {
  title: string;
  contentTypes: Record<string, ContentTypeSchema>;
  defaultContentType?: string;
  showRawToggle?: boolean;
  showExamples?: boolean;
  variant?: 'request' | 'response';
}

export const SchemaRenderer: React.FC<SchemaRendererProps> = ({
  title,
  contentTypes,
  defaultContentType,
  showRawToggle = true,
  showExamples = true,
  variant = 'request',
}) => {
  const [selectedContentType, setSelectedContentType] = useState(
    defaultContentType || Object.keys(contentTypes)[0] || 'application/json'
  );
  const [showRaw, setShowRaw] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const currentContent = contentTypes[selectedContentType];
  const schema = currentContent?.schema;

  const handleContentTypeChange = (event: React.SyntheticEvent, newValue: number) => {
    const contentTypeKeys = Object.keys(contentTypes);
    setSelectedContentType(contentTypeKeys[newValue]);
    setActiveTab(newValue);
  };

  const getContentTypeColor = (contentType: string) => {
    if (contentType.includes('json')) return 'primary';
    if (contentType.includes('xml')) return 'secondary';
    if (contentType.includes('form')) return 'warning';
    if (contentType.includes('text')) return 'info';
    return 'default';
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        
        {showRawToggle && (
          <FormControlLabel
            control={
              <Switch
                checked={showRaw}
                onChange={(e) => setShowRaw(e.target.checked)}
                icon={<VisibilityOffIcon />}
                checkedIcon={<VisibilityIcon />}
              />
            }
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <CodeIcon fontSize="small" />
                <Typography variant="body2">Raw View</Typography>
              </Box>
            }
          />
        )}
      </Box>

      {Object.keys(contentTypes).length > 1 && (
        <Box mb={3}>
          <Tabs
            value={activeTab}
            onChange={handleContentTypeChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {Object.keys(contentTypes).map((contentType, index) => (
              <Tab
                key={contentType}
                label={
                  <Chip
                    label={contentType}
                    size="small"
                    color={getContentTypeColor(contentType)}
                    variant="outlined"
                  />
                }
              />
            ))}
          </Tabs>
        </Box>
      )}

      <Box>
        {showRaw ? (
          <RawViewer
            schema={schema}
            contentType={selectedContentType}
            example={currentContent?.example || currentContent?.examples}
          />
        ) : (
          <>
            {schema && (
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    Schema Structure
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <SchemaProperty
                    name="root"
                    schema={schema}
                    level={0}
                    isRoot={true}
                  />
                </AccordionDetails>
              </Accordion>
            )}

            {showExamples && (currentContent?.example || currentContent?.examples) && (
              <>
                <Divider sx={{ my: 2 }} />
                <ExampleViewer
                  example={currentContent.example}
                  examples={currentContent.examples}
                  contentType={selectedContentType}
                />
              </>
            )}
          </>
        )}
      </Box>
    </Paper>
  );
};
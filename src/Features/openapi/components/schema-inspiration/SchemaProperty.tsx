import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Collapse,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Info as InfoIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import type { OpenAPISchema } from './SchemaRenderer';

export interface SchemaPropertyProps {
  name: string;
  schema: OpenAPISchema;
  level: number;
  isRequired?: boolean;
  isRoot?: boolean;
}

export const SchemaProperty: React.FC<SchemaPropertyProps> = ({
  name,
  schema,
  level,
  isRequired = false,
  isRoot = false,
}) => {
  const [expanded, setExpanded] = useState(level < 2);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'string': return 'success';
      case 'number': case 'integer': return 'warning';
      case 'boolean': return 'info';
      case 'array': return 'secondary';
      case 'object': return 'primary';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'string': return '""';
      case 'number': case 'integer': return '123';
      case 'boolean': return '✓';
      case 'array': return '[]';
      case 'object': return '{}';
      default: return '?';
    }
  };

  const renderPropertyHeader = () => (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      sx={{
        py: 1,
        pl: level * 2,
        cursor: (schema.type === 'object' || schema.type === 'array') ? 'pointer' : 'default',
      }}
      onClick={() => {
        if (schema.type === 'object' || schema.type === 'array') {
          setExpanded(!expanded);
        }
      }}
    >
      {(schema.type === 'object' || schema.type === 'array') && (
        <IconButton size="small" sx={{ p: 0 }}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      )}

      <Box display="flex" alignItems="center" gap={1} flex={1}>
        {!isRoot && (
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'monospace',
              fontWeight: isRequired ? 600 : 400,
              color: isRequired ? 'primary.main' : 'text.primary',
            }}
          >
            {name}
          </Typography>
        )}

        {isRequired && (
          <Tooltip title="Required field">
            <StarIcon fontSize="small" color="error" />
          </Tooltip>
        )}

        <Chip
          label={schema.type || 'any'}
          size="small"
          color={getTypeColor(schema.type || 'default')}
          variant="outlined"
          icon={<span style={{ fontSize: '12px' }}>{getTypeIcon(schema.type || 'any')}</span>}
        />

        {schema.format && (
          <Chip
            label={schema.format}
            size="small"
            variant="filled"
            sx={{ fontSize: '10px', height: '20px' }}
          />
        )}

        {schema.enum && (
          <Chip
            label={`enum(${schema.enum.length})`}
            size="small"
            color="info"
            variant="outlined"
          />
        )}
      </Box>

      {schema.description && (
        <Tooltip title={schema.description} arrow>
          <InfoIcon fontSize="small" color="action" />
        </Tooltip>
      )}
    </Box>
  );

  const renderObjectProperties = () => {
    if (!schema.properties) return null;

    return (
      <Box sx={{ pl: 2 }}>
        {Object.entries(schema.properties).map(([propName, propSchema]) => (
          <SchemaProperty
            key={propName}
            name={propName}
            schema={propSchema}
            level={level + 1}
            isRequired={schema.required?.includes(propName)}
          />
        ))}
        
        {schema.additionalProperties && (
          <Box sx={{ pl: level * 2 + 2, py: 0.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              + additional properties allowed
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  const renderArrayItems = () => {
    if (!schema.items) return null;

    return (
      <Box sx={{ pl: 2 }}>
        <SchemaProperty
          name="items"
          schema={schema.items}
          level={level + 1}
        />
      </Box>
    );
  };

  const renderConstraints = () => {
    const constraints = [];
    
    if (schema.enum) {
      constraints.push(
        <Typography key="enum" variant="caption" color="text.secondary">
          Values: {schema.enum.map(v => JSON.stringify(v)).join(', ')}
        </Typography>
      );
    }

    if (schema.example !== undefined) {
      constraints.push(
        <Typography key="example" variant="caption" color="text.secondary">
          Example: {JSON.stringify(schema.example)}
        </Typography>
      );
    }

    if (constraints.length === 0) return null;

    return (
      <Box sx={{ pl: level * 2 + 4, py: 0.5 }}>
        <Stack spacing={0.5}>
          {constraints}
        </Stack>
      </Box>
    );
  };

  return (
    <Box>
      {renderPropertyHeader()}
      
      <Collapse in={expanded}>
        {schema.type === 'object' && renderObjectProperties()}
        {schema.type === 'array' && renderArrayItems()}
        {renderConstraints()}
      </Collapse>
    </Box>
  );
};
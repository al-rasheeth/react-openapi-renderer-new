import { Box, useTheme, alpha } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
    content: string;
}

interface CodeProps {
    node?: any;
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    const theme = useTheme();

    const components: Components = {
        code({ node, inline, className, children, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        },
    };

    return (
        <Box sx={{
            '& .markdown-body': {
                color: theme.palette.text.primary,
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                    marginTop: 2,
                    marginBottom: 1,
                    fontWeight: 600,
                    lineHeight: 1.25,
                    color: theme.palette.text.primary,
                },
                '& h1': { fontSize: '2em' },
                '& h2': { fontSize: '1.5em' },
                '& h3': { fontSize: '1.25em' },
                '& h4': { fontSize: '1em' },
                '& h5': { fontSize: '0.875em' },
                '& h6': { fontSize: '0.85em' },
                '& p': {
                    marginTop: 0,
                    marginBottom: 1,
                },
                '& a': {
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                    },
                },
                '& code': {
                    padding: '0.2em 0.4em',
                    margin: 0,
                    fontSize: '85%',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    borderRadius: 3,
                    fontFamily: 'monospace',
                },
                '& pre': {
                    marginTop: 0,
                    marginBottom: 1,
                    padding: 16,
                    overflow: 'auto',
                    fontSize: '85%',
                    lineHeight: 1.45,
                    backgroundColor: theme.palette.grey[900],
                    borderRadius: 3,
                    '& code': {
                        padding: 0,
                        margin: 0,
                        fontSize: '100%',
                        wordBreak: 'normal',
                        whiteSpace: 'pre',
                        background: 'transparent',
                        border: 0,
                    },
                },
                '& blockquote': {
                    padding: '0 1em',
                    color: theme.palette.text.secondary,
                    borderLeft: `0.25em solid ${theme.palette.divider}`,
                    margin: '0 0 1em 0',
                },
                '& ul, & ol': {
                    paddingLeft: '2em',
                    marginTop: 0,
                    marginBottom: 1,
                },
                '& table': {
                    display: 'block',
                    width: '100%',
                    overflow: 'auto',
                    marginTop: 0,
                    marginBottom: 1,
                    borderSpacing: 0,
                    borderCollapse: 'collapse',
                    '& th': {
                        fontWeight: 600,
                        padding: '6px 13px',
                        border: `1px solid ${theme.palette.divider}`,
                    },
                    '& td': {
                        padding: '6px 13px',
                        border: `1px solid ${theme.palette.divider}`,
                    },
                    '& tr': {
                        backgroundColor: theme.palette.background.paper,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        '&:nth-child(2n)': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                        },
                    },
                },
            },
        }}>
            <Box className="markdown-body">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={components}
                >
                    {content}
                </ReactMarkdown>
            </Box>
        </Box>
    );
}; 
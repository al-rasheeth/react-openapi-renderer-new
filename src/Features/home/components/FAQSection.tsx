import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: 'What is an API?',
    answer: 'An API (Application Programming Interface) is a set of rules and protocols that allows different software applications to communicate with each other. It defines the methods and data formats that applications can use to request and exchange information.',
  },
  {
    question: 'How do I get started with the API Platform?',
    answer: 'Getting started is easy! Simply browse our API catalog, find the API you need, and use our API Studio to test it out. We provide comprehensive documentation and example code to help you integrate the API into your application.',
  },
  {
    question: 'Do I need to pay to use the APIs?',
    answer: 'We offer both free and premium API plans. Free plans have basic features and rate limits, while premium plans offer advanced features, higher rate limits, and priority support. Check each API\'s pricing page for specific details.',
  },
  {
    question: 'How secure are the APIs?',
    answer: 'Security is our top priority. All our APIs use industry-standard encryption (HTTPS), require authentication, and implement rate limiting. We also provide detailed security documentation and best practices for secure integration.',
  },
  {
    question: 'Can I use the APIs for commercial purposes?',
    answer: 'Yes, you can use our APIs for commercial purposes. However, please review our terms of service and the specific API\'s usage terms to ensure compliance with our policies and any applicable rate limits.',
  },
];

const FAQSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Frequently Asked Questions
        </Typography>
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              sx={{
                mb: 2,
                borderRadius: '8px !important',
                '&:before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: '8px',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Typography variant="h6" component="h3">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQSection; 
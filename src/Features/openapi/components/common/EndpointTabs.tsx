import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import type { ParsedEndpoint } from "../../types";
import { TabPanel } from "../endpoint-tabs/TabPanel";
import { RequestTab } from "../endpoint-tabs/RequestTab";
import { ResponsesTab } from "../endpoint-tabs/ResponsesTab";

interface EndpointTabsProps {
    endpoint: ParsedEndpoint;
}

export const EndpointTabs: React.FC<EndpointTabsProps> = ({ endpoint }) => {
    const [value, setValue] = useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Request" />
                    <Tab label="Response" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <RequestTab endpoint={endpoint} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ResponsesTab responses={endpoint.operation.responses} />
            </TabPanel>
        </Box>
    );
}; 
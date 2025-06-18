import { Chip } from "@mui/material";
import type { ChipProps } from "@mui/material";
import { getMethodColor } from "../../utils";

interface MethodChipProps extends Omit<ChipProps, 'color'> {
    method: string;
}

export const MethodChip: React.FC<MethodChipProps> = ({ method, ...props }) => {
    return (
        <Chip
            label={method}
            color={getMethodColor(method)}
            size="small"
            {...props}
        />
    );
}; 
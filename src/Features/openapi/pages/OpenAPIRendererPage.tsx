import { OpenAPIRenderer } from "../components/OpenAPIRenderer";
import { sampleSpec } from "../constants";

export const OpenAPIRendererPage = () => (
    <OpenAPIRenderer spec={sampleSpec} />
)

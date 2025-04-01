import { produce } from "immer";
import { Container, Paper } from "@mui/material";
import { useState } from "react";
import TemplateSelection from "./components/TemplateSelection";
import ChannelSelection from "./components/ChannelSelection";
import MessageForm from "./components/MessageForm";
import Confirmation from "./components/Confirmation";

interface FlowState {
  template: string;
  channels: string[];
  messages: { [key: string]: { subject?: string; body: string } };
}

function App() {
  const [step, setStep] = useState(1);
  const [flowData, setFlowData] = useState<FlowState>({
    template: "",
    channels: [],
    messages: {},
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFlowData = (update: (draft: FlowState) => void) => {
    setFlowData((prev) => produce(prev, update));
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
        {step === 1 && (
          <TemplateSelection
            nextStep={nextStep}
            prevStep={prevStep}
            flowData={flowData}
            setFlowData={updateFlowData}
          />
        )}
        {step === 2 && (
          <ChannelSelection
            nextStep={nextStep}
            prevStep={prevStep}
            setFlowData={updateFlowData}
            flowData={flowData}
          />
        )}
        {step === 3 && (
          <MessageForm
            nextStep={nextStep}
            prevStep={prevStep}
            flowData={flowData}
            setFlowData={updateFlowData}
          />
        )}
        {step === 4 && <Confirmation prevStep={prevStep} flowData={flowData} />}
      </Paper>
    </Container>
  );
}

export default App;

// src/components/MessageForm.tsx

import { Button, TextField, Typography } from "@mui/material";
import { produce } from "immer";
import { useState } from "react";
import { defaultMessage } from "../utils/utils";
interface FlowData {
  channels: string[];
  messages: { [key: string]: { subject?: string; body: string } };
}

interface Step3Props {
  nextStep: () => void;
  prevStep: () => void;
  flowData: FlowData;
  setFlowData: (data: (prev: FlowData) => FlowData) => void;
}

function MessageForm({
  nextStep,
  prevStep,
  flowData,
  setFlowData,
}: Step3Props) {
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const currentChannel = flowData.channels[currentChannelIndex];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlowData((prev) =>
      produce(prev, (draft: typeof flowData) => {
        draft.messages[currentChannel] = {
          ...draft.messages[currentChannel],
          body: e.target.value,
        };
      })
    );
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlowData((prev) =>
      produce(prev, (draft: typeof flowData) => {
        draft.messages[currentChannel] = {
          ...draft.messages[currentChannel],
          subject: e.target.value,
        };
      })
    );
  };

  const handleNext = () => {
    if (currentChannelIndex < flowData.channels.length - 1) {
      setCurrentChannelIndex((prev) => prev + 1);
    } else {
      nextStep();
    }
  };

  return (
    <>
      <Typography variant="h6">Mensaje para {currentChannel}</Typography>
      {/* Campo de asunto solo si el canal es Email */}
      {currentChannel === "Email" && (
        <TextField
          label="Asunto"
          fullWidth
          value={
            flowData.messages[currentChannel]?.subject ||
            defaultMessage(currentChannel).subject
          }
          onChange={handleSubjectChange}
          sx={{ mb: 2 }}
        />
      )}
      <TextField
        label="Mensaje"
        multiline
        fullWidth
        rows={3}
        value={
          flowData.messages[currentChannel]?.body ||
          defaultMessage(currentChannel).body
        }
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <Button
        onClick={() =>
          currentChannelIndex > 0
            ? setCurrentChannelIndex((prev) => prev - 1)
            : prevStep()
        }
        variant="outlined"
      >
        Anterior
      </Button>
      <Button onClick={handleNext} variant="contained" sx={{ ml: 2 }}>
        {currentChannelIndex === flowData.channels.length - 1
          ? "Siguiente"
          : "Siguiente Canal"}
      </Button>
    </>
  );
}

export default MessageForm;

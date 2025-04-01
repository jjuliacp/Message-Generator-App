import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
  flowData: { channels: string[] };
  setFlowData: (
    data: (prev: { channels: string[] }) => { channels: string[] }
  ) => void;
}

function ChannelSelection({
  nextStep,
  prevStep,
  setFlowData,
  flowData,
}: Step2Props) {
  const handleToggle = (channel: string) => {
    setFlowData((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((c) => c !== channel)
        : [...prev.channels, channel],
    }));
  };

  return (
    <>
      <Typography variant="h6">Selecciona los Canales</Typography>
      <FormGroup>
        {["SMS", "Email", "WhatsApp"].map((channel) => (
          <FormControlLabel
            key={channel}
            control={
              <Checkbox
                checked={flowData.channels.includes(channel)}
                onChange={() => handleToggle(channel)}
              />
            }
            label={channel}
          />
        ))}
      </FormGroup>
      <Button onClick={prevStep} variant="outlined" sx={{ mt: 2 }}>
        Anterior
      </Button>
      <Button
        onClick={nextStep}
        variant="contained"
        sx={{ mt: 2, ml: 2 }}
        disabled={flowData.channels.length === 0}
      >
        Siguiente
      </Button>
    </>
  );
}

export default ChannelSelection;

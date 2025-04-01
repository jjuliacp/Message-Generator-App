import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { produce } from "immer"; // Importa Immer

interface Step1Props {
  nextStep: () => void;
  setFlowData: (
    data: (prev: { template: string }) => { template: string }
  ) => void;
  flowData: { template: string };
}

export default function TemplateSelection({
  nextStep,
  flowData,
  setFlowData,
}: Step1Props) {
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlowData((prev) =>
      produce(prev, (draft: { template: string }) => {
        draft.template = e.target.value; // Mutación segura con Immer
      })
    );
  };

  const handleCancel = () => {
    setFlowData((prev) =>
      produce(prev, (draft: { template: string }) => {
        draft.template = ""; // Restablecer el valor de template usando Immer
      })
    );
  };

  return (
    <>
      <Typography variant="h6">Selecciona una Plantilla</Typography>
      <RadioGroup value={flowData.template} onChange={handleSelect}>
        {["Invitacion", "Recordatorio", "Personalizado"].map((template) => (
          <FormControlLabel
            key={template}
            value={template}
            control={<Radio />}
            label={template}
          />
        ))}
      </RadioGroup>
      <Box sx={{ display: "flex", mt: 2 }}>
        <Button onClick={handleCancel} variant="text">
          Cancelar
        </Button>
        <Button onClick={nextStep} variant="contained">
          Siguiente
        </Button>
      </Box>
    </>
  );
}

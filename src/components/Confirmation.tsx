import { Alert, Button, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { defaultMessage } from "../utils/utils";

interface Step4Props {
  prevStep: () => void;
  flowData: {
    template: string;
    channels: string[];
    messages: { [key: string]: { subject?: string; body: string } };
    processName: string;
  };
}

function Confirmation({ prevStep, flowData }: Step4Props) {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Simular el envío al console.log
  const handleSend = () => {
    // Asegurar que todos los canales tengan un mensaje asignado
    const updatedMessages = flowData.channels.reduce((acc, channel) => {
      acc[channel] =
        flowData.messages[channel] ||
        defaultMessage(channel, flowData.processName);
      return acc;
    }, {} as { [key: string]: { subject?: string; body: string } });

    const dataToSend = {
      template: flowData.template,
      channels: flowData.channels,
      messages: updatedMessages,
    };

    console.log("Datos a enviar:", dataToSend);

    setOpenSnackbar(true); // Mostrar que se envió
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Confirmación
      </Typography>
      <Typography variant="subtitle1">
        Plantilla Seleccionada: {flowData.template}
      </Typography>
      <Typography variant="subtitle1">Canales Seleccionados:</Typography>
      <ul>
        {flowData.channels.map((channel) => {
          const message = flowData.messages[channel] || defaultMessage(channel);
          return (
            <li key={channel}>
              <Typography variant="body1">{channel}</Typography>
              {channel === "Email" && (
                <Typography variant="body2">
                  Asunto: {message.subject}
                </Typography>
              )}
              <Typography variant="body2">Mensaje: {message.body}</Typography>
            </li>
          );
        })}
      </ul>
      <Button onClick={prevStep} variant="outlined" sx={{ mt: 2, mr: 1 }}>
        Anterior
      </Button>
      <Button
        onClick={handleSend}
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Enviar
      </Button>

      {/* Snackbar para mostrar el mensaje de éxito */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          ¡Datos enviados con éxito!
        </Alert>
      </Snackbar>
    </>
  );
}

export default Confirmation;

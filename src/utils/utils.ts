export const defaultMessage = (channel: string): { subject?: string; body: string } => {
    switch (channel) {
        case "Email":
            return {
                subject: `Recordatorio del proceso  [Nombre del proceso]`,
                body: `Hola [nombre], te invitamos a participar en el proceso de [nombre del proceso]. Confirma tu asistencia respondiendo este mensaje. ¡Te esperamos!`,
            };
        case "SMS":
            return {
                body: `Hola [nombre], te invitamos a participar en el proceso de [nombre del proceso]. Confirma tu asistencia respondiendo este mensaje. ¡Te esperamos!`,
            };
        case "WhatsApp":
            return {
                body: `Hola [nombre], te invitamos a participar en el proceso de [nombre del proceso]. Confirma tu asistencia respondiendo este mensaje. ¡Te esperamos!`,
            };
        default:
            return { body: "" };
    }
};

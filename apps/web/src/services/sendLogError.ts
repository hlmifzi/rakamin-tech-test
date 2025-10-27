export const sendLogError = (...args: any) => {
  const SERVICE_IDENTIFIER = `FRONTEND-V2-LOGGING`;
  const [message, data, API_URL, endPoint, error] = args;
  const errPayload = {
    message: `${SERVICE_IDENTIFIER} - ${message}`,
    timestamp: new Date(),
    payload: {
      endpoint: `${API_URL}/${endPoint}`,
      data,
      error,
    },
  };
  console.log('error: ',errPayload);

  return;
};

//
// handle api responses by retrieving embedded error message(s)

const apiErrorHandler = (e: any) => {
  const errors = [] as any;
  if (e?.response?.data) {
    const response = e.response.data;

    if (typeof response === "string")
      if (response.includes("<!DOCTYPE html>"))
        errors.push("We're sorry, but something went wrong. Our team has been notified.");
      else errors.push(response);

    if (typeof response === "object") {
      Object.values(response).map((error: any, index) => {
        if (error && typeof error === "string") errors.push(error);
        else if (typeof error === "object" && error[index].length > 0) {
          if (error[index] && typeof error[index] === "string") errors.push(error);
          else
            error[index].map((err: { key: any; message: any }) => {
              errors.push(`${err.key}: ${err.message}`);
            });
        } else errors.push("We're sorry, but something went wrong. Our team has been notified.");
      });
    }
  }
  return errors.join(", ");
};
export default apiErrorHandler;

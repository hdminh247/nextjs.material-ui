export const errorHandler = (e: any) => {
  const errors = [] as any;

  if (e.response.data && typeof e.response.data === "string") {
    errors.push(e.response.data);
  }

  if (e.response.data && typeof e.response.data === "object") {
    Object.keys(e.response.data).map((name: any) => {
      // String error format
      if (e.response.data[name] && typeof e.response.data[name] === "string") {
        errors.push(e.response.data[name]);
      }

      // Array error format
      if (typeof e.response.data[name] === "object" && e.response.data[name].length > 0) {
        e.response.data[name].map((item: { attribute: any; message: any }) => {
          errors.push(`${item.attribute} ${item.message}`);
        });
      }
    });
  }

  return { error: true, data: null, errors };
};

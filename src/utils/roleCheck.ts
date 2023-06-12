const availableRoles = {
  ADMIN: "admin",
  RETAILEr: "retailer",
  SUPPLIER: "supplier",
  REGULAR: "regular",
};

export const isAdmin = (role: string | undefined): boolean => {
  return role === availableRoles.ADMIN;
};

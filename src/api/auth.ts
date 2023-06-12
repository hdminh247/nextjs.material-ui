import { api, nextApi, setAuthHeader } from "./axios";
import axios from "axios";

// Register normal user
export const registerUser = async ({ email, password, name }: Register.ApiPayload) => {
  return await api
    .post("/api/v1/users", {
      email,
      password,
      password_confirmation: password,
      full_name: name,
    })
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      const errors = [] as any;

      // return { error: true, data: null, errors: e.response.data.errors };

      if (e.response.data && typeof e.response.data === "string") {
        errors.push(e.response.data);
      }

      if (e.response.data && typeof e.response.data === "object") {
        Object.keys(e.response.data).map((name: any) => {
          if (e.response.data[name].length > 0) {
            e.response.data[name].map((item: { attribute: any; message: any }) => {
              errors.push(`${item.attribute} ${item.message}`);
            });
          }
        });
      }

      return { error: true, data: null, errors };
    });
};

// Social register user
export const socialRegisterUser = async ({
  email,
  name,
  socialId,
  provider,
}: Register.ApiSocialPayload): Promise<RestApi.Response> => {
  return api
    .post("/api/v1/users", {
      email,
      full_name: name,
      social_id: socialId,
      provider,
    })
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      const errors = [] as any;
      // return { error: true, data: null, errors: e.response.data.errors };

      if (e.response.data && typeof e.response.data === "string") {
        errors.push(e.response.data);
      }

      if (e.response.data && typeof e.response.data === "object") {
        Object.keys(e.response.data).map((name: any) => {
          if (e.response.data[name].length > 0) {
            e.response.data[name].map((item: { attribute: any; message: any }) => {
              errors.push(`${item.attribute} ${item.message}`);
            });
          }
        });
      }

      return { error: true, data: null, errors };
    });
};

// Edit normal user
export const editUser = async (data: Register.ApiEditUserPayload) => {
  // Parse data, only submit valid data
  const submitData = {};

  Object.keys(data).map((key) => {
    if (data[key]) {
      submitData[key] = data[key];
    }
  });

  return await api
    .put(`/api/v1/users/${data.id}`, submitData)
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
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
    });
};

// Create artist
export const createArtistProfile = async (data: Register.ApiCreateArtistPayload) => {
  // Parse data, only submit valid data
  const submitData = {};

  Object.keys(data).map((key) => {
    if (data[key]) {
      submitData[key] = data[key];
    }
  });

  return await api
    .post(`/api/v1/artists`, submitData)
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
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
    });
};

// Edit artist
export const editArtistProfile = async (data: Register.ApiEditArtistPayload) => {
  // Parse data, only submit valid data
  const submitData = {};

  Object.keys(data).map((key) => {
    if (data[key] !== undefined) {
      submitData[key] = data[key];
    }
  });

  return await api
    .put(`/api/v1/artists/${data.id}`, submitData)
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
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
    });
};

// Update artist avatar
export const updateArtistAvatar = async (data: Register.ApiUpdateAvatarPayload) => {
  const payload = new FormData();
  payload.append("avatar", data.file);
  return await api
    .put(`/api/v1/artists/${data.id}`, payload)
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
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
    });
};

// Update studio avatar
export const updateStudioAvatar = async (data: Register.ApiUpdateAvatarPayload) => {
  const payload = new FormData();
  payload.append("avatar", data.file);
  return await api
    .put(`/api/v1/studios/${data.id}`, payload)
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
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
    });
};

// Create studio
export const createStudioProfile = async (data: Register.ApiCreateStudioPayload) => {
  // Parse data, only submit valid data
  const submitData = {};

  Object.keys(data).map((key) => {
    if (data[key]) {
      submitData[key] = data[key];
    }
  });

  return await api
    .post(`/api/v1/studios`, submitData)
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
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
    });
};

// Edit studio
export const editStudioProfile = async (data: Register.ApiEditStudioPayload) => {
  // Parse data, only submit valid data
  const submitData = {};

  Object.keys(data).map((key) => {
    if (data[key]) {
      submitData[key] = data[key];
    }
  });

  return await api
    .put(`/api/v1/studios/${data.id}`, submitData)
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
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
    });
};

// Login for normal user
export async function loginUser(email: string, password: string): Promise<RestApi.Response> {
  return await api
    .post("/api/v1/sessions/login", {
      user: { email, password },
    })
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      return { error: true, data: null, errors: e.response.data.errors };
    });
}

export async function logoutUser(): Promise<RestApi.Response> {
  return await api
    .delete("/api/v1/sessions/logout")
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      return { error: true, data: null, errors: e.response.data.errors };
    });
}

// Social login
export async function socialLoginUser(socialId: number, email: string): Promise<RestApi.Response> {
  return await api
    .post("/api/v1/sessions/login", {
      user: { social_id: socialId, email },
    })
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
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
    });
}

// Request to reset password
export async function requestResetPassword(email: any | undefined): Promise<RestApi.Response> {
  return await api
    .post("/api/v1/passwords", email)
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      return { error: true, data: null, errors: e.response ? e.response.data.errors : e.toString() };
    });
}

// Reset password
export async function resetPassword({
  password,
  confirmPassword,
  token,
}: {
  password: string;
  confirmPassword: string;
  token: string | string[] | undefined;
}): Promise<RestApi.Response> {
  return await api
    .put(`/api/v1/passwords/change_password?token=${token ? token.toString() : ""}`, {
      password,
      password_confirmation: confirmPassword,
    })
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      return { error: true, data: null, errors: e.response ? e.response.data.errors : e.toString() };
    });
}

// Get Instagram access token
export async function getInstagramAccessToken(data: any): Promise<RestApi.Response> {
  return axios
    .post("https://api.instagram.com/oauth/access_token", data, {
      // You need to use `getHeaders()` in Node.js because Axios doesn't
      // automatically set the multipart form boundary in Node.
      headers: data.getHeaders(),
    })
    .then(function (response) {
      return { error: false, data: response.data, errors: "" };
    })
    .catch(function (e) {
      //handle error
      return { error: true, data: null, errors: e.message };
    });
}

// Get instagram profile by code and redirect url
export async function getInstagramProfile({ code, redirectUrl }: { code: any; redirectUrl: string }) {
  const { data } = await nextApi.post(`/api/get-instagram-token-by-code`, { code, redirectUrl });
  // Error happens, just redirect it to parent call
  if (data.error) {
    return data;
  } else {
    // Use token return to get user info
    const result = await nextApi.get(
      `https://graph.instagram.com/me?fields=id,username&access_token=${data.data.access_token}`,
    );

    return { error: false, data: result.data, errors: "" };
  }
}

export function verifyUser(token?: string) {
  // If token is defined, set it in header
  if (token) {
    setAuthHeader(token);
  }
  return api.get("api/v1/me");
}

// Change password
export async function changePassword({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}): Promise<RestApi.Response> {
  return await api
    .put(`/api/v1/passwords/change_password`, {
      password,
      password_confirmation: confirmPassword,
    })
    .then((response) => {
      return { error: false, data: response.data, errors: "" };
    })
    .catch((e) => {
      return { error: true, data: null, errors: e.response ? e.response.data.errors : e.toString() };
    });
}

export const magicLinkLogin = async (email: string) => {
  const { data } = await api.get(`/api/v1/sessions/login_token?email=${email}`);
  return data;
};

export const validateMagicLinkLoginToken = async (token: string | string[]) => {
  const { data } = await api.post(`/api/v1/sessions/magic_link`, { login_token: token });
  return data;
};

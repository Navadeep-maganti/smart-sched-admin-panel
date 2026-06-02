import { z } from "zod";
import { axiosInstance } from "./axios";
import type { UserProfile } from "../types";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "HOD"]),
  remember: z.boolean().optional(),
});

export const login = async (payload: z.infer<typeof loginSchema>) => {
  loginSchema.parse(payload);
  const response = await axiosInstance.post("/auth/login/", {
    email: payload.email,
    password: payload.password,
    role: payload.role.toUpperCase(),
  });
  return response.data;
};

export const fetchProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get("/auth/me/");
  return response.data;
};

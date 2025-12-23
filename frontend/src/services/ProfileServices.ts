import apiClient from "./apiClient";
import type { Profile } from "../types/Profile";

export async function fetchProfile(): Promise<Profile> {
  const res = await apiClient.get("/api/profile");
  return res.data;
}

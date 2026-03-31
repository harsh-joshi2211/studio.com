/**
 * API client for studio booking backend.
 * All requests are made to the FastAPI backend running at VITE_API_URL.
 */

import type { Studio } from "@/components/StudioCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Booking response type returned by the backend.
 */
export interface Booking {
  id: string;
  studio_id: string;
  booking_date: string; // ISO 8601 datetime string
  user_email: string;
  created_at: string; // ISO 8601 datetime string
}

/**
 * Fetch all studios with optional filters.
 */
export async function fetchStudios(type?: string, location?: string): Promise<Studio[]> {
  const params = new URLSearchParams();
  if (type) params.append("type", type);
  if (location) params.append("location", location);

  const response = await fetch(`${API_URL}/api/studios?${params}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch studios: ${response.status} ${errorText}`);
  }
  return response.json();
}

/**
 * Fetch a single studio by ID.
 * Returns null if studio not found (404).
 */
export async function fetchStudio(id: string): Promise<Studio | null> {
  const response = await fetch(`${API_URL}/api/studios/${id}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch studio: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Create a new booking.
 * @param data - Booking data with studio_id, booking_date (ISO string), user_email
 */
export async function createBooking(
  data: { studio_id: string; booking_date: string; user_email: string }
): Promise<Booking> {
  const response = await fetch(`${API_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ detail: "Failed to create booking" }));
    throw new Error(errorBody.detail || "Failed to create booking");
  }

  return response.json();
}

/**
 * Check API health.
 */
export async function checkHealth(): Promise<{ status: string; service?: string }> {
  const response = await fetch(`${API_URL}/health`);
  if (!response.ok) {
    throw new Error(`Health check failed: ${response.statusText}`);
  }
  return response.json();
}

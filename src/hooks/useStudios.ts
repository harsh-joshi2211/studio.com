import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchStudios, fetchStudio, createBooking, Booking } from "@/lib/api";
import type { Studio } from "@/components/StudioCard";

/**
 * Hook to fetch a list of studios with optional filtering.
 *
 * @param type - Optional studio type filter (exact match)
 * @param location - Optional location filter (partial match)
 * @returns Query result with studios, loading, error states
 *
 * @example
 * const { data: studios, isLoading, error } = useStudios(type="Recording");
 */
export function useStudios(type?: string, location?: string) {
  return useQuery<Studio[], Error>({
    queryKey: ["studios", type, location],
    queryFn: () => fetchStudios(type, location),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch a single studio by ID.
 *
 * @param id - Studio ID (MongoDB ObjectId as string)
 * @returns Query result with studio, loading, error states
 *
 * @example
 * const { data: studio, isLoading } = useStudio("64b7f...");
 */
export function useStudio(id: string) {
  return useQuery<Studio, Error>({
    queryKey: ["studio", id],
    queryFn: () => fetchStudio(id),
    enabled: !!id,
  });
}

/**
 * Hook to create a new booking.
 * Automatically invalidates bookings queries on success.
 */
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation<Booking, Error, { studio_id: string; booking_date: string; user_email: string }>({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

import { useQuery } from '@tanstack/react-query'
import { getUser } from "@/api/AuthAPI";

/**
 * useAuth Custom Hook
 * 
 * Handles user authentication state by fetching user data from the API
 * Provides loading and error states along with the user data
 * 
 * @returns {Object} An object containing:
 *   - data: The user data if authenticated
 *   - isError: Boolean indicating if an error occurred
 *   - isLoading: Boolean indicating if the request is in progress
 */
export const useAuth = () => {
    // Use React Query to fetch user data
    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],  // Unique key for this query
        queryFn: getUser,    // Function that performs the API call
        retry: 1,           // Only retry once if the query fails
        refetchOnWindowFocus: false  // Disable refetch when window regains focus
    })

    // Return the query results for consumption by components
    return { data, isError, isLoading }
}
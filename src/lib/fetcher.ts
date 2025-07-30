/**
 * For example purpose
 */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const fetcher = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) throw new Error("API request failed");
  return response.json();
};

/**
 * How it an be used in front-end
 *  */
export const getUser = async (id: string) => fetcher(`/users/${id}`);

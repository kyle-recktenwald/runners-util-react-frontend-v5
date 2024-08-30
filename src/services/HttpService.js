import AuthService from "./AuthService";

class HttpUtilService {
  /**
   * Performs a fetch API call with the appropriate Authorization header.
   *
   * @param {string} url - The endpoint URL.
   * @param {object} options - Fetch API options.
   * @returns {Promise} - The fetch API promise.
   */
  static async apiFetch(url, options = {}) {
    try {
      // Ensure the token is updated and valid
      await AuthService.updateToken();

      const token = AuthService.getToken();

      // Set up headers
      const headers = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Check if response is ok (status in the range 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      return response.json();
    } catch (error) {
      console.error("HTTP Request failed:", error);
      throw error;
    }
  }
}

export default HttpUtilService;

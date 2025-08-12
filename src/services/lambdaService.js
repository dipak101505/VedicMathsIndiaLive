// AWS Lambda Function URL service
import { API_ENDPOINTS } from '../utils/constants';

// Base Lambda service class
class LambdaService {
  constructor() {
    this.baseURL = API_ENDPOINTS.BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Set authentication token
  setAuthToken(token) {
    if (token) {
      this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders['Authorization'];
    }
  }

  // Generic request method
  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        method: options.method || 'GET',
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
        ...options,
      };

      // Add body for POST/PUT requests
      if (options.body && ['POST', 'PUT', 'PATCH'].includes(config.method)) {
        config.body = JSON.stringify(options.body);
      }

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // User Management API calls
  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `${API_ENDPOINTS.USERS}${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getUser(userId) {
    return this.request(`${API_ENDPOINTS.USERS}/${userId}`);
  }

  async createUser(userData) {
    return this.request(API_ENDPOINTS.USERS, {
      method: 'POST',
      body: userData,
    });
  }

  async updateUser(userId, userData) {
    return this.request(`${API_ENDPOINTS.USERS}/${userId}`, {
      method: 'PUT',
      body: userData,
    });
  }

  async deleteUser(userId) {
    return this.request(`${API_ENDPOINTS.USERS}/${userId}`, {
      method: 'DELETE',
    });
  }

  // Course Management API calls
  async getCourses(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `${API_ENDPOINTS.COURSES}${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getCourse(courseId) {
    return this.request(`${API_ENDPOINTS.COURSES}/${courseId}`);
  }

  async createCourse(courseData) {
    return this.request(API_ENDPOINTS.COURSES, {
      method: 'POST',
      body: courseData,
    });
  }

  async updateCourse(courseId, courseData) {
    return this.request(`${API_ENDPOINTS.COURSES}/${courseId}`, {
      method: 'PUT',
      body: courseData,
    });
  }

  async deleteCourse(courseId) {
    return this.request(`${API_ENDPOINTS.COURSES}/${courseId}`, {
      method: 'DELETE',
    });
  }

  // Enrollment Management API calls
  async getEnrollments(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `${API_ENDPOINTS.ENROLLMENTS}${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async enrollUser(enrollmentData) {
    return this.request(API_ENDPOINTS.ENROLLMENTS, {
      method: 'POST',
      body: enrollmentData,
    });
  }

  async updateEnrollment(enrollmentId, enrollmentData) {
    return this.request(`${API_ENDPOINTS.ENROLLMENTS}/${enrollmentId}`, {
      method: 'PUT',
      body: enrollmentData,
    });
  }

  // Analytics API calls
  async getAnalytics(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `${API_ENDPOINTS.ANALYTICS}${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getDashboardStats() {
    return this.request(`${API_ENDPOINTS.ANALYTICS}/dashboard`);
  }

  // Authentication API calls
  async validateToken(token) {
    return this.request(`${API_ENDPOINTS.AUTH}/validate`, {
      method: 'POST',
      body: { token },
    });
  }

  async refreshToken(refreshToken) {
    return this.request(`${API_ENDPOINTS.AUTH}/refresh`, {
      method: 'POST',
      body: { refreshToken },
    });
  }
}

// Create and export service instance
export const lambdaService = new LambdaService();

// Export the class for testing or custom instances
export { LambdaService };

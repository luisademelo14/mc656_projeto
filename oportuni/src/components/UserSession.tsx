// components/UserSession.ts
class UserSession {
    private static instance: UserSession;
    private isAuthenticated: boolean;
  
    private constructor() {
      // Check if running in a browser before accessing localStorage
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        this.isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
      } else {
        this.isAuthenticated = false; // Default to false if not in a browser
      }
    }
  
    static getInstance(): UserSession {
      if (!UserSession.instance) {
        UserSession.instance = new UserSession();
      }
      return UserSession.instance;
    }
  
    login() {
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        this.isAuthenticated = true;
        localStorage.setItem("isAuthenticated", "true"); // Persist login status
      }
    }
  
    logout() {
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        this.isAuthenticated = false;
        localStorage.removeItem("isAuthenticated"); // Clear login status
      }
    }
  
    isUserAuthenticated(): boolean {
      return this.isAuthenticated;
    }
  }
  
  export default UserSession;
  
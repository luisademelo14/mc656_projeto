// components/UserSession.ts
class UserSession {
    private static instance: UserSession;
    private isAuthenticated: boolean;
  
    private constructor() {
      // Check localStorage for previous authentication status
      this.isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    }
  
    static getInstance(): UserSession {
      if (!UserSession.instance) {
        UserSession.instance = new UserSession();
      }
      return UserSession.instance;
    }
  
    login() {
      this.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true"); // Persist login status
    }
  
    logout() {
      this.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated"); // Clear login status
    }
  
    isUserAuthenticated(): boolean {
      return this.isAuthenticated;
    }
  }
  
  export default UserSession;
  
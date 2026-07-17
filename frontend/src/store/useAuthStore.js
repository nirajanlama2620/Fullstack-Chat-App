import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  // Initial state
  authUser: null,  //Stores logged-in user data // null = no user logged in
  isSigningUp: false,  // Tracks signup process // true → signup in progress // false → idle
  isLoggingIn: false,  //  Tracks login process // Used to show loading spinner
  isUpdatingProfile: false,  // Tracks profile update process  // Helps disable button / show loader
  isCheckingAuth: true,  // Checks if user is already logged in // Usually runs when app starts
  onlineUsers: [],  // Stores list of currently online users // Used in chat apps (real-time status)
  socket: null,


  // checkAuth checks whether the user is already logged in or not when the app starts.
  /**
       * App opens
       * checkAuth() runs
       * Backend checks cookie/token
       * If valid → user logged in
       * If not → user set to null
       * Loading stops
       */
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");  // Sends request to backend // Backend verifies user (usually via cookie/JWT)
      set({ authUser: res.data }); // If SUCCESS  Stores user data in global state // Means user is logged in
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });  // Stops loading state // App knows auth check is finished
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      /**
       * set(...) => Function provided by Zustand store => Used to update state globally
       * Similar to setState in React, but for global store
       * authUser: now holds logged-in user : res.data = data returned from API (logged-in user info)
       */
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    //Gets the currently logged-in user from the store.
    const { authUser } = get();
    // Prevents unnecessary connections:
    // If no user is logged in → don’t connect
    // If socket is already connected → don’t reconnect
    if (!authUser || get().socket?.connected) return;

    // Creates a new Socket.IO connection:
    // Connects to your backend (BASE_URL)
    // Sends userId as a query parameter (useful for identifying users on the server)
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    // Stores the socket instance in your global state
    set({ socket: socket });

    // Listens for a server event called "getOnlineUsers"
    // Receives a list of user IDs (userIds)
    // Updates the state with currently online users
    //  This is typically used for:
    // - Showing online status
    // - Chat apps (who’s active)
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
    //   Checks if socket exists and is connected
    // If yes → disconnects it
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
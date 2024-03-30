import { auth } from "firebase-admin";

// Function to create a new user with email and password
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const user = await auth().createUser({
      email,
      password,
    });
    return user.uid;
  } catch (error) {
    throw error;
  }
}
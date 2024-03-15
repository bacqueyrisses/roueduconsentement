export async function retry<T>(
  operation: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000,
): Promise<T> {
  let attempts: number = 0;

  while (attempts < maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      attempts++;
      if (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }

  throw new Error("Maximum number of retry attempts reached.");
}

// This is temporary until @types/react-dom is updated
export const initialState: any = {};
export type PrevState = any;

export function getEnvSafely(envKey, defaultValue) {
    const value = process.env[envKey];

    if (value === undefined) {
        if (defaultValue !== undefined) {
            return defaultValue; // Use the provided default value
        }

        throw new Error(`Missing required environment variable: ${envKey}`);
    }

    return value;
}

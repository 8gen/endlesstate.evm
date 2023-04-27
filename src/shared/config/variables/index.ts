const getEnvVar = (key: string) => {
    /*@ts-ignore*/
    const env = import.meta.env[key]
    if (env === undefined) {
        throw new Error(`Env variable ${key} is required`);
    }

    return env || "";
};

export const projectId = getEnvVar("VITE_PROJECT_ID");
export const chainId = getEnvVar("VITE_CHAIN_ID");
export const rpc = chainId === '1' ? getEnvVar("VITE_MAINNET_RPC") : getEnvVar("VITE_TESTNET_RPC");


export const NODE_ENV = getEnvVar("MODE");

export const isDevEnv = NODE_ENV === "development";

export const isProdEnv = NODE_ENV === "production";
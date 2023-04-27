
import compose from "compose-function";
import { withWagmi } from "./with-wagmi";

export const withProviders = compose(
    withWagmi,
);
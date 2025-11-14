import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Writing = GetTypeByName<typeof configuration, "Writing">;
export declare const allWritings: Array<Writing>;

export {};

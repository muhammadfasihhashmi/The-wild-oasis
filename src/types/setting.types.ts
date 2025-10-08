import { Tables, TablesInsert, TablesUpdate } from "@/types/database.types";

//fetching
export type Setting = Tables<"settings">;
//inserting
export type InsertSetting = TablesInsert<"settings">;
//updating
export type UpdateSetting = TablesUpdate<"settings">;

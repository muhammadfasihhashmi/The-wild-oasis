import { Tables, TablesInsert, TablesUpdate } from "@/types/database.types";

//fetching
export type Guest = Tables<"guests">;
//inserting
export type InsertGuest = TablesInsert<"guests">;
//updating
export type UpdateGuest = TablesUpdate<"guests">;

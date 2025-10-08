import { Tables, TablesInsert, TablesUpdate } from "@/types/database.types";

//fetching
export type Contact = Tables<"contact">;
//inserting
export type InsertContact = TablesInsert<"contact">;
//updating
export type UpdateContact = TablesUpdate<"contact">;

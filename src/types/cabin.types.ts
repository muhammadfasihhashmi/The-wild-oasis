import { Tables, TablesInsert, TablesUpdate } from "@/types/database.types";

//fetching
export type Cabin = Tables<"cabins">;
//inserting
export type InsertCabin = Omit<TablesInsert<"cabins">, "image"> & {
  image: File;
};
//duplicating
export type DuplicateCabin = Omit<TablesInsert<"cabins">, "id">;
//editing
export type EditCabin = {
  description: string;
  discount: number;
  image?: File;
  maxCapacity: number;
  name: string;
  regularPrice: number;
  imageUrl: string;
};
//updating
export type UpdateCabin = TablesUpdate<"cabins">;

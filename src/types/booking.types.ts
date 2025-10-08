import { Tables, TablesInsert, TablesUpdate } from "@/types/database.types";
import { Cabin } from "./cabin.types";
import { Guest } from "./guest.types";

//fetching
export type Booking = Tables<"bookings"> & {
  cabins: Cabin;
  guests: Guest;
};
//inserting
export type InsertBooking = TablesInsert<"bookings">;
//updating
export type UpdateBooking = TablesUpdate<"bookings">;

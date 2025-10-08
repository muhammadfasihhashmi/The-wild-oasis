import { supabase } from "@/lib/supabaseClient";
import { getToday } from "@/utils/helpers";

export async function getBookingAfterDate(date: string) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("created_at, totalPrice, extrasPrice")
      .gte("created_at", date)
      .lte("created_at", getToday({ end: true }));

    if (error) {
      throw new Error(`Failed to fetch bookings after date: ${error.message}`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred while fetching bookings");
  }
}

export async function getStaysAfterDate(date: string) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, guests(fullName)")
      .gte("startDate", date)
      .lte("startDate", getToday());

    if (error) {
      throw new Error(`Failed to fetch stays after date: ${error.message}`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred while fetching stays");
  }
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, guests(fullName, nationality, countryFlag)")
      .or(
        `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
      )
      .order("created_at");

    if (error) {
      throw new Error(`Failed to fetch today's activities: ${error.message}`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(
      "An unexpected error occurred while fetching today's activities"
    );
  }
}

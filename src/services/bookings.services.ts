import { supabase } from "@/lib/supabaseClient";

export async function getBookings(
  { page = 1, limit = 10 }: { page: number; limit: number },
  filter?: { field: string; value: string } | null,
  sorter?: { column: string; direction: string } | null
) {
  try {
    console.log("page", page, "limit", limit);
    const from = (page - 1) * limit;
    const to = from + (limit - 1);

    let query = supabase
      .from("bookings")
      .select("*, cabins(*), guests(*)", { count: "exact" })
      .range(from, to);

    if (filter) query = query.eq(filter.field, filter.value);

    if (sorter)
      query = query.order(sorter.column, {
        ascending: sorter.direction === "asc",
      });

    const { data, error, count } = await query;
    const totalPages = count ? Math.ceil(count / limit) : 0;

    if (error) {
      if (error.message === '{"') {
        throw new Error("Out of range error");
      }

      throw new Error(error.message);
    }

    return {
      data,
      pagination: {
        page,
        limit,
        totalPages,
        count: count ?? 0,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        from: count ? from + 1 : 0,
        to: count ? Math.min(to + 1, count) : 0,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error while getting bookings");
    }
  }
}

export async function deleteBooking(id: number) {
  try {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return "Booking deleted successfully";
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error while getting bookings");
    }
  }
}

export async function editBookingStatus({
  id,
  status,
}: {
  id: number;
  status: string;
}) {
  try {
    let newStatus: string = status;
    let message: string = "";

    if (status === "checked-in") {
      newStatus = "checked-out";
      message = "Checked out successfully!";
    } else if (status === "unconfirmed") {
      newStatus = "checked-in";
      message = "Checked in successfully!";
    }
    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus, isPaid: true })
      .eq("id", id)
      .select();

    if (error) throw new Error(error.message);

    return message;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error while getting bookings");
    }
  }
}

export async function getBookingById(id: number) {
  try {
    if (!id) throw new Error("ID is undefined");
    const { data, error } = await supabase
      .from("bookings")
      .select("*, cabins(*), guests(*)")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to get Booking");
    }
  }
}

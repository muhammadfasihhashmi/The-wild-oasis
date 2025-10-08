import { supabase } from "@/lib/supabaseClient";
import { UpdateSetting } from "@/types/setting.types";

export async function getSettings() {
  try {
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("something went wrong");
    }
  }
}

export async function updateSettings(updatedSettings: UpdateSetting) {
  try {
    const { data, error } = await supabase
      .from("settings")
      .update(updatedSettings)
      .eq("id", 1)
      .select();

    if (error) throw new Error(error.message);
    return { data, message: "Setiings updated successfully" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("something went wrong");
    }
  }
}

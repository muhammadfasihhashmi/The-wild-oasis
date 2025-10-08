import { supabase } from "@/lib/supabaseClient";

export async function userLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return { data, message: "Login Successfully!" };
}

export async function userLogout() {
  await supabase.auth.signOut();
  return true;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) throw new Error("user not found");

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data.user;
}

export async function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const { data: currentSession } = await supabase.auth.getSession();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw new Error(error.message);

    if (currentSession.session) {
      await supabase.auth.setSession(currentSession.session);
    } else {
      await supabase.auth.signOut();
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("something went wrong");
    }
  }
}

export async function editUser({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image?: File;
}) {
  try {
    let publicUrl: string | undefined;
    if (image) {
      const imagePath = `${Date.now()}-${image.name.replaceAll("/", "-")}`;

      const { data: imageData, error: imageError } = await supabase.storage
        .from("avatars")
        .upload(imagePath, image);
      if (imageError) throw new Error(imageError.message);

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(imageData.path);

      publicUrl = data.publicUrl;
    }

    const { data, error } = await supabase.auth.updateUser({
      email,
      data: { name, ...(publicUrl && { userImage: publicUrl }) },
    });
    if (error) {
      console.log(error.message);

      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("something went wrong");
    }
  }
}

export async function editUserPassword({ password }: { password?: string }) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });
    if (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("something went wrong");
    }
  }
}

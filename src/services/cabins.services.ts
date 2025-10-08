import { supabase } from "@/lib/supabaseClient";
import { DuplicateCabin, EditCabin, InsertCabin } from "@/types/cabin.types";

export async function getCabins() {
  try {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) throw new Error(error.message);
    if (!data) return [];

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Cabins not found!");
    }
  }
}

export async function addCabin(newCabin: InsertCabin) {
  try {
    //1.create apropriate image path
    const imagePath = `${Date.now()}-${newCabin.image.name.replaceAll(
      "/",
      "-"
    )}`;
    //2. upload image to databse
    const { data: imageData, error: imageError } = await supabase.storage
      .from("cabinimages")
      .upload(imagePath, newCabin.image);
    if (imageError) throw new Error(imageError.message);
    //3. get public url from databse
    const { data: publicUrl } = supabase.storage
      .from("cabinimages")
      .getPublicUrl(imageData.path);
    //4. add data of new cabin with publicurl to databse
    const { data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: publicUrl.publicUrl }])
      .select();
    if (error) throw new Error(error.message);
    return { data, message: "Cabin added successfully" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to add cabin");
    }
  }
}

export async function duplicateCabin(newCabin: DuplicateCabin) {
  const { description, discount, image, maxCapacity, name, regularPrice } =
    newCabin;
  try {
    const { data, error } = await supabase
      .from("cabins")
      .insert([
        {
          name: `Copy of ${name}`,
          description,
          discount,
          maxCapacity,
          regularPrice,
          image,
        },
      ])
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return { data, message: "Cabin duplicated successfully" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to add cabin");
    }
  }
}

export async function deleteCabin(id: number) {
  try {
    const { error } = await supabase.from("cabins").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return "cabin deleted successfully";
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Cabins not found!");
    }
  }
}

export async function editCabin({
  editedCabin,
  cabinId,
}: {
  editedCabin: EditCabin;
  cabinId: number;
}) {
  const {
    image,
    imageUrl,
    description,
    discount,
    maxCapacity,
    name,
    regularPrice,
  } = editedCabin;

  let publicUrl;

  try {
    //1.chech that edited cabin have image file and image url
    if (image && imageUrl) {
      //2. if new image upload del prev image
      const imagePath = imageUrl.split("/cabinimages/")[1];
      const { error: deleteEror } = await supabase.storage
        .from("cabinimages")
        .remove([imagePath]);
      if (deleteEror) throw new Error(deleteEror.message);

      //3.uploading image to storage
      const newImagePath = `${Date.now()}-${image.name}`;
      const { data: imageData, error: imageError } = await supabase.storage
        .from("cabinimages")
        .upload(newImagePath, image);
      if (imageError) throw new Error(imageError.message);

      // 4.getting public url
      const { data: uploadData } = supabase.storage
        .from("cabinimages")
        .getPublicUrl(imageData.path);
      publicUrl = uploadData.publicUrl;
    }

    const { data, error } = await supabase
      .from("cabins")
      .update({
        name,
        description,
        maxCapacity,
        regularPrice,
        discount,
        image: publicUrl ? publicUrl : imageUrl,
      })
      .eq("id", cabinId);

    if (error) {
      throw new Error(error.message);
    }
    return { data, message: "Cabin edited successfully" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to edit the cabin details");
    }
  }
}

// export async function uploadImage(image: File): Promise<string> {
//   const FileName = image.name
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .replace(/[^a-zA-Z0-9._-]/g, "_");
//   const fileName = `cabinimage-${Date.now()}-${FileName}`;

//   try {
//     const { data: imageData, error: imageError } = await supabase.storage
//       .from("cabinimages")
//       .upload(fileName, image);
//     if (imageError) throw new Error(imageError.message);
//     if (!imageData?.path) throw new Error("upload Failed");

//     const { data: Url } = supabase.storage
//       .from("cabinimages")
//       .getPublicUrl(imageData.path);

//     if (!Url) throw new Error("URL not found");

//     return Url.publicUrl;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error("Failed to upload image");
//     }
//   }
// }

// export async function deleteImage(imagePath: string) {
//   try {
//     const url = new URL(imagePath);
//     const path = url.pathname.split("/cabinimages/")[1];
//     const { data, error } = await supabase.storage
//       .from("cabinimages")
//       .remove([path]);

//     if (error) throw new Error(error.message);
//     return data;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error("Failed to upload image");
//     }
//   }
// }

// //Cabins with discount
// export async function getDiscountedCabins() {
//   try {
//     const { data, error } = await supabase
//       .from("cabins")
//       .select("*")
//       .gt("discount", 0);
//     if (error) throw new Error(error.message);
//     return data;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error("Cabins not found!");
//     }
//   }
// }
// //cabins with no discount
// export async function getNotDiscountedCabins() {
//   try {
//     const { data, error } = await supabase
//       .from("cabins")
//       .select("*")
//       .eq("discount", 0);
//     if (error) throw new Error(error.message);
//     return data;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error("Cabins not found!");
//     }
//   }
// }

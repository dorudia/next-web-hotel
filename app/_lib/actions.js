"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { getBookings } from "./data-service";

// ----------------------------------------------------------
export async function updateGuest(formData) {
  // console.log("Server Action:", formData);
  const session = await auth();
  if (!session) throw new Error("Unauthorized, please sign in.");

  const nationalId = formData.get("nationalId");
  if (nationalId.length > 20)
    throw new Error("Please select a valid countryId");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const updateData = { nationality, countryFlag, nationalId };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");
}

// ----------------------------------------------------------
export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized, please sign in.");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("Unauthorized, booking does not belong to you.");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");
  revalidatePath("/account/reservations");
}
// -------------------------------------------------------------

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

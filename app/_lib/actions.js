"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

// ----------------------------------------------------------
export async function createBooking(bookingData, formData) {
  console.log("Server Action create booking:", formData, bookingData);

  const session = await auth();
  if (!session) throw new Error("Please sign in.");
  const newBooking = {
    ...bookingData,
    guestsId: session.user.guestId,
    numGuests: parseInt(formData.get("numGuests")),
    observation: formData.get("observations"),
  };

  const { data, error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/thankyou");
  // console.log("newBooking:::::::::::::::::", newBooking);
}

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

export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized, please sign in.");

  console.log(formData);

  const numGuests = parseInt(formData.get("numGuests"));
  const observation = formData.get("observations");
  const reservationId = Number(formData.get("reservationId"));

  const updateData = { numGuests, observation };

  console.log("updateData:::::::::::::::::", updateData);

  const userBookings = await getBookings(session.user.guestId);
  const guestBookingIds = userBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(reservationId))
    throw new Error("Unauthorized, booking does not belong to you.");

  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", reservationId);

  if (error) throw new Error("Booking could not be updated", error.message);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

// --------------------------------------------------------------
export async function deleteBooking(bookingId) {
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

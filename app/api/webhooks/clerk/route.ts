/* eslint-disable camelcase */

import { clerkClient } from "@clerk/clerk-sdk-node";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";

export async function POST(req: Request) {
  console.log("[Webhook Handler] Received POST request."); // <-- Added Log

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const CLERK_WEBHOOK_SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!CLERK_WEBHOOK_SIGNING_SECRET) {
    console.error(
      "[Webhook Handler] Error: CLERK_WEBHOOK_SIGNING_SECRET is not set in environment variables." // <-- Added Log
    );
    throw new Error(
      "Please add CLERK_WEBHOOK_SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  console.log("[Webhook Handler] Getting headers..."); // <-- Added Log
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
  console.log("[Webhook Handler] Svix Headers:", { svix_id, svix_timestamp, svix_signature }); // <-- Added Log

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.warn("[Webhook Handler] Missing Svix headers."); // <-- Added Log
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  console.log("[Webhook Handler] Parsing request body..."); // <-- Added Log
  const payload = await req.json();
  const body = JSON.stringify(payload);
  console.log("[Webhook Handler] Request body parsed and stringified."); // <-- Added Log
  // console.log("[Webhook Handler] Stringified Body:", body); // Optional: Log body content if needed for debugging (be mindful of sensitive data)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(CLERK_WEBHOOK_SIGNING_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    console.log("[Webhook Handler] Verifying webhook signature..."); // <-- Added Log
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    console.log("[Webhook Handler] Webhook signature verified successfully."); // <-- Added Log
  } catch (err) {
    console.error("[Webhook Handler] Error verifying webhook:", err); // <-- Updated Log with Error
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data; // id will be null for session events, but we are only handling user events here
  const eventType = evt.type;
  console.log(`[Webhook Handler] Received event type: ${eventType}, Event ID: ${id ?? 'N/A'}`); // <-- Added Log

  // CREATE
  if (eventType === "user.created") {
    console.log("[Webhook Handler] Processing 'user.created' event..."); // <-- Added Log
    const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username!,
      firstName: first_name ?? "",
      lastName: last_name ?? "",
      photo: image_url,
    };
    console.log("[Webhook Handler] User data extracted for creation:", user); // <-- Added Log

    try {
      console.log("[Webhook Handler] Calling createUser action..."); // <-- Added Log
      const newUser = await createUser(user);
      console.log("[Webhook Handler] createUser action successful:", newUser); // <-- Added Log

      // Set public metadata
      if (newUser) {
        console.log("[Webhook Handler] Updating Clerk user metadata for new user:", id); // <-- Added Log
        try {
            await clerkClient.users.updateUserMetadata(id, {
              publicMetadata: {
                userId: newUser._id, // Assuming newUser has an _id property from MongoDB
              },
            });
            console.log("[Webhook Handler] Clerk user metadata updated successfully."); // <-- Added Log
        } catch (metaError) {
            console.error("[Webhook Handler] Error updating Clerk metadata:", metaError); // <-- Added Log for metadata error
        }
      }

      console.log("[Webhook Handler] Responding OK for 'user.created'."); // <-- Added Log
      return NextResponse.json({ message: "OK", user: newUser });
    } catch (createError) {
      console.error("[Webhook Handler] Error during user creation process:", createError); // <-- Added Log
      return new Response("Error occured during user creation", { status: 500 }); // <-- Added specific error response
    }
  }

  // UPDATE
  if (eventType === "user.updated") {
    console.log("[Webhook Handler] Processing 'user.updated' event..."); // <-- Added Log
    const { id, image_url, first_name, last_name, username } = evt.data;

    const user = {
      firstName: first_name ?? "",
      lastName: last_name ?? "",
      username: username!,
      photo: image_url,
    };
    console.log("[Webhook Handler] User data extracted for update:", { clerkId: id, updates: user }); // <-- Added Log

    try {
      console.log("[Webhook Handler] Calling updateUser action..."); // <-- Added Log
      const updatedUser = await updateUser(id, user);
      console.log("[Webhook Handler] updateUser action successful:", updatedUser); // <-- Added Log

      console.log("[Webhook Handler] Responding OK for 'user.updated'."); // <-- Added Log
      return NextResponse.json({ message: "OK", user: updatedUser });
    } catch (updateError) {
      console.error("[Webhook Handler] Error during user update process:", updateError); // <-- Added Log
      return new Response("Error occured during user update", { status: 500 }); // <-- Added specific error response
    }
  }

  // DELETE
  if (eventType === "user.deleted") {
    console.log("[Webhook Handler] Processing 'user.deleted' event..."); // <-- Added Log
    const { id } = evt.data; // id might be null if the user was already deleted? Clerk docs say it should be present.

    if (!id) {
        console.error("[Webhook Handler] Error: 'user.deleted' event received without user ID."); // <-- Added Log
        return new Response("Error occured -- missing user ID in delete event", { status: 400 });
    }

    console.log("[Webhook Handler] User ID extracted for deletion:", id); // <-- Added Log

    try {
      console.log("[Webhook Handler] Calling deleteUser action..."); // <-- Added Log
      const deletedUser = await deleteUser(id);
      console.log("[Webhook Handler] deleteUser action successful:", deletedUser); // <-- Added Log

      console.log("[Webhook Handler] Responding OK for 'user.deleted'."); // <-- Added Log
      return NextResponse.json({ message: "OK", user: deletedUser });
    } catch (deleteError) {
      console.error("[Webhook Handler] Error during user deletion process:", deleteError); // <-- Added Log
      return new Response("Error occured during user deletion", { status: 500 }); // <-- Added specific error response
    }
  }

  // If event type is not handled above
  console.log(`[Webhook Handler] Unhandled event type: ${eventType}. ID: ${id ?? 'N/A'}`); // <-- Updated Log for clarity
  console.log("[Webhook Handler] Webhook body for unhandled event:", body); // <-- Added Log (already existed but improved context)

  console.log("[Webhook Handler] Responding with 200 OK for unhandled or successfully processed event."); // <-- Added Log
  return new Response("", { status: 200 });
}
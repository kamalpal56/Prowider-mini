import mongoose from "mongoose";

const WebhookEventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    unique: true
  },
  processed: {
    type: Boolean,
    default: true
  }
});

export default mongoose.models.WebhookEvent ||
mongoose.model(
  "WebhookEvent",
  WebhookEventSchema
);
import mongoose from "mongoose";

const LeadAssignmentSchema = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead"
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider"
  },
  assignedAt: {
    type: Date,
    default: Date.now
  }
});
LeadAssignmentSchema.index(
  {
    leadId: 1,
    providerId: 1
  },
  {
    unique: true
  }
);
export default mongoose.models.LeadAssignment ||
mongoose.model("LeadAssignment", LeadAssignmentSchema);
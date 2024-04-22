import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  information: any;
  status: boolean;
  trxID: string;
}

const paymentSchema: Schema = new Schema(
  {
    information: { type: Schema.Types.Mixed },
    status: { type: Boolean, required: true },
    trxID: { type: String, required: true },
  },
  { timestamps: true }
);

const PaymentModel =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", paymentSchema);

export default PaymentModel;

import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  information: any;
  trxID: string;
  paymentMethod: string;
  status: boolean;
  gw: string;
}
const paymentSchema: Schema = new Schema({
  information: { type: Schema.Types.Mixed },
  trxID: { type: String, required: true, unique: true },
  paymentMethod: { type: String },
  status: { type: Boolean },
  gw: { type: String },
});

const PaymentModel =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", paymentSchema);

export default PaymentModel;

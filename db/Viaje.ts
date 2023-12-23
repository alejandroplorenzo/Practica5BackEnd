import mongoose from "mongoose";
import { Viaje } from "../types.ts";
import { ClienteModel } from "./Cliente.ts";
import { ConductorModel } from "./Conductor.ts";
const Schema = mongoose.Schema;

const ViajeSchema = new Schema({
  client: { type: Schema.Types.ObjectId, required: true,  ref: "Cliente" },
  driver: { type: Schema.Types.ObjectId, required: true, ref: "Conductor" },
  money: {type: Number, required: true },
  distance: {type: Number, required: true},
  date: {type: Date, required: true},
  status: {type: String, required: true, enum: ["Before" , "In process" , "Finished"] }
});

ViajeSchema.path("money").validate(function (value: number) {
  return value >= 0; 
});

ViajeSchema.path("distance").validate(function (value: number) {
  return value >= 0; 
});

ViajeSchema.path("date").validate(function (value: Date) {
  return value instanceof Date && !isNaN(value.getTime()); 
});

ViajeSchema.path("status").validate(function (value: string) {
  const status = ["Before", "In process", "Finished"];
  return status.includes(value); 
});

//Un viaje solamente se puede crear, si ambos están disponibles, y el cliente tiene dinero
ViajeSchema.pre("save", async function (next) {
  try {
    const viaje = this as unknown as ViajeModelType;

    const cliente = await ClienteModel.findById(viaje.cliente);
    if (!cliente) {
      throw new Error("Cliente no encontrado");
    }

    const conductor = await ConductorModel.findById(viaje.driver);
    if (!conductor) {
      throw new Error("Conductor no encontrado");
    }
    if (viaje.money > cliente.cards.reduce((total, card) => total + card.money, 0)) {
      throw new Error("El cliente no tiene dinero para el viaje");
    }

    next();
  } catch (error) {
    next(error);
  }
});
export type ViajeModelType = mongoose.Document & Omit<Viaje, "id">;

export const ViajeModel = mongoose.model<ViajeModelType>("Viaje", ViajeSchema);

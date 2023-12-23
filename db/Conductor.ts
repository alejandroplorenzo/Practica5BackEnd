import mongoose from "mongoose";
import { Conductor } from "../types.ts";

const Schema = mongoose.Schema;


const ConductorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: {type: String, required: true, unique: true },
  travels: [
    {type: Schema.Types.ObjectId, ref: "Viajes", required: false, default:[]}
  ] 
});

ConductorSchema.path("email").validate(function(valor: string) {
  const emailCorrecto = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailCorrecto.test(valor)) {
    throw new Error('El formato de email es incorrecto');
  }
});

//Un cliente y un conductor solamente pueden tener un viaje activo
ConductorSchema.path("travels").validate(async function () {
  const conductor = this as ConductorModelType;

  const viajeActivo = await ConductorModel.findOne({
    _id: { $ne: conductor._id },
    "travels.Activo": true,
  });

  if (viajeActivo) {
    throw new Error("No se puede tener más de un viaje activo");
  }
});

//Cuando se borra un cliente o un conductor, entonces si que se borran los viajes y sus referencias
ConductorSchema.post("findOneAndDelete", async function (conductor: ConductorModelType) {
  const viajeIds = conductor.travels.map(viaje => viaje.toString());
  await ConductorModel.deleteMany({ _id: { $in: viajeIds } });
});

export type ConductorModelType = mongoose.Document & Omit<Conductor, "id">;

export const ConductorModel = mongoose.model<ConductorModelType>("Conductor", ConductorSchema);
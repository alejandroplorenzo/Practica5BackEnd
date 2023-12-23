import mongoose from "mongoose";
import { Cliente } from "../types.ts";
import { ViajeModel } from "./Viaje.ts";

const Schema = mongoose.Schema;

/*const TarjetaSchema = new Schema(
    {
      number: { type: Number, required: true, unique: true },
      cvv: { type: Number, required: false, unique: true },
      expirity: { type: Date, required: true },
      money: {type: Number, required: false, default: 0},
    },
    { timestamps: true }
  );*/ 
  
const ClienteSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cards: [
    { 
      number: { type: Number, required: true, unique: true },
        cvv: { type: String, required: false, unique: true },
        expirity: { type: Date, required: true },
        money: {type: Number, required: false, default: 0},
  }, {required: false, default: []}
  ],
  travels: [
    {type: Schema.Types.ObjectId, ref: "Viajes", required: false}
  ]
});


ClienteSchema.path("email").validate(function(valor: string) {
  const emailCorrecto = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailCorrecto.test(valor)) {
    throw new Error('El formato de email es incorrecto');
  }
});

ClienteSchema.path("cards.number").validate(function (valor: number) {
  const cardNumber = /^\d{16}$/; 
  if (!cardNumber.test(valor.toString())) {
    throw new Error("El formato del número de tarjeta es incorrecto");
  }
});

ClienteSchema.path("cards.cvv").validate(function (valor: string) {
  const cvv = /^\d{3,4}$/; 
  if (!cvv.test(valor)) {
    throw new Error("El formato del CVV es incorrecto");
  }
});

ClienteSchema.path("cards.expirity").validate(function (valor: Date) {
  const expirityDate = new Date();
  if (valor < expirityDate) {
    throw new Error("La tarjeta ha expirado");
  }
});

ClienteSchema.path("cards.money").validate(function (valor: number) {
  if (valor < 0) {
    throw new Error("La cantida de dinero no puede ser negativa");
  }
});

//Un cliente y un conductor solamente pueden tener un viaje activo
ClienteSchema.path("travels").validate(async function () {
  const cliente = this as ClienteModelType;

  const viajeActivo = await ClienteModel.findOne({
    _id: { $ne: cliente._id }, 
    "travels.Activo": true,
  });

  if (viajeActivo) {
    throw new Error("No se puede tener más de un vaije activo");
  }
});

//Cuando se borra un cliente o un conductor, entonces si que se borran los viajes y sus referencias
ClienteSchema.post("findOneAndDelete", async function(cliente: ClienteModelType){
      const viajeIds = cliente.travels.map(viaje => viaje.toString());
      await ViajeModel.deleteMany({ _id: { $in: viajeIds } });
})


export type ClienteModelType = mongoose.Document & Omit<Cliente, "id">;

export const ClienteModel = mongoose.model<ClienteModelType>("Cliente", ClienteSchema);
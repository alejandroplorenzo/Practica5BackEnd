import { ClienteModelType } from "../db/Cliente.ts";
import { ViajeModel, ViajeModelType } from "../db/Viaje.ts";

export const Cliente = {
    travels: async (parent: ClienteModelType): Promise<Array<ViajeModelType>> => { 
        const viajes = await ViajeModel.find({client: parent._id}).exec();
        return viajes;
    }
};

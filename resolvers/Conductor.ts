import { ConductorModelType } from "../db/Conductor.ts";
import { ViajeModel, ViajeModelType } from "../db/Viaje.ts";

export const Conductor = {
    travels: async (parent: ConductorModelType): Promise<Array<ViajeModelType>> => { 
        const viajes = await ViajeModel.find({driver: parent._id}).exec();
        return viajes;
    }
};
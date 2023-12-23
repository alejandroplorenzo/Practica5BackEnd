import { ClienteModel, ClienteModelType } from "../db/Cliente.ts";
import { ConductorModel, ConductorModelType } from "../db/Conductor.ts";
import { ViajeModel, ViajeModelType } from "../db/Viaje.ts";


export const Query = {
    clientes: async (): Promise<Array<ClienteModelType>> => {
        const clientes = await ClienteModel.find().exec();
        return clientes;
    },

    conductores: async (): Promise<Array<ConductorModelType>> => {
        const conductores = await ConductorModel.find().exec();
        return conductores;
    },

    viajes: async (): Promise<Array<ViajeModelType>> => {
        const viajes = await ViajeModel.find().exec();
        return viajes;
    }
}
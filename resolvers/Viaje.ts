import { GraphQLError } from "graphql";
import { ClienteModel, ClienteModelType } from "../db/Cliente.ts";
import { ConductorModel, ConductorModelType } from "../db/Conductor.ts";
import { ViajeModel, ViajeModelType } from "../db/Viaje.ts";

export const Viaje = {
    client: async (parent: ViajeModelType): Promise<ClienteModelType | null> => { 
        const cliente = await ClienteModel.findById(parent.cliente).exec();
            
        if(!cliente){
            throw new GraphQLError("No hay cliente", {
                extensions: { code: "NOT_FOUND" },
            });
        }
        
        return cliente;
    },

    driver: async (parent: ViajeModelType): Promise<ConductorModelType | null> => { 
        const conductor = await ConductorModel.findById(parent.driver).exec();
        
        if(!conductor){
            throw new GraphQLError("No hay conductor", {
                extensions: { code: "NOT_FOUND" },
            }); 
        }
        
        return conductor;
    }
};


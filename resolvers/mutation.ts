import { GraphQLError } from "graphql";
import { ClienteModel, ClienteModelType } from "../db/Cliente.ts";
import { ConductorModel, ConductorModelType } from "../db/Conductor.ts";
import { ViajeModel, ViajeModelType } from "../db/Viaje.ts";


export const Mutation = {
    addCliente: async (
        _: unknown,
        args: { name: string; email: string;}
      ): Promise<ClienteModelType> => {
        const cliente = {
          name: args.name,
          email: args.email
        };
        const newCliente = await ClienteModel.create(cliente);
        return newCliente;
      },

      deleteCliente: async (
        _: unknown,
        args: { id: string }
      ): Promise<ClienteModelType> => {
        const cliente = await ClienteModel.findByIdAndDelete(args.id);
        if (!cliente) {
          throw new GraphQLError(`No client found with id ${args.id}`, {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return cliente;
      },

      addConductor: async (
        _: unknown,
        args: { name: string; email: string; username: string, travels: string}
      ): Promise<ConductorModelType> => {
        const conductor = {
          name: args.name,
          email: args.email,
          username: args.username,
          travels: args.travels
        };
        const newConductor = await ConductorModel.create(conductor);
        return newConductor;
      },

      deleteConductor: async (
        _: unknown,
        args: { id: string }
      ): Promise<ConductorModelType> => {
        const conductor = await ConductorModel.findByIdAndDelete(args.id);
        if (!conductor) {
          throw new GraphQLError(`No conductor found with id ${args.id}`, {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return conductor;
      },

      addViaje: async (
        _: unknown,
        args: { client: string; driver: string; money: number, distance: number, date: Date, status: string}
      ): Promise<ViajeModelType> => {
        const viaje = {
          client: args.client,
          driver: args.driver,
          money: args.money,
          distance: args.distance,
          date: args.date,
          status: args.status
      }
      const newViaje = await ViajeModel.create(viaje);
      return newViaje;
      },

      addTarjeta: async (
        _: unknown,
        args: { id: string, number: number, cvv: string, expirity: Date, money: number}
      ): Promise<ClienteModelType> => {
        const cliente = await ClienteModel.findById(args.id).exec();
            
        if(!cliente){
            throw new GraphQLError("No existe el cliente");
        }

        const tarjeta = {
            number: args.number,
            cvv: args.cvv,
            expirity: args.expirity,
            money: args.money
        };

        cliente.cards.push(tarjeta);
        await cliente.save();

        return cliente;
      },

      deleteTarjeta: async (
        _: unknown,
        args: { id: string }
      ): Promise<ClienteModelType | null> => {
        const { id } = args;

        const updatedCliente = await ClienteModel.findOneAndUpdate(
          { "cards._id": id },
          { $pull: { cards: { _id: id } } },
          { new: true }
        );
    
        return updatedCliente;
      },

      
    
};
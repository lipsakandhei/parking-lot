// @ts-nocheck
import { ParkingSlot } from "./ParkingSlot";
import { TicketBuilder } from "./TicketBuilder";
import { Vehicle } from "./Vehicle";

export class Ticket {
    ticketNumber: string;
    startTime: Date;
    endTime: number
    vehicle: Vehicle
    parkingSlot: ParkingSlot

    public static createTicket (vehicle: Vehicle, parkingSlot: ParkingSlot): Ticket {
        console.log('Creating ticket...')
        const ticketBuilder = new TicketBuilder();
        return ticketBuilder
        .parkingSlot(parkingSlot)
        .startTime(new Date())
        .vehicle(vehicle)
        .ticketNumber(vehicle.vehicleNumber+new Date())
        .build();
    }
}

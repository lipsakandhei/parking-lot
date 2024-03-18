import { ITicketBuilder } from "./ITicketBuilder";
import { ParkingSlot } from "./ParkingSlot";
import { Ticket } from "./Ticket";
import { Vehicle } from "./Vehicle";

export class TicketBuilder implements ITicketBuilder {
    private ticket!: Ticket;
    constructor() {
        this.reset()
    }
    parkingSlot(parkingSlot: ParkingSlot): TicketBuilder {
        this.ticket.parkingSlot = parkingSlot
        return this
    }
    startTime(time: Date): TicketBuilder {
       this.ticket.startTime = time
       return this
    }
    vehicle(vehicle: Vehicle): TicketBuilder {
        this.ticket.vehicle = vehicle
        return this
    }
    ticketNumber(ticketNo: string): TicketBuilder {
        this.ticket.ticketNumber = ticketNo
        console.log(`this.ticket.ticketNumber ${this.ticket.ticketNumber}`)
        return this
    }
    build(): Ticket {
        return this.ticket
    }
    reset() {
        this.ticket = new Ticket()
    }

}
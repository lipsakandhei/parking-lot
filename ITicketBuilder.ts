import { ParkingSlot } from "./ParkingSlot"
import { Ticket } from "./Ticket"
import { TicketBuilder } from "./TicketBuilder"
import { Vehicle } from "./Vehicle"

export interface ITicketBuilder {
    parkingSlot(parkingSlot: ParkingSlot): TicketBuilder
    startTime(time: Date): TicketBuilder
    vehicle(vehicle: Vehicle): TicketBuilder
    ticketNumber(ticketNo: string): TicketBuilder
    build(): Ticket
}
// @ts-nocheck
import { ParkingFloor } from "./ParkingFloor";
import { ParkingSlot } from "./ParkingSlot";
import { getPrice, ParkingSlotType } from "./ParkingSlotType";
import { Ticket } from "./Ticket";
import { Vehicle } from "./Vehicle";

export class ParkingLot {
    private nameOfParkingLot: string;
    private address: string;
    private parkingFloors: ParkingFloor[];
    private static parkingLot: ParkingLot;

    
    private constructor (nameOfParkingLot: string, address: string, parkingFloors: ParkingFloor[]) {
        this.nameOfParkingLot = nameOfParkingLot;
        this.address = address;
        this.parkingFloors = parkingFloors
    }

    public static getInstance(nameOfParkingLot: string, address: string, parkingFloors: ParkingFloor[]): ParkingLot {
        console.log(`creating instance of Parking lot with parking floors ${JSON.stringify(parkingFloors)}`)
        if (this.parkingLot == null) {
            this.parkingLot = new ParkingLot(nameOfParkingLot,address,parkingFloors)
        }
        return this.parkingLot
    }

    public addFloors(name: string, parkSlots: Map<ParkingSlotType, Map<string,ParkingSlot>>){
        const parkingFloor: ParkingFloor = new ParkingFloor(name, parkSlots);
        this.parkingFloors.push(parkingFloor);
    }

    public removeFloors(parkingFloor: ParkingFloor){
        var index = this.parkingFloors.indexOf(parkingFloor);
        if (index !== -1) {
            this.parkingFloors.splice(index, 1);
        }
    }

    public assignTicket(vehicle: Vehicle): Ticket | null{
        //to assign ticket we need parking slot for this vehicle
        console.log('Assigning ticket...')
        const parkingSlot: ParkingSlot | undefined = this.getParkingSlotForVehicleAndPark(vehicle);
        if(parkingSlot == null) return null;
        const parkingTicket: Ticket = this.createTicketForSlot(parkingSlot,vehicle);
        //persist ticket to database
        return parkingTicket;
    }

    public scanAndPay(ticket: Ticket | null): number{
        const endTime: Date = new Date();
        ticket?.parkingSlot.removeVehicle(ticket.vehicle);
        const duration: number = (endTime-ticket?.startTime)/1000;
        const price: number = getPrice(ticket?.parkingSlot?.parkingSlotType)*(duration);
        //persist record to database
        return price;
    }

    private createTicketForSlot(parkingSlot: ParkingSlot, vehicle: Vehicle): Ticket {
        return Ticket.createTicket(vehicle,parkingSlot);
    }

    private getParkingSlotForVehicleAndPark(vehicle: Vehicle): ParkingSlot | undefined {
        for(const floor of this.parkingFloors){
            const parkingSlot = floor.getRelevantSlotForVehicleAndPark(vehicle);
            return parkingSlot
        }
    }
    

}

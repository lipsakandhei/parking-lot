import { ParkingFloor } from "./models/ParkingFloor";
import { ParkingLot } from "./models/ParkingLot";
import { ParkingSlot } from "./models/ParkingSlot";
import { ParkingSlotType } from "./models/ParkingSlotType";
import { Ticket } from "./models/Ticket";
import { Vehicle } from "./models/Vehicle";
import { VehicleCategory } from "./models/VehicleCategory";

export class ParkingLotClient {
    createParkingLot() {
        const nameOfParkingLot: string = "Pintosss Parking Lot";
        const address: string = "Bangalore India KA";
        const allSlots: Map<ParkingSlotType, Map<string,ParkingSlot>> = new Map();
        const compactSlot: Map<string,ParkingSlot> = new Map();
        compactSlot.set("C1",new ParkingSlot("C1",ParkingSlotType.Compact));
        compactSlot.set("C2",new ParkingSlot("C2",ParkingSlotType.Compact));
        compactSlot.set("C3",new ParkingSlot("C3",ParkingSlotType.Compact));
        allSlots.set(ParkingSlotType.Compact,compactSlot);

        const largeSlot: Map<string,ParkingSlot> = new Map();
        largeSlot.set("L1",new ParkingSlot("L1",ParkingSlotType.Large));
        largeSlot.set("L2",new ParkingSlot("L2",ParkingSlotType.Large));
        largeSlot.set("L3",new ParkingSlot("L3",ParkingSlotType.Large));
        allSlots.set(ParkingSlotType.Large,largeSlot);
        const parkingFloor: ParkingFloor = new ParkingFloor("1",allSlots);
        const parkingFloors: ParkingFloor[] = [];
        parkingFloors.push(parkingFloor);
        const parkingLot: ParkingLot = ParkingLot.getInstance(nameOfParkingLot,address,parkingFloors);

        const vehicle: Vehicle = new Vehicle();
        vehicle.vechicleCategory = (VehicleCategory.HatchBack);
        vehicle.vehicleNumber = ("KA-01-MA-9999");

        const ticket: Ticket | null = parkingLot.assignTicket(vehicle);
        console.log(" ticket number >> "+ticket?.ticketNumber);
        //persist the ticket to db here
        setTimeout(() => {
            console.log('vehicle is done parking now')
            const price = parkingLot.scanAndPay(ticket);
            console.log("price is >>" + price);
        }, 2000)
        
        
    }
}
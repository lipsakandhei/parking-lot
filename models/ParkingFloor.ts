import { ParkingLot } from "./ParkingLot";
import { ParkingSlot } from "./ParkingSlot";
import { ParkingSlotType } from "./ParkingSlotType";
import { Vehicle } from "./Vehicle";
import { VehicleCategory } from "./VehicleCategory";

export class ParkingFloor {
    name!: string;
    parkingSlots!: Map<ParkingSlotType, Map<string, ParkingSlot>>;
    constructor (name: string, parkingSlots: Map<ParkingSlotType, Map<string, ParkingSlot>>) {
        this.name = name
        this.parkingSlots = parkingSlots
    }

    public getRelevantSlotForVehicleAndPark(vehicle: Vehicle): ParkingSlot | undefined {
        console.log('Getting relevant parking slot...')
        const vehicleCategory: VehicleCategory = vehicle.vechicleCategory;
        console.log(`Vehicle category is ... ${vehicleCategory}`)
        const parkingSlotType: ParkingSlotType = this.pickCorrectSlot(vehicleCategory);
        console.log(`Parking slot type is ... ${parkingSlotType}`)
        const relevantParkingSlot: Map<string,ParkingSlot> | undefined = this.parkingSlots.get(parkingSlotType) || new Map();
        console.log(`Relevent parking slots are ${JSON.stringify(relevantParkingSlot)} out of all slots ${JSON.stringify(this.parkingSlots)}`)
        for( const slotName of (relevantParkingSlot.keys())){
            const slot: ParkingSlot | undefined = relevantParkingSlot.get(slotName)
            if(slot?.isAvailable) {
                slot.addVehicle(vehicle);
               return slot
            }
        }
    }

    private pickCorrectSlot(vehicleCategory: VehicleCategory): ParkingSlotType {
        if(vehicleCategory == VehicleCategory.TwoWheeler) return ParkingSlotType.TwoWheeler;
        else if(vehicleCategory == VehicleCategory.HatchBack || vehicleCategory == VehicleCategory.Sedan) return ParkingSlotType.Compact;
        else if(vehicleCategory == VehicleCategory.SUV) return ParkingSlotType.Medium;
        else if(vehicleCategory == VehicleCategory.Bus) return ParkingSlotType.Large;

       else {
           throw 'Ivalid Slot'
       }
        
    }
}

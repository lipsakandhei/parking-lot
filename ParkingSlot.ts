// @ts-nocheck
import { ParkingSlotType } from "./ParkingSlotType";
import { Vehicle } from "./Vehicle";

export class ParkingSlot {
    name: string;
    isAvailable: boolean = true;
    vehicle: Vehicle | null
    parkingSlotType: ParkingSlotType;
    constructor(name: string, parkingSlotType: ParkingSlotType) {
        this.name = name
        this.parkingSlotType = parkingSlotType
    }

    addVehicle (vehicle: Vehicle) {
        this.vehicle = vehicle;
        this.isAvailable = false
    }

    removeVehicle (vehicle: Vehicle) {
        this.vehicle = null;
        this.isAvailable = true
    }

}
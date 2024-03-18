export enum ParkingSlotType {
    TwoWheeler,
    Compact,
    Medium,
    Large
}

export function getPrice(parkingSlot: ParkingSlotType | undefined): number {
   const PriceMap = {
       [ParkingSlotType.TwoWheeler]: 1,
       [ParkingSlotType.Compact]: 2,
       [ParkingSlotType.Medium]: 3,
       [ParkingSlotType.Large]: 4,
   }
   return parkingSlot ? PriceMap[parkingSlot] : 0
}
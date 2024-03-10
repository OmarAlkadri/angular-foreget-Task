export enum Mode {
    LCL,
    FCL,
    Air
}
export enum MovementType {
    DoorToDoor, PortToDoor, DoorToPort, PortToPort
}
export enum Incoterms {
    DDP, DAT
}
export enum PackageType {
    Pallets, Boxes, Cartons
}
export enum UnitFirst {
    CM, IN
}
export enum SecondUnit {
    KG, LB
}
export enum Currency {
    USD, CNY, TRY
}

export interface ShipmentModel {
    id?: string
    mode: Mode
    movementType: MovementType
    incoterms: Incoterms
    packageType: PackageType
    unitFirst: UnitFirst
    secondUnit: SecondUnit
    currency: Currency
    country: string
    citiy: string

}

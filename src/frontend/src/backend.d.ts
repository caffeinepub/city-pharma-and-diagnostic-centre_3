import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MedicineOrder {
    id: bigint;
    status: string;
    createdAt: bigint;
    deliveryDate: bigint;
    prescriptionFile: string;
    address: string;
    patientName: string;
    mobile: string;
}
export interface UltrasoundBooking {
    id: bigint;
    status: string;
    scanType: string;
    patientName: string;
    mobile: string;
    amount: bigint;
    dateTime: bigint;
}
export interface DoctorAppointment {
    id: bigint;
    fee: bigint;
    status: string;
    patientName: string;
    mobile: string;
    doctorName: string;
    dateTime: bigint;
    reason: string;
}
export interface PathologyBooking {
    id: bigint;
    status: string;
    tests: Array<string>;
    sampleCollectionType: string;
    totalAmount: bigint;
    patientName: string;
    mobile: string;
    dateTime: bigint;
}
export interface backendInterface {
    createContactMessage(name: string, email: string, mobile: string, message: string): Promise<void>;
    createDoctorAppointment(doctorName: string, patientName: string, mobile: string, dateTime: bigint, reason: string, fee: bigint): Promise<bigint>;
    createMedicineOrder(patientName: string, mobile: string, address: string, deliveryDate: bigint, prescriptionFile: string): Promise<bigint>;
    createPathologyBooking(patientName: string, mobile: string, tests: Array<string>, sampleCollectionType: string, dateTime: bigint, totalAmount: bigint): Promise<bigint>;
    createUltrasoundBooking(patientName: string, mobile: string, scanType: string, dateTime: bigint, amount: bigint): Promise<bigint>;
    getAllDoctorAppointments(): Promise<Array<DoctorAppointment>>;
    getAllMedicineOrders(): Promise<Array<MedicineOrder>>;
    getAllPathologyBookings(): Promise<Array<PathologyBooking>>;
    getAllUltrasoundBookings(): Promise<Array<UltrasoundBooking>>;
    getDoctorAppointmentsByMobile(mobile: string): Promise<Array<DoctorAppointment>>;
    getMedicineOrdersByMobile(mobile: string): Promise<Array<MedicineOrder>>;
    getPathologyBookingsByMobile(mobile: string): Promise<Array<PathologyBooking>>;
    getUltrasoundBookingsByMobile(mobile: string): Promise<Array<UltrasoundBooking>>;
    updateDoctorAppointmentStatus(id: bigint, status: string): Promise<void>;
    updateMedicineOrderStatus(id: bigint, status: string): Promise<void>;
    updatePathologyBookingStatus(id: bigint, status: string): Promise<void>;
    updateUltrasoundBookingStatus(id: bigint, status: string): Promise<void>;
}

import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Iter "mo:core/Iter";

actor {
  // Types
  type MedicineOrder = {
    id : Nat;
    patientName : Text;
    mobile : Text;
    address : Text;
    deliveryDate : Int;
    prescriptionFile : Text;
    status : Text;
    createdAt : Int;
  };

  type PathologyBooking = {
    id : Nat;
    patientName : Text;
    mobile : Text;
    tests : [Text];
    sampleCollectionType : Text;
    dateTime : Int;
    status : Text;
    totalAmount : Nat;
  };

  type UltrasoundBooking = {
    id : Nat;
    patientName : Text;
    mobile : Text;
    scanType : Text;
    dateTime : Int;
    status : Text;
    amount : Nat;
  };

  type DoctorAppointment = {
    id : Nat;
    doctorName : Text;
    patientName : Text;
    mobile : Text;
    dateTime : Int;
    reason : Text;
    fee : Nat;
    status : Text;
  };

  type ContactMessage = {
    name : Text;
    email : Text;
    mobile : Text;
    message : Text;
    timestamp : Int;
  };

  // Storage
  var nextOrderId = 1;
  var nextBookingId = 1;
  var nextAppointmentId = 1;

  let medicineOrders = Map.empty<Nat, MedicineOrder>();
  let pathologyBookings = Map.empty<Nat, PathologyBooking>();
  let ultrasoundBookings = Map.empty<Nat, UltrasoundBooking>();
  let doctorAppointments = Map.empty<Nat, DoctorAppointment>();
  let contactMessages = Map.empty<Nat, ContactMessage>();

  // Create functions
  public shared ({ caller }) func createMedicineOrder(patientName : Text, mobile : Text, address : Text, deliveryDate : Int, prescriptionFile : Text) : async Nat {
    let id = nextOrderId;
    nextOrderId += 1;

    let order : MedicineOrder = {
      id;
      patientName;
      mobile;
      address;
      deliveryDate;
      prescriptionFile;
      status = "pending";
      createdAt = Time.now();
    };

    medicineOrders.add(id, order);
    id;
  };

  public shared ({ caller }) func createPathologyBooking(patientName : Text, mobile : Text, tests : [Text], sampleCollectionType : Text, dateTime : Int, totalAmount : Nat) : async Nat {
    let id = nextBookingId;
    nextBookingId += 1;

    let booking : PathologyBooking = {
      id;
      patientName;
      mobile;
      tests;
      sampleCollectionType;
      dateTime;
      status = "pending";
      totalAmount;
    };

    pathologyBookings.add(id, booking);
    id;
  };

  public shared ({ caller }) func createUltrasoundBooking(patientName : Text, mobile : Text, scanType : Text, dateTime : Int, amount : Nat) : async Nat {
    let id = nextBookingId;
    nextBookingId += 1;

    let booking : UltrasoundBooking = {
      id;
      patientName;
      mobile;
      scanType;
      dateTime;
      status = "pending";
      amount;
    };

    ultrasoundBookings.add(id, booking);
    id;
  };

  public shared ({ caller }) func createDoctorAppointment(doctorName : Text, patientName : Text, mobile : Text, dateTime : Int, reason : Text, fee : Nat) : async Nat {
    let id = nextAppointmentId;
    nextAppointmentId += 1;

    let appointment : DoctorAppointment = {
      id;
      doctorName;
      patientName;
      mobile;
      dateTime;
      reason;
      fee;
      status = "pending";
    };

    doctorAppointments.add(id, appointment);
    id;
  };

  public shared ({ caller }) func createContactMessage(name : Text, email : Text, mobile : Text, message : Text) : async () {
    let contactMessage : ContactMessage = {
      name;
      email;
      mobile;
      message;
      timestamp = Time.now();
    };

    contactMessages.add(contactMessages.size(), contactMessage);
  };

  // Update status functions
  public shared ({ caller }) func updateMedicineOrderStatus(id : Nat, status : Text) : async () {
    let order = switch (medicineOrders.get(id)) {
      case (?order) { order };
      case (null) { Runtime.trap("Order not found") };
    };

    let updatedOrder = { order with status };
    medicineOrders.add(id, updatedOrder);
  };

  public shared ({ caller }) func updatePathologyBookingStatus(id : Nat, status : Text) : async () {
    let booking = switch (pathologyBookings.get(id)) {
      case (?booking) { booking };
      case (null) { Runtime.trap("Booking not found") };
    };

    let updatedBooking = { booking with status };
    pathologyBookings.add(id, updatedBooking);
  };

  public shared ({ caller }) func updateUltrasoundBookingStatus(id : Nat, status : Text) : async () {
    let booking = switch (ultrasoundBookings.get(id)) {
      case (?booking) { booking };
      case (null) { Runtime.trap("Booking not found") };
    };

    let updatedBooking = { booking with status };
    ultrasoundBookings.add(id, updatedBooking);
  };

  public shared ({ caller }) func updateDoctorAppointmentStatus(id : Nat, status : Text) : async () {
    let appointment = switch (doctorAppointments.get(id)) {
      case (?appointment) { appointment };
      case (null) { Runtime.trap("Appointment not found") };
    };

    let updatedAppointment = { appointment with status };
    doctorAppointments.add(id, updatedAppointment);
  };

  // Get functions
  public query ({ caller }) func getMedicineOrdersByMobile(mobile : Text) : async [MedicineOrder] {
    medicineOrders.values().toArray().filter(func(order) { order.mobile == mobile });
  };

  public query ({ caller }) func getPathologyBookingsByMobile(mobile : Text) : async [PathologyBooking] {
    pathologyBookings.values().toArray().filter(func(booking) { booking.mobile == mobile });
  };

  public query ({ caller }) func getUltrasoundBookingsByMobile(mobile : Text) : async [UltrasoundBooking] {
    ultrasoundBookings.values().toArray().filter(func(booking) { booking.mobile == mobile });
  };

  public query ({ caller }) func getDoctorAppointmentsByMobile(mobile : Text) : async [DoctorAppointment] {
    doctorAppointments.values().toArray().filter(func(appointment) { appointment.mobile == mobile });
  };

  public query ({ caller }) func getAllMedicineOrders() : async [MedicineOrder] {
    medicineOrders.values().toArray();
  };

  public query ({ caller }) func getAllPathologyBookings() : async [PathologyBooking] {
    pathologyBookings.values().toArray();
  };

  public query ({ caller }) func getAllUltrasoundBookings() : async [UltrasoundBooking] {
    ultrasoundBookings.values().toArray();
  };

  public query ({ caller }) func getAllDoctorAppointments() : async [DoctorAppointment] {
    doctorAppointments.values().toArray();
  };
};

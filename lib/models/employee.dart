class Employee {
  final BigInt id;
  final String name;
  final String lastName;
  final String secondLastName;
  final String ci;
  final String phoneNumber;
  final int branchOfficeId;
  final int status;
  final DateTime registerDate;
  final DateTime lastUpdate;
  final BigInt userId;

  Employee({
    required this.id,
    required this.name,
    required this.lastName,
    required this.secondLastName,
    required this.ci,
    required this.phoneNumber,
    required this.branchOfficeId,
    required this.status,
    required this.registerDate,
    required this.lastUpdate,
    required this.userId
  });

  factory Employee.fromJson(Map<String, dynamic> json){
    return Employee(
      id: json['id'],
      name: json['name'],
      lastName: json['lastName'],
      secondLastName: json['secondLastName'],
      ci: json['ci'],
      phoneNumber: json['phoneNumber'],
      branchOfficeId: json['branchOfficeId'],
      status: json['status'],
      registerDate: json['registerDate'],
      lastUpdate: json['lastUpdate'],
      userId: json['userId'],
    );
  }
}
class Client {
  final BigInt id;
  final String name;
  final String lastName;
  final String secondLastName;
  final String ci;
  final int status;
  final DateTime registerDate;
  final DateTime lastUpdate;
  final BigInt userId;

  Client({
    required this.id,
    required this.name,
    required this.lastName,
    required this.secondLastName,
    required this.ci,
    required this.status,
    required this.registerDate,
    required this.lastUpdate,
    required this.userId
  });

  factory Client.fromJson(Map<String, dynamic> json){
    return Client(
      id: json['id'],
      name: json['name'],
      lastName: json['lastName'],
      secondLastName: json['secondLastName'],
      ci: json['ci'],
      status: json['status'],
      registerDate: json['registerDate'],
      lastUpdate: json['lastUpdate'],
      userId: json['userId'],
    );
  }
}
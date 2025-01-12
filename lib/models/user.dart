class User{
  final BigInt id;
  final String userName;
  final String password;
  final String role;
  final String email;
  final int status;
  final DateTime registerDate;
  final DateTime lastUpdate;

  User({
    required this.id,
    required this.userName,
    required this.password,
    required this.role,
    required this.email,
    required this.status,
    required this.registerDate,
    required this.lastUpdate,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      userName: json['userName'],
      password: json['password'],
      role: json['role'],
      email: json['email'],
      status: json['status'],
      registerDate: json['registerDate'],
      lastUpdate: json['lastUpdate'],
    );
  }
}
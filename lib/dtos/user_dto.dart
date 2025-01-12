class UserDTO {
  final String? id;
  final String? userName;
  final String? password;
  final String? role;
  final String? email;
  final String? name;
  final String? lastName;
  final String? secondLastName;
  final String? ci;
  final String? phoneNumber;
  final int? branchOfficeId;

  UserDTO({
    this.id,
    this.userName,
    this.password,
    this.role,
    this.email,
    this.name,
    this.lastName,
    this.secondLastName,
    this.ci,
    this.phoneNumber,
    this.branchOfficeId,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userName': userName,
      'password': password,
      'role': role,
      'email': email,
      'name': name,
      'lastName': lastName,
      'secondLastName': secondLastName,
      'ci': ci,
      'phoneNumber': phoneNumber,
      'branchOfficeId': branchOfficeId,
    };
  }
}
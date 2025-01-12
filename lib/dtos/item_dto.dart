class ItemDTO {
  final BigInt? id;
  final String? name;
  final int? status;

  ItemDTO({
    this.id,
    this.name,
    this.status,
  });

  // Convertir un objeto de tipo Item en un JSON
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'status': status,
    };
  }
}
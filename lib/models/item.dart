class Item {
  final BigInt id;
  final String name;
  final int status;

  Item({
    required this.id,
    required this.name,
    required this.status,
  });

  // Convertir un JSON en un objeto de tipo Item
  factory Item.fromJson(Map<String, dynamic> json) {
    return Item(
        id: json['id'],
        name: json['name'],
        status: json['status']
    );
  }
}


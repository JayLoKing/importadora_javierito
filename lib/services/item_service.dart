import 'dart:convert';
import 'package:importadora_javierito/models/item.dart';
import 'package:importadora_javierito/services/api_headers.dart';
import 'package:importadora_javierito/services/api_middleware.dart';
import 'package:http/http.dart' as http;
import '../dtos/item_dto.dart';
import '../utils/base_url_service.dart';

class ItemService {
  final ApiMiddleware _apiMiddleware;
  ItemService(this._apiMiddleware);

  Future<List<Item>> fetchItems() async {
    final response = await _apiMiddleware.makeRequest(() async {
      return await http.get(Uri.parse('${BaseUrlService.baseUrl}/items/getAllItems'), headers: ApiHeaders.instance.buildHeaders());
    });
    if(response.statusCode == 200){
      final List<dynamic> items = jsonDecode(response.body);
      return items.map((item) => Item.fromJson(item)).toList();
    } else {
      throw Exception('Error al obtener los items.');
    }
  }

  Future<Item> fetchItem(BigInt id) async {
    final response = await _apiMiddleware.makeRequest(() async {
      return await http.get(Uri.parse('${BaseUrlService.baseUrl}/items/getItem/$id'), headers: ApiHeaders.instance.buildHeaders());
    });
    if(response.statusCode == 200){
      return Item.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Error al obtener el item.');
    }
  }

  Future<Item> createItem(ItemDTO itemDTO) async {
    final response = await _apiMiddleware.makeRequest(() async {
      return await http.post(Uri.parse('${BaseUrlService.baseUrl}/items/createItem'), headers: ApiHeaders.instance.buildHeaders(), body: jsonEncode(itemDTO));
    });
    if(response.statusCode == 201){
      return Item.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Error al crear el item.');
    }
  }

  Future<Item> updateItem(ItemDTO itemDTO) async {
    final response = await _apiMiddleware.makeRequest(() async {
      return await http.put(Uri.parse('${BaseUrlService.baseUrl}/items/editItem'), headers: ApiHeaders.instance.buildHeaders(), body: jsonEncode(itemDTO));
    });
    if(response.statusCode == 200){
      return Item.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Error al actualizar el item.');
    }
  }

  Future<void> deleteItem(BigInt id) async {
    final response = await _apiMiddleware.makeRequest(() async {
      return await http.delete(Uri.parse('${BaseUrlService.baseUrl}/items/deleteItem/$id'), headers: ApiHeaders.instance.buildHeaders());
    });
    if(response.statusCode != 200){
      throw Exception('Error al eliminar el item.');
    }
  }
}
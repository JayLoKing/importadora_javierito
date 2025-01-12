import 'package:flutter/foundation.dart';
import 'package:importadora_javierito/services/api_middleware.dart';
import '../dtos/item_dto.dart';
import '../models/item.dart';
import '../services/item_service.dart';

class ItemViewModel extends ChangeNotifier {
  final ApiMiddleware _apiMiddleware = ApiMiddleware();
  late final ItemService _itemService = ItemService(_apiMiddleware);

  List<Item> _items = [];
  List<Item> get items => _items;
  Item? item;

  ItemViewModel();

  Future<void> fetchItems() async {
    try{
      _items = await _itemService.fetchItems();
      notifyListeners();
    } catch (e) {
      throw Exception('Error al obtener los items: $e');
    } finally {
      notifyListeners();
    }
  }

  Future<Item> fetchItem(BigInt id) async {
    try{
      item = await _itemService.fetchItem(id);
      notifyListeners();
      return item!;
    } catch (e) {
      throw Exception('Error al obtener el item: $e');
    } finally {
      notifyListeners();
    }
  }

  Future<void> createItem(ItemDTO itemDTO) async {
    try{
      await _itemService.createItem(itemDTO);
    } catch (e) {
      throw Exception('Error al crear el item: $e');
    } finally {
      notifyListeners();
    }
  }

  Future<void> updateItem(ItemDTO itemDTO) async {
    try{
      await _itemService.updateItem(itemDTO);
    } catch (e) {
      throw Exception('Error al actualizar el item: $e');
    } finally {
      notifyListeners();
    }
  }

  Future<void> deleteItem(BigInt id) async {
    try{
      await _itemService.deleteItem(id);
    } catch (e) {
      throw Exception('Error al eliminar el item: $e');
    } finally {
      notifyListeners();
    }
  }
}
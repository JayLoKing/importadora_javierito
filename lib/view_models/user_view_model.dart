import 'package:flutter/foundation.dart';
import '../dtos/user_dto.dart';
import '../models/user.dart';
import '../services/api_middleware.dart';
import '../services/user_service.dart';

class UserViewModel extends ChangeNotifier{
  final ApiMiddleware _apiMiddleware = ApiMiddleware();
  late final UserService _userService = UserService(_apiMiddleware);

  List<User> _users = [];
  List<User> get users => _users;
  User? user;

  UserViewModel();

  Future<void> fetchUsers() async {
    try{
      await _userService.fetchUsers();
      notifyListeners();
    } catch (e) {
      throw Exception('Error al obtener los usuarios: $e');
    } finally {
      notifyListeners();
    }
  }

  Future<User> fetchUser(BigInt id) async {
    try{
      user = await _userService.fetchUser(id);
      notifyListeners();
      return user!;
    } catch (e) {
      throw Exception('Error al obtener el usuario: $e');
    } finally {
      notifyListeners();
    }
  }

  Future<void> createUser(UserDTO userDTO) async {
    try{
      await _userService.createUser(userDTO);
    } catch (e) {
      throw Exception('Error al crear el usuario: $e');
    } finally {
      notifyListeners();
    }
  }

  Future<void> updateUser(UserDTO userDTO) async {
    try {
      await _userService.updateUser(userDTO);
    } catch (e) {
      throw Exception('Error al actualizar el usuario: $e');
    } finally {
      notifyListeners();
    }
  }

  Future<void> deleteUser(BigInt id) async {
    try {
      await _userService.deleteUser(id);
    } catch (e) {
      throw Exception('Error al eliminar el usuario: $e');
    } finally {
      notifyListeners();
    }
  }
}
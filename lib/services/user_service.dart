import 'dart:convert';
import 'package:importadora_javierito/models/user.dart';
import 'package:importadora_javierito/services/api_middleware.dart';
import 'package:http/http.dart' as http;
import '../dtos/user_dto.dart';
import '../utils/base_url_service.dart';
import 'api_headers.dart';

class UserService {
  final ApiMiddleware _apiMiddleware;
  UserService(this._apiMiddleware);

  Future<List<User>> fetchUsers() async {
     final response = await _apiMiddleware.makeRequest(() async {
       return await http.get(Uri.parse('${BaseUrlService.baseUrl}/users/getAllUsers'), headers: ApiHeaders.instance.buildHeaders());
     });
     if(response.statusCode == 200){
       final List<dynamic> users = jsonDecode(response.body);
       return users.map((user) => User.fromJson(user)).toList();
     } else {
       throw Exception('Error al obtener los usuarios.');
     }
     return [];
  }

  Future<User> fetchUser(BigInt id) async {
    final response = await _apiMiddleware.makeRequest(() async {
      return await http.get(Uri.parse('${BaseUrlService.baseUrl}/users/getUser/$id'), headers: ApiHeaders.instance.buildHeaders());
    });
    if(response.statusCode == 200){
      return User.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Error al obtener el usuario.');
    }
  }

  Future<User> createUser(UserDTO userDTO) async {
    final response = await _apiMiddleware.makeRequest(() async {
      // Agregar una condicion para controlar que el usuario a crear es de tipo emmpleado, caso contrario es un usuario de tipo cliente.
      return await http.post(Uri.parse('${BaseUrlService.baseUrl}/users/createEmployeeUser'), headers: ApiHeaders.instance.buildHeaders(), body: jsonEncode(userDTO));
      // return await http.post(Uri.parse('${BaseUrlService.baseUrl}/users/createClientUser'), headers: ApiHeaders.instance.buildHeaders(), body: jsonEncode(userDTO));
    });
    if(response.statusCode == 201){
      return User.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Error al crear el usuario.');
    }
  }

  Future<User> updateUser(UserDTO userDTO) async {
    final response = await _apiMiddleware.makeRequest(() async {
      return await http.put(Uri.parse('${BaseUrlService.baseUrl}/users/editUser'), headers: ApiHeaders.instance.buildHeaders(), body: jsonEncode(userDTO));
    });
    if(response.statusCode == 200){
      return User.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Error al actualizar el usuario.');
    }
  }

  Future<void> deleteUser(BigInt id) async {
    final response = await _apiMiddleware.makeRequest(() async {
      return await http.delete(Uri.parse('${BaseUrlService.baseUrl}/users/deleteUser/$id'), headers: ApiHeaders.instance.buildHeaders());
    });
    if(response.statusCode != 200){
      throw Exception('Error al eliminar el usuario.');
    }
  }
}
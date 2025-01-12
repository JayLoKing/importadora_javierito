import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

class ApiMiddleware {
  Future<http.Response> makeRequest(Future<http.Response> Function() request,) async {
    try {
      final response = await request();
      if(response.statusCode == 401){
        if(kDebugMode){
          print("Token expirado.");
        }
      }
      return response;
    } catch (e) {
      throw Exception('Error en la solicitud HTTP: $e');
    }
  }
}
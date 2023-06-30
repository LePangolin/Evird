import 'dart:convert';
import 'dart:developer';
import 'dart:io';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class ApiHelper{

  static Future<Map<String,dynamic>> connection(String email , String password) async{
    try{
      http.Response response = await http.post(
        Uri.parse('${dotenv.env['BASE_URL']}/user/login'),
        body: {
          'email': email,
          'password': password
        }
      );
      if(response.statusCode >= 200 && response.statusCode < 300){
        String data = response.body;
        Map<String,dynamic> json = jsonDecode(data);
        String token = json['message']['token'];
        String refreshToken = json['message']['refresh'];
        return {
          'error': false,
          'token': token,
          'refreshToken': refreshToken
        };
      }else{
        return {
          'error': true,
          'message': 'Email ou mot de passe incorrect'
        };
      }
    }catch(e){
      return {
        'error': true,
        'message': 'Something went wrong'
      };
    }
  }

  static Future<Map<String,dynamic>> getMainDossier(String token, String refresh) async{
    try{  
      http.Response response = await http.get(Uri.parse('${dotenv.env['BASE_URL']}/folder/user/main'),
      headers: {
        HttpHeaders.authorizationHeader: "Bearer $token"
      });
      if(response.statusCode >= 200 && response.statusCode < 300){
        String data = response.body;
        Map<String,dynamic> json = jsonDecode(data);
        inspect(json);
        return {
          'error': false,
          'message': json['data']
        };
      }else{
        return {
          'error': true,
          'message': 'Something went wrong'
        };
      }
    }catch(e){
      return {
        'error': true,
        'message': 'Something went wrong'
      };
    }
  }


  static Future<Map<String,dynamic>> uploadFile(idDossier, path, token) async {
    var request = http.MultipartRequest('POST', Uri.parse('${dotenv.env['BASE_URL']}/upload/$idDossier'));
    var file = await http.MultipartFile.fromPath('file', path);
    request.headers.addAll({
      HttpHeaders.authorizationHeader:  "Bearer $token"
    });
    request.files.add(file);
    var response = await request.send();
    if(response.statusCode >= 200 && response.statusCode < 300){
      String data = await response.stream.bytesToString();
      Map<String,dynamic> json = jsonDecode(data);
      return {
        'error': false,
        'message': json['data']
      };
    }else{
      return {
        'error': true,
        'message': 'Something went wrong'
      };
    }
  
  }
}
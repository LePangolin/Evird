import 'dart:convert';
import 'dart:developer';
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
        inspect(json);
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
}
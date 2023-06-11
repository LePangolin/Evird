import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthProvider extends ChangeNotifier{

  String token = '';

  String refreshToken = '';

  void makeConnection(String token, String refreshToken) async {
    try{
      this.token = token;
      this.refreshToken = refreshToken;
      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString('refreshToken', refreshToken);
    }catch(e){
      print(e);
    }
  }

}
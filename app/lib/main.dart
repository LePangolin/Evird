import 'package:flutter/material.dart';
import 'package:app/screens/auth_screen.dart';

void main() {
  runApp(
    MaterialApp(
      theme: ThemeData(
        textSelectionTheme: const TextSelectionThemeData(
          cursorColor: Color.fromRGBO(130, 0, 33, 1)
        ),
      ),
      home: AuthScreen(),
    ),
  );
}
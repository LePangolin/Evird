import 'package:flutter/material.dart';
import 'package:app/screens/auth_screen.dart';
import 'package:provider/provider.dart';
import 'package:app/provider/auth_provider.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  // Load .env file
  dotenv.load(fileName: "assets/.env");


  // Run app
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
      ],
      child: MaterialApp(
        theme: ThemeData(
          textSelectionTheme: const TextSelectionThemeData(
            cursorColor: Color.fromRGBO(130, 0, 33, 1)
          ),
        ),
        home: AuthScreen(),
      ),
    ),
  );
}

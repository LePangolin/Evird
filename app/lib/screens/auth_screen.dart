import 'package:flutter/material.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {

  bool _loading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          height: MediaQuery.of(context).size.height,
          width: MediaQuery.of(context).size.width,
          child: Column(
            children: [
              Container(
                margin: EdgeInsets.only(top: 100, bottom: MediaQuery.of(context).size.height * 0.1),
                child: const SizedBox(
                  height: 200,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Image(image: AssetImage('assets/img/charly-lab.png')),
              
                    ],
                  ),              
                ),
              ),
              const SizedBox(width: 20),
              Container(
                margin: const EdgeInsets.all(30),
                child: _buildForm(),
              )
            ],
          ),
        ),
      )
    );
  }


  Widget _buildForm() {
    if(!_loading){
      return 
        Form(child: Column(
          children: [
            TextFormField(
              decoration: const InputDecoration(
                labelText: 'Email',
                labelStyle: TextStyle(color:  Color.fromRGBO(130, 0, 33, 1)),
                border: OutlineInputBorder(
                  borderSide: BorderSide(color: Color.fromRGBO(130, 0, 33, 1)),
                  borderRadius: BorderRadius.all(Radius.circular(10)),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Color.fromRGBO(130, 0, 33, 1)),
                  borderRadius: BorderRadius.all(Radius.circular(10)),
                ),
                
              ),
              keyboardType: TextInputType.emailAddress,
            ),
            SizedBox(height: MediaQuery.of(context).size.height * 0.05),
            TextFormField(
              decoration: const InputDecoration(
                labelText: 'Password',
                labelStyle: TextStyle(color:  Color.fromRGBO(130, 0, 33, 1)),
                border: OutlineInputBorder(
                  borderSide: BorderSide(color: Color.fromRGBO(130, 0, 33, 1)),
                  borderRadius: BorderRadius.all(Radius.circular(10)),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: Color.fromRGBO(130, 0, 33, 1)),
                  borderRadius: BorderRadius.all(Radius.circular(10)),
                ),

              ),
              obscureText: true,
            ),
            SizedBox(height: MediaQuery.of(context).size.height * 0.05),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  _loading = true;
                });
              },
              style: ButtonStyle(
                shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                  RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                minimumSize: MaterialStateProperty.all( Size(MediaQuery.of(context).size.width, 50)),
                backgroundColor: MaterialStateColor.resolveWith((states) => const Color.fromRGBO(130, 0, 33, 1)),
              ),
              child: const Text('Login'),
            ),
          ]
        ));
    }else{
      return const Column(
        children:  [
          SizedBox(height: 100),
          CircularProgressIndicator(
            valueColor: AlwaysStoppedAnimation<Color>(Color.fromRGBO(130, 0, 33, 1)),
          )
        ],
      );
    }
  }
}
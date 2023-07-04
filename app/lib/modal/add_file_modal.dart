import 'dart:io';

import 'package:flutter/material.dart';
import "package:file_picker/file_picker.dart";
import 'package:app/helper/api_helper.dart';
import 'package:app/provider/auth_provider.dart';
import 'package:provider/provider.dart';

class AddFile extends StatefulWidget {
  final idDossier;

  const AddFile({Key? key, this.idDossier}) : super(key: key);

  @override
  State<AddFile> createState() => _AddFileState();
}

class _AddFileState extends State<AddFile> {
  File file = File('');
  String newName = '';
  bool loading = false;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          const Row(
            children: [
              Text(
                "Ajouter un fichier au dossier",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              )
            ],
          ),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.05,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: getChildren(),
          )
        ],
      ),
    );
  }

  List<Widget> getChildren() {
    List<Widget> children = [];
    if (file.path == '') {
      return [
        ElevatedButton(
          onPressed: () async {
            FilePickerResult? result = await FilePicker.platform.pickFiles();
            if (result != null) {
              setState(() {
                file = File(result.files.single.path!);
              });
            }
          },
          child: const Text("Choisir un fichier"),
        )
      ];
    } else if(loading){
      return [
        const CircularProgressIndicator()
      ];
    } else {
      String extension = file.path.split('.').last;
      newName = file.path.split('/').last;
      return [
        Container(
          width: MediaQuery.of(context).size.width * 0.60,
          child: Form(
            child: Column(
              children: [
                TextFormField(
                  decoration: const InputDecoration(
                    labelText: "Nom du fichier",
                  ),
                  key: const ValueKey("name"),
                  initialValue: newName,
                  // disable the form field
                  enabled: false,
                ),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.05,
                ),
                ElevatedButton(onPressed: () {
                    setState(() {
                      loading = true;
                      ApiHelper.uploadFile(
                        widget.idDossier,
                        file.path,
                        Provider.of<AuthProvider>(context, listen: false).getInfo()['token']).then((response) =>{
                              if (response['error']) {
                                ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(response['message'])))
                              } else {
                                // Faire disparaitre la modal
                                Navigator.of(context).pop(),
                                // Notify listeners
                                Provider.of<AuthProvider>(context, listen: false).notify()
                              }
                            });
                    });

                 
                }, child: const Text("Envoyer le fichier")),
              ],
            ),
          ),
        )
      ];
    }
  }
}

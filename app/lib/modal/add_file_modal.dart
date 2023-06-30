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
            children: [
              ElevatedButton(
                onPressed: () async {
                  FilePickerResult? result =
                      await FilePicker.platform.pickFiles();
                  if (result != null) {
                    File file = File(result.files.single.path!);
                    Map<String, dynamic> response = await ApiHelper.uploadFile(
                        widget.idDossier,
                        file.path,
                        Provider.of<AuthProvider>(context, listen: false)
                            .getInfo()['token']);
                    if (response['error']) {
                      ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text(response['message'])));
                    } else {
                      // Faire disparaitre la modal
                      Navigator.of(context).pop();
                      // Notify listeners
                      Provider.of<AuthProvider>(context, listen: false).notify();
                    }
                  }
                },
                child: const Text("Choisir un fichier"),
              )
            ],
          )
        ],
      ),
    );
  }
}

import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:app/provider/auth_provider.dart';
import 'package:provider/provider.dart';
import 'package:app/helper/api_helper.dart';
import 'package:app/modal/add_file_modal.dart';

class FolderScreen extends StatefulWidget {
  const FolderScreen({super.key});

  @override
  State<FolderScreen> createState() => _FolderScreenState();
}

class _FolderScreenState extends State<FolderScreen> {
  @override
  Widget build(BuildContext context) {
    return Consumer<AuthProvider>(
      builder: (context, value, child) => FutureBuilder(
        future: ApiHelper.getMainDossier(
            value.getInfo()['token'], value.getInfo()['refreshToken']),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            if (snapshot.data!['error']) {
              return Center(
                child: Text(snapshot.data!['message']),
              );
            } else {
              return Scaffold(
                  appBar: AppBar(
                      title: Center(
                          child: Text(snapshot.data!['message']["name"]))),
                  body: ListView.builder(
                    physics: const BouncingScrollPhysics(),
                    itemCount: snapshot.data!['message']["files"]["number"],
                    itemBuilder: (context, index) {
                      // order by created_at
                      List<dynamic> files = snapshot.data!['message']["files"]["data"];
                      files.sort((a,b) => a['created_at'].compareTo(b['created_at']));
                      return Card(
                        child: ListTile(
                            // elevation and shape are properties of ListTileStyle
                              
                            style: ListTileStyle.drawer,
                            title: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Icon(getIcon(snapshot.data!['message']["files"]
                                    ["data"][index]["type"])),
                                SizedBox(
                                  width: MediaQuery.of(context).size.width * 0.6,
                                  child: Text(
                                    snapshot.data!['message']["files"]["data"]
                                        [index]["name"],
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                                SizedBox(
                                  width: MediaQuery.of(context).size.width * 0.2,
                                  child: Text(
                                    snapshot.data!['message']["files"]["data"]
                                        [index]["created_at"],
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                              ],
                            )),
                      );
                    },
                  ),
                  floatingActionButton: FloatingActionButton(
                    onPressed: () {
                      showDialog(
                          context: context,
                          builder: (context) => AlertDialog(
                                content: AddFile(
                                    idDossier: snapshot.data!['message']['id']),
                              ));
                    },
                    child: const Icon(Icons.add),
                  ));
            }
          } else {
            return Container(
              height: MediaQuery.of(context).size.height,
              width: MediaQuery.of(context).size.width,
              color: Colors.white,
              child: const Center(
                child: CircularProgressIndicator(),
              ),
            );
          }
        },
      ),
    );
  }

  IconData getIcon(String type) {
    type = type.split("/")[1];
    switch (type) {
      case 'pdf':
        return Icons.picture_as_pdf;
      case 'doc':
        return Icons.description;
      case 'docx':
        return Icons.description;
      case 'xls':
        return Icons.functions;
      case 'xlsx':
        return Icons.functions;
      case 'ppt':
        return Icons.slideshow;
      case 'pptx':
        return Icons.slideshow;
      case 'txt':
        return Icons.article;
      case 'jpg':
        return Icons.image;
      case 'jpeg':
        return Icons.image;
      case 'png':
        return Icons.image;
      case 'gif':
        return Icons.image;
      case "webp":
        return Icons.image;
      case 'mp3':
        return Icons.music_note;
      case 'mp4':
        return Icons.movie;
      case 'avi':
        return Icons.movie;
      case 'zip':
        return Icons.folder_zip;
      case 'rar':
        return Icons.folder_zip;
      case '7z':
        return Icons.folder_zip;
      case 'vnd.android.package-archive':
        return Icons.android;
      case "stl":
        return Icons.view_in_ar;
      default:
        return Icons.question_mark;
    }
  }
}

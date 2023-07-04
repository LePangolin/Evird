import 'dart:developer';
import 'dart:io';

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
  bool search = false;
  String searchValue = "";
  List<String> filter = [];
  List<String> filterSelected = [];

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
              List<dynamic> files = snapshot.data!['message']["files"]["data"];
              files.sort((a, b) => a['created_at'].compareTo(b['created_at']));
              if (searchValue != "") {
                List<dynamic> remove = [];
                for (var element in files) {
                  if (!element['name'].contains(searchValue)) {
                    remove.add(element);
                  }
                }

                files.removeWhere((element) => remove.contains(element));
              }
              if(filterSelected.isNotEmpty){
                List<dynamic> remove = [];
                for (var element in files) {
                  bool find = false;
                  for (var filter in filterSelected) {
                    String type = filter;
                    if(filter == "apk"){
                      type = "vnd.android.package-archive";
                    }
                    if(element['type'].toString().split("/")[1] == type){
                      find = true;
                    }
                  }
                  if(!find){
                    remove.add(element);
                  }
                }

                files.removeWhere((element) => remove.contains(element));
              }
              return Scaffold(
                  appBar: AppBar(
                      backgroundColor: const Color.fromRGBO(130, 0, 33, 1),
                      actions: [
                        //  bouton loupe
                        searchWidget(),
                        IconButton(
                            onPressed: () {
                              showDialog(context: context, builder: (context) =>  AlertDialog(
                                content: StatefulBuilder(
                                  builder: (context, setState) =>  SingleChildScrollView(
                                    child: Column(
                                      children:  [
                                        const Center(
                                          child: Text("Filtrer par type de fichier"),
                                        ),
                                        SizedBox(
                                          height: MediaQuery.of(context).size.height * 0.02,
                                        ),
                                        SizedBox(
                                          height: MediaQuery.of(context).size.height * 0.5,
                                          width: MediaQuery.of(context).size.width * 0.8,
                                          child: ListView.builder(
                                            itemCount: filter.length,
                                            itemBuilder: (context, index) {
                                              return Card(
                                                child: CheckboxListTile(
                                                  value: filterSelected.contains(filter[index]),
                                                  onChanged: (value) {
                                                    setState(() {
                                                      if(value!){
                                                        filterSelected.add(filter[index]);
                                                      }else{
                                                        filterSelected.remove(filter[index]);
                                                      }
                                                    });
                                                  },
                                                  title: Text(filter[index]),
                                                ),
                                              );
                                            },
                                          ),
                                        ),
                                        SizedBox(
                                          height: MediaQuery.of(context).size.height * 0.02,
                                        ),
                                        ElevatedButton(
                                          onPressed: () {
                                            Navigator.pop(context);
                                            Provider.of<AuthProvider>(context, listen: false).notify();
                                          },
                                          style: ButtonStyle(
                                            backgroundColor: MaterialStateProperty.all<Color>(const Color.fromRGBO(130, 0, 33, 1)),
                                            minimumSize: MaterialStateProperty.all<Size>(Size(MediaQuery.of(context).size.width * 0.8, 50)),
                                          ),
                                          child: const Text("Filtrer"),
                                        )
                                      ],
                                    ),
                                  ),
                                )
                              ));
                            },
                            icon: const Icon(Icons.filter_alt_outlined)),
                      ],
                      title: titleDisplay(snapshot.data!['message']["name"])),
                  body: ListView.builder(
                    physics: const BouncingScrollPhysics(),
                    itemCount: files.length,
                    itemBuilder: (context, index) {
                      return Card(
                        child: ListTile(
                            // elevation and shape are properties of ListTileStyle

                            style: ListTileStyle.drawer,
                            title: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Icon(getIcon(files[index]["type"])),
                                SizedBox(
                                  width:
                                      MediaQuery.of(context).size.width * 0.6,
                                  child: Text(
                                    files[index]["name"],
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                                SizedBox(
                                  width:
                                      MediaQuery.of(context).size.width * 0.2,
                                  child: Text(
                                    files[index]["created_at"],
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ),
                              ],
                            )),
                      );
                    },
                  ),
                  floatingActionButton: FloatingActionButton(
                    backgroundColor: Color.fromRGBO(130, 0, 33, 1),
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
        if (!filter.contains('pdf')) {
          filter.add('pdf');
        }
        return Icons.picture_as_pdf;
      case 'doc':
        if (!filter.contains('doc')) {
          filter.add('doc');
        }
        return Icons.description;
      case 'docx':
        if (!filter.contains('docx')) {
          filter.add('docx');
        }
        return Icons.description;
      case 'xls':
        if (!filter.contains('xls')) {
          filter.add('xls');
        }
        return Icons.functions;
      case 'xlsx':
        if (!filter.contains('xlsx')) {
          filter.add('xlsx');
        }
        return Icons.functions;
      case 'ppt':
        if (!filter.contains('ppt')) {
          filter.add('ppt');
        }
        return Icons.slideshow;
      case 'pptx':
        if (!filter.contains('pptx')) {
          filter.add('pptx');
        }
        return Icons.slideshow;
      case 'txt':
        if (!filter.contains('txt')) {
          filter.add('txt');
        }
        return Icons.article;
      case 'jpg':
        if (!filter.contains('jpg')) {
          filter.add('jpg');
        }
        return Icons.image;
      case 'jpeg':
        if (!filter.contains('jpeg')) {
          filter.add('jpeg');
        }
        return Icons.image;
      case 'png':
        if (!filter.contains('png')) {
          filter.add('png');
        }
        return Icons.image;
      case 'gif':
        if (!filter.contains('gif')) {
          filter.add('gif');
        }
        return Icons.image;
      case "webp":
        if (!filter.contains('webp')) {
          filter.add('webp');
        }
        return Icons.image;
      case 'mp3':
        if (!filter.contains('mp3')) {
          filter.add('mp3');
        }
        return Icons.music_note;
      case 'mp4':
        if (!filter.contains('mp4')) {
          filter.add('mp4');
        }
        return Icons.movie;
      case 'avi':
        if (!filter.contains('avi')) {
          filter.add('avi');
        }
        return Icons.movie;
      case 'zip':
        if (!filter.contains('zip')) {
          filter.add('zip');
        }
        return Icons.folder_zip;
      case 'rar':
        if (!filter.contains('rar')) {
          filter.add('rar');
        }
        return Icons.folder_zip;
      case '7z':
        if (!filter.contains('7z')) {
          filter.add('7z');
        }
        return Icons.folder_zip;
      case 'vnd.android.package-archive':
        if (!filter.contains('apk')) {
          filter.add('apk');
        }
        return Icons.android;
      case "stl":
        if (!filter.contains('stl')) {
          filter.add('stl');
        }
        return Icons.view_in_ar;
      default:
        return Icons.question_mark;
    }
  }

  Widget searchWidget() {
    if (!search) {
      return IconButton(
          onPressed: () {
            // fais apparaitre la barre de recherche
            setState(() {
              search = !search;
            });
          },
          icon: const Icon(Icons.search));
    } else {
      return IconButton(
          onPressed: () {
            // fais apparaitre la barre de recherche
            setState(() {
              search = !search;
            });
          },
          icon: const Icon(Icons.check));
    }
  }

  // snapshot.data!['message']["name"]

  Widget titleDisplay(title) {
    if (!search) {
      return Text(title);
    } else {
      return SizedBox(
        height: 40,
        child: TextField(
          style: const TextStyle(color: Color.fromRGBO(130, 0, 33, 1)),
          decoration: const InputDecoration(
            // border radius
            border: OutlineInputBorder(
              borderRadius: BorderRadius.all(Radius.circular(10.0)),
            ),
            fillColor: Colors.white,
            filled: true,
            // reduce height of search bar
            isDense: true,
          ),
          // background color white
          cursorColor: const Color.fromRGBO(130, 0, 33, 1),
          onChanged: (value) {
            setState(() {
              searchValue = value;
            });
          },
        ),
      );
    }
  }
}

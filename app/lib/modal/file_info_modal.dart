import 'package:flutter/material.dart';

class FileInfo extends StatefulWidget {
  final Map<String, dynamic> info;

  const FileInfo({Key? key, required this.info}) : super(key: key);

  @override
  State<FileInfo> createState() => _FileInfoState();
}

class _FileInfoState extends State<FileInfo> {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                "Informations du fichier",
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
              SizedBox(
                width: MediaQuery.of(context).size.width * 0.6,
                child: TextField(
                  decoration: const InputDecoration(
                    labelText: "Nom du fichier",
                    border: OutlineInputBorder(),
                  ),
                  readOnly: true,
                  controller: TextEditingController(text: widget.info['name']),
                  onChanged: (value) {
                    setState(() {
                      widget.info['name'] = value;
                    });
                  },
                ),
              )
            ],
          ),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.05,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(
                width: MediaQuery.of(context).size.width * 0.6,
                child: TextField(
                  decoration: const InputDecoration(
                    labelText: "Date de mise en ligne",
                    border: OutlineInputBorder(),
                  ),
                  readOnly: true,
                  controller: TextEditingController(text: "${widget.info['created_at'].substring(8, 10)}/${widget.info['created_at'].substring(5, 7)}/${widget.info['created_at'].substring(0, 4)} à ${widget.info['created_at'].substring(11, 13)}h${widget.info['created_at'].substring(14, 16)}"),
                  onChanged: (value) {
                    setState(() {
                      widget.info['name'] = value;
                    });
                  },
                ),
              )
            ],
          ),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.05,
          ),
                    Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(
                width: MediaQuery.of(context).size.width * 0.6,
                child: TextField(
                  decoration: const InputDecoration(
                    labelText: "Date de dernière modification",
                    border: OutlineInputBorder(),
                  ),
                  readOnly: true,
                  // Format date like this: 2021-10-12 12:00:00
                  controller: TextEditingController(text:  "${widget.info['updated_at'].substring(8, 10)}/${widget.info['updated_at'].substring(5, 7)}/${widget.info['updated_at'].substring(0, 4)} à ${widget.info['updated_at'].substring(11, 13)}h${widget.info['updated_at'].substring(14, 16)}"),
                  onChanged: (value) {
                    setState(() {
                      widget.info['name'] = value;
                    });
                  },
                ),
              )
            ],
          ),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.05,
          ),
          Row(
            children: [
              SizedBox(
                width: MediaQuery.of(context).size.width * 0.2,
                child: TextField(
                  decoration: const InputDecoration(
                    labelText: "Taille du fichier",
                    border: OutlineInputBorder(),
                  ),
                  readOnly: true,
                  controller: TextEditingController(
                      text: "${widget.info['size'] / 1048576} Mo"),
                  onChanged: (value) {
                    setState(() {
                      widget.info['name'] = value;
                    });
                  },
                ),
              ),
              SizedBox(
                width: MediaQuery.of(context).size.width * 0.2,
              ),
              ElevatedButton(
                  onPressed: () {},
                  style: ButtonStyle(
                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    )),
                    minimumSize: MaterialStateProperty.all(
                        Size(MediaQuery.of(context).size.width * 0.2, 55)),
                  ),
                  child: const Text("Télécharger"))
            ],
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';

class ClassroomPage extends StatelessWidget {
  const ClassroomPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FA),
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.school_outlined, size: 100, color: Colors.green.shade300),
              const SizedBox(height: 20),
              const Text(
                'Classroom',
                style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 10),
              const Text('Your classes will appear here'),
            ],
          ),
        ),
      ),
    );
  }
}

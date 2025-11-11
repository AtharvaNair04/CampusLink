import 'package:flutter/material.dart';
import '../../widgets/navigation.dart';

class DashboardPage extends StatelessWidget {
  const DashboardPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Get the role from navigation arguments
    final args = ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;
    final String role = args?['role'] ?? 'student';
    
    return Navigation(role: role);
  }
}


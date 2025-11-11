import 'package:flutter/material.dart';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import '../screens/common/home_page.dart';
import '../screens/common/notifications_page.dart';
import '../screens/common/profile_page.dart';
import '../screens/student/classroom_page.dart';

class Navigation extends StatefulWidget {
  const Navigation({Key? key}) : super(key: key);

  @override
  State<Navigation> createState() => _NavigationState();
}

class _NavigationState extends State<Navigation> {
  int _currentIndex = 0;
  int _notificationTabIndex = 0;

  void _switchToNotifications(int tabIndex) {
    setState(() {
      _currentIndex = 1; // Switch to notifications tab
      _notificationTabIndex = tabIndex;
    });
  }

  List<Widget> get _pages => [
    HomePage(onNavigateToNotifications: _switchToNotifications),
    NotificationsPage(initialTab: _notificationTabIndex, key: ValueKey(_notificationTabIndex)),
    const ClassroomPage(),
    const ProfilePage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_currentIndex],
      bottomNavigationBar: SafeArea(
        child: CurvedNavigationBar(
          backgroundColor: const Color(0xFFF8F9FA),
          color: Colors.white,
          buttonBackgroundColor: const Color(0xFF7AB8F7),
          height: 60,
          animationDuration: const Duration(milliseconds: 300),
          index: _currentIndex,
          items: <Widget>[
            Icon(Icons.home_outlined, size: 30, color: _currentIndex == 0 ? Colors.white : const Color(0xFF7AB8F7)),
            Icon(Icons.notifications_outlined, size: 30, color: _currentIndex == 1 ? Colors.white : const Color(0xFF7AB8F7)),
            Icon(Icons.school_outlined, size: 30, color: _currentIndex == 2 ? Colors.white : const Color(0xFF7AB8F7)),
            Icon(Icons.person_outline, size: 30, color: _currentIndex == 3 ? Colors.white : const Color(0xFF7AB8F7)),
          ],
          onTap: (index) {
            setState(() {
              _currentIndex = index;
            });
          },
        ),
      ),
    );
  }
}

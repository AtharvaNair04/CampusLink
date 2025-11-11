import 'package:flutter/material.dart';
import './notifications_page.dart';

class HomePage extends StatefulWidget {
  final Function(int)? onNavigateToNotifications;
  
  const HomePage({Key? key, this.onNavigateToNotifications}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  // Sample notifications data - in real app, this would come from a shared state/provider
  final List<Map<String, dynamic>> allNotifications = [
    {
      'title': 'Urgent: Exam Schedule Released',
      'date': 'Nov 11, 2024',
      'message': 'Mid-semester examination schedule has been released. Check your timetable now!',
      'isLiked': false,
      'priority': 'high',
    },
    {
      'title': 'Assignment Deadline Extended',
      'date': 'Nov 10, 2024',
      'message': 'The deadline for Database Management System assignment has been extended to Nov 15, 2024.',
      'isLiked': true,
      'priority': 'high',
    },
    {
      'title': 'Campus Event: Tech Fest 2024',
      'date': 'Nov 9, 2024',
      'message': 'Annual Tech Fest is scheduled for Nov 20-22. Register now to participate in exciting competitions!',
      'isLiked': true,
      'priority': 'normal',
    },
    {
      'title': 'Library Notice',
      'date': 'Nov 8, 2024',
      'message': 'Library will remain open 24/7 during exam week. Please maintain silence in reading areas.',
      'isLiked': false,
      'priority': 'normal',
    },
    {
      'title': 'New Course Material Available',
      'date': 'Nov 7, 2024',
      'message': 'Prof. Smith has uploaded new lecture notes for Machine Learning. Check the classroom section.',
      'isLiked': true,
      'priority': 'normal',
    },
    {
      'title': 'Hostel Maintenance Notice',
      'date': 'Nov 6, 2024',
      'message': 'Water supply will be interrupted on Nov 12 from 10 AM to 2 PM for maintenance work.',
      'isLiked': false,
      'priority': 'high',
    },
  ];

  List<Map<String, dynamic>> get highPriorityNotifications {
    return allNotifications.where((n) => n['priority'] == 'high').take(2).toList();
  }

  List<Map<String, dynamic>> get likedNotifications {
    return allNotifications.where((n) => n['isLiked'] == true).take(2).toList();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final screenWidth = size.width;
    final screenHeight = size.height;
    
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FA),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.all(screenWidth * 0.05),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Welcome Header
                const Text(
                  'Dashboard',
                  style: TextStyle(
                    fontSize: 36,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF2C3E50),
                  ),
                ),
                SizedBox(height: screenHeight * 0.01),
                Text(
                  'Welcome back!',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.grey.shade600,
                  ),
                ),
                SizedBox(height: screenHeight * 0.03),

                // High Priority Notifications Section
                _buildSectionHeader(
                  'High Priority', 
                  Icons.priority_high, 
                  Colors.red,
                  onTap: () => _navigateToNotifications(1), // Tab 1 = Priority
                ),
                const SizedBox(height: 12),
                if (highPriorityNotifications.isEmpty)
                  _buildEmptyState('No high priority notifications')
                else
                  ...highPriorityNotifications.map((notification) => 
                    _buildCompactNotificationCard(notification)
                  ).toList(),
                
                const SizedBox(height: 30),

                // Interested/Liked Notifications Section
                _buildSectionHeader(
                  'Interested', 
                  Icons.favorite, 
                  Colors.pink,
                  onTap: () => _navigateToNotifications(2), // Tab 2 = Liked
                ),
                const SizedBox(height: 12),
                if (likedNotifications.isEmpty)
                  _buildEmptyState('No liked notifications yet')
                else
                  ...likedNotifications.map((notification) => 
                    _buildCompactNotificationCard(notification)
                  ).toList(),
                
                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _navigateToNotifications(int tabIndex) {
    // Use callback if provided (when in navigation), otherwise push new page
    if (widget.onNavigateToNotifications != null) {
      widget.onNavigateToNotifications!(tabIndex);
    } else {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => NotificationsPage(initialTab: tabIndex),
        ),
      );
    }
  }

  Widget _buildSectionHeader(String title, IconData icon, Color color, {VoidCallback? onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 24),
              const SizedBox(width: 8),
              Text(
                title,
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: color,
                ),
              ),
            ],
          ),
          if (onTap != null)
            Icon(Icons.arrow_forward_ios, color: color, size: 18),
        ],
      ),
    );
  }

  Widget _buildEmptyState(String message) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Center(
        child: Text(
          message,
          style: TextStyle(
            color: Colors.grey.shade500,
            fontSize: 14,
          ),
        ),
      ),
    );
  }

  Widget _buildCompactNotificationCard(Map<String, dynamic> notification) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => NotificationDetailsPage(
              title: notification['title']!,
              date: notification['date']!,
              message: notification['message']!,
            ),
          ),
        );
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.1),
              spreadRadius: 1,
              blurRadius: 4,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Icon
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: const Color(0xFF7AB8F7).withOpacity(0.2),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(
                notification['priority'] == 'high' 
                  ? Icons.notification_important 
                  : Icons.notifications_outlined,
                color: const Color(0xFF7AB8F7),
                size: 20,
              ),
            ),
            const SizedBox(width: 12),
            
            // Content
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          notification['title']!,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 15,
                            color: Color(0xFF2C3E50),
                          ),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      if (notification['isLiked'])
                        const Icon(Icons.favorite, color: Colors.red, size: 18),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    notification['date']!,
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.grey.shade600,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    notification['message']!,
                    style: TextStyle(
                      fontSize: 13,
                      color: Colors.grey.shade700,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

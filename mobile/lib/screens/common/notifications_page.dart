import 'package:flutter/material.dart';

class NotificationsPage extends StatefulWidget {
  final int initialTab;
  
  const NotificationsPage({Key? key, this.initialTab = 0}) : super(key: key);

  @override
  State<NotificationsPage> createState() => _NotificationsPageState();
}

class _NotificationsPageState extends State<NotificationsPage> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final List<Map<String, dynamic>> notifications = [
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

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this, initialIndex: widget.initialTab);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _toggleLike(int index) {
    setState(() {
      notifications[index]['isLiked'] = !notifications[index]['isLiked'];
    });
  }

  List<Map<String, dynamic>> _getSortedNotifications() {
    // Create a copy with original indices
    List<Map<String, dynamic>> sortedList = [];
    for (int i = 0; i < notifications.length; i++) {
      sortedList.add({
        ...notifications[i],
        'originalIndex': i,
      });
    }
    
    // Sort: high priority first, then by date
    sortedList.sort((a, b) {
      if (a['priority'] == 'high' && b['priority'] != 'high') return -1;
      if (a['priority'] != 'high' && b['priority'] == 'high') return 1;
      return 0;
    });
    
    return sortedList;
  }

  List<Map<String, dynamic>> get allNotifications {
    return _getSortedNotifications();
  }

  List<Map<String, dynamic>> get priorityNotifications {
    return _getSortedNotifications().where((n) => n['priority'] == 'high').toList();
  }

  List<Map<String, dynamic>> get likedNotifications {
    return _getSortedNotifications().where((n) => n['isLiked'] == true).toList();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final screenWidth = size.width;
    
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FA),
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Padding(
              padding: EdgeInsets.all(screenWidth * 0.05),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: const [
                  Text(
                    'Notifications',
                    style: TextStyle(
                      fontSize: 36,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF2C3E50),
                    ),
                  ),
                ],
              ),
            ),
            
            // Tabs
            Padding(
              padding: EdgeInsets.symmetric(horizontal: screenWidth * 0.05),
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: TabBar(
                  controller: _tabController,
                  labelColor: Colors.white,
                  unselectedLabelColor: const Color(0xFF7AB8F7),
                  indicator: BoxDecoration(
                    color: const Color(0xFF7AB8F7),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  tabs: const [
                    Tab(text: 'All'),
                    Tab(text: 'Priority'),
                    Tab(text: 'Liked'),
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 16),
            
            // Tab Views
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  _buildNotificationList(allNotifications),
                  _buildNotificationList(priorityNotifications),
                  _buildNotificationList(likedNotifications),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNotificationList(List<Map<String, dynamic>> notificationsList) {
    final screenWidth = MediaQuery.of(context).size.width;
    
    if (notificationsList.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.notifications_off_outlined, size: 80, color: Colors.grey.shade300),
            const SizedBox(height: 16),
            Text(
              'No notifications',
              style: TextStyle(
                fontSize: 18,
                color: Colors.grey.shade500,
              ),
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      padding: EdgeInsets.symmetric(horizontal: screenWidth * 0.05),
      itemCount: notificationsList.length,
      itemBuilder: (context, index) {
        return NotificationCard(
          notification: notificationsList[index],
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => NotificationDetailsPage(
                  title: notificationsList[index]['title']!,
                  date: notificationsList[index]['date']!,
                  message: notificationsList[index]['message']!,
                ),
              ),
            );
          },
          onLikeToggle: () => _toggleLike(notificationsList[index]['originalIndex']),
        );
      },
    );
  }
}

// Reusable Notification Card Component
class NotificationCard extends StatelessWidget {
  final Map<String, dynamic> notification;
  final VoidCallback onTap;
  final VoidCallback onLikeToggle;

  const NotificationCard({
    Key? key,
    required this.notification,
    required this.onTap,
    required this.onLikeToggle,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
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
            // Avatar
            CircleAvatar(
              backgroundColor: const Color(0xFF7AB8F7).withOpacity(0.2),
              child: const Icon(
                Icons.notifications_outlined,
                color: Color(0xFF7AB8F7),
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
                            fontSize: 16,
                            color: Color(0xFF2C3E50),
                          ),
                        ),
                      ),
                      if (notification['priority'] == 'high')
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: Colors.red.shade100,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            'HIGH',
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              color: Colors.red.shade700,
                            ),
                          ),
                        ),
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
                  const SizedBox(height: 8),
                  Text(
                    notification['message']!,
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey.shade700,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
            
            // Like Button
            IconButton(
              onPressed: onLikeToggle,
              icon: Icon(
                notification['isLiked'] ? Icons.favorite : Icons.favorite_border,
                color: notification['isLiked'] ? Colors.red : Colors.grey,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class NotificationDetailsPage extends StatelessWidget {
  final String title;
  final String date;
  final String message;

  const NotificationDetailsPage({
    Key? key,
    required this.title,
    required this.date,
    required this.message,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FA),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header with back button
              Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.arrow_back, color: Color(0xFF2C3E50)),
                    onPressed: () => Navigator.pop(context),
                  ),
                  const SizedBox(width: 8),
                  const Text(
                    'Notification Details',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF2C3E50),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 30),
              
              // Content Card
              Container(
                padding: const EdgeInsets.all(20),
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
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF2C3E50),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      date,
                      style: TextStyle(
                        color: Colors.grey.shade600,
                        fontSize: 14,
                      ),
                    ),
                    const Divider(height: 30),
                    Text(
                      message,
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.grey.shade800,
                        height: 1.5,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

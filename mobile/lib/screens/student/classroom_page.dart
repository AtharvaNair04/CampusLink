import 'package:flutter/material.dart';

class ClassroomPage extends StatefulWidget {
  const ClassroomPage({Key? key}) : super(key: key);

  @override
  State<ClassroomPage> createState() => _ClassroomPageState();
}

class _ClassroomPageState extends State<ClassroomPage> {
  DateTime? selectedDate;
  String? selectedTimeSlot;
  bool showResults = false;

  final List<Map<String, String>> timeSlots = [
    {'start': '9:00', 'end': '9:50'},
    {'start': '9:50', 'end': '10:40'},
    {'start': '10:50', 'end': '11:40'},
    {'start': '11:40', 'end': '12:30'},
    {'start': '12:30', 'end': '1:20'},
    {'start': '1:20', 'end': '2:10'},
    {'start': '2:10', 'end': '3:00'},
    {'start': '3:10', 'end': '4:00'},
    {'start': '4:00', 'end': '5:00'},
  ];

  // Sample data - in real app, this would come from backend based on date/time
  // This simulates which classrooms are free for the selected slot
  final Map<String, bool> allClassrooms = {
    'S001': false,
    'S002': true,
    'S003': false,
    'S004': false,
    'S005': true,
    'S006': false,
    'S007': true,
    'S008': false,
    'S009': false,
    'S010': true,
    'S011': false,
    'S012': false,
    'N001': false,
    'N002': true,
    'N003': false,
    'N004': true,
    'N005': false,
    'N006': false,
    'N007': true,
    'N008': false,
    'N009': true,
    'N010': false,
    'N011': false,
    'N012': true,
  };

  List<String> get freeClassrooms {
    return allClassrooms.entries
        .where((entry) => !entry.value) // Only free classrooms
        .map((entry) => entry.key)
        .toList();
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate ?? DateTime.now(),
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 30)),
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: const ColorScheme.light(
              primary: Color(0xFF7AB8F7),
              onPrimary: Colors.white,
              onSurface: Color(0xFF2C3E50),
            ),
          ),
          child: child!,
        );
      },
    );
    if (picked != null) {
      setState(() {
        selectedDate = picked;
        showResults = false; // Reset results when date changes
      });
    }
  }

  void _searchClassrooms() {
    if (selectedDate != null && selectedTimeSlot != null) {
      setState(() {
        showResults = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final screenWidth = size.width;
    final screenHeight = size.height;
    
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FA),
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Title
            Padding(
              padding: EdgeInsets.all(screenWidth * 0.05),
              child: const Text(
                'Classrooms',
                style: TextStyle(
                  fontSize: 36,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF2C3E50),
                ),
              ),
            ),

            Expanded(
              child: SingleChildScrollView(
                padding: EdgeInsets.symmetric(horizontal: screenWidth * 0.05),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Search Section
                    Container(
                      padding: EdgeInsets.all(screenWidth * 0.05),
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
                          const Text(
                            'Search Available Classrooms',
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF2C3E50),
                            ),
                          ),
                          const SizedBox(height: 20),

                          // Date Selection
                          const Text(
                            'Select Date',
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                              color: Color(0xFF2C3E50),
                            ),
                          ),
                          const SizedBox(height: 8),
                          GestureDetector(
                            onTap: () => _selectDate(context),
                            child: Container(
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: const Color(0xFFF8F9FA),
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(color: Colors.grey.shade300),
                              ),
                              child: Row(
                                children: [
                                  const Icon(Icons.calendar_today, color: Color(0xFF7AB8F7), size: 20),
                                  const SizedBox(width: 12),
                                  Text(
                                    selectedDate != null
                                        ? '${selectedDate!.day}/${selectedDate!.month}/${selectedDate!.year}'
                                        : 'Select date',
                                    style: TextStyle(
                                      fontSize: 16,
                                      color: selectedDate != null ? const Color(0xFF2C3E50) : Colors.grey.shade500,
                                    ),
                                  ),
                                  const Spacer(),
                                  const Icon(Icons.arrow_drop_down, color: Color(0xFF7AB8F7)),
                                ],
                              ),
                            ),
                          ),

                          const SizedBox(height: 20),

                          // Time Slot Selection
                          const Text(
                            'Select Time Slot',
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                              color: Color(0xFF2C3E50),
                            ),
                          ),
                          const SizedBox(height: 8),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                            decoration: BoxDecoration(
                              color: const Color(0xFFF8F9FA),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(color: Colors.grey.shade300),
                            ),
                            child: DropdownButtonHideUnderline(
                              child: DropdownButton<String>(
                                isExpanded: true,
                                hint: Text(
                                  'Select time slot',
                                  style: TextStyle(color: Colors.grey.shade500),
                                ),
                                value: selectedTimeSlot,
                                icon: const Icon(Icons.arrow_drop_down, color: Color(0xFF7AB8F7)),
                                items: timeSlots.map((slot) {
                                  final String timeRange = '${slot['start']} - ${slot['end']}';
                                  return DropdownMenuItem<String>(
                                    value: timeRange,
                                    child: Row(
                                      children: [
                                        const Icon(Icons.access_time, color: Color(0xFF7AB8F7), size: 20),
                                        const SizedBox(width: 12),
                                        Text(timeRange),
                                      ],
                                    ),
                                  );
                                }).toList(),
                                onChanged: (value) {
                                  setState(() {
                                    selectedTimeSlot = value;
                                    showResults = false; // Reset results when time changes
                                  });
                                },
                              ),
                            ),
                          ),

                          const SizedBox(height: 20),

                          // Search Button
                          SizedBox(
                            width: double.infinity,
                            height: 50,
                            child: ElevatedButton(
                              onPressed: (selectedDate != null && selectedTimeSlot != null)
                                  ? _searchClassrooms
                                  : null,
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF7AB8F7),
                                disabledBackgroundColor: Colors.grey.shade300,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                elevation: 0,
                              ),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  const Icon(Icons.search, color: Colors.white),
                                  const SizedBox(width: 8),
                                  Text(
                                    'Search Classrooms',
                                    style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                      color: (selectedDate != null && selectedTimeSlot != null)
                                          ? Colors.white
                                          : Colors.grey.shade500,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),

                    // Results Section
                    if (showResults) ...[
                      const SizedBox(height: 24),
                      Row(
                        children: [
                          const Icon(Icons.check_circle, color: Colors.green, size: 20),
                          const SizedBox(width: 8),
                          Text(
                            '${freeClassrooms.length} Available Classrooms',
                            style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF2C3E50),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),

                      // Available Classrooms Grid
                      GridView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 3,
                          crossAxisSpacing: 12,
                          mainAxisSpacing: 12,
                          childAspectRatio: 1.0,
                        ),
                        itemCount: freeClassrooms.length,
                        itemBuilder: (context, index) {
                          return _buildClassroomCard(freeClassrooms[index]);
                        },
                      ),
                      const SizedBox(height: 20),
                    ],
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildClassroomCard(String classroomName) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: const Color(0xFF7AB8F7).withOpacity(0.3),
          width: 2,
        ),
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
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(
            Icons.meeting_room,
            color: Color(0xFF7AB8F7),
            size: 32,
          ),
          const SizedBox(height: 6),
          Text(
            classroomName,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Color(0xFF2C3E50),
            ),
          ),
          const SizedBox(height: 4),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
            decoration: BoxDecoration(
              color: Colors.green.shade100,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              'Available',
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.w600,
                color: Colors.green.shade700,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

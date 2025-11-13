import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/user_provider.dart';
import '../../services/supabase_service.dart';

class BookingRequestPage extends StatefulWidget {
  final String classroomName;
  final DateTime selectedDate;
  final String? preselectedTimeSlot;

  const BookingRequestPage({
    Key? key,
    required this.classroomName,
    required this.selectedDate,
    this.preselectedTimeSlot,
  }) : super(key: key);

  @override
  State<BookingRequestPage> createState() => _BookingRequestPageState();
}

class _BookingRequestPageState extends State<BookingRequestPage> {
  late DateTime selectedDate;
  String? selectedTimeSlot;
  bool _isLoading = false;
  final _purposeController = TextEditingController(); // Optional purpose

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

  @override
  void initState() {
    super.initState();
    selectedDate = widget.selectedDate;
    selectedTimeSlot = widget.preselectedTimeSlot;
  }
  
  Future<void> _submitBooking() async {
    if (selectedTimeSlot == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please select a time slot.')),
      );
      return;
    }

    setState(() {
      _isLoading = true;
    });

    try {
      final teacherId = Provider.of<UserProvider>(context, listen: false).userId;
      if (teacherId == null) {
        throw Exception("User not logged in or ID not found.");
      }

      await SupabaseService.createBooking(
        teacherId: teacherId,
        room: widget.classroomName,
        date: selectedDate,
        timeSlot: selectedTimeSlot!,
        purpose: _purposeController.text.isNotEmpty ? _purposeController.text : null,
      );

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
           SnackBar(
            content: Text('Booking request for ${widget.classroomName} submitted!'),
            backgroundColor: Colors.green,
          ),
        );
        // Pop twice to go back to the finder page
        int count = 0;
        Navigator.of(context).popUntil((_) => count++ >= 2);
      }

    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error: ${e.toString()}'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate,
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
    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FA),
      appBar: AppBar(
        title: Text('Book ${widget.classroomName}', style: const TextStyle(color: Color(0xFF2C3E50), fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 0,
        iconTheme: const IconThemeData(color: Color(0xFF2C3E50)),
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 20),
                    const Text(
                      'Confirm Date',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF2C3E50),
                      ),
                    ),
                    const SizedBox(height: 12),
                    GestureDetector(
                      onTap: () => _selectDate(context),
                      child: Container(
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
                          children: [
                            const Icon(Icons.calendar_today, color: Color(0xFF7AB8F7)),
                            const SizedBox(width: 12),
                            Text(
                              '${selectedDate.day}/${selectedDate.month}/${selectedDate.year}',
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w600,
                                color: Color(0xFF2C3E50),
                              ),
                            ),
                            const Spacer(),
                            const Icon(Icons.arrow_drop_down, color: Color(0xFF7AB8F7)),
                          ],
                        ),
                      ),
                    ),
                    
                    const SizedBox(height: 30),
                    const Text(
                      'Confirm Time Slot',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF2C3E50),
                      ),
                    ),
                    const SizedBox(height: 12),

                    ...timeSlots.map((slot) {
                      final String timeRange = '${slot['start']} - ${slot['end']}';
                      final bool isSelected = selectedTimeSlot == timeRange;

                      return Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: GestureDetector(
                          onTap: () {
                            setState(() {
                              selectedTimeSlot = timeRange;
                            });
                          },
                          child: Container(
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              color: isSelected ? const Color(0xFF7AB8F7) : Colors.white,
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: isSelected 
                                    ? const Color(0xFF7AB8F7) 
                                    : Colors.grey.shade300,
                                width: 2,
                              ),
                            ),
                            child: Row(
                              children: [
                                Icon(
                                  Icons.access_time,
                                  color: isSelected ? Colors.white : const Color(0xFF7AB8F7),
                                ),
                                const SizedBox(width: 12),
                                Text(
                                  timeRange,
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w600,
                                    color: isSelected ? Colors.white : const Color(0xFF2C3E50),
                                  ),
                                ),
                                const Spacer(),
                                if (isSelected)
                                  const Icon(Icons.check_circle, color: Colors.white),
                              ],
                            ),
                          ),
                        ),
                      );
                    }).toList(),

                    const SizedBox(height: 20),

                    const Text(
                      'Purpose (Optional)',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF2C3E50),
                      ),
                    ),
                    const SizedBox(height: 12),
                    TextField(
                      controller: _purposeController,
                      decoration: InputDecoration(
                        hintText: 'e.g., Extra Lecture, Guest Seminar',
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide(color: Colors.grey.shade300)
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide(color: Colors.grey.shade300)
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                  ],
                ),
              ),
            ),

            Padding(
              padding: const EdgeInsets.all(20),
              child: SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton(
                  onPressed: selectedTimeSlot != null && !_isLoading ? _submitBooking : null,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF7AB8F7),
                    disabledBackgroundColor: Colors.grey.shade300,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    elevation: 0,
                  ),
                  child: _isLoading 
                    ? const CircularProgressIndicator(color: Colors.white)
                    : Text(
                        selectedTimeSlot != null ? 'Submit Request' : 'Select Time Slot',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: selectedTimeSlot != null ? Colors.white : Colors.grey.shade500,
                        ),
                      ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
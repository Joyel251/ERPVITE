export interface Student {
  registrationNumber: string
  name: string
  rollNumber: string
  email: string
  department: string
  year: number
  semester: number
  section: string
  phoneNumber: string
  address: string
  parentName: string
  parentPhone: string
  bloodGroup: string
  dateOfBirth: string
  admissionDate: string
  profileImage?: string
  // Enhanced profile fields
  course: string
  batch: string
  academicYear: string
  gender: string
  fatherName: string
  motherName: string
  fatherOccupation: string
  motherOccupation: string
  annualIncome: string
  residentialAddress: string
  studentContactNo: string
  studentEmail: string
  parentContactNo: string
  parentEmail: string
  community: string
  nationality: string
  religion: string
  hosteller: "Yes" | "No"
  district: string
  // New comprehensive profile fields
  // Mode of admission
  mode: "Regular" | "Lateral Entry" | "Transfer"
  // HSC (Higher Secondary Certificate) school information
  totalMarks: string
  overallPercentage: string
  cutoffMarks: string
  dateOfJoining: string
  managementCounseling: "Management" | "Counseling"
  firstGraduate: "Yes" | "No"
  state: string
  catholicParish?: string
  dalitCatholic: "Yes" | "No"
  subCaste: string
  motherTongue: string
  nativePlace: string
  coCurricularActivities: string
  extraCurricularActivities: string
}

export interface InternalMark {
  subject: string
  subjectCode: string
  test1: number
  test2: number
  assignment: number
  total: number
  maxMarks: number
  percentage: number
}

// Enhanced internal assessment data interface
export interface InternalAssessmentSubject {
  subject: string
  subjectCode: string
  upload1: {
    conceptTest: number
    cat: number
    testTotal: number
    testConverted: number
    assignment: number
    uploadTotal: number
    finalMarks: number
  }
  upload2: {
    conceptTest: number
    cat: number
    testTotal: number
    testConverted: number
    assignment: number
    uploadTotal: number
    finalMarks: number
  }
  finalMarks: number
}

export interface InternalAssessmentData {
  subjects: InternalAssessmentSubject[]
  overallAverage: number
}

export interface AttendanceRecord {
  subject: string
  subjectCode: string
  totalClasses: number
  attendedClasses: number
  percentage: number
  status: "Good" | "Average" | "Poor"
}

export interface Achievement {
  level: string
  id: string
  title: string
  description: string
  date: string
  category: "Academic" | "Sports" | "Cultural" | "Technical"
  certificate?: string
}

export interface LibraryBook {
  id: string
  title: string
  author: string
  isbn: string
  issueDate: string
  dueDate: string
  status: "Issued" | "Returned" | "Overdue"
  fine?: number
}

export interface Course {
  code: string
  name: string
  credits: number
  instructor: string
  schedule: string
  room: string
  type: "Theory" | "Lab" | "Project"
}

export interface SemesterMark {
  semester: number
  subjects: {
    code: string
    name: string
    credits: number
    internalMarks: number
    externalMarks: number
    totalMarks: number
    grade: string
    gradePoints: number
  }[]
  sgpa: number
  cgpa: number
}

export interface ArrearDetail {
  semester: number
  subjectCode: string
  subjectName: string
  credits: number
  examDate: string
  status: "Pending" | "Cleared"
  attempts: number
}

// New attendance interfaces
export interface PeriodAttendance {
  period: number | string
  subject?: string
  status: "present" | "absent" | "od"
  type: "class" | "break" | "lunch"
}

export interface DayAttendance {
  day: string
  date: string
  periods: PeriodAttendance[]
}

export interface SubjectAttendance {
  name: string
  code: string
  present: number
  total: number
  percentage: number
}

export interface MainfileAttendance {
  totalHours: number
  presentHours: number
  absentHours: number
  odHours: number
  percentage: number
}

export interface AttendanceData {
  mainfile: MainfileAttendance
  subjects: SubjectAttendance[]
  weeklySchedule: DayAttendance[]
}

// Centralized subject data to ensure consistency
const SUBJECTS = [
  { name: "Data Structures", code: "CS301" },
  { name: "Database Management", code: "CS302" },
  { name: "Computer Networks", code: "CS303" },
  { name: "Operating Systems", code: "CS304" },
  { name: "Software Engineering", code: "CS305" },
]

// Mock data generator based on registration number
export function getStudentData(registrationNumber: string): Student {
  const lastDigits = registrationNumber.slice(-2)
  const studentNumber = Number.parseInt(lastDigits) || 1

  const names = [
    "Arjun Kumar",
    "Priya Sharma",
    "Rahul Patel",
    "Sneha Reddy",
    "Vikram Singh",
    "Ananya Gupta",
    "Karthik Raj",
    "Divya Nair",
    "Arun Krishnan",
    "Meera Iyer",
  ]

  const departments = ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"]
  const courses = ["B.E Computer Science", "B.E Electronics", "B.E Mechanical", "B.E Civil", "B.E Electrical"]
  const communities = ["OC", "BC", "MBC", "SC", "ST"]
  const subCastes = ["Vanniyar", "Thevar", "Naidu", "Chettiar", "Gounder", "Mudaliar", "Pillai", "Reddy"]
  const religions = ["Hindu", "Christian", "Muslim", "Sikh", "Buddhist"]
  const districts = ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy", "Vellore", "Tirunelveli"]
  const states = ["Tamil Nadu", "Karnataka", "Andhra Pradesh", "Kerala", "Telangana"]
  const genders = ["Male", "Female"]
  const modes = ["Regular", "Lateral Entry", "Transfer"] // Admission modes
  const motherTongues = ["Tamil", "Telugu", "Malayalam", "Kannada", "Hindi", "English"]

  const selectedName = names[studentNumber % names.length]
  const selectedDept = departments[studentNumber % departments.length]

  // Generate year (1-4) and corresponding semester
  const year = Math.min(4, Math.floor(studentNumber / 20) + 1) // 1-4
  const semesterInYear = (studentNumber % 2) + 1 // 1 or 2
  const semester = (year - 1) * 2 + semesterInYear // 1-8

  return {
    registrationNumber,
    name: selectedName,
    rollNumber: `${registrationNumber.slice(-4)}`,
    email: `${registrationNumber.toLowerCase()}@licet.ac.in`,
    department: selectedDept,
    course: courses[studentNumber % courses.length],
    year: year,
    semester: semester,
    section: String.fromCharCode(65 + (studentNumber % 3)), // A, B, C
    batch: `2020-2024`,
    academicYear: `2024-25`,
    phoneNumber: `+91 ${9000000000 + studentNumber}`,
    address: `${studentNumber} Main Street, Chennai, Tamil Nadu`,
    parentName: `Parent of ${selectedName}`,
    parentPhone: `+91 ${8000000000 + studentNumber}`,
    bloodGroup: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"][studentNumber % 8],
    dateOfBirth: `${1998 + (studentNumber % 5)}-${String((studentNumber % 12) + 1).padStart(2, "0")}-${String((studentNumber % 28) + 1).padStart(2, "0")}`,
    admissionDate: `2020-07-${String((studentNumber % 30) + 1).padStart(2, "0")}`,
    gender: genders[studentNumber % 2],
    fatherName: `Father of ${selectedName}`,
    motherName: `Mother of ${selectedName}`,
    fatherOccupation: ["Engineer", "Doctor", "Teacher", "Business", "Government Employee"][studentNumber % 5],
    motherOccupation: ["Homemaker", "Teacher", "Nurse", "Business", "Government Employee"][studentNumber % 5],
    annualIncome: `₹${((studentNumber % 10) + 3) * 100000}`,
    residentialAddress: `${studentNumber} Residential Street, ${districts[studentNumber % districts.length]}, Tamil Nadu - ${600000 + studentNumber}`,
    studentContactNo: `+91 ${9000000000 + studentNumber}`,
    studentEmail: `${registrationNumber.toLowerCase()}@licet.ac.in`,
    parentContactNo: `+91 ${8000000000 + studentNumber}`,
    parentEmail: `parent.${registrationNumber.toLowerCase()}@gmail.com`,
    community: communities[studentNumber % communities.length],
    nationality: "Indian",
    religion: religions[studentNumber % religions.length],
    hosteller: studentNumber % 3 === 0 ? "Yes" : "No",
    district: districts[studentNumber % districts.length],
    // New comprehensive fields
    // Mode of admission
    mode: modes[studentNumber % modes.length] as "Regular" | "Lateral Entry" | "Transfer",
    // HSC (Higher Secondary Certificate) school information
    totalMarks: `${450 + (studentNumber % 50)}`,
    overallPercentage: `${85 + (studentNumber % 15)}.${studentNumber % 10}%`,
    cutoffMarks: `${180 + (studentNumber % 20)}`,
    dateOfJoining: `2020-07-${String((studentNumber % 30) + 1).padStart(2, "0")}`,
    managementCounseling: studentNumber % 2 === 0 ? "Management" : "Counseling",
    firstGraduate: studentNumber % 4 === 0 ? "Yes" : "No",
    state: states[studentNumber % states.length],
    catholicParish:
      religions[studentNumber % religions.length] === "Christian"
        ? `St. ${selectedName.split(" ")[0]} Parish`
        : undefined,
    dalitCatholic:
      religions[studentNumber % religions.length] === "Christian" && studentNumber % 5 === 0 ? "Yes" : "No",
    subCaste: subCastes[studentNumber % subCastes.length],
    motherTongue: motherTongues[studentNumber % motherTongues.length],
    nativePlace: `${districts[studentNumber % districts.length]}, ${states[studentNumber % states.length]}`,
    coCurricularActivities: [
      "School Cricket Team Captain",
      "Science Club Secretary",
      "Student Council Member",
      "Debate Team Leader",
      "Music Band Participant",
    ][studentNumber % 5],
    extraCurricularActivities: [
      "National Level Swimming Competition",
      "State Level Chess Championship",
      "Inter-School Drama Competition",
      "District Level Art Exhibition",
      "Regional Science Fair Winner",
    ][studentNumber % 5],
  }
}

export function getAttendanceData(registrationNumber: string): AttendanceData {
  const studentNumber = Number.parseInt(registrationNumber.slice(-2)) || 1
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  // Generate realistic weekly schedule with mixed attendance
  const weeklySchedule: DayAttendance[] = days.map((day, dayIndex) => {
    const periods: PeriodAttendance[] = []

    // Add class periods (1-8) with realistic attendance patterns
    for (let period = 1; period <= 8; period++) {
      const randomFactor = (studentNumber + dayIndex * 8 + period) % 20
      let status: "present" | "absent" | "od" = "present"

      // Create realistic attendance patterns (not all present)
      if (randomFactor < 3)
        status = "absent" // 15% absent
      else if (randomFactor < 4) status = "od" // 5% OD
      // 80% present

      periods.push({
        period,
        subject: SUBJECTS[period % SUBJECTS.length].name,
        status,
        type: "class",
      })
    }

    return {
      day,
      date: `2024-01-${String(dayIndex + 15).padStart(2, "0")}`,
      periods,
    }
  })

  // Calculate mainfile attendance based on periods 1, 3, 6
  let totalMainfileHours = 0
  let presentMainfileHours = 0
  let absentMainfileHours = 0
  let odMainfileHours = 0

  weeklySchedule.forEach((day) => {
    // Period 1 affects periods 1-2
    const period1 = day.periods.find((p) => p.period === 1)
    if (period1) {
      totalMainfileHours += 2
      if (period1.status === "present") presentMainfileHours += 2
      else if (period1.status === "absent") absentMainfileHours += 2
      else if (period1.status === "od") odMainfileHours += 2
    }

    // Period 3 affects periods 3-5
    const period3 = day.periods.find((p) => p.period === 3)
    if (period3) {
      totalMainfileHours += 3
      if (period3.status === "present") presentMainfileHours += 3
      else if (period3.status === "absent") absentMainfileHours += 3
      else if (period3.status === "od") odMainfileHours += 3
    }

    // Period 6 affects periods 6-8
    const period6 = day.periods.find((p) => p.period === 6)
    if (period6) {
      totalMainfileHours += 3
      if (period6.status === "present") presentMainfileHours += 3
      else if (period6.status === "absent") absentMainfileHours += 3
      else if (period6.status === "od") odMainfileHours += 3
    }
  })

  const mainfilePercentage = totalMainfileHours > 0 ? (presentMainfileHours / totalMainfileHours) * 100 : 0

  // Calculate subject-wise attendance using consistent data
  const subjectAttendance: SubjectAttendance[] = SUBJECTS.map((subject, subjectIndex) => {
    let present = 0
    let total = 0

    // Generate consistent attendance data for each subject
    for (let week = 0; week < 8; week++) {
      for (let day = 0; day < 5; day++) {
        const randomFactor = (studentNumber + week * 5 + day + subjectIndex) % 20
        total++
        if (randomFactor >= 3) present++ // Same logic as above: 85% attendance
      }
    }

    return {
      name: subject.name,
      code: subject.code,
      present,
      total,
      percentage: total > 0 ? (present / total) * 100 : 0,
    }
  })

  return {
    mainfile: {
      totalHours: totalMainfileHours,
      presentHours: presentMainfileHours,
      absentHours: absentMainfileHours,
      odHours: odMainfileHours,
      percentage: mainfilePercentage,
    },
    subjects: subjectAttendance,
    weeklySchedule,
  }
}

export function getInternalMarks(registrationNumber: string): InternalMark[] {
  const enhancedData = getInternalMarksEnhanced(registrationNumber)

  // Convert enhanced data to old format for backward compatibility
  return enhancedData.subjects.map((subject) => {
    // Simulate old test1, test2, assignment structure from the enhanced data
    const test1 = Math.round((subject.upload1.conceptTest / 30) * 20)
    const test2 = Math.round((subject.upload2.conceptTest / 30) * 20)
    const assignment = Math.round(((subject.upload1.assignment + subject.upload2.assignment) / 50) * 10)
    const total = test1 + test2 + assignment
    const maxMarks = 50
    const percentage = (total / maxMarks) * 100

    return {
      subject: subject.subject,
      subjectCode: subject.subjectCode,
      test1,
      test2,
      assignment,
      total,
      maxMarks,
      percentage,
    }
  })
}

// MAIN INTERNAL MARKS FUNCTION - This is the primary one to use
export function getInternalMarksEnhanced(registrationNumber: string): InternalAssessmentData {
  const studentNumber = Number.parseInt(registrationNumber.slice(-2)) || 1

  const subjects = SUBJECTS.map((subject, index) => {
    // Generate Upload 1 marks
    const upload1ConceptTest = Math.min(30, 20 + ((studentNumber + index) % 10))
    const upload1Cat = Math.min(60, 40 + ((studentNumber + index * 2) % 20))
    const upload1TestTotal = upload1ConceptTest + upload1Cat
    const upload1TestConverted = (upload1TestTotal / 90) * 75
    const upload1Assignment = Math.min(25, 18 + ((studentNumber + index * 3) % 7))
    const upload1UploadTotal = upload1TestConverted + upload1Assignment
    const upload1FinalMarks = (upload1UploadTotal / 100) * 25

    // Generate Upload 2 marks (slightly different pattern)
    const upload2ConceptTest = Math.min(30, 18 + ((studentNumber + index * 2) % 12))
    const upload2Cat = Math.min(60, 38 + ((studentNumber + index * 3) % 22))
    const upload2TestTotal = upload2ConceptTest + upload2Cat
    const upload2TestConverted = (upload2TestTotal / 90) * 75
    const upload2Assignment = Math.min(25, 17 + ((studentNumber + index * 4) % 8))
    const upload2UploadTotal = upload2TestConverted + upload2Assignment
    const upload2FinalMarks = (upload2UploadTotal / 100) * 25

    const finalMarks = upload1FinalMarks + upload2FinalMarks

    return {
      subject: subject.name,
      subjectCode: subject.code,
      upload1: {
        conceptTest: upload1ConceptTest,
        cat: upload1Cat,
        testTotal: upload1TestTotal,
        testConverted: upload1TestConverted,
        assignment: upload1Assignment,
        uploadTotal: upload1UploadTotal,
        finalMarks: upload1FinalMarks,
      },
      upload2: {
        conceptTest: upload2ConceptTest,
        cat: upload2Cat,
        testTotal: upload2TestTotal,
        testConverted: upload2TestConverted,
        assignment: upload2Assignment,
        uploadTotal: upload2UploadTotal,
        finalMarks: upload2FinalMarks,
      },
      finalMarks,
    }
  })

  const overallAverage = subjects.reduce((acc, subject) => acc + subject.finalMarks, 0) / subjects.length

  return {
    subjects,
    overallAverage,
  }
}
export function getAttendanceRecords(registrationNumber: string): AttendanceRecord[] {
  const attendanceData = getAttendanceData(registrationNumber)

  return attendanceData.subjects.map((subject) => {
    let status: "Good" | "Average" | "Poor" = "Good"
    if (subject.percentage < 75) status = "Poor"
    else if (subject.percentage < 85) status = "Average"

    return {
      subject: subject.name,
      subjectCode: subject.code,
      totalClasses: subject.total,
      attendedClasses: subject.present,
      percentage: subject.percentage,
      status,
    }
  })
}

export function getAchievements(registrationNumber: string): Achievement[] {
  const achievements = [
    { title: "Best Student Award", description: "Awarded for academic excellence", category: "Academic" as const },
    {
      title: "Coding Competition Winner",
      description: "First place in inter-college coding contest",
      category: "Technical" as const,
    },
    { title: "Sports Championship", description: "Winner in college sports meet", category: "Sports" as const },
    {
      title: "Cultural Fest Participant",
      description: "Active participation in cultural events",
      category: "Cultural" as const,
    },
  ]

  const studentNumber = Number.parseInt(registrationNumber.slice(-2)) || 1

  return achievements.slice(0, (studentNumber % 3) + 1).map((achievement, index) => ({
    id: `ach_${index + 1}`,
    ...achievement,
    date: `2024-${String(((studentNumber + index) % 12) + 1).padStart(2, "0")}-${String(((studentNumber + index) % 28) + 1).padStart(2, "0")}`,
    level: "College", // or any appropriate default value
  }))
}

export function getLibraryBooks(registrationNumber: string): LibraryBook[] {
  const books = [
    { title: "Introduction to Algorithms", author: "Thomas H. Cormen", isbn: "978-0262033848" },
    { title: "Clean Code", author: "Robert C. Martin", isbn: "978-0132350884" },
    { title: "Design Patterns", author: "Gang of Four", isbn: "978-0201633612" },
  ]

  const studentNumber = Number.parseInt(registrationNumber.slice(-2)) || 1

  return books.slice(0, (studentNumber % 2) + 1).map((book, index) => ({
    id: `book_${index + 1}`,
    ...book,
    issueDate: `2024-${String(((studentNumber + index) % 12) + 1).padStart(2, "0")}-${String(((studentNumber + index) % 28) + 1).padStart(2, "0")}`,
    dueDate: `2024-${String(((studentNumber + index + 1) % 12) + 1).padStart(2, "0")}-${String(((studentNumber + index + 15) % 28) + 1).padStart(2, "0")}`,
    status: index === 0 ? ("Issued" as const) : ("Returned" as const),
    fine: index === 0 && studentNumber % 3 === 0 ? 50 : undefined,
  }))
}

export function getCourses(): Course[] {
  return [
    {
      code: "CS301",
      name: "Data Structures",
      credits: 4,
      instructor: "Dr. Smith",
      schedule: "Mon, Wed, Fri 9:00-10:00",
      room: "CS-101",
      type: "Theory",
    },
    {
      code: "CS302",
      name: "Database Management",
      credits: 3,
      instructor: "Prof. Johnson",
      schedule: "Tue, Thu 10:00-11:30",
      room: "CS-102",
      type: "Theory",
    },
    {
      code: "CS303",
      name: "Computer Networks",
      credits: 3,
      instructor: "Dr. Williams",
      schedule: "Mon, Wed 2:00-3:30",
      room: "CS-103",
      type: "Theory",
    },
    {
      code: "CS304L",
      name: "OS Lab",
      credits: 2,
      instructor: "Prof. Brown",
      schedule: "Fri 2:00-5:00",
      room: "CS-Lab1",
      type: "Lab",
    },
    {
      code: "CS305",
      name: "Software Engineering",
      credits: 3,
      instructor: "Dr. Davis",
      schedule: "Tue, Thu 2:00-3:30",
      room: "CS-104",
      type: "Theory",
    },
  ]
}

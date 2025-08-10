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

// Keep the old interface for backward compatibility
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

export interface UploadAssessment {
  conceptTest: number // out of 30
  cat: number // out of 60
  testTotal: number // conceptTest + cat (out of 90)
  testConverted: number // testTotal converted to 75
  assignment: number // out of 25
  uploadTotal: number // testConverted + assignment (out of 100)
  finalMarks: number // uploadTotal converted to 25
}

export interface EnhancedInternalMark {
  subject: string
  subjectCode: string
  upload1: UploadAssessment
  upload2: UploadAssessment
  finalMarks: number // upload1.finalMarks + upload2.finalMarks (out of 50)
}

export interface InternalAssessmentData {
  subjects: EnhancedInternalMark[]
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
  clearedInSemester?: number
  clearedGrade?: string
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

// College-specific departments
const DEPARTMENTS = [
  "Computer Science and Engineering",
  "Electronics and Communication Engineering",
  "Electrical and Electronics Engineering",
  "Artificial Intelligence and Data Science",
  "Mechanical Engineering",
  "Information Technology",
]

// Department-specific subjects
const SUBJECTS_BY_DEPT = {
  "Computer Science and Engineering": [
    { name: "Data Structures and Algorithms", code: "CS301" },
    { name: "Database Management Systems", code: "CS302" },
    { name: "Computer Networks", code: "CS303" },
    { name: "Operating Systems", code: "CS304" },
    { name: "Software Engineering", code: "CS305" },
  ],
  "Electronics and Communication Engineering": [
    { name: "Digital Signal Processing", code: "EC301" },
    { name: "Communication Systems", code: "EC302" },
    { name: "Microprocessors", code: "EC303" },
    { name: "VLSI Design", code: "EC304" },
    { name: "Antenna Theory", code: "EC305" },
  ],
  "Electrical and Electronics Engineering": [
    { name: "Power Systems", code: "EE301" },
    { name: "Control Systems", code: "EE302" },
    { name: "Electrical Machines", code: "EE303" },
    { name: "Power Electronics", code: "EE304" },
    { name: "Digital Electronics", code: "EE305" },
  ],
  "Artificial Intelligence and Data Science": [
    { name: "Machine Learning", code: "AI301" },
    { name: "Deep Learning", code: "AI302" },
    { name: "Data Mining", code: "AI303" },
    { name: "Natural Language Processing", code: "AI304" },
    { name: "Computer Vision", code: "AI305" },
  ],
  "Mechanical Engineering": [
    { name: "Thermodynamics", code: "ME301" },
    { name: "Fluid Mechanics", code: "ME302" },
    { name: "Machine Design", code: "ME303" },
    { name: "Manufacturing Technology", code: "ME304" },
    { name: "Heat Transfer", code: "ME305" },
  ],
  "Information Technology": [
    { name: "Web Technologies", code: "IT301" },
    { name: "Mobile Application Development", code: "IT302" },
    { name: "Network Security", code: "IT303" },
    { name: "Cloud Computing", code: "IT304" },
    { name: "Data Analytics", code: "IT305" },
  ],
}

// Enhanced data arrays for realistic generation with proper gender mapping
const STUDENT_NAMES = [
  { name: "Aarav Kumar", gender: "Male" }, // 0
  { name: "Vivaan Singh", gender: "Male" }, // 1
  { name: "Aditya Sharma", gender: "Male" }, // 2
  { name: "Vihaan Gupta", gender: "Male" }, // 3
  { name: "Arjun Patel", gender: "Male" }, // 4
  { name: "Sai Krishna", gender: "Male" }, // 5
  { name: "Reyansh Reddy", gender: "Male" }, // 6
  { name: "Ayaan Khan", gender: "Male" }, // 7
  { name: "Krishna Rao", gender: "Male" }, // 8
  { name: "Ishaan Nair", gender: "Male" }, // 9
  { name: "Ananya Iyer", gender: "Female" }, // 10
  { name: "Diya Menon", gender: "Female" }, // 11
  { name: "Saanvi Pillai", gender: "Female" }, // 12
  { name: "Aadhya Nambiar", gender: "Female" }, // 13
  { name: "Kavya Shetty", gender: "Female" }, // 14
  { name: "Anaya Bhat", gender: "Female" }, // 15
  { name: "Pari Kamath", gender: "Female" }, // 16
  { name: "Myra Hegde", gender: "Female" }, // 17
  { name: "Sara Amin", gender: "Female" }, // 18
  { name: "Zara Dsouza", gender: "Female" }, // 19
  { name: "Rohan Joshi", gender: "Male" }, // 20
  { name: "Karan Mehta", gender: "Male" }, // 21
  { name: "Aryan Desai", gender: "Male" }, // 22
  { name: "Nikhil Agarwal", gender: "Male" }, // 23
  { name: "Rahul Bansal", gender: "Male" }, // 24
  { name: "Priya Sharma", gender: "Female" }, // 25
  { name: "Sneha Reddy", gender: "Female" }, // 26
  { name: "Divya Nair", gender: "Female" }, // 27
  { name: "Meera Iyer", gender: "Female" }, // 28
  { name: "Pooja Gupta", gender: "Female" }, // 29
  { name: "Joyelimmanuel", gender: "Male" }, // 30
  { name: "Ravi Chandran", gender: "Male" }, // 31
  { name: "Deepika Rao", gender: "Female" }, // 32
  { name: "Harish Kumar", gender: "Male" }, // 33
  { name: "Lakshmi Priya", gender: "Female" }, // 34
]

const STATES_DATA = {
  "Tamil Nadu": {
    districts: ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy", "Vellore", "Tirunelveli"],
    motherTongue: "Tamil",
  },
  Karnataka: {
    districts: ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum", "Gulbarga"],
    motherTongue: "Kannada",
  },
  "Andhra Pradesh": {
    districts: ["Hyderabad", "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
    motherTongue: "Telugu",
  },
  Kerala: {
    districts: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kollam", "Palakkad"],
    motherTongue: "Malayalam",
  },
  Telangana: {
    districts: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Mahbubnagar"],
    motherTongue: "Telugu",
  },
}

// Helper function to generate consistent random values
function generateConsistentRandom(seed: string, index: number, max: number): number {
  const hash = seed.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
  return Math.abs((hash + index * 1234567) % max)
}

// Validation functions
export function validateRegistrationNumber(regNumber: string): boolean {
  // Must be exactly 12 digits and start with 3111
  const regex = /^3111\d{8}$/
  return regex.test(regNumber)
}

export function generatePassword(name: string, dateOfBirth: string): string {
  // First 4 letters of name in caps + DDMMYY from date of birth
  const namePrefix = name.replace(/\s+/g, "").substring(0, 4).toUpperCase()
  const birthDate = new Date(dateOfBirth)
  const day = String(birthDate.getDate()).padStart(2, "0")
  const month = String(birthDate.getMonth() + 1).padStart(2, "0")
  const year = String(birthDate.getFullYear()).slice(-2)

  return `${namePrefix}${day}${month}${year}`
}

export function validateLogin(registrationNumber: string, password: string): boolean {
  if (!validateRegistrationNumber(registrationNumber)) {
    return false
  }

  const studentData = getStudentData(registrationNumber)
  const expectedPassword = generatePassword(studentData.name, studentData.dateOfBirth)

  console.log("Debug - Registration:", registrationNumber)
  console.log("Debug - Student Name:", studentData.name)
  console.log("Debug - Birth Date:", studentData.dateOfBirth)
  console.log("Debug - Expected Password:", expectedPassword)
  console.log("Debug - Entered Password:", password)

  return password === expectedPassword
}

// Mock data generator based on registration number
export function getStudentData(registrationNumber: string): Student {
  // Extract the last 2 digits to determine which student
  const studentNumber = Number.parseInt(registrationNumber.slice(-2)) || 1

  // Create a mapping for specific registration numbers to ensure correct data
  const specificMappings: { [key: string]: { nameIndex: number; birthDate: string } } = {
    "311123104001": { nameIndex: 0, birthDate: "2005-01-01" }, // Aarav Kumar
    "311123104002": { nameIndex: 1, birthDate: "2005-02-02" }, // Vivaan Singh
    "311123104003": { nameIndex: 2, birthDate: "2005-03-03" }, // Aditya Sharma
    "311123104007": { nameIndex: 7, birthDate: "2005-01-07" }, // Ayaan Khan (has arrears)
    "311123104014": { nameIndex: 13, birthDate: "2005-02-14" }, // Aadhya Nambiar (has arrears)
    "311123104015": { nameIndex: 14, birthDate: "2005-03-15" }, // Kavya Shetty
    "311123104021": { nameIndex: 20, birthDate: "2005-03-21" }, // Rohan Joshi (has arrears)
    "311123104028": { nameIndex: 27, birthDate: "2005-04-28" }, // Divya Nair (has arrears)
    "311123104031": { nameIndex: 30, birthDate: "2005-07-04" }, // Joyelimmanuel
  }

  let nameIndex: number
  let dateOfBirth: string

  if (specificMappings[registrationNumber]) {
    nameIndex = specificMappings[registrationNumber].nameIndex
    dateOfBirth = specificMappings[registrationNumber].birthDate
  } else {
    // Use modulo to cycle through names if number is larger than array
    nameIndex = (studentNumber - 1) % STUDENT_NAMES.length
    // Generate birth date based on student number for consistency
    const birthYear = 2005 - Math.floor((studentNumber - 1) / 10) // 2005, 2004, 2003, etc.
    const birthMonth = ((studentNumber - 1) % 12) + 1 // 1-12
    const birthDay = ((studentNumber - 1) % 28) + 1 // 1-28 to avoid invalid dates
    dateOfBirth = `${birthYear}-${String(birthMonth).padStart(2, "0")}-${String(birthDay).padStart(2, "0")}`
  }

  const selectedStudent = STUDENT_NAMES[nameIndex]
  const selectedName = selectedStudent.name
  const gender = selectedStudent.gender

  const deptIndex = generateConsistentRandom(registrationNumber, 2, DEPARTMENTS.length)
  const selectedDept = DEPARTMENTS[deptIndex]

  // Determine admission mode first (affects year calculation)
  const modeIndex = generateConsistentRandom(registrationNumber, 3, 10)
  let mode: "Regular" | "Lateral Entry" | "Transfer"
  let startYear: number
  let currentYear: number

  if (modeIndex < 7) {
    mode = "Regular"
    startYear = 1
    currentYear = Math.min(4, Math.floor(studentNumber / 15) + 1) // 1-4
  } else if (modeIndex < 9) {
    mode = "Lateral Entry"
    startYear = 2 // Lateral entry starts from 2nd year
    currentYear = Math.min(4, startYear + Math.floor(studentNumber / 20)) // 2-4
  } else {
    mode = "Transfer"
    startYear = Math.min(3, Math.floor(studentNumber / 25) + 2) // 2-3
    currentYear = Math.min(4, startYear + Math.floor(studentNumber / 30)) // 2-4
  }

  // Calculate semester based on year
  const semesterInYear = (studentNumber % 2) + 1 // 1 or 2
  const semester = (currentYear - 1) * 2 + semesterInYear // 1-8

  // Generate state and related location data
  const stateKeys = Object.keys(STATES_DATA)
  const stateIndex = generateConsistentRandom(registrationNumber, 4, stateKeys.length)
  const selectedState = stateKeys[stateIndex]
  const stateData = STATES_DATA[selectedState as keyof typeof STATES_DATA]

  const districtIndex = generateConsistentRandom(registrationNumber, 5, stateData.districts.length)
  const selectedDistrict = stateData.districts[districtIndex]

  // Generate academic year based on current year
  const currentDate = new Date()
  const currentAcademicYear = currentDate.getFullYear()
  let academicYear: string
  let batch: string

  if (mode === "Regular") {
    const admissionYear = currentAcademicYear - (currentYear - 1)
    batch = `${admissionYear}-${admissionYear + 4}`
    academicYear = `${currentAcademicYear}-${(currentAcademicYear + 1).toString().slice(-2)}`
  } else if (mode === "Lateral Entry") {
    const admissionYear = currentAcademicYear - (currentYear - 2)
    batch = `${admissionYear}-${admissionYear + 3}` // 3 years for lateral entry
    academicYear = `${currentAcademicYear}-${(currentAcademicYear + 1).toString().slice(-2)}`
  } else {
    const admissionYear = currentAcademicYear - (currentYear - startYear)
    batch = `${admissionYear}-${admissionYear + (5 - startYear)}`
    academicYear = `${currentAcademicYear}-${(currentAcademicYear + 1).toString().slice(-2)}`
  }

  const communityIndex = generateConsistentRandom(registrationNumber, 7, 5)
  const communities = ["OC", "BC", "MBC", "SC", "ST"]
  const community = communities[communityIndex]

  const religionIndex = generateConsistentRandom(registrationNumber, 8, 5)
  const religions = ["Hindu", "Christian", "Muslim", "Sikh", "Buddhist"]
  const religion = religions[religionIndex]

  const subCasteIndex = generateConsistentRandom(registrationNumber, 9, 8)
  const subCastes = ["Vanniyar", "Thevar", "Naidu", "Chettiar", "Gounder", "Mudaliar", "Pillai", "Reddy"]
  const subCaste = subCastes[subCasteIndex]

  const bloodGroupIndex = generateConsistentRandom(registrationNumber, 10, 8)
  const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"]
  const bloodGroup = bloodGroups[bloodGroupIndex]

  // Generate admission date based on mode and year
  let admissionDate: string
  if (mode === "Regular") {
    const admissionYear = currentAcademicYear - (currentYear - 1)
    admissionDate = `${admissionYear}-07-${String((studentNumber % 30) + 1).padStart(2, "0")}`
  } else if (mode === "Lateral Entry") {
    const admissionYear = currentAcademicYear - (currentYear - 2)
    admissionDate = `${admissionYear}-07-${String((studentNumber % 30) + 1).padStart(2, "0")}`
  } else {
    const admissionYear = currentAcademicYear - (currentYear - startYear)
    admissionDate = `${admissionYear}-01-${String((studentNumber % 30) + 1).padStart(2, "0")}`
  }

  const occupationIndex = generateConsistentRandom(registrationNumber, 11, 5)
  const occupations = ["Engineer", "Doctor", "Teacher", "Business", "Government Employee"]
  const fatherOccupation = occupations[occupationIndex]

  const motherOccupationIndex = generateConsistentRandom(registrationNumber, 12, 5)
  const motherOccupations = ["Homemaker", "Teacher", "Nurse", "Business", "Government Employee"]
  const motherOccupation = motherOccupations[motherOccupationIndex]

  return {
    registrationNumber,
    name: selectedName,
    rollNumber: `${registrationNumber.slice(-4)}`,
    email: `${registrationNumber.toLowerCase()}@licet.ac.in`,
    department: selectedDept,
    course: `B.E ${selectedDept}`,
    year: currentYear,
    semester: semester,
    section: String.fromCharCode(65 + (studentNumber % 3)), // A, B, C
    batch: batch,
    academicYear: academicYear,
    phoneNumber: `+91 ${9000000000 + studentNumber}`,
    address: `${studentNumber} Main Street, ${selectedDistrict}, ${selectedState}`,
    parentName: `${selectedName.split(" ")[0]} Father`,
    parentPhone: `+91 ${8000000000 + studentNumber}`,
    bloodGroup: bloodGroup,
    dateOfBirth: dateOfBirth,
    admissionDate: admissionDate,
    gender: gender, // Now properly assigned based on name
    fatherName: `${selectedName.split(" ")[0]} Father`,
    motherName: `${selectedName.split(" ")[0]} Mother`,
    fatherOccupation: fatherOccupation,
    motherOccupation: motherOccupation,
    annualIncome: `₹${((studentNumber % 10) + 3) * 100000}`,
    residentialAddress: `${studentNumber} Residential Street, ${selectedDistrict}, ${selectedState} - ${600000 + studentNumber}`,
    studentContactNo: `+91 ${9000000000 + studentNumber}`,
    studentEmail: `${registrationNumber.toLowerCase()}@licet.ac.in`,
    parentContactNo: `+91 ${8000000000 + studentNumber}`,
    parentEmail: `parent.${registrationNumber.toLowerCase()}@gmail.com`,
    community: community,
    nationality: "Indian",
    religion: religion,
    hosteller: studentNumber % 3 === 0 ? "Yes" : "No",
    district: selectedDistrict,
    mode: mode,
    totalMarks: `${450 + (studentNumber % 50)}`,
    overallPercentage: `${85 + (studentNumber % 15)}.${studentNumber % 10}%`,
    cutoffMarks: `${180 + (studentNumber % 20)}`,
    dateOfJoining: admissionDate,
    managementCounseling: studentNumber % 2 === 0 ? "Management" : "Counseling",
    firstGraduate: studentNumber % 4 === 0 ? "Yes" : "No",
    state: selectedState,
    catholicParish: religion === "Christian" ? `St. ${selectedName.split(" ")[0]} Parish` : undefined,
    dalitCatholic: religion === "Christian" && studentNumber % 5 === 0 ? "Yes" : "No",
    subCaste: subCaste,
    motherTongue: stateData.motherTongue,
    nativePlace: `${selectedDistrict}, ${selectedState}`,
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

// Get subjects based on department
function getSubjectsForDepartment(department: string) {
  return (
    SUBJECTS_BY_DEPT[department as keyof typeof SUBJECTS_BY_DEPT] ||
    SUBJECTS_BY_DEPT["Computer Science and Engineering"]
  )
}

export function getAttendanceData(registrationNumber: string): AttendanceData {
  const studentNumber = Number.parseInt(registrationNumber.slice(-2)) || 1
  const studentData = getStudentData(registrationNumber)
  const subjects = getSubjectsForDepartment(studentData.department)
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
        subject: subjects[period % subjects.length].name,
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
  const subjectAttendance: SubjectAttendance[] = subjects.map((subject, subjectIndex) => {
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

// Keep the old function for backward compatibility but make it use the enhanced data
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
  const studentData = getStudentData(registrationNumber)
  const subjects = getSubjectsForDepartment(studentData.department)

  const subjectMarks = subjects.map((subject, index) => {
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

  const overallAverage = subjectMarks.reduce((acc, subject) => acc + subject.finalMarks, 0) / subjectMarks.length

  return {
    subjects: subjectMarks,
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
    level: "College", // or set dynamically if needed
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

export function getCourses(registrationNumber: string): Course[] {
  const studentData = getStudentData(registrationNumber)
  const subjects = getSubjectsForDepartment(studentData.department)

  return subjects.map((subject, index) => ({
    code: subject.code,
    name: subject.name,
    credits: 3 + (index % 2), // 3 or 4 credits
    instructor: `Dr. ${["Smith", "Johnson", "Williams", "Brown", "Davis"][index % 5]}`,
    schedule: `${["Mon, Wed", "Tue, Thu", "Mon, Fri", "Wed, Fri", "Tue, Wed"][index % 5]} ${9 + index}:00-${10 + index}:00`,
    room: `${subject.code.slice(0, 2)}-${101 + index}`,
    type: index % 3 === 2 ? "Lab" : "Theory",
  }))
}

export function getArrearDetails(registrationNumber: string): ArrearDetail[] {
  const studentNumber = Number.parseInt(registrationNumber.slice(-2)) || 1
  const studentData = getStudentData(registrationNumber)
  const subjects = getSubjectsForDepartment(studentData.department)

  // Check if student has arrears based on student number
  const hasArrears = studentNumber % 7 === 0

  if (!hasArrears) {
    return []
  }

  const arrears: ArrearDetail[] = []
  const grades = ["A+", "A", "B+", "B", "C"]

  // Generate arrears for different semesters based on student number patterns
  const semesterPatterns = [
    { semester: 1, condition: studentNumber % 14 === 0 },
    { semester: 2, condition: studentNumber % 21 === 0 },
    { semester: 3, condition: studentNumber % 28 === 0 },
    { semester: 4, condition: studentNumber % 35 === 0 },
    { semester: 5, condition: studentNumber % 42 === 0 },
  ]

  semesterPatterns.forEach(({ semester, condition }) => {
    if (condition) {
      // Add 1-2 subjects as arrears for this semester
      const numArrears = (studentNumber % 2) + 1

      for (let i = 0; i < numArrears; i++) {
        const subject = subjects[i % subjects.length]
        const isCleared = (studentNumber + semester + i) % 3 === 0 // Some arrears are cleared

        const arrear: ArrearDetail = {
          semester,
          subjectCode: subject.code,
          subjectName: subject.name,
          credits: 3 + (i % 2),
          examDate: isCleared ? `2024-0${Math.min(semester + 2, 9)}-15` : `2025-0${Math.min(semester + 1, 9)}-15`,
          status: isCleared ? "Cleared" : "Pending",
          attempts: isCleared ? ((studentNumber + i) % 3) + 1 : ((studentNumber + i) % 2) + 1,
        }

        // Add clearance details if cleared
        if (isCleared) {
          arrear.clearedInSemester = Math.min(semester + ((studentNumber + i) % 3) + 1, 8)
          arrear.clearedGrade = grades[(studentNumber + semester + i) % grades.length]
        }

        arrears.push(arrear)
      }
    }
  })

  return arrears
}

export function getSemesterMarks(registrationNumber: string): SemesterMark[] {
  const studentNumber = Number.parseInt(registrationNumber.slice(-2)) || 1
  const studentData = getStudentData(registrationNumber)
  const subjects = getSubjectsForDepartment(studentData.department)

  const semesters: SemesterMark[] = []
  const grades = ["A+", "A", "B+", "B", "C", "-"]
  const gradePoints = [10, 9, 8, 7, 6, 0]

  // Generate marks for completed semesters (based on current semester)
  const completedSemesters = Math.min(studentData.semester, 8)

  for (let sem = 1; sem <= completedSemesters; sem++) {
    const semesterSubjects = subjects.map((subject, index) => {
      // Generate consistent grades based on student number and semester
      const gradeIndex = (studentNumber + sem + index) % grades.length
      const grade = grades[gradeIndex]
      const gradePoint = gradePoints[gradeIndex]

      // Generate marks (not shown in UI but used for calculations)
      const internal = Math.min(50, 35 + ((studentNumber + sem + index) % 15))
      const external = grade === "-" ? 0 : Math.min(50, 25 + ((studentNumber + sem + index * 2) % 25))
      const total = internal + external

      return {
        code: subject.code,
        name: subject.name,
        credits: 3 + (index % 2),
        internalMarks: internal,
        externalMarks: external,
        totalMarks: total,
        grade,
        gradePoints: gradePoint,
      }
    })

    // Calculate SGPA
    const totalCredits = semesterSubjects.reduce((sum, subject) => sum + subject.credits, 0)
    const totalGradePoints = semesterSubjects.reduce((sum, subject) => sum + subject.gradePoints * subject.credits, 0)
    const sgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0

    // Calculate CGPA (cumulative up to this semester)
    let cumulativeCredits = 0
    let cumulativeGradePoints = 0

    for (let prevSem = 1; prevSem <= sem; prevSem++) {
      subjects.forEach((subject, index) => {
        const credits = 3 + (index % 2)
        const gradeIndex = (studentNumber + prevSem + index) % grades.length
        const gradePoint = gradePoints[gradeIndex]

        cumulativeCredits += credits
        cumulativeGradePoints += gradePoint * credits
      })
    }

    const cgpa = cumulativeCredits > 0 ? cumulativeGradePoints / cumulativeCredits : 0

    semesters.push({
      semester: sem,
      subjects: semesterSubjects,
      sgpa: Math.round(sgpa * 100) / 100,
      cgpa: Math.round(cgpa * 100) / 100,
    })
  }

  return semesters
}

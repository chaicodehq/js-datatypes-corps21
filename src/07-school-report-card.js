/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  // Your code here
  if (typeof student !== "object" || student === null || Array.isArray(student)) return null
  if (typeof student?.name !== "string" || student?.name?.trim().length === 0) return null
  if (typeof student?.marks !== "object" || !student?.marks || Array.isArray(student?.marks) || Object.keys(student?.marks).length === 0) return null
  if (Object.values(student?.marks).some(mark => typeof mark !== "number" || !Number.isFinite(mark) || Number.isNaN(mark) || mark > 100 || mark < 0)) return null

  const name = student.name
  const marks = Object.entries(student.marks);
  const { totalMarks, lowestSubject, highestSubject, passedSubjects, failedSubjects } = marks.reduce((acc, curr) => {
    acc.totalMarks += curr[1]

    if (curr[1] >= 40) acc.passedSubjects.push(curr[0])
    else acc.failedSubjects.push(curr[0])

    if (acc.highestMark < curr[1]) {
      acc.highestSubject = curr[0]
      acc.highestMark = curr[1]
    }
    if (acc.lowestMark > curr[1]) {
      acc.lowestMark = curr[1]
      acc.lowestSubject = curr[0]
    }
    return acc
  }, { totalMarks: 0, highestSubject: "", lowestSubject: "", highestMark: -Infinity, lowestMark: Infinity, passedSubjects: [], failedSubjects: [] })
  const percentage = parseFloat(((totalMarks / (marks.length * 100)) * 100).toFixed(2))

  let grade = "F"
  if (percentage >= 90) grade = "A+"
  else if (percentage >= 80) grade = "A"
  else if (percentage >= 70) grade = "B"
  else if (percentage >= 60) grade = "C"
  else if (percentage >= 40) grade = "D"

  return { name, totalMarks, subjectCount: marks.length, percentage, grade, lowestSubject, highestSubject, passedSubjects, failedSubjects }
}

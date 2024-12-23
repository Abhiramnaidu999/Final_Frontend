export class StudentApplication {
  applicatinId?: number;
  aadharNumber: string;
  instituteCode: string;
  instituteName: string;
  presentCourse: string;
  presentCourseYear: string;
  modeOfStudy: string;
  classStartDate: Date;
  universityName: string;
  tuitionFee: number;
  scheme: string;

  constructor(
    applicatinId?: number,
    aadharNumber: string = '',
    instituteCode: string = '',
    instituteName: string = '',
    presentCourse: string = '',
    presentCourseYear: string = '',
    modeOfStudy: string = '',
    classStartDate: Date = new Date(),
    universityName: string = '',
    tuitionFee: number = 0,
    scheme: string = ''
  ) {
    this.applicatinId = applicatinId;
    this.aadharNumber = aadharNumber;
    this.instituteCode = instituteCode;
    this.instituteName = instituteName;
    this.presentCourse = presentCourse;
    this.presentCourseYear = presentCourseYear;
    this.modeOfStudy = modeOfStudy;
    this.classStartDate = classStartDate;
    this.universityName = universityName;
    this.tuitionFee = tuitionFee;
    this.scheme = scheme;
  }
}

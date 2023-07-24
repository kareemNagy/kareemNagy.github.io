import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DistrictService {
  constructor() {}

  getDistricts(): any[] {
    return [
      {
        nameAr: "منطقة المدينة المنورة",
        nameEn: "",
        longitude: 24.465266,
        latitude: 39.609565,
        icon: "assets/cities-icons/Madinah.png",
        totalLoans: "241,542",
        totalExpenses: "10,935,868,928",
      },
      {
        nameAr: "منطقة الرياض",
        nameEn: "",
        longitude: 24.678748,
        latitude: 46.688674,
        icon: "assets/cities-icons/Al Riyadh.png",
        totalLoans: "584,616",
        totalExpenses: "29,246,369,496",
      },
      {
        nameAr: "منطقة نجران",
        nameEn: "",
        longitude: 17.737521,
        latitude: 44.31628,
        icon: "assets/cities-icons/Najran.png",
        totalLoans: "86,040",
        totalExpenses: "4,050,634,551",
      },
      {
        nameAr: "منطقة مكة المكرمة",
        nameEn: "",
        longitude: 21.423029,
        latitude: 39.820728,
        icon: "assets/cities-icons/Mecca.png",
        totalLoans: "546,158",
        totalExpenses: "25,458,242,613",
      },
      {
        nameAr: "منطقة القصيم",
        nameEn: "",
        longitude: 26.329205,
        latitude: 43.942797,
        icon: "assets/cities-icons/Alqassim.png",
        totalLoans: "144,353",
        totalExpenses: "6,462,700,123",
      },
      {
        nameAr: "منطقة عسير",
        nameEn: "",
        longitude: 19.0969,
        latitude: 42.8638,
        icon: "assets/cities-icons/Aseer-Abha.png",
        totalLoans: "240,359",
        totalExpenses: "11,203,370,698",
      },
      {
        nameAr: "منطقة الحدود الشمالية",
        nameEn: "",
        longitude: 30.981953,
        latitude: 41.022229,
        icon: "assets/cities-icons/Alhudod alshamalia.png",
        totalLoans: "68,969",
        totalExpenses: "2,824,593,029",
      },
      {
        nameAr: "المنطقة الشرقية",
        nameEn: "",
        longitude: 26.376481,
        latitude: 50.097495,
        icon: "assets/cities-icons/Dammam.png",
        totalLoans: "430,801",
        totalExpenses: "19,580,314,915",
      },
      {
        nameAr: "منطقة الجوف",
        nameEn: "",
        longitude: 29.96345,
        latitude: 40.193192,
        icon: "assets/cities-icons/Aljouf.png",
        totalLoans: "98,668",
        totalExpenses: "4,339,628,235",
      },
      {
        nameAr: "منطقة حائل",
        nameEn: "",
        longitude: 27.5114,
        latitude: 41.7208,
        icon: "assets/cities-icons/Hail.png",
        totalLoans: "91,374",
        totalExpenses: "3,812,510,998",
      },
      {
        nameAr: "منطقة جازان",
        nameEn: "",
        longitude: 16.900157,
        latitude: 42.568875,
        icon: "assets/cities-icons/Jizan.png",
        totalLoans: "177,082",
        totalExpenses: "7,588,929,835",
      },
      {
        nameAr: "منطقة تبوك",
        nameEn: "",
        longitude: 28.391972,
        latitude: 36.556999,
        icon: "assets/cities-icons/Tabuk.png",
        totalLoans: "112,157",
        totalExpenses: "5,271,082,343",
      },
      {
        nameAr: "منطقة الباحة",
        nameEn: "",

        longitude: 20.0217,
        latitude: 41.4713,
        icon: "assets/cities-icons/Albaha2.png",
        totalLoans: "67,372",
        totalExpenses: "2,877,809,589",
      },
    ];
  }

  getDistrictByName(name: string): any {
    let districts = this.getDistricts();
    let district = districts.find(
      (c) => c.nameAr === name || c.nameEn === name
    );
    return district;
  }
}

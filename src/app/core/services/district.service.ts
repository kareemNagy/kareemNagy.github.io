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
        longitude: 24.5247,
        latitude: 39.5692,
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
        longitude: 17.5656,
        latitude: 44.2289,
        icon: "assets/cities-icons/Najran.ong",
        totalLoans: "86,040",
        totalExpenses: "4,050,634,551",
      },
      {
        nameAr: "منطقة مكة المكرمة",
        nameEn: "",
        longitude: 21.3891,
        latitude: 39.8579,
        icon: "assets/cities-icons/Mecca.png",
        totalLoans: "546,158",
        totalExpenses: "25,458,242,613",
      },
      {
        nameAr: "منطقة القصيم",
        nameEn: "",
        longitude: 26.2078,
        latitude: 43.4837,
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
        longitude: 30.0799,
        latitude: 42.8638,
        icon: "assets/cities-icons/Alhudod alshamalia.png",
        totalLoans: "68,969",
        totalExpenses: "2,824,593,029",
      },
      {
        nameAr: "المنطقة الشرقية",
        nameEn: "",
        longitude: 23.5681,
        latitude: 50.6794,
        icon: "assets/cities-icons/Dammam.png",
        totalLoans: "430,801",
        totalExpenses: "19,580,314,915",
      },
      {
        nameAr: "منطقة الجوف",
        nameEn: "",
        longitude: 29.8874,
        latitude: 39.3206,
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
        longitude: 16.8894,
        latitude: 42.5706,
        icon: "assets/cities-icons/Jizan.png",
        totalLoans: "177,082",
        totalExpenses: "7,588,929,835",
      },
      {
        nameAr: "منطقة تبوك",
        nameEn: "",
        longitude: 28.290245,
        latitude: 37.091769,
        icon: "assets/cities-icons/Tabuk.png",
        totalLoans: "112,157",
        totalExpenses: "5,271,082,343",
      },
      {
        nameAr: "منطقة الباحة",
        nameEn: "",
        longitude: 28.3835,
        latitude: 36.5662,
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

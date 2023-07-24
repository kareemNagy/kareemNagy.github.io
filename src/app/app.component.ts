import { ROLE } from "./core/utils/role.enum";
import { AppPreferenceService } from "./core/services/app-preference.service";
import { Component, OnInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { UserService } from "./core/services/user.service";
import { Excel } from "./core/models/excel.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "sdb";
  routingList: string[] = [];
  currentRole = "";
  loggedIn = true;

  constructor(
    private appPreference: AppPreferenceService,
    private router: Router,
    private userService: UserService
  ) {
    this.appPreference.checkAppPreferences();
    this.currentRole = this.userService.getUserRole();
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.routingList.push(event.url);
        this.handleBreadcrumb(event.url);
      }
    });
  }

  ngOnInit() {
    this.validateLogin();
    this.getLocation();
    if (
      !window.location.href.includes("admin") &&
      !window.location.href.includes("client") &&
      !window.location.href.includes("visitor")
    ) {
      this.handleNavigation();
    }
  }

  validateLogin() {
    if (
      sessionStorage.getItem("loggedIn") &&
      sessionStorage.getItem("loggedIn") == "true"
    ) {
      this.loggedIn = true;
    }
  }

  presistLogin() {
    sessionStorage.setItem("loggedIn", "true");
    this.loggedIn = true;
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {},
        (error: any) => console.log(error)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  handleNavigation() {
    if (this.userService.getUserRole() == ROLE.CLIENT.toString()) {
      this.router.navigate(["/client"]);
    } else if (this.userService.getUserRole() == ROLE.ADMIN.toString()) {
      this.router.navigate(["/admin"]);
    } else {
      this.router.navigate(["/visitor"]);
    }
  }

  handleBreadcrumb(currentPath: string) {
    this.appPreference.setCurrentPath(currentPath);
  }

  convertExcelToJson() {
    let excel: any[] = Excel.excel;

    let resultArray: any[] = [];
    let excludes: string[] = ["channels", "template-key", "surveyid"];
    for (let currentObject of excel) {
      let resultObject: any = {};
      let placeholders: any[] = [];
      for (const key in currentObject) {
        if (!excludes.includes(key)) {
          const value = currentObject[key];

          if (key === "email") {
            resultObject.email = value.trim().toLowerCase();
          } else {
            placeholders.push({ key: key, value: value });
          }
        }
      }
      resultObject.placeholders = placeholders;
      resultArray.push(resultObject);
    }

    console.log(JSON.stringify(resultArray));
  }
}
